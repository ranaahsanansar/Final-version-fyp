
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
import BuyingRecords from "../components/BuyingRecords";

import { useFormik } from 'formik';
import * as Yup from 'yup';



import React, { useEffect, useState } from "react";
import citizenContract from "../artifacts/contracts/Citizens.sol/Citizens.json";
import { ethers } from "ethers";
import { citizenContractAddress } from "../dataVariables";


const validationSchema = Yup.object({
    citizenName: Yup.string().required('Full Name is required'),
    citizenCNIC: Yup.number().required('CNIC is required'),
    fatherName: Yup.string().required("Father's Name is required"),
    phone: Yup.number().required('Phone number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    agree: Yup.boolean().oneOf([true], 'You must agree to the terms and conditions'),
  });
  


const ApprovalRequestForm = () => {
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
    const { ethereum } = window;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
       
        const actualData = {
            citzenName: data.get('citizenName'),
            cnic: data.get('citizenCNIC'),
            fatherName: data.get('fatherName'),
            phone: data.get('phone'),
            email: data.get('email'),
            agree: data.get('agree')
        }

        if (actualData.citzenName && actualData.cnic && actualData.fatherName && actualData.phone && actualData.email && actualData.agree) {


            const contractAddress = citizenContractAddress
            console.log(contractAddress);

            let providerUrl = "https://eth-sepolia.g.alchemy.com/v2/g5_IZehi2__Fi9Jj5Pgs53cy_Shg9umf";

            const nodeProvider = new ethers.providers.JsonRpcProvider(
                providerUrl
            )

            const walletProvider = new ethers.providers.Web3Provider(
                ethereum
            )

            const signer = walletProvider.getSigner();

            // console.log(nodeProvider , walletProvider)

            const getContractData = new ethers.Contract(
                contractAddress,
                citizenContract.abi,
                nodeProvider
            )

            const sendTx = new ethers.Contract(
                contractAddress,
                citizenContract.abi,
                signer
            )
            console.log("Ok ha")

            const dataResult = await sendTx.newCitizenRequest(actualData.cnic);

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

    const [distric, setDistric] = useState("");
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
    };

    const glassMorphismStyle = {
        background: "rgba(255, 255, 255, 0.2)",
        boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
    };


    const [checked, setChecked] = useState(false);

    const handleCheck = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <div>
            <Container>
                <Box mt={2}>
                    <Stack spacing={2}>
                        {/* Heading Buying Property  */}
                        <Box>
                            <Stack spacing={2}>
                                <Box sx={[ { borderRadius: 2, padding: 2 , backgroundColor: 'white' }]} >
                                    <Typography variant="h3">Send Request for Citizen Approval</Typography>
                                </Box>

                            </Stack>
                        </Box>
                        {/* Form to Buy Property  */}
                        <Box sx={{ backgroundColor: 'white', borderRadius: 2, padding: 2 }} >
                            <Box
                                component="form"
                                noValidate
                                sx={{ mt: 1 }}
                                id="approvalRequest-form"
                                onSubmit={handleSubmit}
                            >
                                <Grid container spacing={2}>

                                    {/* 
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
                                    </Grid> */}

                                    {/* <Grid item sm={12} xs={12} md={6} lg={6}>
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
                                                <MenuItem value="0x6D775f5A4008BaAEF0FdadC09dAEe96149aB301c">Lahore</MenuItem>
                                                <MenuItem value="karachi">Karachi</MenuItem>
                                                <MenuItem value="sialkot">Sialkot</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid> */}

                                    <Grid item sm={12} xs={12} md={6} lg={6}>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            required
                                            id="citizenName"
                                            name="citizenName"
                                            label="Your Full Name"
                                        />
                                    </Grid>
                                    <Grid item sm={12} xs={12} md={6} lg={6}>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            required
                                            id="citizenCNIC"
                                            name="citizenCNIC"
                                            label="CNIC"
                                            type="number"
                                        />
                                    </Grid>

                                    <Grid item sm={12} xs={12} md={6} lg={6}>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            required
                                            id="fatherName"
                                            name="fatherName"
                                            label="Father Name"
                                        />
                                    </Grid>

                                    <Grid item sm={12} xs={12} md={6} lg={6}>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            required
                                            id="phone"
                                            name="phone"
                                            label="Phone"
                                            type="number"
                                        />
                                    </Grid>

                                    <Grid item sm={12} xs={12} md={6} lg={6}>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            required
                                            id="email"
                                            name="email"
                                            label="Email"
                                            type="email"
                                        />
                                    </Grid>

                                    <Grid item sm={12} md={12} lg={12} xs={12}>
                                        <p>CNIC Front</p>
                                        <input type='file' name="CNICFront" multiple />
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12} xs={12}>
                                        <p>CNIC Back</p>
                                        <input type='file' name="CNICBack" multiple />
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12} xs={12}>
                                        <p>Passport Size Pic</p>
                                        <input type='file' name="picture" multiple />
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
                                            label="I Agree to term and Conditions"
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
                                        Submit
                                    </Button>
                                </Box>
                                {alert.status ? <Alert severity={alert.type} sx={{ mt: 3 }}>{alert.msg}</Alert> : ''}
                                {etherScanAlert.status ? <><Alert severity={etherScanAlert.type} sx={{ mt: 3 }}>{etherScanAlert.msg}<a href={etherScanAlert.url} target="_blank" > Click Me</a> </Alert>  </> : ''}
                            </Box>
                        </Box>

                    </Stack>
                </Box>
            </Container>
        </div>
    );
};

export default ApprovalRequestForm;