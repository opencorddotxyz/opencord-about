package daemon

import (
	"context"
	"encoding/json"
	"fmt"
	"math/big"
	message "opencord/pkg/common/kafka"
	rediskey "opencord/pkg/common/redis"
	"opencord/pkg/kafka"
	"opencord/pkg/moralis"
	"opencord/pkg/utils/limit"
	"opencord/services/blockchain/blockchain"
	"opencord/services/user/internal/common"
	"opencord/services/user/internal/svc"
	"opencord/services/user/model"
	"strconv"
	"strings"
	"time"

	"github.com/zeromicro/go-zero/core/logx"
	"github.com/zeromicro/go-zero/core/stores/redis"
)

const (
	MoralisEthChain     = "eth"
	MoralisPolygonChain = "polygon"
)

type erc20token struct {
	logo            string
	contractAddress string
	name            string
	symbol          string
	decimals        uint8
}

var (
	eth = erc20token{
		logo:            "https://etherscan.io/token/images/ether.png",
		contractAddress: "ethereum",
		name:            "Ethereum",
		symbol:          "ETH",
		decimals:        18,
	}

	matic = erc20token{
		logo:            "https://polygonscan.com/token/images/poly_28.png",
		contractAddress: "polygon",
		name:            "Polygon",
		symbol:          "MATIC",
		decimals:        18,
	}
)

func QueryERC20(svcCtx *svc.ServiceContext) {
	svcCtx.ERC20Consumer.Consume(svcCtx, queryERC20, getTokensTokenLimit, time.Second*5)
}

func getTokensTokenLimit(ctx context.Context, anySvcCtx interface{}) error {
	svcCtx, ok := anySvcCtx.(*svc.ServiceContext)
	if !ok {
		e := fmt.Errorf("svcCtx type mismatch")
		logx.WithContext(ctx).Error(e)
		return e
	}

	limiter := newLimiter(svcCtx, rediskey.MoralisRateLimitKey, svcCtx.Config.Moralis.RateLimit, svcCtx.Config.Moralis.RateLimit)
	if !limiter.AllowN(time.Now(), svcCtx.Config.Moralis.GetTokenBalancesConsumed) {
		time.Sleep(time.Millisecond * 20)
		return fmt.Errorf("exceeded moralis api rate limit")
	}

	return nil
}

func queryERC20(ctx context.Context, anySvcCtx interface{}, key []byte, value []byte) error {
	svcCtx, ok := anySvcCtx.(*svc.ServiceContext)
	if !ok {
		e := fmt.Errorf("svcCtx type mismatch")
		logx.WithContext(ctx).Error(e)
		return e
	}

	if string(key) == "" {
		e := fmt.Errorf("invalid wallet_address")
		logx.WithContext(ctx).Error(e)
		return e
	}

	thisMessage := kafka.KafkaMessage{
		Key:   key,
		Value: value,
	}

	handlerERC20(svcCtx, ctx, thisMessage)

	return nil
}

