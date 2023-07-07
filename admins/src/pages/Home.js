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
import { useEffect, useState } from "react";

import ownerShipContract from '../artifacts/contracts/OwnerShip.sol/OwnerShip.json'
import nodeProviderUrl, { getAllDistricURL, getAllProvienceURL, getAreaNameURL, getAreaURL, getContractURL, getSocietyURL, landInspectorContractAddress, govermentAuthorityContractAddress } from "../dataVariables";

import { ethers } from "ethers";
import TableComponents from "../components/TableComponents";

const Home = () => {

    const [formData, setFormData] = useState({

        propertyId: ""
    });

    const [formErrors, setFormErrors] = useState({

        propertyId: ""
    });


    const validateForm = () => {
        let valid = true;
        const errors = {};

        if (formData.propertyId == "") {
            errors.propertyId = "Field is required";
            valid = false;
        } else if (formData.propertyId < 1) {
            errors.propertyId = "Value must not be less then 1";
            valid = false;
        }


        let checkValidId = formData.propertyId.toString();
        if (checkValidId.length != 12) {
            errors.propertyId = "ID must be valid 12 digits Uniqe Identification number";
            valid = false;
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

    const mintedPropertiesColumns = [
        { id: "id", label: "Property ID", minWidth: 100 },
        { id: "inspector", label: "Inspector Wallet", minWidth: 170 }
    ]

    const [newPropertyTableRows, setNewPropertyTableRows] = useState([])
    const [reqTableRows, setReqTableRows] = useState([])
    const [ownerTnxRows, setOwnerTnxRows] = useState([]);
    const [mintedPropRows, setMintedPropRows] = useState([])
    const [distric, setDistric] = useState('none');
    const [province, setProvince] = useState('none');
    const [society, setSociety] = useState('none');
    const [block, setBlock] = useState('none');
    const [propertyId, setPropertyId] = useState('');
    const [cnic, setCnic] = useState('');
    const [contractAddress, setContractAddress] = useState('');



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
            setContractAddress(_landInspector)
        }
        fetchContracts();


    };

    useEffect(() => {

        var array;

        const fetchData = async () => {

            const data = await fetch(getAllProvienceURL);

            const json = await data.json();
            setPropvinceOptions(json)
        }
        fetchData()

    }, [])

    const handleCnicChange = (event) => {
        setCnic(event.target.value)
    }

    const hadnleChangeId = (event) => {
        setPropertyId(event.target.value)
    }

    function createNewPropertyData(id, cnic, shares) {
        return { id, cnic, shares };
    }

    function createReqTableData(id, seller, buyer, shares, price) {
        return { id, seller, buyer, shares, price }
    }

    function createMintTableData(id, inspector) {
        return { id, inspector }
    }

    const [flagNewProTable, setFlagNewProTable] = useState(false)
    const [flagReqTable, setFlagReqTable] = useState(false);
    const [flagMintTable, setFlagMintTable] = useState(false);

    const [flagOwnerTransaction, setFlagOwnerTransaction] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!validateForm()){
            return;
        }
        setFlagNewProTable(false)

        const actualData = {
            id: propertyId,
            cnic: cnic
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

        const filtr = getContractData.filters.SellNewPropertyLog(actualData.id)
        const dataResult = await getContractData.queryFilter(filtr)


        newPropertyTableRows.map((i) => {
            newPropertyTableRows.pop()
        })

        newPropertyTableRows.splice(0, newPropertyTableRows.length);

        dataResult.map((item) => {
            let hexaId = item.args[0]
            console.log(hexaId.toString())
            let hexaCnic = item.args[1]
            let hexaShares = item.args[2]

            newPropertyTableRows.push(createNewPropertyData(hexaId.toString(), hexaCnic.toString(), hexaShares.toString()))
        })

        console.log(newPropertyTableRows);
        setFlagNewProTable(true);

        setFlagReqTable(false);

        const filterReq = getContractData.filters.TransactionRequestLogs(actualData.id)

        const reqResult = await getContractData.queryFilter(filterReq);



        reqTableRows.splice(0, reqTableRows.length);


        reqResult.map((item) => {
            let id = item.args[0].toString();
            let ownerCnic = item.args[1].toString();
            let buyerCnic = item.args[2].toString();
            let shares = item.args[3].toString();
            let prize = item.args[4].toString();

            reqTableRows.push(createReqTableData(id, ownerCnic, buyerCnic, shares, prize));

        })

        setFlagReqTable(true)


        setFlagOwnerTransaction(false);

        const filterOwnerTnx = getContractData.filters.TransactionRecordLogs(actualData.id)

        const ownerTnxResult = await getContractData.queryFilter(filterOwnerTnx);

        ownerTnxRows.splice(0, ownerTnxRows.length);

        ownerTnxResult.map((item) => {
            let id = item.args[0].toString();
            let ownerCnic = item.args[1].toString();
            let buyerCnic = item.args[2].toString();
            let shares = item.args[3].toString();
            let prize = item.args[4].toString();

            ownerTnxRows.push(createReqTableData(id, ownerCnic, buyerCnic, shares, prize));

        })

        setFlagOwnerTransaction(true);

        setFlagMintTable(false);

        const filterMintTnx = getContractData.filters.AddNewPropertyLog()

        const filterMintResult = await getContractData.queryFilter(filterMintTnx);

        mintedPropRows.splice(0, mintedPropRows.length);

        filterMintResult.map((item) => {
            let id = item.args[0].toString();
            let inspector = item.args[1].toString();

            mintedPropRows.push(createMintTableData(id, inspector))
        })

        setFlagMintTable(true);


    }
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
                    fontSize="large" mb={2} >Get Property Details</Typography>
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

                </Grid>
                <Box textAlign="center">
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, px: 5, backgroundColor: '#F3E5AB', color: 'black' }}
                        onClick={handleSubmit}
                    >
                        Fetch
                    </Button>
                </Box>
                
                {
                    flagNewProTable ? (<><Typography fontSize='18px' mt={2} fontWeight='bold' >Inital Transactions of Property </Typography>
                        <TableComponents key="Property Shares" columsArray={newPropertyTableColumns} rowsArray={newPropertyTableRows} /></>) : ""
                }
               
                {
                    flagOwnerTransaction ? (
                        <>
                            <Typography fontSize='18px' fontWeight='bold' mt={2} >Approved Transactions</Typography>
                            <TableComponents key="request" columsArray={reqTableColums} rowsArray={ownerTnxRows} />
                        </>
                    ) : ""
                }
            </Box>
        </Box>

    )
}

export default Home