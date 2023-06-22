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
// import { citizenContractAddress, govermentAuthorityContractAddress } from "../../dataVariables";

import nodeProviderUrl, { getAllDistricURL, getAllProvienceURL, getAreaNameURL, getAreaURL, getContractURL, getSocietyURL , landInspectorContractAddress , govermentAuthorityContractAddress } from "../../dataVariables";

const DeclareDeathForm = () => {


  const [formData, setFormData] = useState({
   
    ownerCNIC: ""
  });
  
  const [formErrors, setFormErrors] = useState({
   
    ownerCNIC: ""
  });
  
  
  const validateForm = () => {
    let valid = true;
    const errors = {};
  
    if (formData.ownerCNIC == "") {
      errors.ownerCNIC = "Field is required";
      valid = false;
    } else if (formData.ownerCNIC < 1) {
      errors.ownerCNIC = "Value must not be less then 1";
      valid = false;
    }
  
  
    let checkValidCnic = formData.ownerCNIC.toString();
    if (checkValidCnic.length != 13) {
      errors.ownerCNIC = "Cnicn Must be Valid";
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
  
    // if (!formData.agree) {
    //   errors.agree = "You must agree to the terms and conditions";
    //   valid = false;
    // }
  
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

  
  // -------------------------
  const [distric, setDistric] = useState('none');
  const [province, setProvince] = useState('none');
  const [society, setSociety] = useState('none');
  const [block, setBlock] = useState('none');
  const [cnic, setCnic] = useState(null)

  const [citizenAddress, setCitizenAddress] = useState("");


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
    if(!validateForm()){
      return;
    }
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

      const dataResult = await sendTx.declareDeath(_citizenContractAddress, _id, { gasLimit: 5000000 });

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

  // const handleChangeProvience = (event) => {
  //   setProvince(event.target.value);
  // };
  // const handleChangeDistric = (event) => {
  //   setDistric(event.target.value);
  //   setLockContractAddress(govermentAuthorityContractAddress);
  //   setCitizenAddress(citizenContractAddress);
  // };

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
      let _govAuth = json[0].govermentAuthority

      let _citizenContractAddress = json[0].citzenContract

      setCitizenAddress(_citizenContractAddress)
      console.log("Land")
      console.log(_govAuth)
      setLockContractAddress(_govAuth);
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




  const handleChangeId = (e) => {
    setCnic(e.target.value)
  }
  return (
    <Box width='100%' sx={{
      border: '2px solid gray', padding: 2, borderRadius: '15px', backgroundColor: '#f2f2f2'
    }} >
      <Typography variant="h4" fontSize='25px' color='#060606' fontWeight='bold' >Declare Death of Citizzen</Typography>
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
                  {/* <MenuItem value="punjab">punjab</MenuItem>
                  <MenuItem value="sindh">Karachi</MenuItem>
                  <MenuItem value="balochistan">Sialkot</MenuItem>
                  <MenuItem value="KPK">KPK</MenuItem> */}
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

                  {/* <MenuItem value="lahore">Lahore</MenuItem>
                  <MenuItem value="karachi">Karachi</MenuItem>
                  <MenuItem value="sialkot">Sialkot</MenuItem> */}
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

                  {/* <MenuItem value="park-view">Park View</MenuItem>
                  <MenuItem value="bahria">Bahria</MenuItem>
                  <MenuItem value="rehman-garden">Rehman Garden</MenuItem>
                  <MenuItem value="iqbal-town">Iqbal Town</MenuItem> */}
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
                  {/* <MenuItem value="bahria-1-A">A Block</MenuItem>
                  <MenuItem value="bahria">B Block</MenuItem>
                  <MenuItem value="rehman-garden">X Block</MenuItem>
                  <MenuItem value="iqbal-town">Y Block</MenuItem> */}
                </Select>
              </FormControl>
            </Grid>

            <Grid item lg={4} md={4} sm={4} >
              {/* <TextField fullWidth id="Cnic" type="number" onChange={handleChangeId} name="cnic" label="CNIC" variant="outlined" /> */}

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