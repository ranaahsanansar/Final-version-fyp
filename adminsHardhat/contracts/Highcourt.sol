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
        uint256 _amountOfShares
    ) external isAdmin returns (uint256 _otp) {
        OwnerShip obj;
        obj = OwnerShip(_soceityBlockAddress);
        return obj.generateReverseCase(
            _propertyId,
            _caseNumber,
            _cutFrom,
            _addTo,
            _amountOfShares
        );
    }

    function stayOnProperty(address _societyBlockAddress, uint256 _propertyId)
        external
    {
        OwnerShip obj;
        obj = OwnerShip(_societyBlockAddress);
        obj.stayOnProperty(_propertyId);
    }

    function removeStayOnProperty(address _societyBlockAddress, uint256 _propertyId)
        external
    {
        OwnerShip obj;
        obj = OwnerShip(_societyBlockAddress);
        obj.removeStayOnProperty(_propertyId);
    }

    function stayOnCitizen(address _citizenContractAddress , uint _cnic , bool _status) external isAdmin {
        Citizens obj ;
        obj = Citizens(_citizenContractAddress);
        if(_status){
            obj.stayOnCitizen(_cnic);
        }else{
            obj.RemoveStayOnCitizen(_cnic);
        }
        
    }
}
