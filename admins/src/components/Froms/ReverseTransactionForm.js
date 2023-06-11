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

import highCourtContrac from "../../artifacts/contracts/Highcourt.sol/Highcourt.json";
import { ethers } from "ethers";
import { ownerShipAddress, HighCourtAddress , getAllDistricURL , getSocietyURL , getAreaURL , getAreaNameURL , getAllProvienceURL , getContractURL } from '../../dataVariables';

const ReverseTransactionForm = () => {
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
  const [areaContractAddress, setAreaContractAddress] = useState();

  const [propertId, setPropertyId] = useState();
  const [ownerCnic, setOwnerCnic] = useState();
  const [sharesAmmont, setSharesAmmount] = useState();
  const [otherApplicantCnic, setOtherApplicantCnic] = useState();
  const [caseNumber, setCaseNumber] = useState();
  const [Otp, setOtp] = useState(99);


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
      let _areaContractAddress = areaContractAddress;
      let _propertId = propertId;
      let _ownerCnic = ownerCnic;
      let _sharesAmmount = sharesAmmont;
      let _otherApplicantCnic = otherApplicantCnic;
      let _caseNum = caseNumber;
      let _otp = Otp;
      const walletProvider = new ethers.providers.Web3Provider(
        ethereum
      )
      const signer = walletProvider.getSigner();
      const sendTx = new ethers.Contract(
        contractAddress,
        highCourtContrac.abi,
        signer
      )
      const dataResult = await sendTx.generateReverseCase(
        _areaContractAddress,
        _propertId,
        _caseNum,
        _ownerCnic,
        _otherApplicantCnic,
        _sharesAmmount,
        _otp, { gasLimit: 5000000 });

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
        // console.log("URL")
        // console.log(url)
        const data = await fetch(url);
        // console.log("Data")
        // console.log(data);


        const json = await data.json();
        setDistricOptions(json)
    }
    fetchData();

};

const handleChangeDistric = (event) => {

    setDistric(event.target.value);

    const fetchData = async () => {
        let url = getSocietyURL + event.target.value;
        // console.log("URL")
        // console.log(url)
        const data = await fetch(url);
        // console.log("Data")
        // console.log(data);


        const json = await data.json();
        setSocietyOptions(json)
    }
    fetchData();
};

const handleChangeSociety = (event) => {
    setSociety(event.target.value);
    const fetchData = async () => {
        let url = getAreaURL + event.target.value;
        // console.log("URL")
        // console.log(url)
        const data = await fetch(url);
        // console.log("Data")
        // console.log(data);


        const json = await data.json();
        setAreaOptions(json)
    }
    fetchData();
};

const handleChangeBlock = (event) => {
    setBlock(event.target.value);
    const fetchData = async () => {
        let url = getAreaNameURL + event.target.value;
        // console.log("URL")
        // console.log(url)
        const data = await fetch(url);
        const json = await data.json();
        // console.log("Data")
        // console.log(json.name);
        let _name = json.name;
        // console.log(_name)
        setAreaName(_name)
        // console.log("Area Name: ");
        // console.log(areaName)
    }
    fetchData();

    const fetchContracts = async () => {
        let url = getContractURL + event.target.value;
        // console.log("URL")
        // console.log(url)
        const data = await fetch(url);
        const json = await data.json();
        // console.log("Data")
        // console.log(json.name);
        let _landInspector = json[0].highCourt
        let _areaContractAddress = json[0].areaContract

setAreaContractAddress(_areaContractAddress)
        console.log("Land")
        console.log(_landInspector)
        setLockContractAddress(_landInspector);
        // setAreaName(_name)
        // console.log("Area Name: ");
        // console.log(areaName)
    }
    fetchContracts();


    // setAreaName(event.target.value);

    // setLockContractAddress(landInspectorContractAddress);

};

