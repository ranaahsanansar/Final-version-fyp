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
import React, { useEffect, useState } from "react";
import areaContract from "../artifacts/contracts/OwnerShip.sol/OwnerShip.json";
import { ethers } from "ethers";
import { ownerShipAddress } from "../dataVariables";


const BuyPropertyForm = () => {

    const [etherScanAlert, setEtherScanAlert] = useState({
        status: false,
        msg: "",
        url: "",
        type: ""
    });

    const [lockContractAddress, setLockContractAddress] = useState("");

    const [alert, setAlert] = useState({
        status: false,
        msg: "",
        type: ""
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            province: data.get('province'),
            distric: data.get('distric'),
            society: data.get('society'),
            block: data.get('block'),
            propertyId: data.get('propertyId'),
            ownerCNIC: data.get('ownerCNIC'),
            sharesAmmount: data.get('sharesAmmount'),
            reqNumber: data.get('reqNumber'),
            agree: data.get('agree')
        }
        if (actualData.province && actualData.distric && actualData.society && actualData.block && actualData.propertyId && actualData.ownerCNIC && actualData.sharesAmmount && actualData.reqNumber && actualData.agree) {

            const { ethereum } = window;

            let contractAddress = lockContractAddress;

            const walletProvider = new ethers.providers.Web3Provider(
                ethereum
            )

            const signer = walletProvider.getSigner();

            const sendTx = new ethers.Contract(
                contractAddress,
                areaContract.abi,
                signer
            )
            console.log("Ok ha")

            const dataResult = await sendTx.signatureForBuyer(
                actualData.propertyId,
                actualData.ownerCNIC,
                actualData.sharesAmmount,
                actualData.reqNumber,
                { gasLimit: 5000000 }
            );
            let txHash = dataResult.hash
            let scanUrl = "https://sepolia.etherscan.io/tx/" + txHash;



            setEtherScanAlert(
                {
                    status: true,
                    msg: "View Transaction on EtherScan",
                    url: scanUrl,
                    type: "success"
                }
            )
            setAlert({
                status: true,
                msg: "Your Request is now generated! Contact to the land Inspector",
                type: "success"
            });

        } else {
            // setError({ status: true, msg: "All Fields are Required", type: 'error' })
            setAlert({
                status: true,
                msg: "All Fields are required!",
                type: "error"
            });
        }
    };

    const [distric, setDistric] = useState('lahore');
    const [province, setProvince] = useState('punjab');
    const [society, setSociety] = useState('none');
    const [block, setBlock] = useState('park-view');


    useEffect(() => {
        if (alert.status === true) {
            setTimeout(() => {

                setAlert({
                    status: false,
                    msg: "",
                    type: ""
                });

            }, 5000);


        }

    })


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
        setLockContractAddress(ownerShipAddress);
    };

    const [checked, setChecked] = useState(false);

    const handleCheck = (event) => {
        setChecked(event.target.checked);
    };
    return (
        <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            id="buyProperty-form"
            onSubmit={handleSubmit}
        >
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
                <Grid item sm={12} xs={12} md={6} lg={6}>
                    <TextField
                        margin="normal"
                        fullWidth
                        required
                        id="sharesAmmount"
                        name="sharesAmmount"
                        label="Ammount of Shares"
                        type="number"
                    />
                </Grid>
                <Grid item sm={12} xs={12} md={6} lg={6}>
                    <TextField
                        margin="normal"
                        fullWidth
                        required
                        id="reqNumber"
                        name="reqNumber"
                        label="Request Number"
                        type="number"
                    />
                </Grid>
                <Grid item sm={12} xs={12} md={6} lg={6}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={handleCheck}
                                name="agree"
                                color="primary"
                            />
                        }
                        label="I Agree to this Transaction"
                    />
                </Grid>


            </Grid>
            {/* Submit Button  */}
            <Box textAlign="center">
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, px: 5 }}
                    onSubmit={handleSubmit}
                >
                    Signature
                </Button>
            </Box>
            {alert.status ? <Alert severity={alert.type} sx={{ mt: 3 }}>{alert.msg}</Alert> : ''}
            {etherScanAlert.status ? <><Alert severity={etherScanAlert.type} sx={{ mt: 3 }}>{etherScanAlert.msg}<a href={etherScanAlert.url} target="_blank" > Click Me</a> </Alert>  </> : ''}
        </Box>
    )
}

export default BuyPropertyForm
