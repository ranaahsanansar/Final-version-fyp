
    const [flagNewProTable, setFlagNewProTable] = useState(false)
    function createReqTableDat(id, seller , buyer , shares , price){
        return {id, seller , buyer , shares , price}
    }
      
      setFlagTransReq(false)


        const filtrReq = getContractData.filters.TransactionRequestLogs(null , actualData.cnic)
        const reqResult = await getContractData.queryFilter(filtrReq)

        
        newPropertyTableRows.map((i)=>{
            newPropertyTableRows.pop()
        })
        // uint256 indexed PropertyId,
        // uint256 indexed OwnerCnic,
        // uint256 indexed BuyerCnic,
        // uint256 Shares,
        // uint256 PrizeOFOneShare,
        // uint256 Time
        reqResult.map((item) => {
            let hexaId = item.args[0]
            // console.log(hexaId.toString())
            // let id = hexaId.toString()
            // console.log(id)
            let hexaSellerCnic = item.args[1]
            // let cnic = hexaCnic.toString()
            let hexaBuyerCnic = item.args[2]
            let hexaShare = item.args[3]
            let hexaPrice = item.args[4]
            // let shares = hexaShares.toString()
            console.log(createReqTableDat(hexaId.toString(), hexaSellerCnic.toString(), hexaBuyerCnic.toString() , hexaShare.toString()  , hexaPrice.toString()))

            reqTableRows.push(createReqTableDat(hexaId.toString(), hexaSellerCnic.toString(), hexaBuyerCnic.toString() , hexaShare.toString()  , hexaPrice.toString()))
        })

        // console.log(newPropertyTableRows);
        setFlagTransReq(true);
        


        {
            flagTransReq ? (<><Typography fontSize='18px' fontWeight='bold' > Requests</Typography>
                <TableComponents key="Property Shares" columsArray={reqTableColums} rowsArray={reqTableRows} /></>) : ""
        }