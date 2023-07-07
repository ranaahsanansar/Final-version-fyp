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
import React, { useState, useEffect } from "react";

import highCourtContract from "../../artifacts/contracts/Highcourt.sol/Highcourt.json";
import { ethers } from "ethers";
import { HighCourtAddress, citizenContractAddress } from "../../dataVariables";
import nodeProviderUrl, { getAllDistricURL, getAllProvienceURL, getAreaNameURL, getAreaURL, getContractURL, getSocietyURL, landInspectorContractAddress, govermentAuthorityContractAddress } from "../../dataVariables";

const CitizenStayForm = () => {
  const [distric, setDistric] = useState('none');
  const [province, setProvince] = useState('none');
  const [society, setSociety] = useState('none');
  const [block, setBlock] = useState('none');


  const [areaOptions, setAreaOptions] = useState([])
  const [provinceOptions, setPropvinceOptions] = useState([]);
  const [districOptions, setDistricOptions] = useState([]);
  const [societyOtpions, setSocietyOptions] = useState([]);

  const [areaName, setAreaName] = useState("none");


  const [etherScanAlert, setEtherScanAlert] = useState({
    status: false,
    msg: "",
    url: "",
    type: ""
  });

  const [lockContractAddress, setLockContractAddress] = useState("");
  const [citizenContractAddressState, setCitizenContractAddressState] = useState("");
  const [cnic, setCnic] = useState();

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

  useEffect(() => {

    var array;

    const fetchData = async () => {

      const data = await fetch(getAllProvienceURL);

      const json = await data.json();
      setPropvinceOptions(json)
    }
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    let confirm = window.confirm("Are you sure want to Submit?");
    if (confirm) {


      const { ethereum } = window;

      let contractAddress = lockContractAddress;
      let _citizenContractAddress = citizenContractAddressState;
      let _cnic = cnic;


      const walletProvider = new ethers.providers.Web3Provider(
        ethereum
      )

      const signer = walletProvider.getSigner();

      const sendTx = new ethers.Contract(
        contractAddress,
        highCourtContract.abi,
        signer
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
      let _landInspector = json[0].highCourt
      let _areaContractAddress = json[0].citzenContract
      setCitizenContractAddressState(_areaContractAddress)
      console.log("Land")
      console.log(_landInspector)
      setLockContractAddress(_landInspector);
    }
    fetchContracts();

  };


  const handleChangeCnic = (e) => {
    setCnic(e.target.value)
  }
  return (
    <Box width='100%' sx={{
      border: '2px solid gray', padding: 2, borderRadius: '15px', backgroundColor: '#f2f2f2'
    }} >
      <Typography variant="h4" fontSize='25px' fontWeight='bold' color='#060606'>Restricted on Citizen</Typography>
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
                  <MenuItem value="none">None</MenuItem>

                  {
                    provinceOptions.map((e) => {
                      return (<MenuItem value={e._id}>{e.name}</MenuItem>)

                    })
                  }
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

                  <MenuItem value="none">None</MenuItem>

                  {
                    districOptions.map((e) => {

                      return (<MenuItem value={e._id}>{e.name}</MenuItem>)

                    })
                  }

                </Select>
              </FormControl>
            </Grid>

            <Grid item lg={4} md={4} sm={4} >
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

            <Grid item lg={4} md={4} sm={4} >
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

            <Grid item lg={4} md={4} sm={4} >
              <TextField fullWidth id="citizenCNIC" name="citizenCNIC" onChange={handleChangeCnic} type="number" label="Citizen CNIC" variant="outlined" />

            </Grid>

          </Grid>
          <Box textAlign="center">

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, px: 5, mr: 2 }}
              onClick={handleSubmit}
              color="error"
            >
              Stay
            </Button><Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, px: 5 }}
              onClick={handleSubmit}
            >
              Remove Stay
            </Button>
          </Box>

          {alert.status ? <Alert severity={alert.type} sx={{ mt: 3 }}>{alert.msg}</Alert> : ''}
          {etherScanAlert.status ? <><Alert severity={etherScanAlert.type} sx={{ mt: 3 }}>{etherScanAlert.msg}<a href={etherScanAlert.url} target="_blank" > Click Me</a> </Alert>  </> : ''}


        </Box>
      </Box>
    </Box>
  );
}

export default CitizenStayForm