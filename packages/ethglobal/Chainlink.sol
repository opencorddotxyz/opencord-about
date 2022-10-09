// SPDX-License-Identifier: MIT
pragma solidity >=0.8.8;


import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import '@chainlink/contracts/src/v0.8/ChainlinkClient.sol';
import '@chainlink/contracts/src/v0.8/ConfirmedOwner.sol';

import { IOpen } from "./interfaces/IOpen.sol";
import { IveOpen } from "./interfaces/IveOpen.sol";
import { IGaugeV1 } from "./interfaces/IGaugeV1.sol";
import { ILink } from "./interfaces/ILink.sol";


contract OpenTokenBoosterReward is ChainlinkClient, ConfirmedOwner {
    using SafeMath for uint256;
    using SafeERC20 for ERC20;
    using Chainlink for Chainlink.Request;

    IOpen public openToken;
    IveOpen public veOpenToken;
    IGaugeV1 public gaugeCtl;

    //Can and will be a smart contract
    address public currentOwner;
    
    uint256 public constant WEEK = 600;//604800;
    address public constant ZERO_ADDRESS = address(0);

    uint256 public oraclePayment = 1 * LINK_DIVISIBILITY / 10000; // 0.0001 * 10**18

    struct ClaimedRecord{
        uint256 ts;
        uint256 amount;
    }

    // week time -> cid
    mapping (uint256 => string) public cidHistory;
    // gauge_addr -> week time -> claimed record
    mapping (address => mapping (uint256 => ClaimedRecord)) public claimedHistory;
    // gauge_addr -> week time
    mapping (address => uint256) public lastClaimedTime;

    uint256 public minWeekTime = 0;
    address public oracleAddress;
    string public jobId;

    /* ========== MODIFIERS ========== */

    modifier onlyByOwner() {
        require(msg.sender == currentOwner , "You are not an owner ");
        _;
    }

    /* ========== CONSTRUCTOR ========== */

    constructor(
        address openTokenAddr_,
        address veOpenTokenAddr_,
        address gaugeCtlAddr_) ConfirmedOwner(msg.sender){
        currentOwner = msg.sender;
        
        openToken = IOpen(openTokenAddr_);
        veOpenToken = IveOpen(veOpenTokenAddr_);
        gaugeCtl = IGaugeV1(gaugeCtlAddr_);
    }

    /* ========== RESTRICTED FUNCTIONS ========== */

    function setOwner(address currentOwner_) external onlyByOwner {
        currentOwner = currentOwner_;
    }

    function setOpenToken(address addr_) external onlyByOwner {
        openToken = IOpen(addr_);
    }

    function setVeOpenToken(address addr_) external onlyByOwner {
        veOpenToken = IveOpen(addr_);
    }

    function seGaugeCtl(address addr_) external onlyByOwner {
        gaugeCtl = IGaugeV1(addr_);
    }

    function setLinkToken(address linktoken) external onlyByOwner {
        setChainlinkToken(linktoken);
    }

    function setOracle(address oracle_) external onlyByOwner {
        oracleAddress = oracle_;
    }

    function setJobId(string memory jobId_) external onlyByOwner {
        jobId = jobId_;
    }

    function setCid(uint256 t_, string memory cid_) external onlyByOwner {
        uint256 weekTime = t_ / WEEK * WEEK;
        if(weekTime < minWeekTime || minWeekTime == 0){
            minWeekTime = weekTime;
        }
        bytes memory oldCid = bytes(cidHistory[weekTime]);
        require( oldCid.length == 0, "already set cid");
        cidHistory[weekTime] = cid_;
    }

    function setOraclePayment(uint256 rate_) external onlyByOwner {
        oraclePayment = 10000 * LINK_DIVISIBILITY / rate_;
    }

    function withdrawLink(uint256 amount_) external onlyByOwner {
        ILink(chainlinkTokenAddress()).transferFrom(address(this), msg.sender, amount_);
    }


    /* ========== INTERNAL FUNCTIONS ========== */

    function getChainId() internal view returns (uint) {
        uint256 chainId;
        assembly { chainId := chainid() }
        return chainId;
    }

    /* ========== EXTERNAL FUNCTIONS ========== */

    function getWeekBoostEmission(uint256 t_ ) external view returns(uint256){

        uint256 weekEmission = openToken.weekAvailableSupply(t_);
        
        uint256 openSupplyLimit = openToken.supplyLimit();
        return weekEmission * (openSupplyLimit - veOpenToken.getWeekSupply(t_))  / openSupplyLimit;
    }

    /**
    * @notice Returns the cid of the target weektime .
    */
    function getCid(uint256 t_) external view returns ( string memory) {
        uint256 weekTime = t_ / WEEK * WEEK;

        return cidHistory[weekTime];
    }

    /* ========== PUBLIC FUNCTIONS ========== */

    /**
       * @notice request claim booster reward
    */
    function requestReward() public  {
        bytes memory jobIdBytes = bytes(jobId);
        require(oracleAddress != address(0) && jobIdBytes.length != 0, "Please set oracle address or jobid ");

        uint256 startClaimTime = lastClaimedTime[msg.sender] + WEEK;
        uint256 startTime = openToken.startTime();
        require(startTime > 0 , "Open token not start emission ");
        if(startClaimTime < startTime){
            startClaimTime = startTime;
        }
        require(minWeekTime > 0 , "need reward info");
        if(startClaimTime < minWeekTime){
            startClaimTime = minWeekTime;
        }

        uint256 curWeekTime = block.timestamp / WEEK * WEEK;
        require(startClaimTime <= curWeekTime, "You have Claimed all the reward ");

        bytes memory startCid = bytes(cidHistory[startClaimTime]);
        require( startCid.length != 0, "no reward data");

        Chainlink.Request memory req = buildChainlinkRequest(
            stringToBytes32(jobId),
            address(this),
            this.fulfillReward.selector
        );

        req.addInt('chainId', int256(getChainId()));
        uint claimGaugeId = gaugeCtl.getGaugeId(msg.sender);
        req.addInt('claimGaugeId', int256(claimGaugeId));
        req.addInt('startClaimTime', int256(startClaimTime));
        req.add('gaugeAddr', Strings.toHexString(uint256(uint160(address(this))), 20));
        sendChainlinkRequestTo(oracleAddress, req, oraclePayment);
    }


    /**
       * @notice fulfill claim booster reward
    */
    function fulfillReward(bytes32 requestId_, uint256 claimGaugeId_, uint256 claimTime_, uint256 amount_) public recordChainlinkFulfillment(requestId_){

        address claimedAddress = gaugeCtl.gaugesPool(claimGaugeId_).mapAddr;

        emit RequestRewardFulfilled(requestId_, claimGaugeId_, claimTime_, amount_);
        require( claimedAddress != ZERO_ADDRESS, "need claimedAddress");
        require( amount_ > 0, "claimed amount need > 0");
        require( claimTime_ > lastClaimedTime[claimedAddress], "can not repeat claim");

        //mint reward open tokens
        openToken.mint(claimedAddress, amount_);
        //record the claimed history
        lastClaimedTime[claimedAddress] = claimTime_;
        claimedHistory[claimedAddress][claimTime_] = ClaimedRecord({
            ts:block.timestamp,
            amount:amount_
        });
    }

    /* ========== PRIVATE FUNCTIONS ========== */

    function stringToBytes32(string memory source_) private pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source_);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
        // solhint-disable-line no-inline-assembly
            result := mload(add(source_, 32))
        }
    }

    /* ========== EVENTS ========== */

    event RequestRewardFulfilled(bytes32 indexed requestId, uint256 indexed claimGaugeId, uint256 claimedTime,uint256 amount);

}