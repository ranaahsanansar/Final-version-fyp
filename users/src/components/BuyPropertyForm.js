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
import React, { useEffect, useState } from "react";
import areaContract from "../artifacts/contracts/OwnerShip.sol/OwnerShip.json";
import { ethers } from "ethers";
import { ownerShipAddress } from "../dataVariables";
import { useFormik } from "formik";
import * as Yup from "yup";

import nodeProviderUrl, { getAllDistricURL, getAllProvienceURL, getAreaNameURL, getAreaURL, getContractURL, getSocietyURL , landInspectorContractAddress , govermentAuthorityContractAddress } from "../dataVariables";


const validationSchema = Yup.object().shape({
  propertyId: Yup.number().required("Property ID is required"),
  ownerCNIC: Yup.number().required("CNIC of Owner is required"),
  sharesAmmount: Yup.number().required("Amount of Shares is required"),
  reqNumber: Yup.number().required("Request Number is required"),
  agree: Yup.boolean()
    .oneOf([true], "You must agree to this transaction")
    .required("You must agree to this transaction"),
});

const BuyPropertyForm = () => {


  const [etherScanAlert, setEtherScanAlert] = useState({
    status: false,
    msg: "",
    url: "",
    type: "",
  });

  const [areaOptions, setAreaOptions] = useState([])
const [provinceOptions, setPropvinceOptions] = useState([]);
const [districOptions, setDistricOptions] = useState([]);
const [societyOtpions, setSocietyOptions] = useState([]);

const [areaName, setAreaName] = useState("none");

  const [lockContractAddress, setLockContractAddress] = useState("");

  const [alert, setAlert] = useState({
    status: false,
    msg: "",
    type: "",
  });

  const formik = useFormik({
    initialValues: {
      province: "punjab",
      distric: "lahore",
      society: "none",
      block: "park-view",
      propertyId: "",
      ownerCNIC: "",
      sharesAmmount: "",
      reqNumber: "",
      agree: false,
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    const {
      province,
      distric,
      society,
      block,
      propertyId,
      ownerCNIC,
      sharesAmmount,
      reqNumber,
      agree,
    } = values;

    if (province && distric && society && block && propertyId && ownerCNIC && sharesAmmount && reqNumber && agree) {
      const { ethereum } = window;
      let contractAddress = lockContractAddress;
      const walletProvider = new ethers.providers.Web3Provider(ethereum);
      const signer = walletProvider.getSigner();
      const sendTx = new ethers.Contract(
        contractAddress,
        areaContract.abi,
        signer
      );
      // console.log("Ok ha");

      const dataResult = await sendTx.signatureForBuyer(
        propertyId,
        ownerCNIC,
        sharesAmmount,
        reqNumber,
        { gasLimit: 5000000 }
      );
      let txHash = dataResult.hash;
      let scanUrl = "https://sepolia.etherscan.io/tx/" + txHash;

      setEtherScanAlert({
        status: true,
        msg: "View Transaction on EtherScan",
        url: scanUrl,
        type: "success",
      });
      setAlert({
        status: true,
        msg: "Your Request is now generated! Contact the land Inspector",
        type: "success",
      });
    } else {
      setAlert({
        status: true,
        msg: "All Fields are required!",
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
  });

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


  // const handleChangeProvience = (event) => {
  //   formik.setFieldValue("province", event.target.value);
  // };

  // const handleChangeDistric = (event) => {
  //   formik.setFieldValue("distric", event.target.value);
  // };

  // const handleChangeSociety = (event) => {
  //   formik.setFieldValue("society", event.target.value);
  // };

  // const handleChangeBlock = (event) => {
  //   formik.setFieldValue("block", event.target.value);
  //   setLockContractAddress(ownerShipAddress);
  // };

  const [province , setProvience] = useState("none")
  const [distric , setDistric] = useState("none")
  const [society , setSociety] = useState("none")
  const [block , setBlock] = useState("none")

  const handleChangeProvience = (event) => {
     formik.setFieldValue("province", event.target.value); 
     setProvience(event.target.value)

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

  formik.setFieldValue("distric", event.target.value);
  setDistric(event.target.value)

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
  formik.setFieldValue("society", event.target.value);
  setSociety(event.target.value)
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
  formik.setFieldValue("block", event.target.value);
  setBlock(event.target.value)
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
        let _landInspector = json[0].areaContract
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


  const handleCheck = (event) => {
    formik.setFieldValue("agree", event.target.checked);
  };

  return (
    <Box
      component="form"
      noValidate
      sx={{ mt: 1 }}
      id="buyProperty-form"
      onSubmit={formik.handleSubmit}
    >
      <Grid container spacing={2}>
        <Grid item sm={12} xs={12} md={6} lg={6}>
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

        <Grid item sm={12} xs={12} md={6} lg={6}>
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

        <Grid item sm={12} xs={12} md={6} lg={6}>
          <TextField
            fullWidth
            required
            id="ownerCNIC"
            name="ownerCNIC"
            label="CNIC of Owner"
            value={formik.values.ownerCNIC}
            onChange={formik.handleChange}
            error={formik.touched.ownerCNIC && Boolean(formik.errors.ownerCNIC)}
            helperText={formik.touched.ownerCNIC && formik.errors.ownerCNIC}
          />
        </Grid>

        <Grid item sm={12} xs={12} md={6} lg={6}>
          <TextField
            fullWidth
            required
            id="sharesAmmount"
            name="sharesAmmount"
            label="Amount of Shares"
            value={formik.values.sharesAmmount}
            onChange={formik.handleChange}
            error={formik.touched.sharesAmmount && Boolean(formik.errors.sharesAmmount)}
            helperText={formik.touched.sharesAmmount && formik.errors.sharesAmmount}
          />
        </Grid>

        <Grid item sm={12} xs={12} md={6} lg={6}>
          <TextField
            fullWidth
            required
            id="reqNumber"
            name="reqNumber"
            label="Request Number"
            value={formik.values.reqNumber}
            onChange={formik.handleChange}
            error={formik.touched.reqNumber && Boolean(formik.errors.reqNumber)}
            helperText={formik.touched.reqNumber && formik.errors.reqNumber}
          />
        </Grid>

        <Grid item sm={12} xs={12} md={6} lg={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.agree}
                onChange={handleCheck}
                name="agree"
                color="primary"
                required
              />
            }
            label="I agree to this transaction"
          />
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            // disabled={formik.isSubmitting}
            >
              Submit
            </Button>
            <Button
              type="reset"
              variant="outlined"
              color="secondary"
              onClick={formik.handleReset}
            >
              Reset
            </Button>
          </Stack>
        </Grid>
      </Grid>

      {alert.status && (
        <Alert severity={alert.type} sx={{ mt: 2 }}>
          {alert.msg}
        </Alert>
      )}

      {etherScanAlert.status && (
        <Alert severity={etherScanAlert.type} sx={{ mt: 2 }}>
          <Button
            href={etherScanAlert.url}
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            {etherScanAlert.msg}
          </Button>
        </Alert>
      )}
    </Box>
  );
};

export default BuyPropertyForm;
