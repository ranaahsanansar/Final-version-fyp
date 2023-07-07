import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { useSelector } from "react-redux";
import citizenContract from "../artifacts/contracts/Citizens.sol/Citizens.json";
import { ethers } from "ethers";
import { citizenContractAddress } from "../dataVariables";
const ApprovalRequestForm = () => {

    const { token } = useSelector(state => state.auth)

    const [alert, setAlert] = useState({
        status: false,
        msg: "",
        type: "",
    });

    const [etherScanAlert, setEtherScanAlert] = useState({
        status: false,
        msg: "",
        url: "",
        type: "",
    });

    const [formValues, setFormValues] = useState({
        citizenName: "",
        citizenCNIC: "",
        fatherName: "",
        phone: "",
        email: "",
        CNICFront: null,
        CNICBack: null,
        picture: null,
        agree: false,
    });

    const [formErrors, setFormErrors] = useState({
        citizenName: "",
        citizenCNIC: "",
        fatherName: "",
        phone: "",
        email: "",
        CNICFront: "",
        CNICBack: "",
        picture: "",
        agree: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: files[0],
        }));
    };
    const { ethereum } = window;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform form validation
        let isValid = true;
        const errors = {
            citizenName: "",
            citizenCNIC: "",
            fatherName: "",
            phone: "",
            email: "",
            CNICFront: "",
            CNICBack: "",
            picture: "",
            agree: "",
        };

        if (!formValues.citizenName.trim()) {
            errors.citizenName = "Please enter your full name";
            isValid = false;
        }else if (String(formValues.citizenName).length < 3 ) {
            errors.citizenName = "Name must be at least 3 characters";
            isValid = false;
        }

        if (!formValues.citizenCNIC.trim()) {
            errors.citizenCNIC = "Please enter your CNIC";
            isValid = false;
        } else if (formValues.citizenCNIC < 1) {
            errors.citizenCNIC = "Value must not be less then 1";
            isValid = false;
        }

        let checkValidCnic = formValues.citizenCNIC.toString();
        if(checkValidCnic.length != 13 ){
            errors.citizenCNIC = "Cnicn Must be Valid";
            isValid = false;
        }

        if (!formValues.fatherName.trim()) {
            errors.fatherName = "Please enter your father's name";
            isValid = false;
        }else if (String(formValues.fatherName).length < 3 ) {
            errors.fatherName = "Name must be at least 3 characters";
            isValid = false;
        }

        if (!formValues.phone.trim()) {
            errors.phone = "Please enter your phone number";
            isValid = false;
        }else if (String(formValues.phone).length != 11 ){
            errors.phone = "Phone should be a number";
            isValid = false;
        }

        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        const isValidEmail = (email) => {
            return emailPattern.test(email);
          };
          

        if (!formValues.email.trim()) {
            errors.email = "Please enter your email";
            isValid = false;
        }else if (!isValidEmail(formValues.email)) {
            errors.email = "Email is not valid";
            isValid = false;
        }

        if (!formValues.CNICFront) {
            errors.CNICFront = "Please upload your CNIC front image";
            isValid = false;
        }

        if (!formValues.CNICBack) {
            errors.CNICBack = "Please upload your CNIC back image";
            isValid = false;
        }

        if (!formValues.picture) {
            errors.picture = "Please upload your passport size picture";
            isValid = false;
        }

        if (!formValues.agree) {
            errors.agree = "Please agree to the terms and conditions";
            isValid = false;
            setAlert({
                status: true,
                msg: "Please agree to the terms and conditions",
                type: "error",
            });
        }
        setFormErrors(errors);
        if (!isValid) {
            return;
        }

        try {
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
            const sendTx = new ethers.Contract(
                contractAddress,
                citizenContract.abi,
                signer
            )

            const dataResult = await sendTx.newCitizenRequest(formValues.citizenCNIC);

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

        } catch (err) {
            setAlert({
                status: true,
                msg: "Please connect Metamask wallet",
                type: "error",
            });
            return
        }


        // Create form data to send to the API
        const formData = new FormData();
        formData.append("name", formValues.citizenName);
        formData.append("cnic", formValues.citizenCNIC);
        formData.append("fatherName", formValues.fatherName);
        formData.append("phone", formValues.phone);
        formData.append("email", formValues.email);
        formData.append("front", formValues.CNICFront);
        formData.append("back", formValues.CNICBack);
        formData.append("passport-pic", formValues.picture);

        try {
            // Make a POST request to the API endpoint
            const response = await axios.post(
                "http://localhost:8000/api/dashboard/property/approval",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Bearer ${token}`
                    },
                }
            );

            // Handle successful response
            setAlert({
                status: true,
                msg: "Form submitted successfully",
                type: "success",
            });

            // Reset the form values
            setFormValues({
                citizenName: "",
                citizenCNIC: "",
                fatherName: "",
                phone: "",
                email: "",
                CNICFront: null,
                CNICBack: null,
                picture: null,
                agree: false,
            });

            // Clear the form errors
            setFormErrors({
                citizenName: "",
                citizenCNIC: "",
                fatherName: "",
                phone: "",
                email: "",
                CNICFront: "",
                CNICBack: "",
                picture: "",
                agree: "",
            });
        } catch (error) {
            // Handle error
            console.error(error);
            setAlert({
                status: true,
                msg: "Failed to submit form",
                type: "error",
            });
        }
    };

    useEffect(() => {
        if (alert.status === true) {
            setTimeout(() => {
                setAlert({
                    status: false,
                    msg: "",
                    type: "",
                });
            }, 5000);
        }
    }, [alert.status]);

    const handleCheck = (event) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            agree: event.target.checked,
        }));
    };

    return (
        <div>
            <Container>
                <Box mt={2}>
                    <Stack spacing={2}>
                        <Box>
                            <Stack spacing={2}>
                                <Box
                                    sx={{
                                        borderRadius: 2,
                                        padding: 2,
                                        backgroundColor: "white",
                                    }}
                                >
                                    <Typography variant="h3">
                                        Send Request for Citizen Approval
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>

                        <Box
                            sx={{ backgroundColor: "white", borderRadius: 2, padding: 2 }}
                        >
                            <Box
                                component="form"
                                noValidate
                                sx={{ mt: 1 }}
                                id="approvalRequest-form"
                                onSubmit={handleSubmit}
                            >
                                <Grid container spacing={2}>
                                    <Grid item sm={12} xs={12} md={6} lg={6}>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            required
                                            id="citizenName"
                                            name="citizenName"
                                            label="Your Full Name"
                                            value={formValues.citizenName}
                                            onChange={handleInputChange}
                                            error={!!formErrors.citizenName}
                                            helperText={formErrors.citizenName}
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
                                            value={formValues.citizenCNIC}
                                            onChange={handleInputChange}
                                            error={!!formErrors.citizenCNIC}
                                            helperText={formErrors.citizenCNIC}
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
                                            value={formValues.fatherName}
                                            onChange={handleInputChange}
                                            error={!!formErrors.fatherName}
                                            helperText={formErrors.fatherName}
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
                                            value={formValues.phone}
                                            onChange={handleInputChange}
                                            error={!!formErrors.phone}
                                            helperText={formErrors.phone}
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
                                            value={formValues.email}
                                            onChange={handleInputChange}
                                            error={!!formErrors.email}
                                            helperText={formErrors.email}
                                        />
                                    </Grid>

                                    <Grid item sm={12} md={12} lg={12} xs={12}>
                                        <p>CNIC Front</p>
                                        <input
                                            type="file"
                                            name="CNICFront"
                                            onChange={handleFileChange}
                                            error={!!formErrors.CNICFront}
                                            accept="image/png, image/gif, image/jpeg"
                                        />
                                        <div>{formErrors.CNICFront}</div>
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12} xs={12}>
                                        <p>CNIC Back</p>
                                        <input
                                            type="file"
                                            name="CNICBack"
                                            onChange={handleFileChange}
                                            error={!!formErrors.CNICBack}
                                            accept="image/png, image/gif, image/jpeg"
                                        />
                                        <div>{formErrors.CNICBack}</div>
                                    </Grid>
                                    <Grid item sm={12} md={12} lg={12} xs={12}>
                                        <p>Passport Size Pic</p>
                                        <input
                                            type="file"
                                            name="picture"
                                            onChange={handleFileChange}
                                            error={!!formErrors.picture}
                                            accept="image/png, image/gif, image/jpeg"
                                        />
                                        <div>{formErrors.picture}</div>
                                    </Grid>

                                    <Grid item sm={12} xs={12} md={6} lg={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formValues.agree}
                                                    onChange={handleCheck}
                                                    name="agree"
                                                    color="primary"
                                                />
                                            }
                                            label="I Agree to term and Conditions"
                                            error={!!formErrors.agree}
                                            helperText={formErrors.agree}
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
                                {alert.status ? (
                                    <Alert severity={alert.type} sx={{ mt: 3 }}>
                                        {alert.msg}
                                    </Alert>
                                ) : (
                                    ""
                                )}
                                {etherScanAlert.status ? (
                                    <>
                                        <Alert severity={etherScanAlert.type} sx={{ mt: 3 }}>
                                            {etherScanAlert.msg}
                                            <a href={etherScanAlert.url} target="_blank">
                                                Click Me
                                            </a>{" "}
                                        </Alert>{" "}
                                    </>
                                ) : (
                                    ""
                                )}
                            </Box>
                        </Box>
                    </Stack>
                </Box>
            </Container>
        </div>
    );
};

export default ApprovalRequestForm;
