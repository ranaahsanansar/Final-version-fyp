import {
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
  Typography,
  Alert
} from "@mui/material";
import React, { useEffect, useState } from "react";
import govAuthority from "../../artifacts/contracts/govermenAuthority.sol/GovermentAuthority.json";
import { ethers } from "ethers";
import { citizenContractAddress, govermentAuthorityContractAddress } from "../../dataVariables";

const DeclareDeathForm = () => {
  const [distric, setDistric] = useState('lahore');
  const [province, setProvince] = useState('punjab');
  const [society, setSociety] = useState('none');
  const [block, setBlock] = useState('park-view');
  const [cnic, setCnic] = useState(null)

  const [citizenAddress, setCitizenAddress] = useState("");


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

  useEffect(() => {
    if (alert.status === true) {
      setTimeout(() => {

        setAlert({
          status: false,
          msg: "",
          type: ""
        })
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
      }, 60000)
    }
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    let confirm = window.confirm("Are you sure want to Submit?");
    if (confirm) {



      const { ethereum } = window;

      let contractAddress = lockContractAddress;
      let _citizenContractAddress = citizenAddress;
      let _id = cnic;

      const walletProvider = new ethers.providers.Web3Provider(
        ethereum
      )

      const signer = walletProvider.getSigner();

      const sendTx = new ethers.Contract(
        contractAddress,
        govAuthority.abi,
        signer
      )

      const dataResult = await sendTx.declareDeath(citizenAddress, _id, { gasLimit: 5000000 });

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
        msg: "Submitted Successfuly!",
        type: "success"
      });
    }

  };

  const handleChangeProvience = (event) => {
    setProvince(event.target.value);
  };
  const handleChangeDistric = (event) => {
    setDistric(event.target.value);
    setLockContractAddress(govermentAuthorityContractAddress);
    setCitizenAddress(citizenContractAddress);
  };

  const handleChangeId = (e) => {
    setCnic(e.target.value)
  }
  return (
    <Box width='100%' sx={{
      border: '2px solid gray', padding: 2, borderRadius: '15px', backgroundColor: '#f2f2f2'
    }} >
      <Typography variant="h4" fontSize='25px' color='primary' fontWeight='bold' >Declare Death of Citizzen</Typography>
      <Divider />
      <Box mt={3} >
        <Box
          component='form'
          id="addProperty-form"
        >
          <Grid container spacing={2} >

            <Grid item lg={4} md={4} sm={4} >
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
                  <MenuItem value="punjab">Punjab</MenuItem>
                  <MenuItem value="sindh">Sindh</MenuItem>
                  <MenuItem value="balochistan">Balochistan</MenuItem>
                  <MenuItem value="KPK">KPK</MenuItem>
                  <MenuItem value="gilgit">Gilgit</MenuItem>
                  <MenuItem value="islammabad">Islammabad</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item lg={4} md={4} sm={4} >
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
                  <MenuItem value="lahore">Lahore</MenuItem>
                  <MenuItem value="karachi">Karachi</MenuItem>
                  <MenuItem value="sialkot">Sialkot</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item lg={4} md={4} sm={4} >
              <TextField fullWidth id="Cnic" type="number" onChange={handleChangeId} name="cnic" label="CNIC" variant="outlined" />

            </Grid>

          </Grid>
          <Box textAlign="center">
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, px: 5 }}
              onClick={handleSubmit}
            >
              Declare Dead
            </Button>
          </Box>

          {alert.status ? <Alert severity={alert.type} sx={{ mt: 3 }}>{alert.msg}</Alert> : ''}
          {etherScanAlert.status ? <><Alert severity={etherScanAlert.type} sx={{ mt: 3 }}>{etherScanAlert.msg}<a href={etherScanAlert.url} target="_blank" > Click Me</a> </Alert>  </> : ''}
        </Box>
      </Box>
    </Box>
  );
}

export default DeclareDeathForm