// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "contracts/Citizens.sol";

contract SocietyBlock {

    bool public isLdaApproved ;
    uint public totalProperties = 0  ;
    uint public currentCountProperties = 0 ;
    address public govermentAuthority = 0xd9145CCE52D386f254917e481eB44e9943F39138;
    address public landInspectorContract = 0xd9145CCE52D386f254917e481eB44e9943F39138;
    address public CitizenContract = 0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99  ;
    address public highcourt = 0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99  ;


    struct Property {
    bool exists;
    // address inspectorAddress;
    uint sharesLeft;
    bool stay;
    // uint transferRequestsCount ;
    }

    constructor() {
        landInspectorContract = msg.sender ;
        govermentAuthority = msg.sender ;
    }

    modifier isGovermentAuthority() {
        require(msg.sender == govermentAuthority, "Only Goverment Authority");
        _;
    }

    modifier isLandInspector() {
        require(msg.sender == landInspectorContract, "Only LandInspector");
        _;
    }

    modifier isCitizenContract () {
        require(msg.sender == CitizenContract , "Only a valid Citizen");
        _;
    }
    modifier isHighCourt() {
        require(msg.sender == highcourt , "Only HighCourt");
        _;
    }
    mapping(uint => Property ) public  properties ;

    event PrpertyTransactionRecord(uint indexed PropertyId ,  uint indexed BuyerCnic , uint indexed SellerCnic , uint SharesAmount , uint Prize , uint Time );
// -------------------------------------------------------------------------------------


    function approve(address _blockAddress , uint _checkPropertiesAmount) public isGovermentAuthority {
        require(currentCountProperties <= _checkPropertiesAmount , "Amount of total properties is grater");
        require(address(this) == _blockAddress , "Wrong contract");
        isLdaApproved = true ;
    }

    function increaseProperties(address _blockAddress, uint _addAmount) public isGovermentAuthority {
        require(_addAmount > 0 , "Amount must be grater then zero");
        require(address(this) == _blockAddress , "Wrong contract");
        totalProperties = totalProperties + _addAmount;
    }

    function changeAdminsContract( address _newcontractAddress) public {

        landInspectorContract = _newcontractAddress ;
    }

event AddNewPropertyLog(uint indexed PropertyId , address indexed AddByInspector , uint Time);

function addNewProperty(uint _propertyId , address _inspector) external {
    require (msg.sender == landInspectorContract , "You are unauthorized");
    require(currentCountProperties < totalProperties , "Limit exceeded");
    require(properties[_propertyId].exists == false  ,"Property already exists");
        properties[_propertyId].sharesLeft = 100;
        properties[_propertyId].exists = true;
        currentCountProperties = currentCountProperties + 1;
        emit AddNewPropertyLog(_propertyId , _inspector , block.timestamp);
}
}

