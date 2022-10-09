package logic

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"math/big"
	rpcerror "opencord/pkg/errors/rpc"
	"opencord/pkg/ipfs"
	"opencord/services/blockchain/contracts/boosterreward"
	"strconv"
	"time"

	"opencord/services/blockchain/blockchain"
	"opencord/services/blockchain/internal/svc"

	"github.com/zeromicro/go-zero/core/logx"
)

type BoosterRewardGetLogic struct {
	ctx    context.Context
	svcCtx *svc.ServiceContext
	logx.Logger
}

type Gauge struct {
	Score 	string 	`json:"score"`
	Vote 		string 	`json:"vote"`
	Reward 	string 	`json:"reward"`
}
type BoosterRewardRecord struct {
	WeekTime 			string 		`json:"weekTime"`
	TotalScore 		string 		`json:"totalScore"`
	TotalVote 		string 		`json:"totalVote"`
	TotalReward 	string 		`json:"totalReward"`
	Potion 				string 		`json:"potion"`
	GaugeList 		map[string]Gauge `json:"gaugeList"`
}

func NewBoosterRewardGetLogic(ctx context.Context, svcCtx *svc.ServiceContext) *BoosterRewardGetLogic {
	return &BoosterRewardGetLogic{
		ctx:    ctx,
		svcCtx: svcCtx,
		Logger: logx.WithContext(ctx),
	}
}

func (l *BoosterRewardGetLogic) BoosterRewardGet(in *blockchain.GetRewardRequest) (*blockchain.GetRewardResponse, error) {
	var (
		client    = extractEthereumClient(in.Chain, l.svcCtx)
		contractAddr = common.HexToAddress(in.Contract)
		newWeekTime = int64(0)
		totalReward = int64(0)
	)
	WEEK := int64(86400 * 7)
	startWeekTime := int64(in.WeekTime / WEEK) * WEEK
	maxWeekTime := int64(time.Now().Unix() / WEEK) * WEEK

	for s := startWeekTime; s < maxWeekTime; s = s + WEEK {
		contract, err := boosterreward.NewBoosterreward(contractAddr, client)
		if err != nil {
			return nil, err
		}

		cid, err := contract.GetCid(&bind.CallOpts{Context: l.ctx}, big.NewInt(s))
		if err != nil {
			return nil, err
		}
		l.Infof(fmt.Sprintf("%d",s)+"-cid:"+cid)
		if len(cid) > 0 {
			//get cid content
			fileResp, err := l.svcCtx.IpfsClient.GetFile(l.ctx, &ipfs.GetFileRequest{
				Cid:	cid,
			})
			if err != nil {
				e := rpcerror.ErrIPFS.Wrap(err)
				l.Error(e)
				return nil, e
			}
			if fileResp.ErrCode != 0 {
				e := rpcerror.ErrIPFS.Wrap(fmt.Errorf(fileResp.ErrMsg))
				l.Error(e)
				return nil, e
			}

			l.Infof("data:"+fileResp.Data)
			var record BoosterRewardRecord
			json.Unmarshal([]byte(fileResp.Data),&record)
			reward, err:= strconv.Atoi(record.GaugeList[strconv.FormatInt(in.GaugeId,10)].Reward)

			l.Infof("reward:"+strconv.Itoa(reward))
			if err != nil {
				e := rpcerror.ErrIPFS.Wrap(err)
				l.Error(e)
				return nil, e
			}
			if  reward > 0 {
				newWeekTime = s
				totalReward += int64(reward)
			}
		}
	}

	l.Infof("totalreward:"+strconv.Itoa(int(totalReward)))
	l.Infof("newWeekTime:"+strconv.Itoa(int(newWeekTime)))
	return &blockchain.GetRewardResponse{
		Reward:  totalReward,
		NewWeekTime: newWeekTime,
	}, nil
}
