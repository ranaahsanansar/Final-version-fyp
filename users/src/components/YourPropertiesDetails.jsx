
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
import TableComponents from "./TableComponents";
import Chart from "./ChartComponent";

import { getAllDistricURL, getAllProvienceURL, getAreaNameURL, getAreaURL, getContractURL, getSocietyURL, landInspectorContractAddress, govermentAuthorityContractAddress } from "../dataVariables";
import { useEffect } from "react";

const YourPropertiesDetails = () => {

    const [formData, setFormData] = useState({
        propertyId: "",
        ownerCNIC: "",
      });
    
      const [formErrors, setFormErrors] = useState({
        propertyId: "",
        ownerCNIC: "",
      });

      const validateForm = () => {
        let valid = true;
        const errors = {};
    
        if (formData.propertyId == "" ) {
          errors.propertyId = "Property ID is required";
          valid = false;
        }else if( formData.propertyId < 1){
          errors.propertyId = "ID must not be less then 1";
          valid = false;
        }

        let checkValidID = formData.propertyId.toString();
        if(checkValidID.length != 12){
            errors.propertyId = "ID must be valid 12 digits Uniqe Identification number";
          valid = false;
        }
    
        if (formData.ownerCNIC == "" ) {
          errors.ownerCNIC = "Owner CNIC is required";
          valid = false;
        }else if (formData.ownerCNIC < 1){
          errors.ownerCNIC = "Value must not be less then 1";
          valid = false;
        }

        let checkValidCnic = formData.ownerCNIC.toString();
        if(checkValidCnic.length != 13 ){
            errors.ownerCNIC = "Cnicn Must be Valid";
          valid = false;
        }
    
        // if (!formData.agree) {
        //   errors.agree = "You must agree to the terms and conditions";
        //   valid = false;
        // }
    
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
        { id: "reqNum", label: "Request Number", minWidth: 100 },
    ];

    const [newPropertyTableRows, setNewPropertyTableRows] = useState([])
    const [reqTableRows, setReqTableRows] = useState([])
    const [ownerTnxRows, setOwnerTnxRows] = useState([]);
    const [distric, setDistric] = useState('none');
    const [province, setProvince] = useState('none');
    const [society, setSociety] = useState('none');
    const [block, setBlock] = useState('none');
    const [propertyId, setPropertyId] = useState('');
    const [cnic, setCnic] = useState('');
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

    const handleCnicChange = (event) => {
        setCnic(event.target.value)
    }

    const hadnleChangeId = (event) => {
        setPropertyId(event.target.value)
    }

    function createNewPropertyData(id, cnic, shares) {
        return { id, cnic, shares };
    }

    function createReqTableData(id, seller, buyer, shares, price , reqNum) {
        return { id, seller, buyer, shares, price , reqNum }
    }



    const [flagNewProTable, setFlagNewProTable] = useState(false)
    const [flagReqTable, setFlagReqTable] = useState(false);

    const [flagOwnerTransaction, setFlagOwnerTransaction] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setPercentage(0)
        setFlagNewProTable(false)
        setFlagChart(false)

        if(validateForm() != true ){
            return
        }

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
            let remaining = parseInt(hexaShares.toString()) - 100;
            console.log("Shares")
            console.log(hexaShares);
            console.log("Remaining ")

            console.log(remaining);
            setPercentage(parseInt(hexaShares.toString()));
            if(remaining < 0 ){
                remaining = remaining * -1;
            }
            
            setRemaining(remaining)

            newPropertyTableRows.push(createNewPropertyData(hexaId.toString(), hexaCnic.toString(), hexaShares.toString()))
        })

        console.log(newPropertyTableRows);
        setFlagNewProTable(true);
        setFlagChart(true);

        // ------------------------------------------------------

        setFlagReqTable(false);

        const filterReq = getContractData.filters.TransactionRequestLogs(null, actualData.cnic, null)

        const reqResult = await getContractData.queryFilter(filterReq);
