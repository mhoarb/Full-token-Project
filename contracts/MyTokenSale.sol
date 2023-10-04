pragma solidity 0.6.1;
import "./Crowdsale.sol";
import "./KycContract.sol";

contract MyTokenSale is Crowdsale {

    KycContract Kyc;
    constructor(
        uint256 rate,    // rate in TKNbits
        address payable wallet,
        IERC20 token,
        KycContract _Kyc
    )
        Crowdsale(rate, wallet, token)
        public
    {
        Kyc = _Kyc;

    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override{
        super._postValidatePurchase(beneficiary,weiAmount);
        require(Kyc.KycCompleted(msg.sender), "Kyc not completed , purchase not allowed" );
    }
}