import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import nodeProviderUrl, { govermentAuthorityContractAddress } from "../dataVariables";
import { ethers } from "ethers";

import govAuthorityContract from "../artifacts/contracts/govermenAuthority.sol/GovermentAuthority.json";

const CitizenApprovalPage = () => {
  const [citizen, setCitizen] = useState(false);
  const [etherScanAlert, setEtherScanAlert] = useState({
    status: false,
    msg: "",
    url: "",
    type: ""
  });

  const handleFetch = (e) => {
    e.preventDefault();
    setCitizen(!citizen);

    // Fetching Result from DB 
    setLockContractAddress(govermentAuthorityContractAddress);
    setLockCnic(cnic);

  };

  const handleApprove = async (e) => {
    e.preventDefault();

    const { ethereum } = window;

    let contractAddress = lockContractAddress;
    let applicantCnic = cnic;

    console.log(contractAddress);

    const nodeProvider = new ethers.providers.JsonRpcProvider(
      nodeProviderUrl
    )

    const walletProvider = new ethers.providers.Web3Provider(
      ethereum
    )

    const signer = walletProvider.getSigner();

    // console.log(nodeProvider , walletProvider)

    const getContractData = new ethers.Contract(
      contractAddress,
      govAuthorityContract.abi,
      nodeProvider
    )

    const sendTx = new ethers.Contract(
      contractAddress,
      govAuthorityContract.abi,
      signer
    )
    console.log("Ok ha")

    const dataResult = await sendTx.approveCitizen(applicantCnic, "0xa543CBa1E566DB08d3d0fe2D888bC1797E5226F6", "only", { gasLimit: 5000000 });

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

    await dataResult.wait();

    console.log(dataResult)


  }

  const handleReject = async (e) => {
    e.preventDefault();
    const { ethereum } = window;

    let contractAddress = lockContractAddress;
    let applicantCnic = cnic;

    console.log(contractAddress);

    const nodeProvider = new ethers.providers.JsonRpcProvider(
      nodeProviderUrl
    )

    const walletProvider = new ethers.providers.Web3Provider(
      ethereum
    )

    const signer = walletProvider.getSigner();

    // console.log(nodeProvider , walletProvider)

    const getContractData = new ethers.Contract(
      contractAddress,
      govAuthorityContract.abi,
      nodeProvider
    )

    const sendTx = new ethers.Contract(
      contractAddress,
      govAuthorityContract.abi,
      signer
    )
    console.log("Ok ha")

    const dataResult = await sendTx.rejectCitizen(applicantCnic, "only", { gasLimit: 5000000 });

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

    await dataResult.wait();

    console.log(dataResult)


  }

  // const [distric, setDistric] = useState("");
  const [lockContractAddress, setLockContractAddress] = useState("");
  const [cnic, setCnic] = useState("");
  const [lockCnic, setLockCnic] = useState("");
  // const [province, setProvince] = useState("punjab");

  // const handleChangeProvience = (event) => {
  //   setProvince(event.target.value);
  // };
  // const handleChangeDistric = (event) => {
  //   setDistric(event.target.value);
  // };

  const handleChangeCnic = (event) => {
    setCnic(event.target.value);
  }

  return (
    <>
      <Container  >

        <Box mt={2} textAlign="center" >
          <Typography variant="h3" fontSize="35px" fontWeight="bold" color='#060606'>
            Goverment Authority Only 
          </Typography>
        </Box>

        <Box sx={{ backgroundColor: 'white', padding: 2, borderRadius: 2, my: 2 }}>



          <Box mt={2}>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              id="approveCitizen-form"
            >
              <Grid direction="row" container spacing={2}>

                {/* <Grid item lg={4} md={4} sm={4}>
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
                      <MenuItem value="punjab">punjab</MenuItem>
                      <MenuItem value="sindh">Karachi</MenuItem>
                      <MenuItem value="balochistan">Sialkot</MenuItem>
                      <MenuItem value="KPK">KPK</MenuItem>
                    </Select>
                  </FormControl>
                </Grid> */}

                {/* <Grid item lg={4} md={4} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel id="distric-label">Distric</InputLabel>

                    <Select
                      fullWidth
                      required
                      labelId="distric-label"
                      id="distric"
                      value={distric}
                      label="Distric"
                      onChange={handleChangeDistric}
                    >
                      <MenuItem value="0x6D775f5A4008BaAEF0FdadC09dAEe96149aB301c">Lahore</MenuItem>
                      <MenuItem value="karachi">Karachi</MenuItem>
                      <MenuItem value="sialkot">Sialkot</MenuItem>
                    </Select>
                  </FormControl>
                </Grid> */}

                <Grid item lg={10} md={10} sm={10}>
                  <TextField
                    fullWidth
                    id="citizenCnic"
                    label="Citizen CNIC"
                    variant="outlined"
                    name="citizenCnic"
                    value={cnic}
                    onChange={handleChangeCnic}
                    type="number"
                    placeholder="3520200000000"
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item lg={2} md={2} sm={2}>
                  <Box height="100%" sx={{ display: "flex" }}>
                    <Button onClick={handleFetch} variant="contained" fullWidth>
                      Fetch
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>


          {citizen && (<Container>
            <Box mt={4} padding={2}>
              <Grid direction="row" container spacing={3}>
                <Grid itme lg={8} md={8} sm={8}>
                  <Stack spacing={2}>
                    <Box>
                      <Typography fontWeight="bold" color="gray" fontSize="16px">
                        Name
                      </Typography>
                      <Typography fontWeight="bold" color="black" fontSize="20px">
                        Rana Ahsan Ansar
                      </Typography>
                    </Box>
                    <Box>
                      <Typography fontWeight="bold" color="gray" fontSize="16px">
                        Father Name
                      </Typography>
                      <Typography fontWeight="bold" color="black" fontSize="20px">
                        Ansar Latif
                      </Typography>
                    </Box>
                    <Box>
                      <Typography fontWeight="bold" color="gray" fontSize="16px">
                        Cnic
                      </Typography>
                      <Typography fontWeight="bold" color="black" fontSize="20px">
                        3520204614157
                      </Typography>
                    </Box>
                    <Box>
                      <Typography fontWeight="bold" color="gray" fontSize="16px">
                        Phone
                      </Typography>
                      <Typography fontWeight="bold" color="black" fontSize="20px">
                        03091045145
                      </Typography>
                    </Box>
                    <Box>
                      <Typography fontWeight="bold" color="gray" fontSize="16px">
                        Email
                      </Typography>
                      <Typography fontWeight="bold" color="black" fontSize="20px">
                        asn.cs21@gmail.com
                      </Typography>
                    </Box>
                    {/* <Box>
                      <Typography fontWeight="bold" color="gray" fontSize="16px">
                        Contract Address
                      </Typography>
                      <Typography fontWeight="bold" color="black" fontSize="20px">
                        9x9985664455996244893549
                      </Typography>
                    </Box> */}
                    <Box>
                      <Typography fontWeight="bold" color="gray" fontSize="16px">
                        Contract City
                      </Typography>
                      <Typography fontWeight="bold" color="black" fontSize="20px">
                        Lahore
                      </Typography>
                    </Box>

                    <Divider />

                    <Box>
                      <Typography fontWeight="bold" color="black" fontSize="16px">
                        Any Message for Applicant
                      </Typography>
                      <TextareaAutosize
                        aria-label="message"
                        minRows={5}
                        placeholder="Enter your Message here"
                        style={{ width: "80%" }}
                      />
                    </Box>

                    <Box>
                      <Stack direction="row" spacing={2}>
                        <Button variant="contained" onClick={handleApprove} >Approve</Button>

                        <Button variant="outlined" color="error" onClick={handleReject} >Reject</Button>
                      </Stack>
                    </Box>
                    {etherScanAlert.status ? <><Alert severity={etherScanAlert.type} sx={{ mt: 3 }}>{etherScanAlert.msg}<a href={etherScanAlert.url} target="_blank" > Click Me</a> </Alert>  </> : ''}

                  </Stack>
                </Grid>
                <Grid itme lg={4} md={4} sm={4}>
                  <Stack spacing={2}>
                    <Box>
                      <Typography
                        mb={2}
                        fontWeight="bold"
                        color="gray"
                        fontSize="16px"
                      >
                        Cnic Front
                      </Typography>
                      <img
                        src="https://www.incpak.com/wp-content/uploads/2017/04/NADRA.jpg"
                        width="100%"
                        height="250px"
                      />
                    </Box>
                    <Box>
                      <Typography
                        mb={2}
                        fontWeight="bold"
                        color="gray"
                        fontSize="16px"
                      >
                        Cnic Back
                      </Typography>
                      <img
                        src="https://tdap.gov.pk/wp-content/uploads/2022/06/258_ID%20Card%20Back.jpg"
                        width="100%"
                        height="250px"
                      />
                    </Box>
                    <Box>
                      <Typography
                        mb={2}
                        fontWeight="bold"
                        color="gray"
                        fontSize="16px"
                      >
                        Picture
                      </Typography>
                      <img
                        src="https://images.pexels.com/photos/8090129/pexels-photo-8090129.jpeg?auto=compress&cs=tinysrgb&w=600"
                        width="300px"
                        height="300px"
                      />
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Container>)}

        </Box>
      </Container>
    </>
  );
};

export default CitizenApprovalPage;
