// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "contracts/Parkview.sol";
import "contracts/OwnerShip.sol"; 

contract LandInspector {
    address govermentAuthority;

    mapping(string => address) private SocietyBlocksArray;

    constructor(address _govermentAuthority) {
        govermentAuthority = _govermentAuthority;
    }

    struct Landinspector {
        uint256 ID;
        bool status;
    }

    mapping(address => Landinspector) private AdminsArray;

    modifier isGovermentAuthority() {
        require(msg.sender == govermentAuthority, "Unauthorized!");
        _;
    }

    modifier isLandInspector() {
        require(AdminsArray[msg.sender].status, "Unauthorized!");
        _;
    }

    // internal Functions

    event addLandInspectorLogs(
        address indexed LandInspectorWallet,
        uint256 indexed ID,
        uint256 time
    );

    function addLandInspector(address _landInspectorWallet, uint256 _id)
        public
        isGovermentAuthority
    {
        AdminsArray[_landInspectorWallet].ID = _id;
        AdminsArray[_landInspectorWallet].status = true;
        emit addLandInspectorLogs(_landInspectorWallet, _id, block.timestamp);
    }

    event removeLandInspectorLogs(
        address indexed LandInspectorWallet,
        uint256 indexed ID,
        uint256 time
    );

    function removeLandInspector(address _landInspectorWallet, uint256 _id)
        public
        isGovermentAuthority
    {
        require(
            _id == AdminsArray[_landInspectorWallet].ID,
            "Wrong Inspector ID"
        );
        AdminsArray[_landInspectorWallet].status = false;
        emit removeLandInspectorLogs(
            _landInspectorWallet,
            _id,
            block.timestamp
        );
    }

    event addSocietyBlockLogs(
        address ContractAddress,
        string Name,
        uint256 time
    );

    function addSocietyBlock(address _contractAddress, string memory _name)
        public
        isGovermentAuthority
    {
        SocietyBlocksArray[_name] = _contractAddress;
        emit addSocietyBlockLogs(_contractAddress, _name, block.timestamp);
    }

    // external Function

    function addNewProperty(uint256 _propertyId, string memory _societyName)
        public
        isLandInspector
    {
        SocietyBlock obj;
        obj = SocietyBlock(SocietyBlocksArray[_societyName]);
        obj.addNewProperty(_propertyId, msg.sender);
    }

    function transferNewProperty(
        uint256 _propertyId,
        uint256 _cnic,
        uint256 _sharesPercentage,
        uint256 _propertyTokensAmount,
        string memory _areaName
    ) public isLandInspector {
        OwnerShip obj;
        obj = OwnerShip(SocietyBlocksArray[_areaName]);
        obj.sellNewProperty(
            _propertyId,
            _cnic,
            _sharesPercentage,
            _propertyTokensAmount,
            msg.sender
        );
    }

    function executeReverseCase(
        address _societyBlockAddress,
        uint256 _propertyId,
        uint256 _caseNumber,
        uint256 _verficationOTPCode
    ) external isLandInspector {
        OwnerShip obj;
        obj = OwnerShip(_societyBlockAddress);
        obj.executeReverseCase(
            _propertyId,
            _caseNumber,
            _verficationOTPCode,
            msg.sender
        );
    }

    function approveTransferRequest(
        address _societyBlockAddress,
        uint256 _propertyId,
        uint256 _requestNumber,
        uint256 _ownerCnic,
        uint256 _buyerCnic
    ) external isLandInspector {
        OwnerShip obj;
        obj = OwnerShip(_societyBlockAddress);
        obj.approveTransferRequest(
            _propertyId,
            _requestNumber,
            _ownerCnic,
            _buyerCnic,
            msg.sender
        );
    }
}
