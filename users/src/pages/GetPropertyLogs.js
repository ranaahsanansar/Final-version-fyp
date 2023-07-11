import {
    Alert,
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";

import ownerShipContract from '../artifacts/contracts/OwnerShip.sol/OwnerShip.json'

import { ethers } from "ethers";
import { nodeProviderUrl } from "../dataVariables";
import TableComponents from "../components/TableComponents";

import { getAllDistricURL, getAllProvienceURL, getAreaNameURL, getAreaURL, getContractURL, getSocietyURL, landInspectorContractAddress, govermentAuthorityContractAddress } from "../dataVariables";
import { useEffect } from "react";

const GetPropertyLogs = () => {

    const ownersTableColums = [
        { id: 'id', label: 'Sr.', minWidth: 170 },
        { id: 'owner', label: 'CNIC', minWidth: 250 }
    ]

    function createOwnerTableRow(id, owner) {
        return { id, owner }
    }

    const [ownerTableRows, setOwnerTableRows] = useState([]);
    const [flagOwnerTable, setFlagOwnerTable] = useState(false);

    const [sharesOwn, setSharesOwn] = useState("none");


    const [formData, setFormData] = useState({
        propertyId: "",
        cnic: ""
    });

    const [formErrors, setFormErrors] = useState({
        propertyId: "",
        cnic: ""
    });

    const validateForm = () => {
        let valid = true;
        const errors = {};

        if (formData.propertyId == "") {
            errors.propertyId = "Property ID is required";
            valid = false;
        } else if (formData.propertyId < 1) {
            errors.propertyId = "ID must not be less then 1";
            valid = false;
        }

        if (formData.cnic == "") {
            formData.cnic = 0;
        }

        let checkValidID = formData.propertyId.toString();
        if (checkValidID.length != 12) {
            errors.propertyId = "ID must be valid 12 digits Uniqe Identification number";
            valid = false;
        }

        let checkCnic = formData.cnic.toString();
        if(formData.cnic != 0 ){
            if (checkCnic.length != 13 ) {
            errors.cnic = "CNIC must be a valid"
            valid = false;
        }
        }
        

        setFormErrors(errors);

        return valid;
    };
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }));
    };


    const [areaOptions, setAreaOptions] = useState([])
    const [provinceOptions, setPropvinceOptions] = useState([]);
    const [districOptions, setDistricOptions] = useState([]);
    const [societyOtpions, setSocietyOptions] = useState([]);

    const [areaName, setAreaName] = useState("none");




    const newPropertyTableColumns = [
        { id: "id", label: "Property ID", minWidth: 170 },
        { id: "cnic", label: "Cnic", minWidth: 100 },
        { id: "shares", label: "Shares", minWidth: 100 },
    ];

    const reqTableColums = [
        { id: "id", label: "Property ID", minWidth: 170 },
        { id: "seller", label: "Seller", minWidth: 100 },
        { id: "buyer", label: "Buyer", minWidth: 100 },
        { id: "shares", label: "Shares", minWidth: 100 },
        { id: "price", label: "Price", minWidth: 100 },
    ];

    function createTransactionRows(id, seller, buyer, shares, price) {
        return { id, seller, buyer, shares, price };
    }



    const [newPropertyTableRows, setNewPropertyTableRows] = useState([])
    const [reqTableRows, setReqTableRows] = useState([])
    const [ownerTnxRows, setOwnerTnxRows] = useState([]);
    const [distric, setDistric] = useState('none');
    const [province, setProvince] = useState('none');
    const [society, setSociety] = useState('none');
    const [block, setBlock] = useState('none');
    const [propertyId, setPropertyId] = useState('');
    const [contractAddress, setContractAddress] = useState('');
    const [percentage, setPercentage] = useState(20)
    const [remainig, setRemaining] = useState(80)
    const [flagChart, setFlagChart] = useState(true)



    const handleChangeProvience = (event) => {
        setProvince(event.target.value);

        const fetchData = async () => {
            let url = getAllDistricURL + event.target.value;

            const data = await fetch(url);


            const json = await data.json();
            setDistricOptions(json)
        }
        fetchData();

    };

    const handleChangeDistric = (event) => {

        setDistric(event.target.value);

        const fetchData = async () => {
            let url = getSocietyURL + event.target.value;

            const data = await fetch(url);



            const json = await data.json();
            setSocietyOptions(json)
        }
        fetchData();
    };

    const handleChangeSociety = (event) => {
        setSociety(event.target.value);
        const fetchData = async () => {
            let url = getAreaURL + event.target.value;
            const data = await fetch(url);


            const json = await data.json();
            setAreaOptions(json)
        }
        fetchData();
    };

    const handleChangeBlock = (event) => {
        setBlock(event.target.value);
        const fetchData = async () => {
            let url = getAreaNameURL + event.target.value;

            const data = await fetch(url);
            const json = await data.json();

            let _name = json.name;
            setAreaName(_name)
        }
        fetchData();

        const fetchContracts = async () => {
            let url = getContractURL + event.target.value;
            const data = await fetch(url);

            const json = await data.json();
            let _landInspector = json[0].areaContract
            console.log("Land")
            console.log(_landInspector)
            setContractAddress(_landInspector);
        }
        fetchContracts();
    };


    const hadnleChangeId = (event) => {
        setPropertyId(event.target.value)
    }



    function createReqTableData(id, seller, buyer, shares, price, reqNum) {
        return { id, seller, buyer, shares, price, reqNum }
    }




    const [flagNewProTable, setFlagNewProTable] = useState(false)
    const [flagReqTable, setFlagReqTable] = useState(false);

    const [flagOwnerTransaction, setFlagOwnerTransaction] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setPercentage(0)
        setFlagNewProTable(false)
        setFlagChart(false)



        if (validateForm() != true) {
            return
        }

        const actualData = {
            id: propertyId
        }

        const nodeProvider = new ethers.providers.JsonRpcProvider(
            nodeProviderUrl
        )

        const { ethereum } = window;

        let _contractAddress = contractAddress;
        const getContractData = new ethers.Contract(
            _contractAddress,
            ownerShipContract.abi,
            nodeProvider
        )


        // const filtr = getContractData.filters.SellNewPropertyLog(formData.propertyId)
        // console.log(filtr)

        // const dataResult = await getContractData.queryFilter(filtr)


        // newPropertyTableRows.map((i) => {
        //     newPropertyTableRows.pop()
        // })

        // newPropertyTableRows.splice(0, newPropertyTableRows.length);

        // dataResult.map((item) => {
        //     let hexaId = item.args[0]
        //     console.log(hexaId.toString())
        //     let hexaCnic = item.args[1]
        //     let hexaShares = item.args[2]
        //     let remaining = parseInt(hexaShares.toString()) - 100;
        //     console.log("Shares")
        //     console.log(hexaShares);
        //     console.log("Remaining ")

        //     console.log(remaining);
        //     setPercentage(parseInt(hexaShares.toString()));
        //     if (remaining < 0) {
        //         remaining = remaining * -1;
        //     }

        //     setRemaining(remaining)

        //     newPropertyTableRows.push(createNewPropertyData(hexaId.toString(), hexaCnic.toString(), hexaShares.toString()))
        // })

        // console.log(newPropertyTableRows);
        // setFlagNewProTable(true);
        // setFlagChart(true);


        // ------------------------------------------------

        setFlagOwnerTransaction(false);

        const filterOwnerTnx = getContractData.filters.TransactionRecordLogs(formData.propertyId, null, null)

        const ownerTnxResult = await getContractData.queryFilter(filterOwnerTnx);
        console.log("Ahsan")
        console.log(ownerTnxResult)

        ownerTnxRows.splice(0, ownerTnxRows.length);

        ownerTnxResult.map((item) => {
            let id = item.args[0].toString();
            let ownerCnic = item.args[1].toString();
            let buyerCnic = item.args[2].toString();
            let shares = item.args[3].toString();
            let price = item.args[4].toString();
            console.log("1")
            console.log(id)
            ownerTnxRows.push(createTransactionRows(id, ownerCnic, buyerCnic, shares, price))
        })

        setFlagOwnerTransaction(true);

        // -------------------------------------------
        setSharesOwn("none")
        setFlagOwnerTable(false)
        const result = await getContractData.getDetailsOfShares(formData.propertyId, formData.cnic)
        console.log(String(result.sharesOfThisPerson))
        if (formData.cnic == 0) {
            setSharesOwn('none')
        } else {
            setSharesOwn(String(result.sharesOfThisPerson))
        }

        let arrayOfOwners = result.shareHoldersArray
        // arrayOfOwners.map((item)=>{ console.log( String(item) ) })
        // listOfOwner = []
        // setOwnerTnxRows([])
        ownerTableRows.splice(0, ownerTableRows.length)

        arrayOfOwners.map((item, i) => {
            let itemData = String(item);
            // console.log(createOwnerTableRow(i , String(item) ))
            ownerTableRows.push(createOwnerTableRow(i + 1, String(item)))
            // console.log(i);
            // console.log(String(itemData));

        })
        setFlagOwnerTable(true)


    }

    useEffect(() => {
        var array;

        const fetchData = async () => {

            const data = await fetch(getAllProvienceURL);

            const json = await data.json();
            setPropvinceOptions(json)
        }
        fetchData()

    }, [])

    return (
        <Box
            sx={{ backgroundColor: 'white', padding: 2, borderRadius: 2, m: 2 }}

        >
            <Box
                component="form"
                noValidate
                sx={{ mt: 1 }}
                id="buyProperty-form"
            >
                <Typography variant="h6"
                    fontWeight="bold"
                    fontSize="large" mb={2} >Get Property Info</Typography>
                <Grid container spacing={2}>


                    <Grid item sm={12} xs={12} md={6} lg={6}>
                        <FormControl fullWidth>
                            <InputLabel id="province-label">Province</InputLabel>

                            <Select
                                fullWidth
                                required
                                labelId="province-label"
                                id="province"
                                value={province}
                                label="province"
                                onChange={handleChangeProvience}
                            >
                                <MenuItem value="none">None</MenuItem>

                                {
                                    provinceOptions.map((e) => {
                                        return (<MenuItem value={e._id}>{e.name}</MenuItem>)

                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item sm={12} xs={12} md={6} lg={6}>
                        <FormControl fullWidth>
                            <InputLabel id="distric-label">District</InputLabel>

                            <Select
                                fullWidth
                                required
                                labelId="distric-label"
                                id="distric"
                                value={distric}
                                label="Distric"
                                onChange={handleChangeDistric}
                            >

                                <MenuItem value="none">None</MenuItem>

                                {
                                    districOptions.map((e) => {

                                        return (<MenuItem value={e._id}>{e.name}</MenuItem>)

                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item sm={12} xs={12} md={6} lg={6}>
                        <FormControl fullWidth>
                            <InputLabel id="society-label">Society</InputLabel>

                            <Select
                                fullWidth
                                required
                                labelId="society-label"
                                id="society"
                                value={society}
                                label="society"
                                onChange={handleChangeSociety}
                            >
                                <MenuItem value="none">None</MenuItem>
                                {
                                    societyOtpions.map((e) => {

                                        return (<MenuItem value={e._id}>{e.name}</MenuItem>)

                                    })
                                }

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item sm={12} xs={12} md={6} lg={6}>
                        <FormControl fullWidth>
                            <InputLabel id="block-label">Block</InputLabel>

                            <Select
                                fullWidth
                                required
                                labelId="block-label"
                                id="block"
                                value={block}
                                label="block"
                                onChange={handleChangeBlock}
                            >
                                <MenuItem value="none">None</MenuItem>
                                {
                                    areaOptions.map((e) => {

                                        return (<MenuItem value={e._id}>{e.name}</MenuItem>)

                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item sm={12} xs={12} md={6} lg={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            id="propertyId"
                            name="propertyId"
                            label="Property ID"
                            type="number"
                            value={formData.propertyId}
                            onChange={handleChange}
                            inputProps={{ min: 0 }}
                            error={Boolean(formErrors.propertyId)}
                            helperText={formErrors.propertyId}
                        />
                    </Grid>

                    <Grid item sm={12} xs={12} md={6} lg={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="cnic"
                            name="cnic"
                            label="CNIC (Optional)"
                            type="number"
                            value={formData.cnic}
                            onChange={handleChange}
                            inputProps={{ min: 0 }}
                            error={Boolean(formErrors.cnic)}
                            helperText={formErrors.cnic}
                        />
                    </Grid>

                </Grid>
                {/* Submit Button  */}
                <Box textAlign="center">
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, px: 5, backgroundColor: "#F3E5AB", color: "black" }}
                        onClick={handleSubmit}
                    >
                        Fetch
                    </Button>
                </Box>



                {/* {
                    flagNewProTable ? (<><Typography fontSize='18px' mt={2} fontWeight='bold' >Inital Transactions of Property </Typography>
                        <TableComponents key="Property Shares" columsArray={newPropertyTableColumns} rowsArray={newPropertyTableRows} /></>) : "Noting to Show"
                } */}

                {
                    sharesOwn == "none" ? "" : (<Typography fontSize='18px' mt={2} fontWeight='bold' >Shares Own by selected CNIC = {sharesOwn} </Typography>)
                }

                {flagOwnerTable && (<><Typography fontSize='18px' mt={2} fontWeight='bold'  >List of Currect Owners </Typography><TableComponents key="owners" columsArray={ownersTableColums} rowsArray={ownerTableRows} /></>)}

                {
                    flagOwnerTransaction ? (
                        <>
                            <Typography fontSize='18px' fontWeight='bold' mt={2} >Selling Record</Typography>
                            <TableComponents key="request" columsArray={reqTableColums} rowsArray={ownerTnxRows} />
                        </>
                    ) : ""
                }
            </Box>
        </Box>

    )
}

export default GetPropertyLogs

