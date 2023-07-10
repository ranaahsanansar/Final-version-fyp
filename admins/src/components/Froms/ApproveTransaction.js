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

import landInspectorContract from "../../artifacts/contracts/LandInspector.sol/LandInspector.json";
import { ethers } from "ethers";
import nodeProviderUrl, { getAllDistricURL, getAllProvienceURL, getAreaNameURL, getAreaURL, getContractURL, getSocietyURL, landInspectorContractAddress, govermentAuthorityContractAddress } from "../../dataVariables";


const ApproveTransaction = () => {

  const [formData, setFormData] = useState({
    propertyId: "",
    ownerCNIC: "",
    buyerCnic: "",
    reqNum: ""
  });

  const [formErrors, setFormErrors] = useState({
    propertyId: "",
    ownerCNIC: "",
    buyerCnic: "",
    reqNum: ""
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

    if (formData.ownerCNIC == "") {
      errors.ownerCNIC = "Owner CNIC is required";
      valid = false;
    } else if (formData.ownerCNIC < 1) {
      errors.ownerCNIC = "Value must not be less then 1";
      valid = false;
    }

    if (formData.buyerCnic == "") {
      errors.shares = "Shares is required";
      valid = false;
    }

    if (formData.reqNum == "") {
      errors.reqNum = "Field is required";
      valid = false;
    } else if (formData.reqNum < 1) {
      errors.reqNum = "Value must not be less then 1";
      valid = false;
    }

    // -------------------------------

    let checkValidID = formData.propertyId.toString();
    if (checkValidID.length != 12) {
      errors.propertyId = "ID must be valid 12 digits Uniqe Identification number";
      valid = false;
    }
    let checkValidCnic = formData.ownerCNIC.toString();
    if (checkValidCnic.length != 13) {
      errors.ownerCNIC = "Cnicn Must be Valid";
      valid = false;
    }

    let buyerCnicValid = formData.buyerCnic.toString();
    if (buyerCnicValid.length != 13) {
      errors.buyerCnic = "Cnicn Must be Valid";
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

  const [etherScanAlert, setEtherScanAlert] = useState({
    status: false,
    msg: "",
    url: "",
    type: ""
  });

  const [lockContractAddress, setLockContractAddress] = useState("");
  const [areaContractAddress, setAreaContractAddress] = useState("");
  const [distric, setDistric] = useState('none');
  const [province, setProvince] = useState('none');
  const [society, setSociety] = useState('none');
  const [block, setBlock] = useState('none');

  const [propertyId, setPropertyId] = useState("")
  const [selletCnic, setSellerCnic] = useState("")
  const [buyerCnic, setbuyerCnic] = useState("")
  const [requestNum, setRequestNum] = useState("")



  const [areaOptions, setAreaOptions] = useState([])
  const [provinceOptions, setPropvinceOptions] = useState([]);
  const [districOptions, setDistricOptions] = useState([]);
  const [societyOtpions, setSocietyOptions] = useState([]);

  const [areaName, setAreaName] = useState("none");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return
    }
    const actualData = {
      id: formData.propertyId,
      sellerCnic: formData.ownerCNIC ,
      buyerCnic: formData.buyerCnic,
      requestNumber: formData.reqNum
    }

    let confirm = window.confirm("Are you sure want to Submit?");
    if (confirm) {


      const { ethereum } = window;

      let contractAddress = lockContractAddress;
      let areaContract = areaContractAddress;

      const walletProvider = new ethers.providers.Web3Provider(
        ethereum
      )

      const signer = walletProvider.getSigner();
      const sendTx = new ethers.Contract(
        contractAddress,
        landInspectorContract.abi,
        signer
      )

      const dataResult = await sendTx.approveTransferRequest(
        areaContract,
        actualData.id,
        actualData.requestNumber,
        actualData.sellerCnic,
        actualData.buyerCnic,
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
      let _landInspector = json[0].landInspector
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


  const handleChangeId = (e) => {
    setPropertyId(e.target.value)
  }
  const handleChangeSellerCnic = (e) => {
    setSellerCnic(e.target.value)
  }
  const handleChangeBuyerCnic = (e) => {
    setbuyerCnic(e.target.value);
  }
  const handleChangeReqNum = (e) => {
    setRequestNum(e.target.value);
  }
  return (
    <Box width='100%' sx={{
      border: '2px solid gray', padding: 2, borderRadius: '15px', backgroundColor: '#f2f2f2'
    }} >
      <Typography variant="h4" fontSize='25px' fontWeight='bold' color='#060606'>Approve Ownership Transaction Request</Typography>
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

            <Grid item lg={4} md={4} sm={4} >
              <TextField
                fullWidth
                required
                id="ownerCNIC"
                name="ownerCNIC"
                label="Seller CNIC"
                type="number"
                value={formData.ownerCNIC}
                onChange={handleChange}
                inputProps={{ min: 0 }}
                error={Boolean(formErrors.ownerCNIC)}
                helperText={formErrors.ownerCNIC}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={4} >

              <TextField
                fullWidth
                required
                id="buyerCnic"
                name="buyerCnic"
                label="BuyerCnic ID"
                type="number"
                value={formData.buyerCnic}
                onChange={handleChange}
                inputProps={{ min: 0 }}
                error={Boolean(formErrors.buyerCnic)}
                helperText={formErrors.buyerCnic}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={4} >

              <TextField
                fullWidth
                required
                id="reqNum"
                name="reqNum"
                label="Request Number"
                type="number"
                value={formData.reqNum}
                onChange={handleChange}
                inputProps={{ min: 0 }}
                error={Boolean(formErrors.reqNum)}
                helperText={formErrors.reqNum}
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
              Trasnfer
            </Button>
          </Box>
          {alert.status ? <Alert severity={alert.type} sx={{ mt: 3 }}>{alert.msg}</Alert> : ''}
          {etherScanAlert.status ? <><Alert severity={etherScanAlert.type} sx={{ mt: 3 }}>{etherScanAlert.msg}<a href={etherScanAlert.url} target="_blank" > Click Me</a> </Alert>  </> : ''}
        </Box>
      </Box>
    </Box>
  );
}

export default ApproveTransaction