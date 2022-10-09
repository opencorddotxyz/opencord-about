package common

import (
	"context"
	"errors"
	"fmt"
	rpcerror "opencord/pkg/errors/rpc"
	"opencord/services/user/internal/svc"
	"opencord/services/user/model"

	"github.com/zeromicro/go-zero/core/logx"
	"gorm.io/gorm"
)

const (
	ENSContractAddress = "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85"
)

func GetUserENS(ctx context.Context, svcCtx *svc.ServiceContext, userId int64) ([]string, error) {
	var (
		userAccount model.UserAccount
		userENS     []model.UserNFT
		ens         []string
		l           = logx.WithContext(ctx)
	)

	if err := svcCtx.Model.Select("wallet_address").First(ctx, &userAccount, model.WithUserId(userId)); err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			e := rpcerror.ErrUserNotFound.Wrap(fmt.Errorf("userId: %d", userId))
			l.Error(e)
			return nil, e
		} else {
			e := rpcerror.ErrMySQL.Wrap(err)
			l.Error(e)
			return nil, e
		}
	}

	if err := svcCtx.Model.Find(ctx, &userENS, model.WithWalletAddress(userAccount.WalletAddress), model.WithContractAddress(ENSContractAddress)); err != nil {
		e := rpcerror.ErrMySQL.Wrap(err)
		l.Error(e)
		return nil, e
	}

	for _, thisENS := range userENS {
		var metadata []model.NFTMetadata
		if err := svcCtx.Model.Find(ctx, &metadata, model.WithChainType(model.ChainTypeEthereumMainnet), model.WithContractAddress(ENSContractAddress), model.WithTokenId(thisENS.TokenID)); err != nil {
			e := rpcerror.ErrMySQL.Wrap(err)
			l.Error(e)
			return nil, e
		}

		for _, v := range metadata {
			if v.Field == "name" {
				ens = append(ens, v.Value)
			}
		}
	}

	return ens, nil
}

func CheckHoldENS(ctx context.Context, svcCtx *svc.ServiceContext, userId int64, ens string) (bool, error) {
	ensList, err := GetUserENS(ctx, svcCtx, userId)
	if err != nil {
		return false, err
	}

	for _, v := range ensList {
		if ens == v {
			return true, nil
		}
	}

	return false, nil
}
