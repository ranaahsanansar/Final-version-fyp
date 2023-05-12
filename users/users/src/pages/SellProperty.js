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
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SellingRecords from "../components/SellingRecords";

const SellProperty = () => {

  const [alert, setAlert] = useState({
    status: false,
    msg: "",
    type: ""
});

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      province: data.get('province'),
      distric: data.get('distric'),
      society: data.get('society'),
      block: data.get('block'),
      propertyId: data.get('propertyId'),
      ownerFullName: data.get('ownerFullName'),
      ownerCNIC: data.get('ownerCNIC'),
      priceOfShare: data.get('priceOfShare'),
      buyerCNIC: data.get('buyerCNIC'),
      agree: data.get('agree')
    }
    console.log(actualData)
    if (actualData.province && actualData.distric && actualData.society && actualData.block && actualData.propertyId && actualData.ownerFullName && actualData.ownerCNIC && actualData.priceOfShare && actualData.buyerCNIC && actualData.agree ) {
      setAlert({
        status: true,
        msg: "Your Request is now generated! Contact to the land Inspector",
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

  })

  const [distric, setDistric] = useState('lahore');
  const [province, setProvince] = useState('punjab');
  const [selectPropertyId, setSelectPropertyId] = useState('none');
  const [society, setSociety] = useState('none');
  const [block, setBlock] = useState('park-view');



  const handleChangeProvience = (event) => {
    setProvince(event.target.value);
  };
  const handleChangeDistric = (event) => {
    setDistric(event.target.value);
  };
  const handleChangeBlock = (event) => {
    setBlock(event.target.value);
  };
  const handleChangePropertyId = (event) => {
    setSelectPropertyId(event.target.value);
  };
  const handleChangeSociety = (event) => {
    setSociety(event.target.value);
  };



  const glassMorphismStyle = {
    background: "rgba(255, 255, 255, 0.2)",
    boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  };

  const [checked, setChecked] = useState(false);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };


  return (
    <div>
      <Container>
        <Box mt={2}>
          <Stack spacing={2}>
            <Box>
              <Stack spacing={2}>
                <Box sx={[glassMorphismStyle, { borderRadius: 2, padding: 2 }]}>
                  <Typography variant="h3">Sell Property</Typography>
                </Box>
                <Box sx={[glassMorphismStyle, { borderRadius: 2, padding: 2 }]}>
                  <Typography fontWeight="bold">
                    How to Sell property through Blockchain
                  </Typography>
                  <ul style={{ listStyle: "none" }} >
                  <li>Verify Your self as a Seller.</li>
                    <li>Contact to the owner.</li>
                    <li>Decide the price of property per share.</li>
                    <li>Take request number from the owner.</li>
                    <li>Enter required details below.</li>
                    <li>
                      Go to the landInspector office and approve your transaction.
                    </li>
                  </ul>
                </Box>

              </Stack>
            </Box>

            <Box sx={{ backgroundColor: 'white', borderRadius: 2, padding: 2 }} >
              <Box
                component="form"
                noValidate
                sx={{ mt: 1 }}
                id="buyProperty-form"
                onSubmit={handleSubmit}
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
                        name="province"
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
                  </Grid>

                  <Grid item sm={12} xs={12} md={6} lg={6}>
                    <FormControl fullWidth>
                      <InputLabel id="distric-label">Distric</InputLabel>

                      <Select
                        fullWidth
                        required
                        labelId="distric-label"
                        id="distric"
                        name="distric"
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

                  <Grid item sm={12} xs={12} md={6} lg={6}>
                    <FormControl fullWidth>
                      <InputLabel id="society-label">Society</InputLabel>

                      <Select
                        fullWidth
                        required
                        labelId="society-label"
                        id="society"
                        name="society"
                        value={society}
                        label="society"
                        onChange={handleChangeSociety}
                      >
                        <MenuItem value="none">None</MenuItem>
                        <MenuItem value="park-view">Park View</MenuItem>
                        <MenuItem value="bahria">Bahria</MenuItem>
                        <MenuItem value="rehman-garden">Rehman Garden</MenuItem>
                        <MenuItem value="iqbal-town">Iqbal Town</MenuItem>
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
                        name="block"
                        value={block}
                        label="block"
                        onChange={handleChangeBlock}
                      >
                        <MenuItem value="none">None</MenuItem>
                        <MenuItem value="park-view">A Block</MenuItem>
                        <MenuItem value="bahria">B Block</MenuItem>
                        <MenuItem value="rehman-garden">X Block</MenuItem>
                        <MenuItem value="iqbal-town">Y Block</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item sm={12} xs={12} md={12} lg={12}>
                    <FormControl fullWidth>
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
                    </FormControl>
                  </Grid>
                  <Grid item sm={12} xs={12} md={6} lg={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      required
                      id="sellerEmail"
                      name="sellerEmail"
                      label="Your Email"
                      type="String"
                    />
                    <Typography fontSize='small' >Your email is important, You will recive request number through this email</Typography>
                  </Grid>

                  <Grid item sm={12} xs={12} md={6} lg={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      required
                      id="ownerFullName"
                      name="ownerFullName"
                      label="Full Name of Owner"
                      type="String"
                    />
                  </Grid>
                  <Grid item sm={12} xs={12} md={6} lg={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      required
                      id="ownerCNIC"
                      name="ownerCNIC"
                      label="CNIC of Owner"
                      type="number"
                      inputProps={{ min: 0  }}
                    />
                  </Grid>


                  <Grid item sm={12} xs={12} md={6} lg={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      required
                      id="sharesAmmount"
                      name="sharesAmmount"
                      label="Ammount of Shares"
                      type="number"
                      inputProps={{ min: 0  }}
                    />
                  </Grid>
                  <Grid item sm={12} xs={12} md={6} lg={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      required
                      id="priceOfShare"
                      name="priceOfShare"
                      label="Price of One Share"
                      type="number"
                      inputProps={{ min: 0  }}
                    />
                  </Grid>
                  <Grid item sm={12} xs={12} md={6} lg={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      required
                      id="buyerCNIC"
                      name="buyerCNIC"
                      label="Buyer CNIC"
                      type="number"
                      inputProps={{ min: 0  }}
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
                    sx={{ mt: 3, mb: 2, px: 5 }}
                  >
                    Submit
                  </Button>
                </Box>
                {alert.status ? <Alert severity={alert.type} sx={{ mt: 3 }}>{alert.msg}</Alert> : ''}
                
              </Box>
            </Box>

            <Box>
              <Stack spacing={2}>
                <Box sx={[glassMorphismStyle, { borderRadius: 2, padding: 2 }]} >
                  <Typography variant="h3">Selling Records</Typography>
                </Box>


                <Box>
                  <SellingRecords />
                </Box>
              </Stack>
            </Box>
            
          </Stack>
        </Box>
      </Container>
    </div>
  );
};

export default SellProperty;
