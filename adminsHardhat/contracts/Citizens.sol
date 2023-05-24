// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "contracts/Parkview.sol";

contract Citizens{ 

    address private govAuthority;
    address private highCourt;


    constructor (address _goverment , address _highcourt ) {
        govAuthority = _goverment;
        highCourt = _highcourt;
    }

    struct CitizenStructure {
        address walletAddress;
        bool isAlive;
        bool isApproved ;
        bool reTry;
        bool stay;
    }
    mapping (uint => CitizenStructure) private citizensArray;

    // struct Successor {
    //     address successorWallet;
    //     uint tokens;
    //     uint OTPCode;
    //     address adminWallet;
    //     uint OTPAttempts;
    // }


    modifier isGovermentAuthority(){
        require(msg.sender == govAuthority , "Only Goverment Authority is allowed");
        _;
    }
  
    modifier isHighCourt(){
        require(msg.sender == highCourt , "Only High court is allowed");
        _;
    }

    function getCitizenIsAlive(uint _cnic) public view returns(bool isAlliveStatus){
        return citizensArray[_cnic].isAlive;
    }

    function getCitizenIsApproved(uint _cnic) public view returns(bool isApprovedStatus){
        return citizensArray[_cnic].isApproved;
    }

    function getCititzenWallet(uint _cnic) public view returns(address walletAddress){
        return citizensArray[_cnic].walletAddress;
    }


    function newCitizenRequest(uint _CNIC ) public {
        require(citizensArray[_CNIC].isApproved == false , "You are already exists.");
        require(citizensArray[_CNIC].reTry == false , "You are in waiting List");
        citizensArray[_CNIC].reTry = true ;
        citizensArray[_CNIC].walletAddress = msg.sender ;
    }

    // Incomplete without XiSys Contract -----------------
    function approveCitizen(uint _CNIC , address _walletAddress) public isGovermentAuthority {
        require (citizensArray[_CNIC].reTry , "There is no request for that Person");
        require(citizensArray[_CNIC].isAlive == false , "Citizen is alredy approved");
        require(citizensArray[_CNIC].isApproved == false , "Citizen is alredy approved");
        require (citizensArray[_CNIC].walletAddress == _walletAddress , "Wrong wallet Address");
        citizensArray[_CNIC].isAlive = true;
        citizensArray[_CNIC].isApproved = true;
    }
    // Incomplete without XiSys Contract -----------------
    function rejectCititzenRequest(uint _CNIC) public isGovermentAuthority{
        require (citizensArray[_CNIC].reTry , "There is no request for that Person");
        require(citizensArray[_CNIC].isAlive == false , "Citizen is alredy approved");
        require(citizensArray[_CNIC].isApproved == false , "Citizen is alredy approved");
        delete citizensArray[_CNIC];
    }

    // Incomplete without Nadra Contract --------------------------------
    function declareDeath(uint _CNIC ) public isGovermentAuthority {
        citizensArray[_CNIC].isAlive = false ;
    }


    event StayOnCitizenLogs(uint Cnic , bool Status);
    function RemoveStayOnCitizen(uint _CNIC) external isHighCourt {
        citizensArray[_CNIC].stay = false ;
        emit StayOnCitizenLogs(_CNIC, false);
    }

    function stayOnCitizen(uint _CNIC) external isHighCourt {
        citizensArray[_CNIC].stay = true ;
        emit StayOnCitizenLogs(_CNIC, true);

    }

}