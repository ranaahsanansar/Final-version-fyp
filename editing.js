
import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import areaContract from "../artifacts/contracts/OwnerShip.sol/OwnerShip.json";
import { ethers } from "ethers";
import { useFormik } from 'formik';


import { ownerShipAddress } from "../dataVariables";

import { nodeProviderUrl, getAllDistricURL, getAllProvienceURL, getAreaNameURL, getAreaURL, getContractURL, getSocietyURL, landInspectorContractAddress, govermentAuthorityContractAddress } from "../dataVariables";



const SellPropertyForm = () => {

  const formik = useFormik({
    initialValues: {
      province: '',
      district: '',
      society: '',
      block: '',
      propertyId: '',
      ownerCNIC: '',
      sharesAmount: '',
      priceOfShare: '',
      buyerCNIC: '',
      agree: false,
    },
    validate: (values) => {
      const errors = {};
      if (!values.propertyId) {
        errors.propertyId = 'Property ID is required';
      }
      if (!values.ownerCNIC) {
        errors.ownerCNIC = 'Owner CNIC is required';
      } else if (isNaN(values.ownerCNIC)) {
        errors.ownerCNIC = 'Owner CNIC must be a number';
      }
      if (!values.priceOfShare) {
        errors.priceOfShare = 'Price of Share is required';
      } else if (isNaN(values.priceOfShare)) {
        errors.priceOfShare = 'Price of Share must be a number';
      }
      if (!values.buyerCNIC) {
        errors.buyerCNIC = 'Buyer CNIC is required';
      } else if (isNaN(values.buyerCNIC)) {
        errors.buyerCNIC = 'Buyer CNIC must be a number';
      }
      if (!values.agree) {
        errors.agree = 'Agreeing to the terms is required';
      }
      return errors;
    },
    onSubmit: (values) => {
      // Place your existing submission logic here
      // Use values.propertyId, values.ownerCNIC, etc. to access the form values
      console.log("hye")
      console.log(values)
      handleSubmit(values)
    },
  });


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

  const [lockContractAddress, setLockContractAddress] = useState("");

  const [areaOptions, setAreaOptions] = useState([])
  const [provinceOptions, setPropvinceOptions] = useState([]);
  const [districOptions, setDistricOptions] = useState([]);
  const [societyOtpions, setSocietyOptions] = useState([]);

  const [areaName, setAreaName] = useState("none");

  const handleSubmit = async (values) => {
    // e.preventDefault();
    // const data = new FormData(e.currentTarget);
    console.log(values)
    const actualData = {
      // province: data.get('province'),
      // distric: data.get('distric'),
      // society: data.get('society'),
      // block: data.get('block'),
      propertyId: values.propertyId,
      ownerCNIC: values.ownerCNIC,
      sharesAmmount: values.sharesAmount,
      priceOfShare: values.priceOfShare,
      buyerCNIC: values.buyerCNIC,
      agree: values.agree
    }

    console.log(values.propertyId)
    // console.log(actualData)
    if (actualData.propertyId && actualData.ownerCNIC && actualData.priceOfShare && actualData.buyerCNIC && actualData.agree) {

      const { ethereum } = window;

      let contractAddress = lockContractAddress;

      const walletProvider = new ethers.providers.Web3Provider(
        ethereum
      )

      const provider = new ethers.providers.JsonRpcProvider(nodeProviderUrl);


      const signer = walletProvider.getSigner();

      const sendTx = new ethers.Contract(
        contractAddress,
        areaContract.abi,
        signer
      )
      console.log("Ok ha")
      console.log(signer)

      let _ownerCnic = parseInt(actualData.ownerCNIC);

      let _propertyId = parseInt(actualData.propertyId)

      let _shareAmmount = parseInt(actualData.sharesAmmount);

      let _priceOfShare = parseInt(actualData.priceOfShare);

      let _buyerCnic = parseInt(actualData.buyerCNIC);

      console.log(_ownerCnic)
      console.log(_propertyId)
      console.log(_shareAmmount)
      console.log(_priceOfShare)
      console.log(_buyerCnic)
      const dataResult = await sendTx.transferOwnerShipRequest(
        _ownerCnic,
        _propertyId,
        _shareAmmount,
        _priceOfShare,
        _buyerCnic,
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
      // Get the transaction receipt
      const transactionReceipt = await provider.getTransactionReceipt(dataResult.hash);

      // Get the return value from the transaction receipt
      //  const returnValue = ethers.utils.hexlify(transactionReceipt.logs[0].data);

      const returnValue = ethers.utils.defaultAbiCoder.decode(['uint256'], dataResult);


      console.log("1: " + returnValue);
      console.log("2: " + dataResult);

      // await dataResult.wait();

      // console.log(dataResult)

      setAlert({
        status: true,
        msg: "Your Request is now generated! Check on EtherScan",
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


  const [distric, setDistric] = useState('none');
  const [province, setProvince] = useState('none');
  const [selectPropertyId, setSelectPropertyId] = useState('none');
  const [society, setSociety] = useState('none');
  const [block, setBlock] = useState('none');


  const [checked, setChecked] = useState(false);





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
      let _landInspector = json[0].landInspector
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


  const handleChangePropertyId = (event) => {
    setSelectPropertyId(event.target.value);
  };
  // const handleChangeSociety = (event) => {
  //     setSociety(event.target.value);
  // };
  const handleCheck = (event) => {
    setChecked(event.target.checked);
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

  return (
    <Box sx={{ backgroundColor: 'white', borderRadius: 2, padding: 2 }} >
      <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        id="buyProperty-form"
        onSubmit={formik.handleSubmit}
        // onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>

          <Grid item sm={12} xs={12} md={6} lg={6}>
            < FormControl fullWidth >
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
            </FormControl >
          </Grid>

          <Grid item sm={12} xs={12} md={6} lg={6}>
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

          <Grid item sm={12} xs={12} md={6} lg={6}>
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

          <Grid item sm={12} xs={12} md={6} lg={6}>
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

          <Grid item sm={12} xs={12} md={12} lg={12}>
            {/* <FormControl fullWidth>
                            <InputLabel id="property-id-label">Property ID</InputLabel>

                            <Select
                                fullWidth
                                required
                                labelId="property-id-label"
                                id="propertyId"
                                name="propertyId"
                                value={selectPropertyId}
                                label="propertyId"
                                onChange={handleChangePropertyId}
                            >
                                <MenuItem value="none">None</MenuItem>
                                <MenuItem value="5555">5555</MenuItem>
                                <MenuItem value="888">888</MenuItem>
                                <MenuItem value="999">999</MenuItem>
                            </Select>
                        </FormControl> */}
            {/* <TextField
                            margin="normal"
                            fullWidth
                            required
                            id="propertyId"
                            name="propertyId"
                            label="Property ID"
                            type="number"
                            onChange={handleChangePropertyId}
                            inputProps={{ min: 0 }}
                        /> */}
           <TextField
            fullWidth
            required
            id="propertyId"
            name="propertyId"
            label="Property ID"
            value={formik.values.propertyId}
            onChange={formik.handleChange}
            error={formik.touched.propertyId && Boolean(formik.errors.propertyId)}
            helperText={formik.touched.propertyId && formik.errors.propertyId}
          />

          </Grid>
          {/* <Grid item sm={12} xs={12} md={6} lg={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            id="sellerEmail"
                            name="sellerEmail"
                            label="Your Email"
                            type="String"
                        />
                        <Typography fontSize='small' >You will recive request number through this email</Typography>
                    </Grid> */}

          {/* <Grid item sm={12} xs={12} md={6} lg={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            id="ownerFullName"
                            name="ownerFullName"
                            label="Full Name of Owner"
                            type="String"
                        />
                    </Grid> */}
          <Grid item sm={12} xs={12} md={6} lg={6}>
            {/* <TextField
              margin="normal"
              fullWidth
              required
              id="ownerCNIC"
              name="ownerCNIC"
              label="CNIC of Owner"
              type="number"
              inputProps={{ min: 0 }}
            /> */}
            <TextField
              fullWidth
              required
              id="ownerCNIC"
              name="ownerCNIC"
              label="Seller Cnic"
              value={formik.values.ownerCNIC}
              onChange={formik.handleChange}
              error={formik.touched.ownerCNIC && Boolean(formik.errors.ownerCNIC)}
              helperText={formik.touched.ownerCNIC && formik.errors.ownerCNIC}
            />
          </Grid>


          <Grid item sm={12} xs={12} md={6} lg={6}>
            {/* <TextField
              margin="normal"
              fullWidth
              required
              id="sharesAmmount"
              name="sharesAmmount"
              label="Ammount of Shares"
              type="number"
              inputProps={{ min: 0 }}
            /> */}
            <TextField
              fullWidth
              required
              id="sharesAmount"
              name="sharesAmount"
              label="Shares Amount"
              value={formik.values.sharesAmount}
              onChange={formik.handleChange}
              error={formik.touched.sharesAmount && Boolean(formik.errors.sharesAmount)}
              helperText={formik.touched.sharesAmount && formik.errors.sharesAmount}
            />
          </Grid>
          <Grid item sm={12} xs={12} md={6} lg={6}>
            {/* <TextField
              margin="normal"
              fullWidth
              required
              id="priceOfShare"
              name="priceOfShare"
              label="Price of One Share"
              type="number"
              inputProps={{ min: 0 }}
            /> */}
            <TextField
              fullWidth
              required
              id="priceOfShare"
              name="priceOfShare"
              label="price"
              value={formik.values.priceOfShare}
              onChange={formik.handleChange}
              error={formik.touched.priceOfShare && Boolean(formik.errors.priceOfShare)}
              helperText={formik.touched.priceOfShare && formik.errors.priceOfShare}
            />
            
          </Grid>
          <Grid item sm={12} xs={12} md={6} lg={6}>
            {/* <TextField
              margin="normal"
              fullWidth
              required
              id="buyerCNIC"
              name="buyerCNIC"
              label="Buyer CNIC"
              type="number"
              inputProps={{ min: 0 }}
            /> */}
            <TextField
              fullWidth
              required
              id="buyerCNIC"
              name="buyerCNIC"
              label="Buyer CNIC"
              value={formik.values.buyerCNIC}
              onChange={formik.handleChange}
              error={formik.touched.buyerCNIC && Boolean(formik.errors.buyerCNIC)}
              helperText={formik.touched.buyerCNIC && formik.errors.buyerCNIC}
            />
            
          </Grid>
          <Grid item sm={12} xs={12} md={12} lg={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleCheck}
                  name="agree"
                  color="primary"
                />
              }
              label="I Agree to this Transaction"
            />
          </Grid>
        </Grid>
        <Box textAlign="center">
          <Button
          type="submit"
            variant="contained"
            
            sx={{ mt: 3, mb: 2, px: 5, backgroundColor: "#F3E5AB", color: "black" }}
          >
            Submit
          </Button>
        </Box>
        {alert.status ? <Alert severity={alert.type} sx={{ mt: 3 }}>{alert.msg}</Alert> : ''}

        {etherScanAlert.status ? <><Alert severity={etherScanAlert.type} sx={{ mt: 3 }}>{etherScanAlert.msg}<a href={etherScanAlert.url} target="_blank" > Click Me</a> </Alert>  </> : ''}



      </Box>
    </Box>
  )
}

export default SellPropertyForm
