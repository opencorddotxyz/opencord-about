// SPDX-License-Identifier: MIT
pragma solidity >=0.8.8;


import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OpenToken is ERC20 {
    using SafeMath for uint256;



    // Allocation:
    //- Engagement Mining: 40%
    //- DAO Treasury: 20%
    //- Core Team and Advisory: 15%
    //- Strategic Partners and plugin development: 10%
    //- Ecosystem, marketing, market making: 10%
    //- Community airdrops: 0.5%
    //- private/public sales: 4.5% ??

    // decimalsBase 10 ** 18
    uint256 public decimalsBase = 1000000000000000000;
    // supply limit 1 Billion
    uint256 public supplyLimit = 1000000000 * decimalsBase;
    uint256 public totalOpenSupply = 6000000000 * decimalsBase;
    uint256 public firstWeekEmission = 3161335 * decimalsBase;
    uint256 public emissionWeekCount = 520;
    mapping (uint256 => uint256) public weekEmissionList;
    uint256 public constant WEEKLY_REDUCTION_RATE = 1007827884862117171; //1.5 ** (1/52) * 1e18
    uint256 public constant WEEK = 7 * 86400;
    //start emission time
    uint256 public startTime = 0;
    uint256 public weekNum = 0;
    uint256 public lastWeekNum = 0;


    address public ownerAddr;
    address public boostEmissionerAddr;
    address public stackEmissionerAddr;


    /* ========== MODIFIERS ========== */

    modifier onlyByOwner() {
        require(msg.sender == ownerAddr || msg.sender == boostEmissionerAddr
         || msg.sender == stackEmissionerAddr, 
        "You are not an owner or the emissioner");
        _;
    }

    /* ========== CONSTRUCTOR ========== */

    constructor(string memory name_, string memory symbol_)  ERC20(name_, symbol_) {
        ownerAddr = msg.sender;
        boostEmissionerAddr = msg.sender;
        stackEmissionerAddr = msg.sender;
        //startTime = block.timestamp/WEEK*WEEK;
        _mint(ownerAddr, totalOpenSupply);
        initEmission();
    }

    /* ========== RESTRICTED FUNCTIONS ========== */

    function initEmission() private onlyByOwner {
        if(weekEmissionList[0] == 0 ){
            weekEmissionList[0] = firstWeekEmission;
        }
    }

    function setOwner(address addr_) external onlyByOwner {
        ownerAddr = addr_;
    }

    function setBoostEmissioner(address addr_) external onlyByOwner {
        boostEmissionerAddr = addr_;
    }

    function setStackEmissioner(address addr_) external onlyByOwner {
        stackEmissionerAddr = addr_;
    }

    function setStartTime(uint256 t_) external onlyByOwner {
        if(startTime == 0 ){
            startTime = t_ / WEEK * WEEK;
        }
    }

    function mint(address to_, uint256 amount_) external onlyByOwner {
        totalOpenSupply = totalOpenSupply + amount_;
        _mint(to_, amount_);
        emit Minted(msg.sender, to_, amount_, block.timestamp);
    }

    function generateWeekEmissions(uint256 _maxWeekNum) external onlyByOwner returns (bool) {

        require(_maxWeekNum <= emissionWeekCount, "target week num need <= emissionWeekCount");
        require(_maxWeekNum > lastWeekNum, "target week num need > last week num");

        uint256 lastWeekTotalAmount = weekEmissionList[lastWeekNum];
        for(uint i = lastWeekNum+1; i <= _maxWeekNum; i++){
            lastWeekTotalAmount =  lastWeekTotalAmount / WEEKLY_REDUCTION_RATE * decimalsBase;
            weekEmissionList[i] = lastWeekTotalAmount;
        }
        lastWeekNum = _maxWeekNum;
        return true;
    }

    /* ========== INTERNAL FUNCTIONS ========== */

    function currentWeekNum() internal view returns (uint256) {
        return targetWeekNum(block.timestamp);
    }

    function targetWeekNum(uint256 t_) internal view returns (uint256) {
        require(startTime > 0, "Emissions not started");
        require(t_ >= startTime, "week time need >= start time");

        uint256 offset_time = t_.sub(startTime, "ERC20: time error");

        return uint256(offset_time / WEEK);
    }

    function getChainId() internal view returns (uint) {
        uint256 chainId;
        assembly { chainId := chainid() }
        return chainId;
    }


    /* ========== EXTERNAL FUNCTIONS ========== */

    function weekAvailableSupply(uint256 t_) external view returns (uint256) {
        return weekEmissionList[targetWeekNum(t_)];
    }


    /* ========== EVENTS ========== */

    // Track minted
    event Minted(address indexed from, address indexed to, uint256 amount,  uint256 mintTime);

}