// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "contracts/Citizens.sol";

import "contracts/Parkview.sol";

contract OwnerShip is SocietyBlock {
    constructor(
        address _goverment,
        address _highcourt,
        address _landInspectorContract,
        address _citizenContract
    ) {
        govermentAuthority = _goverment;
        highcourt = _highcourt;
        landInspectorContract = _landInspectorContract;
        CitizenContract = _citizenContract;
    }

    struct shareHoldersStruct {
        address shareholdersAddress;
        uint256 shares;
        uint256 time;
    }

    struct PropertyShares {
        uint256 persentageSum;
        uint256 totalShareholders;
        uint256[] shareholdersCnicArray;
        mapping(uint256 => shareHoldersStruct) shareholders;
    }

    mapping(uint256 => PropertyShares) public shareRecords;

    event SellNewPropertyLog(
        uint256 indexed PropertyId,
        uint256 BuyerCnic,
        uint256 Shares,
        uint256 AmountOfPropertyCoins,
        address indexed InspectorAddress,
        uint256 Time
    );

    function changeGovermentAuthority(address _newAddress) public {
        require(msg.sender == govermentAuthority, "Unauthorized");
        govermentAuthority = _newAddress;
    }

    function sellNewProperty(
        uint256 _propertyId,
        uint256 _cnic,
        uint256 _sharesPercentage,
        uint256 _propertyTokensAmount,
        address _inspectorAddress
    ) public payable isLandInspector {
        require(
            properties[_propertyId].stay == false,
            "This property is restricted"
        );
        require(
            _sharesPercentage > 0 &&
                _sharesPercentage <= 100 &&
                (shareRecords[_propertyId].persentageSum + _sharesPercentage) <=
                100,
            "Percentages are not valid"
        );
        require(isLdaApproved == true, "Not approved by LDA");
        require(
            properties[_propertyId].exists,
            "Property not exist is Society"
        );
        Citizens obj;
        obj = Citizens(CitizenContract);
        require(obj.getCitizenIsAlive(_cnic), "Citizen not valid");
        require(obj.getCitizenIsApproved(_cnic), "Citizen is not apprved");
        address _citizenWallet = obj.getCititzenWallet(_cnic);

        if (shareRecords[_propertyId].shareholders[_cnic].shares == 0) {
            shareRecords[_propertyId].totalShareholders++;
            shareRecords[_propertyId].shareholdersCnicArray.push(_cnic);
        }
        shareRecords[_propertyId]
            .shareholders[_cnic]
            .shareholdersAddress = _citizenWallet;
        shareRecords[_propertyId]
            .shareholders[_cnic]
            .shares += _sharesPercentage;
        shareRecords[_propertyId].shareholders[_cnic].time = block.timestamp;
        // shareRecords[_propertyId].persentageSum = shareRecords[_propertyId].persentageSum + sharesAmount ;
        shareRecords[_propertyId].persentageSum += _sharesPercentage;
        // citizensStakedTokens[_citizenWallet] = citizensStakedTokens[_citizenWallet] - propertyTokensAmount ;
        // properties[_propertyId].inspectorAddress = _inspectorAddress;
        properties[_propertyId].sharesLeft -= _sharesPercentage;

        emit SellNewPropertyLog(
            _propertyId,
            _cnic,
            _sharesPercentage,
            _propertyTokensAmount,
            _inspectorAddress,
            block.timestamp
        );
    }

    //-----------------------------

    struct RequestTransferDetails {
        uint256 ownerCnic;
        uint256 buyerCnic;
        uint256 totalPrice;
        uint256 transferSharesAmount;
        address buyerWallet;
        bool buyerSignature;
    }

    struct RequestStruct {
        uint256 requestsCount;
        mapping(uint256 => RequestTransferDetails) requestDetailsArray;
    }
    mapping(uint256 => RequestStruct) private transferRequests;

    //-----------------------------

    function signatureForBuyer(
        uint256 _propertyId,
        uint256 _ownerCnic,
        uint256 _sharesAmount,
        uint256 _requestNumber
    ) public {
        require(
            transferRequests[_propertyId]
                .requestDetailsArray[_requestNumber]
                .buyerWallet == msg.sender,
            "This request is not belongs to you"
        );
        require(
            transferRequests[_propertyId]
                .requestDetailsArray[_requestNumber]
                .transferSharesAmount == _sharesAmount,
            "Wrong Shares Amount"
        );
        require(
            transferRequests[_propertyId]
                .requestDetailsArray[_requestNumber]
                .ownerCnic == _ownerCnic,
            "Owner Cnic wrong "
        );

        transferRequests[_propertyId]
            .requestDetailsArray[_requestNumber]
            .buyerSignature = true;
    }

    event TransactionRequestLogs(
        uint256 indexed PropertyId,
        uint256 indexed OwnerCnic,
        uint256 indexed BuyerCnic,
        uint256 Shares,
        uint256 PrizeOFOneShare,
        uint256 RequestNumber,
        uint256 Time
    );

    // Costumers
    function transferOwnerShipRequest(
        uint256 _OwnerCnic,
        uint256 _propertyId,
        uint256 _transferSharesAmount,
        uint256 _priceOfOneShare,
        uint256 _buyerCnic
    ) public {
        // Time limit for 5 mintues
        require(
            shareRecords[_propertyId].shareholders[_OwnerCnic].time + 300 <
                block.timestamp,
            "Time limit not full fill"
        );
        require(
            properties[_propertyId].stay == false,
            "This property is restricted by highcourt"
        );
        Citizens obj;
        obj = Citizens(CitizenContract);
        require(
            obj.getCitizenIsAlive(_OwnerCnic),
            "Owner is not allowed and restricted"
        );
        require(obj.getCitizenIsApproved(_OwnerCnic), "Owner must be approved");
        require(
            shareRecords[_propertyId]
                .shareholders[_OwnerCnic]
                .shareholdersAddress == msg.sender,
            "You are Unauthorized"
        );
        require(
            shareRecords[_propertyId].shareholders[_OwnerCnic].shares >=
                _transferSharesAmount,
            "Enough Shares"
        );

        require(obj.getCitizenIsApproved(_buyerCnic), "Buyer must be approved");
        require(obj.getCitizenIsAlive(_buyerCnic), "Buyer must be alive");

        uint256 _totalPrice = _priceOfOneShare * _transferSharesAmount;

        uint256 blockTime = block.timestamp;

        require(
            transferRequests[_propertyId]
                .requestDetailsArray[blockTime]
                .ownerCnic == 0,
            "Transaction revert, Please Try Again"
        );
        transferRequests[_propertyId].requestsCount++;
        transferRequests[_propertyId]
            .requestDetailsArray[blockTime]
            .ownerCnic = _OwnerCnic;
        transferRequests[_propertyId]
            .requestDetailsArray[blockTime]
            .buyerCnic = _buyerCnic;
        transferRequests[_propertyId]
            .requestDetailsArray[blockTime]
            .totalPrice = _totalPrice;
        transferRequests[_propertyId]
            .requestDetailsArray[blockTime]
            .transferSharesAmount = _transferSharesAmount;
        transferRequests[_propertyId]
            .requestDetailsArray[blockTime]
            .buyerWallet = obj.getCititzenWallet(_buyerCnic);

        emit TransactionRequestLogs(
            _propertyId,
            _OwnerCnic,
            _buyerCnic,
            _transferSharesAmount,
            _totalPrice,
            blockTime,
            block.timestamp
        );
    }

    event IndexOfRecordedTransaction(
        uint256 IndexIs,
        uint256 PropertyID,
        uint256 From,
        uint256 To,
        uint256 Shares
    );

    event ConfirmedTransactionRequestsLogs(
        uint256 indexed PropertyId,
        uint256 indexed RequestNumber,
        uint256 OwnerCnic,
        uint256 BuyerCnic,
        address indexed LandInspectorWallet
    );

    event TransactionRecordLogs(
        uint256 indexed PropertyID,
        uint256 indexed SellerCnic,
        uint256 indexed BuyerCnic,
        uint256 Shares,
        uint256 prize,
        uint256 Time
    );

    function approveTransferRequest(
        uint256 _propertyId,
        uint256 _requestNumber,
        uint256 _ownerCnic,
        uint256 _buyerCnic,
        address _landinspectorWallet
    ) public isLandInspector {
        require(
            _ownerCnic ==
                transferRequests[_propertyId]
                    .requestDetailsArray[_requestNumber]
                    .ownerCnic,
            "Owner Cnic Worng"
        );
        require(
            _buyerCnic ==
                transferRequests[_propertyId]
                    .requestDetailsArray[_requestNumber]
                    .buyerCnic,
            "Buyer Cnic Worng"
        );

        uint256 _shareAmount = transferRequests[_propertyId]
            .requestDetailsArray[_requestNumber]
            .transferSharesAmount;
        uint256 _totalPrice = transferRequests[_propertyId]
            .requestDetailsArray[_requestNumber]
            .totalPrice;
        require(
            shareRecords[_propertyId].shareholders[_ownerCnic].shares >=
                _shareAmount,
            "Enough Shares"
        );

        Citizens obj;
        obj = Citizens(CitizenContract);

        address _buyerWallet = obj.getCititzenWallet(_buyerCnic);
        // address _ownerWallet = obj.getCititzenWallet(_ownerCnic);

        if (shareRecords[_propertyId].shareholders[_buyerCnic].shares == 0) {
            shareRecords[_propertyId].totalShareholders++;
            shareRecords[_propertyId].shareholdersCnicArray.push(_buyerCnic);
        }

        shareRecords[_propertyId]
            .shareholders[_ownerCnic]
            .shares -= _shareAmount;
        shareRecords[_propertyId]
            .shareholders[_buyerCnic]
            .shares += _shareAmount;
        shareRecords[_propertyId]
            .shareholders[_buyerCnic]
            .shareholdersAddress = _buyerWallet;
        shareRecords[_propertyId].shareholders[_buyerCnic].time = block
            .timestamp;

        // Now Remove Extra Share Holders with zero shares
        if (shareRecords[_propertyId].shareholders[_ownerCnic].shares == 0) {
            delete shareRecords[_propertyId].shareholders[_ownerCnic];
            shareRecords[_propertyId].totalShareholders--;

            for (
                uint256 i;
                i < shareRecords[_propertyId].shareholdersCnicArray.length;
                i++
            ) {
                if (
                    shareRecords[_propertyId].shareholdersCnicArray[i] ==
                    _ownerCnic
                ) {
                    // delete shareRecords[_propertyId].shareholdersCnicArray[i];
                    shareRecords[_propertyId].shareholdersCnicArray[
                        i
                    ] = shareRecords[_propertyId].shareholdersCnicArray[
                        shareRecords[_propertyId].shareholdersCnicArray.length -
                            1
                    ];
                    // Check and Dry Run this Below Statment
                    shareRecords[_propertyId].shareholdersCnicArray.pop();
                    break;
                }
            }
        }
        transferRequests[_propertyId].requestsCount--;
        if (transferRequests[_propertyId].requestsCount == 0) {
            delete transferRequests[_propertyId];
            // delete properties[_propertyId].transferRequestsCount;
        }

        delete transferRequests[_propertyId].requestDetailsArray[
            _requestNumber
        ];

        // saveTransactionRecord(_propertyId , _ownerCnic , _buyerCnic , _shareAmount , _landinspectorWallet);

        emit TransactionRecordLogs(
            _propertyId,
            _ownerCnic,
            _buyerCnic,
            _shareAmount,
            _totalPrice,
            block.timestamp
        );

        emit ConfirmedTransactionRequestsLogs(
            _propertyId,
            _requestNumber,
            _ownerCnic,
            _buyerCnic,
            _landinspectorWallet
        );
    }

    function getDetailsOfShares(uint256 _propertyId, uint256 _cnic)
        public
        view
        returns (
            uint256 persentageSum,
            uint256 totalShareHolders,
            uint256[] memory shareHoldersArray,
            uint256 sharesOfThisPerson
        )
    {
        return (
            shareRecords[_propertyId].persentageSum,
            shareRecords[_propertyId].totalShareholders,
            shareRecords[_propertyId].shareholdersCnicArray,
            shareRecords[_propertyId].shareholders[_cnic].shares
        );
    }

    struct ReverseCaseDetails {
        uint256 cutFrom;
        uint256 addTo;
        uint256 sharesAmount;
        bool signatureForGovermentAuthority;
        uint256 OTP;
    }

    struct Cases {
        // uint[] caseNumbersArray ;
        mapping(uint256 => ReverseCaseDetails) detailsOfCasesArray;
    }

    mapping(uint256 => Cases) private reverseCasesArray;

    event ReverseCases(
        uint256 indexed PropertyId,
        uint256 indexed CaseNumber,
        uint256 CutFromCNIC,
        uint256 indexed AddToCNIC,
        uint256 AmountOfShares,
        uint256 Time
    );

    // isHighCourt require Function required
    function generateReverseCase(
        uint256 _propertyId,
        uint256 _caseNumber,
        uint256 _cutFrom,
        uint256 _addTo,
        uint256 _amountOfShares,
        uint256 OTPCode
    ) public {
        require(
            shareRecords[_propertyId].shareholders[_cutFrom].shares >=
                _amountOfShares,
            "Enough shares"
        );
        Citizens obj;
        obj = Citizens(CitizenContract);
        require(
            obj.getCitizenIsAlive(_addTo),
            "Second person is not allowed and restricted"
        );
        require(
            obj.getCitizenIsApproved(_addTo),
            "Second person must be approved"
        );

        // Make this Owner to Stay  Function

        ReverseCaseDetails memory reverseObj;
        reverseObj = ReverseCaseDetails(
            _cutFrom,
            _addTo,
            _amountOfShares,
            false,
            OTPCode
        );

        // reverseCasesArray[_propertyId].caseNumbersArray.push(_caseNumber);

        reverseCasesArray[_propertyId].detailsOfCasesArray[
            _caseNumber
        ] = reverseObj;

        emit ReverseCases(
            _propertyId,
            _caseNumber,
            _cutFrom,
            _addTo,
            _amountOfShares,
            block.timestamp
        );
    }

    // is Lda only
    function singnatureToReverseCase(
        uint256 _propertyId,
        uint256 _caseNumber,
        uint256 _verficationOTPCode,
        uint256 _newOTPCode
    ) public isGovermentAuthority {
        require(
            reverseCasesArray[_propertyId]
                .detailsOfCasesArray[_caseNumber]
                .OTP == _verficationOTPCode,
            "Invalid Information"
        );

        reverseCasesArray[_propertyId]
            .detailsOfCasesArray[_caseNumber]
            .signatureForGovermentAuthority = true;
        reverseCasesArray[_propertyId]
            .detailsOfCasesArray[_caseNumber]
            .OTP = _newOTPCode;
    }

    event ConfirmedReverseCaseLogs(
        uint256 indexed PropertyId,
        uint256 indexed CaseNumber,
        uint256 CutFromCnic,
        uint256 AddToCnic,
        uint256 Shares,
        address LandInspectorWallet,
        uint256 Time
    );

    // For LandInspector
    function executeReverseCase(
        uint256 _propertyId,
        uint256 _caseNumber,
        uint256 _verficationOTPCode,
        address _landInspectorWallet
    ) public isLandInspector {
        require(
            reverseCasesArray[_propertyId]
                .detailsOfCasesArray[_caseNumber]
                .OTP == _verficationOTPCode,
            "Invalid Information"
        );
        uint256 _cutFrom = reverseCasesArray[_propertyId]
            .detailsOfCasesArray[_caseNumber]
            .cutFrom;
        uint256 _addTo = reverseCasesArray[_propertyId]
            .detailsOfCasesArray[_caseNumber]
            .addTo;
        uint256 _amountOfShares = reverseCasesArray[_propertyId]
            .detailsOfCasesArray[_caseNumber]
            .sharesAmount;

        Citizens obj;
        obj = Citizens(CitizenContract);

        address _secondPersonWallet = obj.getCititzenWallet(_addTo);

        if (shareRecords[_propertyId].shareholders[_addTo].shares == 0) {
            shareRecords[_propertyId].totalShareholders++;
            shareRecords[_propertyId].shareholdersCnicArray.push(_addTo);
        }

        shareRecords[_propertyId]
            .shareholders[_cutFrom]
            .shares -= _amountOfShares;
        shareRecords[_propertyId]
            .shareholders[_addTo]
            .shares += _amountOfShares;
        shareRecords[_propertyId]
            .shareholders[_addTo]
            .shareholdersAddress = _secondPersonWallet;
        shareRecords[_propertyId].shareholders[_addTo].time = block.timestamp;
        // Now Remove Extra Share Holders with zero shares
        if (shareRecords[_propertyId].shareholders[_cutFrom].shares == 0) {
            delete shareRecords[_propertyId].shareholders[_cutFrom];
            shareRecords[_propertyId].totalShareholders--;

            for (
                uint256 i;
                i < shareRecords[_propertyId].shareholdersCnicArray.length;
                i++
            ) {
                if (
                    shareRecords[_propertyId].shareholdersCnicArray[i] ==
                    _cutFrom
                ) {
                    // delete shareRecords[_propertyId].shareholdersCnicArray[i];
                    shareRecords[_propertyId].shareholdersCnicArray[
                        i
                    ] = shareRecords[_propertyId].shareholdersCnicArray[
                        shareRecords[_propertyId].shareholdersCnicArray.length -
                            1
                    ];
                    // Check and Dry Run this Below Statment
                    shareRecords[_propertyId].shareholdersCnicArray.pop();
                    break;
                }
            }
        }
        delete  reverseCasesArray[_propertyId];

        emit ConfirmedReverseCaseLogs(
            _propertyId,
            _caseNumber,
            _cutFrom,
            _addTo,
            _amountOfShares,
            _landInspectorWallet,
            block.timestamp
        );
    }

    function stayOnProperty(uint256 _propertyId) external isHighCourt {
        properties[_propertyId].stay = true;
    }
}
