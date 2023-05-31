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

const YourPropertiesDetails = () => {

    const newPropertyTableColumns = [
        { id: "id", label: "Property ID", minWidth: 170 },
        { id: "cnic", label: "Cnic", minWidth: 100 },
        { id: "shares", label: "Shares", minWidth: 100 },
    ];

    const [newPropertyTableRows, setNewPropertyTableRows] = useState([])
    const [distric, setDistric] = useState('lahore');
    const [province, setProvince] = useState('punjab');
    const [society, setSociety] = useState('none');
    const [block, setBlock] = useState('park-view');
    const [propertyId, setPropertyId] = useState('');
    const [cnic, setCnic] = useState('');
    const [contractAddress, setContractAddress] = useState('');

    const handleChangeProvience = (event) => {
        setProvince(event.target.value);
    };
    const handleChangeDistric = (event) => {
        setDistric(event.target.value);
    };
    const handleChangeSociety = (event) => {
        setSociety(event.target.value);
    };
    const handleChangeBlock = (event) => {
        setBlock(event.target.value);
        // setLockContractAddress(ownerShipAddress);
        setContractAddress('0x70fefc19b5B632996377904f1Ba21897a3d7F0f3')
    };

    const hadnleChangeId = (event) => {
        setPropertyId(event.target.value)
    }

    function createNewPropertyData(id, cnic, shares) {
        return { id, cnic, shares };
    }

    const [flagNewProTable, setFlagNewProTable] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();

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

        
        newPropertyTableRows.map((i)=>{
            newPropertyTableRows.pop()
        })

        dataResult.map((item) => {
            let hexaId = item.args[0]
            console.log(hexaId.toString())
            // let id = hexaId.toString()
            // console.log(id)
            let hexaCnic = item.args[1]
            // let cnic = hexaCnic.toString()
            let hexaShares = item.args[2]
            // let shares = hexaShares.toString()
            console.log(createNewPropertyData(hexaId.toString(), hexaCnic.toString(), hexaShares.toString()))

            newPropertyTableRows.push(createNewPropertyData(hexaId.toString(), hexaCnic.toString(), hexaShares.toString()))
        })

        console.log(newPropertyTableRows);
        setFlagNewProTable(true);

        



        // ------------------------------------------------------
        

    }
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
                                name="province"
                                onChange={handleChangeProvience}
                            >
                                <MenuItem value="punjab">punjab</MenuItem>
                                <MenuItem value="sindh">Karachi</MenuItem>
                                <MenuItem value="balochistan">Sialkot</MenuItem>
                                <MenuItem value="KPK">KPK</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item sm={12} xs={12} md={6} lg={6}>
                        <FormControl fullWidth>
                            <InputLabel id="distric-label">Distric</InputLabel>

                            <Select
                                fullWidth
                                required
                                labelId="distric-label"
                                id="distric"
                                value={distric}
                                label="Distric"
                                name="distric"
                                onChange={handleChangeDistric}
                            >
                                <MenuItem value="lahore">Lahore</MenuItem>
                                <MenuItem value="karachi">Karachi</MenuItem>
                                <MenuItem value="sialkot">Sialkot</MenuItem>
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
                                name="society"
                                onChange={handleChangeSociety}
                            >
                                <MenuItem value="none">None</MenuItem>
                                <MenuItem value="park-view">Park View</MenuItem>
                                <MenuItem value="bahria">Bahria</MenuItem>
                                <MenuItem value="rehman-garden">Rehman Garden</MenuItem>
                                <MenuItem value="iqbal-town">Iqbal Town</MenuItem>
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
                                name="block"
                                onChange={handleChangeBlock}
                            >
                                <MenuItem value="none">None</MenuItem>
                                <MenuItem value="park-view">A Block</MenuItem>
                                <MenuItem value="bahria">B Block</MenuItem>
                                <MenuItem value="rehman-garden">X Block</MenuItem>
                                <MenuItem value="iqbal-town">Y Block</MenuItem>
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
                            onChange={hadnleChangeId}
                        />
                    </Grid>
                    <Grid item sm={12} xs={12} md={6} lg={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            id="ownerCNIC"
                            name="ownerCNIC"
                            label="CNIC of Owner"
                            type="number"
                        />
                    </Grid>

                </Grid>
                {/* Submit Button  */}
                <Box textAlign="center">
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, px: 5 }}
                        onClick={handleSubmit}
                    >
                        Get
                    </Button>
                </Box>
                {/* ---------------------------------------------------------------------- */}
                {
                    flagNewProTable ? (<><Typography fontSize='18px' fontWeight='bold' >First Transactions of Property </Typography>
                        <TableComponents key="Property Shares" columsArray={newPropertyTableColumns} rowsArray={newPropertyTableRows} /></>) : ""
                }
            </Box>
        </Box>

    )
}

export default YourPropertiesDetails