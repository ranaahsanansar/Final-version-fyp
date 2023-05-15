// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "contracts/OwnerShip.sol";
import "contracts/Citizens.sol";

contract Highcourt {
    address admin;

    constructor(address _admin) {
        admin = _admin;
    }

    modifier isAdmin() {
        require(msg.sender == admin, "Only Admin can do this");
        _;
    }

    function chagneAdmin(address _newAdmin) external {
        admin = _newAdmin;
    }

    function generateReverseCase(
        address _soceityBlockAddress,
        uint256 _propertyId,
        uint256 _caseNumber,
        uint256 _cutFrom,
        uint256 _addTo,
        uint256 _amountOfShares,
        uint256 OTPCode
    ) external isAdmin {
        OwnerShip obj;
        obj = OwnerShip(_soceityBlockAddress);
        obj.generateReverseCase(
            _propertyId,
            _caseNumber,
            _cutFrom,
            _addTo,
            _amountOfShares,
            OTPCode
        );
    }

    function stayOnProperty(address _societyBlockAddress, uint256 _propertyId)
        external
    {
        OwnerShip obj;
        obj = OwnerShip(_societyBlockAddress);
        obj.stayOnProperty(_propertyId);
    }
}
