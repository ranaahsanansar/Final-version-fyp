// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "contracts/OwnerShip.sol";
import "contracts/Citizens.sol";
import "contracts/LandInspector.sol";

contract GovermentAuthority {
    address chairman;

    struct Admin {
        uint256 ID;
        bool status;
    }

    mapping(address => Admin) private AdminsArray;

    mapping(string => address) private CitizensContracts;

    modifier isAdmin() {
        require(
            AdminsArray[msg.sender].status,
            "Only Admins can do this operation"
        );
        _;
    }

    modifier isChairman() {
        require(msg.sender == chairman, "Only Chairman can do this operation");
        _;
    }

    constructor() {
        chairman = msg.sender;
    }

    // Internal Operations
    event AdminsLogs(
        address indexed AdminWallet,
        uint256 indexed ID,
        bool Status,
        uint256 TimeStamp
    );

    function addAdmins(address _adminWallet, uint256 _adminId)
        public
        isChairman
    {
        AdminsArray[_adminWallet].ID = _adminId;
        AdminsArray[_adminWallet].status = true;
        emit AdminsLogs(_adminWallet, _adminId, true, block.timestamp);
    }

    function removeAdmins(address _adminWallet) public isChairman {
        AdminsArray[_adminWallet].status = false;
        emit AdminsLogs(
            _adminWallet,
            AdminsArray[_adminWallet].ID,
            false,
            block.timestamp
        );
    }

    event citizensContractsLogs(
        address indexed ContractAddress,
        string indexed Name,
        uint256 Time
    );

    function addCitizenContract(address _contractAddress, string memory _name)
        public
        isChairman
    {
        CitizensContracts[_name] = _contractAddress;
        emit citizensContractsLogs(_contractAddress, _name, block.timestamp);
    }

    // ---------------------------------
    // ParkView Contracts Functions
    // ---------------------------------------

    event societyApprovalLogs(
        address indexed SocietyAddress,
        uint256 indexed AdminID,
        uint256 PropertiesCount
    );

    function approveSociety(address _blockAddress, uint256 _propertiesCount)
        public
        isAdmin
    {
        OwnerShip obj;
        obj = OwnerShip(_blockAddress);
        obj.approve(_blockAddress, _propertiesCount);
        emit societyApprovalLogs(
            _blockAddress,
            AdminsArray[msg.sender].ID,
            _propertiesCount
        );
    }

    event increasePropertiesLogs(
        address indexed SocietyAddress,
        uint256 indexed AdminID,
        uint256 Amount
    );

    function increaseProperties(address _blockAddress, uint256 _addAmount)
        public
        isAdmin
    {
        OwnerShip obj;
        obj = OwnerShip(_blockAddress);
        obj.increaseProperties(_blockAddress, _addAmount);
        emit increasePropertiesLogs(
            _blockAddress,
            AdminsArray[msg.sender].ID,
            _addAmount
        );
    }

    function chagneAdminsContract(
        address _societyBlockAddress,
        address _newAddress
    ) external isChairman {
        OwnerShip obj;
        obj = OwnerShip(_societyBlockAddress);
        obj.changeAdminsContract(_newAddress);
    }

    function signatureToReverse( address _SocietyBlockAddress ,  uint256 _propertyId,
        uint256 _caseNumber,
        uint256 _verficationOTPCode,
        uint256 _newOTPCode) public isAdmin  {
        OwnerShip obj;
        obj = OwnerShip(_SocietyBlockAddress);
        obj.singnatureToReverseCase(_propertyId, _caseNumber, _verficationOTPCode, _newOTPCode);
    }


    // ---------------------------------
    // Citizen Contracts Functions
    // ---------------------------------------
    event approveCitizenLogs(
        uint256 indexed CNIC,
        address WalletAddress,
        string indexed CityName,
        uint256 indexed AddminId,
        uint256 Time
    );
    event rejectCitizenLogs(
        uint256 indexed CNIC,
        string indexed CityName,
        uint256 indexed AddminId,
        uint256 Time
    );

    function approveCitizen(
        uint256 _CNIC,
        address _walletAddress,
        string memory _cityName
    ) public isAdmin {
        Citizens obj;
        obj = Citizens(CitizensContracts[_cityName]);
        obj.approveCitizen(_CNIC, _walletAddress);
        emit approveCitizenLogs(
            _CNIC,
            _walletAddress,
            _cityName,
            AdminsArray[msg.sender].ID,
            block.timestamp
        );
    }

    function rejectCitizen(uint256 _CNIC, string memory _cityName)
        public
        isAdmin
    {
        Citizens obj;
        obj = Citizens(CitizensContracts[_cityName]);
        obj.rejectCititzenRequest(_CNIC);
        emit rejectCitizenLogs(
            _CNIC,
            _cityName,
            AdminsArray[msg.sender].ID,
            block.timestamp
        );
    }

    // ---------------------------------
    // LandInspector Contracts Functions
    // ---------------------------------------

    function addlandInspector(
        address _inspectorAddress,
        uint256 _id,
        address _contractAddress
    ) external isAdmin {
        LandInspector obj;
        obj = LandInspector(_contractAddress);
        obj.addLandInspector(_inspectorAddress, _id);
    }

    function removeLandInspector(
        address _inspectorAddress,
        uint256 _id,
        address _contractAddress
    ) external isAdmin {
        LandInspector obj;
        obj = LandInspector(_contractAddress);
        obj.removeLandInspector(_inspectorAddress, _id);
    }

    function asingSocietyToLandInspector(
        address _societyAddress,
        address _contractAddressOfLandInspector,
        string memory _name
    ) external isAdmin {
        LandInspector obj;
        obj = LandInspector(_contractAddressOfLandInspector);
        obj.addSocietyBlock(_societyAddress, _name);
    }

    function declareDeath(address _cityContract ,  uint _CNIC) external isAdmin  {
        Citizens obj;
        obj = Citizens(_cityContract);
        obj.declareDeath(_CNIC);
    }

}