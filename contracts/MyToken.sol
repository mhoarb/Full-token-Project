pragma solidity 0.6.1;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("TeeBag USDT", "TBG" ) public {
        _mint(msg.sender, initialSupply);
    }
}