console.log("yo yo yo ")
        console.log(reqResult);

        reqTableRows.splice(0, reqTableRows.length);

        reqResult.map((item) => {
            let id = item.args[0].toString();
            let ownerCnic = item.args[1].toString();
            let buyerCnic = item.args[2].toString();
            let shares = item.args[3].toString();
            let prize = item.args[4].toString();
            let reqNum = item.args[6].toString();

            console.log("Data for request");
            console.log(reqNum);

            reqTableRows.push(createReqTableData(id, ownerCnic, buyerCnic, shares, prize , reqNum));

            // console.log(id);
        })

        setFlagReqTable(true)

        // ------------------------------------------------

        setFlagOwnerTransaction(false);

        const filterOwnerTnx = getContractData.filters.TransactionRecordLogs(actualData.id, null, null)

        const ownerTnxResult = await getContractData.queryFilter(filterOwnerTnx);
        console.log("Ahsan")
        console.log(ownerTnxResult)

        ownerTnxRows.splice(0, ownerTnxRows.length);

        ownerTnxResult.map((item) => {
            let id = item.args[0].toString();
            let ownerCnic = item.args[1].toString();
            let buyerCnic = item.args[2].toString();
            let shares = item.args[3].toString();
            let prize = item.args[4].toString();

            // ownerTnxRows.push(createReqTableData(id, ownerCnic, buyerCnic, shares, prize));

        })

        setFlagOwnerTransaction(true);
    }

    useEffect(() => {

        // provinceOptions.push({id: "2" , name: "Ahsan"})
        var array;

        const fetchData = async () => {

            const data = await fetch(getAllProvienceURL);

            const json = await data.json();
            setPropvinceOptions(json)
        }
        fetchData()
        // console.log(array);
        // setPropvinceOptions(array)
        // console.log(provinceOptions)

    }, [])

    return (
        <Box
            sx={{ backgroundColor: 'white', padding: 2, borderRadius: 2 }}

        >
            <Box
                component="form"
                noValidate
                sx={{ mt: 1 }}
                id="buyProperty-form"
            >
                <Typography variant="h6"
                    fontWeight="bold"
                    fontSize="large" mb={2} >Trace Your requests</Typography>
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
                                {/* <MenuItem value="punjab">punjab</MenuItem>
                  <MenuItem value="sindh">Karachi</MenuItem>
                  <MenuItem value="balochistan">Sialkot</MenuItem>
                  <MenuItem value="KPK">KPK</MenuItem> */}
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

                                {/* <MenuItem value="lahore">Lahore</MenuItem>
                  <MenuItem value="karachi">Karachi</MenuItem>
                  <MenuItem value="sialkot">Sialkot</MenuItem> */}
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

                                {/* <MenuItem value="park-view">Park View</MenuItem>
                  <MenuItem value="bahria">Bahria</MenuItem>
                  <MenuItem value="rehman-garden">Rehman Garden</MenuItem>
                  <MenuItem value="iqbal-town">Iqbal Town</MenuItem> */}
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
                                {/* <MenuItem value="bahria-1-A">A Block</MenuItem>
                  <MenuItem value="bahria">B Block</MenuItem>
                  <MenuItem value="rehman-garden">X Block</MenuItem>
                  <MenuItem value="iqbal-town">Y Block</MenuItem> */}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item sm={12} xs={12} md={6} lg={6}>
                        {/* <TextField
                            margin="normal"
                            fullWidth
                            required
                            id="propertyId"
                            name="propertyId"
                            label="Property ID"
                            type="number"
                            onChange={hadnleChangeId}
                        /> */}
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
                        {/* <TextField
                            margin="normal"
                            fullWidth
                            required
                            id="ownerCNIC"
                            name="ownerCNIC"
                            label="CNIC of Owner"
                            type="number"
                            onChange={handleCnicChange}
                        /> */}
                        <TextField
              margin="normal"
              fullWidth
              required
              id="ownerCNIC"
              name="ownerCNIC"
              label="Seller CNIC"
              type="number"
              value={formData.ownerCNIC}
              onChange={handleChange}
              inputProps={{ min: 0 }}
              error={Boolean(formErrors.ownerCNIC)}
              helperText={formErrors.ownerCNIC}
            />
                    </Grid>

                </Grid>
                {/* Submit Button  */}
                <Box textAlign="center">
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, px: 5 , backgroundColor: "#F3E5AB" , color: "black"}}
                        onClick={handleSubmit}
                    >
                        Fetch
                    </Button>
                </Box>
                {/* ---------------------------------------------------------------------- */}
                {/* {
                    flagChart ? (<Box bgcolor='white'  >
                        <Typography fontSize='18px' fontWeight='bold' mb={3} >Shares Sold</Typography>
                        <Chart percent={percentage} remaning={remainig} />
                    </Box>) : ""
                }
                <Typography>Sold: {percentage}% <Box sx={{ backgroundColor: "#0088FE", borderRadius: '5px' }} width="20px" height="10px" ></Box></Typography>
                <Typography>Remaning: {remainig}% <Box sx={{ backgroundColor: "#00C49F", borderRadius: '5px' }} width="20px" height="10px" ></Box></Typography>

                {
                    flagNewProTable ? (<><Typography fontSize='18px' mt={2} fontWeight='bold' >Inital Transactions of Property </Typography>
                        <TableComponents key="Property Shares" columsArray={newPropertyTableColumns} rowsArray={newPropertyTableRows} /></>) : ""
                } */}
                {
                    flagReqTable ? (
                        <>
                            <Typography fontSize='18px' fontWeight='bold' mt={2} >Requests of Owner</Typography>
                            <TableComponents key="request" columsArray={reqTableColums} rowsArray={reqTableRows} />
                        </>
                    ) : ""
                }
                {/* {
                    flagOwnerTransaction ? (
                        <>
                            <Typography fontSize='18px' fontWeight='bold' mt={2} >Ownership Transactions (You Bought)</Typography>
                            <TableComponents key="request" columsArray={reqTableColums} rowsArray={ownerTnxRows} />
                        </>
                    ) : ""
                } */}
            </Box>
        </Box>

    )
}

export default YourPropertiesDetails

