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

import govAuthorityContract from "../../artifacts/contracts/govermenAuthority.sol/GovermentAuthority.json"
import { ethers } from "ethers";
import nodeProviderUrl, { getAllDistricURL, getAllProvienceURL, getAreaNameURL, getAreaURL, getContractURL, getSocietyURL, landInspectorContractAddress, govermentAuthorityContractAddress } from "../../dataVariables";


const SingToReverse = () => {


  const [formData, setFormData] = useState({
    propertyId: "",
    caseNum: ""
  });

  const [formErrors, setFormErrors] = useState({
    propertyId: "",
    caseNum: ""
  });


  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (formData.propertyId == "") {
      errors.propertyId = "Field is required";
      valid = false;
    } else if (formData.propertyId < 1) {
      errors.propertyId = "ID must not be less then 1";
      valid = false;
    }

    if (formData.caseNum == "") {
      errors.caseNum = "Field is required";
      valid = false;
    } else if (formData.caseNum < 1) {
      errors.caseNum = "Value must not be less then 1";
      valid = false;
    }


    let checkValidID = formData.propertyId.toString();
    if (checkValidID.length != 12) {
      errors.propertyId = "ID must be valid 12 digits Uniqe Identification number";
      valid = false;
    }


    if (block == 'none') {
      setAlert({
        status: true,
        msg: "All fields are required",
        type: "error"
      })
      valid = false;
    }

    if (province == "none") {
      setAlert({
        status: true,
        msg: "All fields are required",
        type: "error"
      })
      valid = false;
    }
    if (distric == 'none') {
      setAlert({
        status: true,
        msg: "All fields are required",
        type: "error"
      })
      valid = false;
    }
    if (society == 'none') {
      setAlert({
        status: true,
        msg: "All fields are required",
        type: "error"
      })
      valid = false;
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
  // -------------------
  const [distric, setDistric] = useState("none");
  const [province, setProvince] = useState("none");
  const [society, setSociety] = useState("none");
  const [block, setBlock] = useState("none");



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
  const [areaContractAddress, setAreaContractAddress] = useState("");

  const [propertyId, setPropertyId] = useState();
  const [caseNumber, setCaseNumber] = useState();
  const [otpVerify, setOtpVerify] = useState(99);
  const [newOtp, setNewOtp] = useState(88);

  const handleChangePropertyId = (e) => {
    setPropertyId(e.target.value)
  }
  const handleChangeCaseNum = (e) => {
    setCaseNumber(e.target.value)
  }
  const handleChangeOtpVerify = (e) => {
    setOtpVerify(e.target.value)
  }
  const handleChangeNewOtp = (e) => {
    setNewOtp(e.target.value)
  }

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
    if (!validateForm()){
      return
    }
    let confirm = window.confirm("Are you sure want to Submit?");
    if (confirm) {
      const { ethereum } = window;

      let contractAddress = lockContractAddress;
      let _areaContractAddress = areaContractAddress;
      let _propertyId = formData.propertyId;
      let _caseNumber = formData.caseNum;
      let _otpVerify = otpVerify;
      let _newOtp = newOtp;


      const walletProvider = new ethers.providers.Web3Provider(
        ethereum
      )

      const signer = walletProvider.getSigner();

      const sendTx = new ethers.Contract(
        contractAddress,
        govAuthorityContract.abi,
        signer
      )


      const dataResult = await sendTx.signatureToReverse(_areaContractAddress, _propertyId,
        _caseNumber,
        _otpVerify,
        _newOtp, { gasLimit: 5000000 });
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
      let _landInspector = json[0].govermentAuthority
      let _areaContractAddress = json[0].areaContract

      setAreaContractAddress(_areaContractAddress)
      console.log("Land")
      console.log(_landInspector)
      setLockContractAddress(_landInspector);
    }
    fetchContracts();

  };

  useEffect(() => {

    var array;

    const fetchData = async () => {

      const data = await fetch(getAllProvienceURL);

      const json = await data.json();
      setPropvinceOptions(json)
    }
    fetchData()

  }, [])


  return (
    <Box
      width="100%"
      sx={{
        border: "2px solid gray",
        padding: 2,
        borderRadius: "15px", backgroundColor: '#f2f2f2'
      }}
    >
      <Typography variant="h4" fontSize="25px" fontWeight="bold" color='#060606'>
        Signature to Reverse Case
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



            <Grid item lg={4} md={4} sm={4}>
              <TextField
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


            <Grid item lg={4} md={4} sm={4}>
              <TextField
              fullWidth
              required
              id="caseNum"
              name="caseNum"
              label="Case Number"
              type="number"
              value={formData.caseNum}
              onChange={handleChange}
              inputProps={{ min: 0 }}
              error={Boolean(formErrors.caseNum)}
              helperText={formErrors.caseNum}
            />
            </Grid>
          </Grid>
          <Box textAlign="center">
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, px: 5 }}
              onClick={handleSubmit}
            >
              Signature
            </Button>
          </Box>
          {alert.status ? <Alert severity={alert.type} sx={{ mt: 3 }}>{alert.msg}</Alert> : ''}
          {etherScanAlert.status ? <><Alert severity={etherScanAlert.type} sx={{ mt: 3 }}>{etherScanAlert.msg}<a href={etherScanAlert.url} target="_blank" > Click Me</a> </Alert>  </> : ''}

        </Box>
      </Box>
    </Box>
  );
}

export default SingToReverse