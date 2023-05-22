
import React, { useEffect, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
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

import areaContract from "../artifacts/contracts/OwnerShip.sol/OwnerShip.json";
import { ethers } from "ethers";

import nodeProviderUrl from "../dataVariables";



const SellPropertyForm = () => {

    const [alert, setAlert] = useState({
        status: false,
        msg: "",
        type: ""
    });

    const [etherScanAlert, setEtherScanAlert] = useState({
        status: false,
        msg: "",
        url: "",
        type: ""
    });

    const [lockContractAddress, setLockContractAddress] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            province: data.get('province'),
            distric: data.get('distric'),
            society: data.get('society'),
            block: data.get('block'),
            propertyId: data.get('propertyId'),
            email: data.get("email"),
            ownerFullName: data.get('ownerFullName'),
            ownerCNIC: data.get('ownerCNIC'),
            sharesAmmount: data.get('sharesAmmount'),
            priceOfShare: data.get('priceOfShare'),
            buyerCNIC: data.get('buyerCNIC'),
            agree: data.get('agree')
        }
        // console.log(actualData)
        if (actualData.province && actualData.distric && actualData.society && actualData.block && actualData.propertyId && actualData.ownerFullName && actualData.ownerCNIC && actualData.priceOfShare && actualData.buyerCNIC && actualData.agree) {

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
            console.log(signer)

            let _ownerCnic = parseInt(actualData.ownerCNIC) ;
            
            let _propertyId = parseInt(actualData.propertyId) 

            let _shareAmmount = parseInt(actualData.sharesAmmount) ;

            let _priceOfShare = parseInt(actualData.priceOfShare); 

            let _buyerCnic = parseInt(actualData.buyerCNIC)  ;

            console.log( _ownerCnic)
            console.log( _propertyId)
            console.log( _shareAmmount)
            console.log( _priceOfShare)
            console.log( _buyerCnic)
            const dataResult = await sendTx.transferOwnerShipRequest(
                _ownerCnic,
                _propertyId,
                _shareAmmount,
                _priceOfShare,
                _buyerCnic ,
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

            // await dataResult.wait();

            // console.log(dataResult)

            setAlert({
                status: true,
                msg: "Your Request is now generated! Check on EtherScan",
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
        if (etherScanAlert.status === true) {
            setTimeout(() => {
              setEtherScanAlert({
                status: false,
                msg: "",
                url: "",
                type: ""
              })
            }, 600000)
          }

    })


    const [distric, setDistric] = useState('lahore');
    const [province, setProvince] = useState('punjab');
    const [selectPropertyId, setSelectPropertyId] = useState('none');
    const [society, setSociety] = useState('none');
    const [block, setBlock] = useState('park-view');


    const [checked, setChecked] = useState(false);



    const handleChangeProvience = (event) => {
        setProvince(event.target.value);
    };
    const handleChangeDistric = (event) => {
        setDistric(event.target.value);
    };
    const handleChangeBlock = (event) => {
        setBlock(event.target.value);
        setLockContractAddress("0x2604e9292a4cF4C622B806480cF41279920F56A3");
    };
    const handleChangePropertyId = (event) => {
        setSelectPropertyId(event.target.value);
    };
    const handleChangeSociety = (event) => {
        setSociety(event.target.value);
    };
    const handleCheck = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <Box sx={{ backgroundColor: 'white', borderRadius: 2, padding: 2 }} >
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
                                name="province"
                                value={province}
                                label="province"
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
                                name="distric"
                                value={distric}
                                label="Distric"
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
                                name="society"
                                value={society}
                                label="society"
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
                                name="block"
                                value={block}
                                label="block"
                                onChange={handleChangeBlock}
                            >
                                <MenuItem value="none">None</MenuItem>
                                <MenuItem value="Bahria-1-A">A Block</MenuItem>
                                <MenuItem value="bahria">B Block</MenuItem>
                                <MenuItem value="rehman-garden">X Block</MenuItem>
                                <MenuItem value="iqbal-town">Y Block</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item sm={12} xs={12} md={12} lg={12}>
                        {/* <FormControl fullWidth>
                            <InputLabel id="property-id-label">Property ID</InputLabel>

                            <Select
                                fullWidth
                                required
                                labelId="property-id-label"
                                id="propertyId"
                                name="propertyId"
                                value={selectPropertyId}
                                label="propertyId"
                                onChange={handleChangePropertyId}
                            >
                                <MenuItem value="none">None</MenuItem>
                                <MenuItem value="5555">5555</MenuItem>
                                <MenuItem value="888">888</MenuItem>
                                <MenuItem value="999">999</MenuItem>
                            </Select>
                        </FormControl> */}
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            id="propertyId"
                            name="propertyId"
                            label="Property ID"
                            type="number"
                            onChange={handleChangePropertyId}
                            inputProps={{ min: 0 }}
                        />
                    </Grid>
                    <Grid item sm={12} xs={12} md={6} lg={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            id="sellerEmail"
                            name="sellerEmail"
                            label="Your Email"
                            type="String"
                        />
                        <Typography fontSize='small' >You will recive request number through this email</Typography>
                    </Grid>

                    <Grid item sm={12} xs={12} md={6} lg={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            id="ownerFullName"
                            name="ownerFullName"
                            label="Full Name of Owner"
                            type="String"
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
                            inputProps={{ min: 0 }}
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
                            inputProps={{ min: 0 }}
                        />
                    </Grid>
                    <Grid item sm={12} xs={12} md={6} lg={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            id="priceOfShare"
                            name="priceOfShare"
                            label="Price of One Share"
                            type="number"
                            inputProps={{ min: 0 }}
                        />
                    </Grid>
                    <Grid item sm={12} xs={12} md={6} lg={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            id="buyerCNIC"
                            name="buyerCNIC"
                            label="Buyer CNIC"
                            type="number"
                            inputProps={{ min: 0 }}
                        />
                    </Grid>
                    <Grid item sm={12} xs={12} md={12} lg={12}>
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
                <Box textAlign="center">
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, px: 5 }}
                    >
                        Submit
                    </Button>
                </Box>
                {alert.status ? <Alert severity={alert.type} sx={{ mt: 3 }}>{alert.msg}</Alert> : ''}

                {etherScanAlert.status ? <><Alert severity={etherScanAlert.type} sx={{ mt: 3 }}>{etherScanAlert.msg}<a href={etherScanAlert.url} target="_blank" > Click Me</a> </Alert>  </> : ''}



            </Box>
        </Box>
    )
}

export default SellPropertyForm