useEffect(() => {

  // provinceOptions.push({id: "2" , name: "Ahsan"})
  var array;

  const fetchData = async () => {

    const data = await fetch(getAllProvienceURL);

    const json = await data.json();
    setPropvinceOptions(json)
  }
  fetchData()
  // console.log(array);
  // setPropvinceOptions(array)
  // console.log(provinceOptions)

}, [])

  const handleChangeOwnerCnic = (e) => {
    setOwnerCnic(e.target.value)
  }
  const handleChangeSharesAmmount = (e) => {
    setSharesAmmount(e.target.value)
  }
  const handleChangeOtherApplicatant = (e) => {
    setOtherApplicantCnic(e.target.value)
  }
  const handleChangeCaseNum = (e) => {
    setCaseNumber(e.target.value)
  }
  const handleChangeOtpCode = (e) => {
    setOtp(e.target.value)
  }
  const handleChangePropertyId = (e) => {
    setPropertyId(e.target.value)
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
      <Typography variant="h4" fontSize="25px" fontWeight="bold" color='primary'>
        Reverse of Ownership
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
                  {/* <MenuItem value="punjab">punjab</MenuItem>
                  <MenuItem value="sindh">Karachi</MenuItem>
                  <MenuItem value="balochistan">Sialkot</MenuItem>
                  <MenuItem value="KPK">KPK</MenuItem> */}
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

                  {/* <MenuItem value="lahore">Lahore</MenuItem>
                  <MenuItem value="karachi">Karachi</MenuItem>
                  <MenuItem value="sialkot">Sialkot</MenuItem> */}
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

                  {/* <MenuItem value="park-view">Park View</MenuItem>
                  <MenuItem value="bahria">Bahria</MenuItem>
                  <MenuItem value="rehman-garden">Rehman Garden</MenuItem>
                  <MenuItem value="iqbal-town">Iqbal Town</MenuItem> */}
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
                  {/* <MenuItem value="bahria-1-A">A Block</MenuItem>
                  <MenuItem value="bahria">B Block</MenuItem>
                  <MenuItem value="rehman-garden">X Block</MenuItem>
                  <MenuItem value="iqbal-town">Y Block</MenuItem> */}
                </Select>
              </FormControl>
            </Grid>
{/* 
            <Grid item lg={4} md={4} sm={4}>
              <TextField
                fullWidth
                id="propertyTitle"
                label="Property Title"
                variant="outlined"
                name="propertyTitle"

              />
            </Grid> */}

            <Grid item lg={4} md={4} sm={4}>
              <TextField
                fullWidth
                id="propertyID"
                name="propertyID"
                label="Property ID"
                variant="outlined"
                onChange={handleChangePropertyId}
              />
            </Grid>

            <Grid item lg={4} md={4} sm={4}>
              <TextField
                fullWidth
                id="OwnerCnic"
                name="OwnerCnic"
                label="Owner Cnic"
                variant="outlined"
                type="Number"
                placeholder="3520200000000"
                onChange={handleChangeOwnerCnic}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={4}>
              <TextField
                fullWidth
                id="sharesAmount"
                name="sharesAmount"
                label="Shares Amount"
                variant="outlined"
                type="number"
                placeholder="0-100"
                inputProps={{ min: 0, max: 100 }}
                onChange={handleChangeSharesAmmount}

              />
            </Grid>
            <Grid item lg={4} md={4} sm={4}>
              <TextField
                fullWidth
                id="otherApplicantCNIC"
                name="otherApplicantCNIC"
                label="Other Applicant Cnic"
                variant="outlined"
                type="Number"
                placeholder="3520200000000"
                onChange={handleChangeOtherApplicatant}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={4}>
              <TextField
                fullWidth
                id="caseNumber"
                name="caseNumber"
                label="Case Number"
                variant="outlined"
                type="Number"
                onChange={handleChangeCaseNum}
              />
            </Grid>
            {/* <Grid item lg={4} md={4} sm={4}>
              <TextField
                fullWidth
                id="OTPCode"
                name="OTPCode"
                label="OTP Code"
                variant="outlined"
                type="Number"
                inputProps={{ minLength: 8, }}
                placeholder="Minimum 8 Digits Code"
                onChange={handleChangeOtpCode}
              />
            </Grid> */}
          </Grid>
          <Box textAlign="center">
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, px: 5 }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
          {alert.status ? <Alert severity={alert.type} sx={{ mt: 3 }}>{alert.msg}</Alert> : ''}
          {etherScanAlert.status ? <><Alert severity={etherScanAlert.type} sx={{ mt: 3 }}>{etherScanAlert.msg}<a href={etherScanAlert.url} target="_blank" > Click Me</a> </Alert>  </> : ''}


        </Box>
      </Box>
    </Box>
  );
}

export default ReverseTransactionForm