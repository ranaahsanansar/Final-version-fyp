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
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";


import landInspectorContract from '../../artifacts/contracts/LandInspector.sol/LandInspector.json';
import { ethers } from "ethers";
import nodeProviderUrl, { getAllDistricURL, getAllProvienceURL, getAreaNameURL, getAreaURL, getContractURL, getSocietyURL } from "../../dataVariables";

import { landInspectorContractAddress } from "../../dataVariables";

const AddPropertyForm = () => {

  // Validation 
  const [formData, setFormData] = useState({
    propertyId: "",
  });

  const [formErrors, setFormErrors] = useState({
    propertyId: "",
  });


  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (formData.propertyId == "") {
      errors.propertyId = "Property ID is required";
      valid = false;
    } else if (formData.propertyId < 1) {
      errors.propertyId = "ID must not be less then 1";
      valid = false;
    }

    let checkValidID = formData.propertyId.toString();
    if (checkValidID.length != 12) {
      errors.propertyId = "ID must be valid 12 digits Uniqe Identification number";
      valid = false;
    }

    if (block == 'none' ){
      setAlert({
        status: true,
        msg: "All fields are required",
        type: "error"
      })
      valid = false ;
    } 

    if (province == "none"  ){
      setAlert({
        status: true,
        msg: "All fields are required",
        type: "error"
      })
      valid = false ;
    }
    if (distric == 'none' ){
      setAlert({
        status: true,
        msg: "All fields are required",
        type: "error"
      })
      valid = false ;
    }
    if (society == 'none' ){
      setAlert({
        status: true,
        msg: "All fields are required",
        type: "error"
      })
      valid = false ;
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
      }, 600000)
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

  const [provinceOptions, setPropvinceOptions] = useState([])


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return
    }
    let confirm = window.confirm("Are you sure want to Submit?");
    if (confirm) {

      const { ethereum } = window;
      let contractAddress = lockContractAddress;
      let _propertyId = formData.propertyId;
      let societyName = areaName;

      console.log("Society Name" + societyName)


      const walletProvider = new ethers.providers.Web3Provider(
        ethereum
      )

      const signer = walletProvider.getSigner();
      const sendTx = new ethers.Contract(
        contractAddress,
        landInspectorContract.abi,
        signer
      )

      const dataResult = await sendTx.addNewProperty(_propertyId, societyName, { gasLimit: 5000000 });

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

      setAlert({
        status: true,
        msg: "Submitted Successfuly!",
        type: "success"
      });
    }

  };

  const [distric, setDistric] = useState("none");
  const [province, setProvince] = useState("none");
  const [society, setSociety] = useState("none");
  const [block, setBlock] = useState("none");

  const [areaName, setAreaName] = useState("none");

  const [propertyId, setPropertyId] = useState("");

  const [districOptions, setDistricOptions] = useState([]);

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


  const [societyOtpions, setSocietyOptions] = useState([])


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

  const [areaOptions, setAreaOptions] = useState([])


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
      let _landInspector = json[0].landInspector
      console.log("Land")
      console.log(_landInspector)
      setLockContractAddress(_landInspector);
    }
    fetchContracts();
  };

  const handChangePropertyId = (e) => {
    setPropertyId(e.target.value);
  }

  return (
    <Box
      width="100%"
      sx={{
        border: "2px solid gray",
        padding: 2,
        borderRadius: "15px",
        backgroundColor: '#f2f2f2'
      }}
    >
      <Typography variant="h4" color='#060606' fontSize="25px" fontWeight="bold">
        Add New Property to Blockchain
      </Typography>
      <Divider />
      <Box mt={3}>
        <Box component="form" id="addProperty-form">
          <Grid container spacing={2}>
            <Grid item lg={4} md={4} sm={4}>
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

            <Grid item lg={4} md={4} sm={4}>
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

            <Grid item lg={4} md={4} sm={4}>
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

            <Grid item lg={4} md={4} sm={4}>
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

            <Grid item lg={12} md={12} sm={12}>
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
          </Grid>
          <Box textAlign="center">
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3, mb: 2, px: 5 }}
            >
              Add
            </Button>
          </Box>

          {alert.status ? <Alert severity={alert.type} sx={{ mt: 3 }}>{alert.msg}</Alert> : ''}
          {etherScanAlert.status ? <><Alert severity={etherScanAlert.type} sx={{ mt: 3 }}>{etherScanAlert.msg}<a href={etherScanAlert.url} target="_blank" > Click Me</a> </Alert>  </> : ''}

        </Box>
      </Box>
    </Box>
  );
};

export default AddPropertyForm;