func handlerERC20(svcCtx *svc.ServiceContext, ctx context.Context, thisMessage kafka.KafkaMessage) error {
	l := logx.WithContext(ctx)
	address := string(thisMessage.Key)

	var value message.ERC20Message
	if err := json.Unmarshal(thisMessage.Value, &value); err != nil {
		l.Error(err)
		return err
	}

	chain := value.Chain
	chainModelType := convertToModelChainType(chain)

	// query native token balance
	var balance string
	nativeBalanceResp, err := svcCtx.BlockchainRPC.BalanceAt(ctx, &blockchain.BalanceAtRequest{
		Chain: chain,
		Who:   address,
	})
	if err != nil {
		l.Error(err)
	} else {
		nativeBalance := new(big.Int)
		nativeBalance.SetBytes(nativeBalanceResp.Balance)
		balance = fmt.Sprintf("%s", nativeBalance)
	}

	var newUserToken model.UserFungibleToken
	switch chain {
	case blockchain.Chain_ChainEthereum:
		newUserToken = model.UserFungibleToken{
			WalletAddress:   address,
			ContractAddress: eth.contractAddress,
			Balance:         balance,
			SyncedAt:        time.Now().UnixMilli(),
		}
	case blockchain.Chain_ChainPolygon:
		newUserToken = model.UserFungibleToken{
			WalletAddress:   address,
			ContractAddress: matic.contractAddress,
			Balance:         balance,
			SyncedAt:        time.Now().UnixMilli(),
		}
	}

	var existUserTokens []model.UserFungibleToken
	if err := svcCtx.Model.Find(ctx, &existUserTokens, model.WithWalletAddress(address), model.WithContractAddress(newUserToken.ContractAddress)); err != nil {
		l.Error(err)
		return err
	}

	if len(existUserTokens) == 0 {
		if newUserToken.Balance != "" && newUserToken.Balance != "0" {
			if err := svcCtx.Model.Create(ctx, &newUserToken); err != nil {
				l.Error(err)
				return err
			}
		}
	} else {
		_, err := svcCtx.Model.Updates(ctx, &model.UserFungibleToken{ID: existUserTokens[0].ID}, &newUserToken)
		if err != nil {
			l.Error(err)
			return err
		}
	}

	tokenInfo, err := svcCtx.MoralisClient.GetTokens(ctx, &moralis.GetTokensRequest{
		Chain:         convertToMoralisChain(chain),
		WalletAddress: address,
	})
	if err != nil {
		if strings.Contains(err.Error(), moralis.MoralisRateLimitErrMsg) {
			l.Error(err)
			resetRateLimit(svcCtx, rediskey.MoralisRateLimitKey)
			time.Sleep(time.Second * 5)
			return svcCtx.ERC20Producer.WriteMessages(ctx, []kafka.KafkaMessage{thisMessage})
		} else {
			l.Error(err)
			return err
		}
	}

	for _, v := range *tokenInfo {
		thisToken := model.FungibleToken{
			Chain:           chainModelType,
			ContractAddress: v.TokenAddress,
			Name:            v.Name,
			Symbol:          v.Symbol,
			Decimals:        v.Decimals,
			Logo:            v.Logo,
			Thumbnail:       v.Thumbnail,
		}

		var existFungibleToken []model.FungibleToken
		if err := svcCtx.Model.Find(ctx, &existFungibleToken, model.WithContractAddress(v.TokenAddress)); err != nil {
			l.Error(err)
			return err
		}

		if len(existFungibleToken) == 0 {
			if err := svcCtx.Model.Create(ctx, &thisToken); err != nil {
				l.Error(err)
				return err
			}
			// write message for query this token's price to kafka
			common.WriteToTokenPriceProducer(svcCtx, ctx, chain, []string{v.TokenAddress})
		} else {
			_, err := svcCtx.Model.Updates(ctx, &model.FungibleToken{ID: existFungibleToken[0].ID}, &thisToken)
			if err != nil {
				l.Error(err)
				return err
			}
		}

		// if this token not exist in table "tokens", insert this token info to table "tokens"
		var existTokens []model.Token
		if err := svcCtx.Model.Find(ctx, &existTokens, model.WithContractAddress(v.TokenAddress)); err != nil {
			l.Error(err)
			return err
		}

		if len(existTokens) == 0 {
			newToken := model.Token{
				Chain:           chainModelType,
				ContractAddress: v.TokenAddress,
				TokenType:       model.TokenTypeERC20,
			}

			if err := svcCtx.Model.Create(ctx, &newToken); err != nil {
				l.Error(err)
				return err
			}
		}

		newUserToken := model.UserFungibleToken{
			WalletAddress:   address,
			ContractAddress: v.TokenAddress,
			Balance:         v.Balance,
			SyncedAt:        time.Now().UnixMilli(),
		}

		var existUserTokens []model.UserFungibleToken
		if err := svcCtx.Model.Find(ctx, &existUserTokens, model.WithWalletAddress(address), model.WithContractAddress(v.TokenAddress)); err != nil {
			l.Error(err)
			return err
		}

		if len(existUserTokens) == 0 {
			if err := svcCtx.Model.Create(ctx, &newUserToken); err != nil {
				l.Error(err)
				return err
			}
		} else {
			_, err := svcCtx.Model.Updates(ctx, &model.UserFungibleToken{ID: existUserTokens[0].ID}, &newUserToken)
			if err != nil {
				l.Error(err)
				return err
			}
		}
	}

	return nil
}

func convertToMoralisChain(chain blockchain.Chain) string {
	switch chain {
	case blockchain.Chain_ChainEthereum:
		return MoralisEthChain
	case blockchain.Chain_ChainPolygon:
		return MoralisPolygonChain
	}
	return MoralisEthChain
}

func convertToModelChainType(chain blockchain.Chain) model.ChainType {
	switch chain {
	case blockchain.Chain_ChainEthereum:
		return model.ChainTypeEthereumMainnet
	case blockchain.Chain_ChainPolygon:
		return model.ChainTypePolygonMainnet
	default:
		return model.ChainTypeReserved
	}
}

func newLimiter(svcCtx *svc.ServiceContext, key string, rate, burst int) *limit.TokenLimiter {
	redisClient := redis.New(svcCtx.Config.RedisConf.Addrs[0], redis.Cluster())
	tokenFormat := fmt.Sprintf("{%s}.tokens", key)
	timestampFormat := fmt.Sprintf("{%s}.ts", key)
	exist, err := redisClient.Exists(tokenFormat)
	if err != nil {
		logx.Error(err)
	} else {
		if !exist {
			redisClient.Set(tokenFormat, "0")
		}
	}

	exist, err = redisClient.Exists(timestampFormat)
	if err != nil {
		logx.Error(err)
	} else {
		if !exist {
			redisClient.Set(timestampFormat, strconv.FormatInt(time.Now().UnixMilli(), 10))
		}
	}

	return limit.NewTokenLimiter(rate, burst, redisClient, key)
}

func resetRateLimit(svcCtx *svc.ServiceContext, key string) error {
	tokenFormat := fmt.Sprintf("{%s}.tokens", key)
	timestampFormat := fmt.Sprintf("{%s}.ts", key)
	redisClient := redis.New(svcCtx.Config.RedisConf.Addrs[0], redis.Cluster())
	redisClient.Set(tokenFormat, "0")
	redisClient.Set(timestampFormat, strconv.FormatInt(time.Now().UnixMilli(), 10))
	return nil
}
