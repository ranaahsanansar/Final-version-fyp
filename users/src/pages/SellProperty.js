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
import SellPropertyForm from "../components/SellPropertyForm";

const SellProperty = () => {


  const glassMorphismStyle = {
    background: "rgba(255, 255, 255, 0.2)",
    boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  };


  return (
    <div>
      <Container>
        <Box mt={2}>
          <Stack spacing={2}>
            <Box>
              <Stack spacing={2}>
                <Box sx={[{ borderRadius: 2, padding: 2, backgroundColor: 'whitesmoke' }]}>
                  <Typography variant="h3">Sell Property</Typography>
                </Box>
                <Box sx={[{ borderRadius: 2, padding: 2, backgroundColor: 'whitesmoke' }]}>
                  <Typography fontWeight="bold">
                    How to Sell property through Blockchain
                  </Typography>
                  <ul style={{ listStyle: "none" }} >
                  <li>1. Verify yourself as a Citizen.</li>
                    <li>2. Go to Land Inspector / Patwari office to initailly Mint the Property on Blockchain, only then you can sell it. If you have minted before, Ignore step 2 </li>
                    <li>3. Then List the Property on this Platform.</li>
                    <li>4. Set the price of property according to the Shares / Tokens you are selling e.g for 30 shares you set the price Rs.30 lacs</li>
                    <li>5. When you close a deal with buyer, Then fill out the form below. By submiting it you are minting this deal on Blockchain.</li>
                    <li>6. Then visit Landinspector / Patwari office of your area along with the Buyer to Transfer the ownership of the property .</li>
                  </ul>
                </Box>

              </Stack>
            </Box>

            {/* <Box sx={{ backgroundColor: 'white', borderRadius: 2, padding: 2 }} >
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
            </Box> */}

            <SellPropertyForm />



            <Box sx={{mt: 2}} > 
              {/* <Stack spacing={2}>
                <Box sx={[glassMorphismStyle, { borderRadius: 2, padding: 2 }]} >
                  <Typography variant="h3">Selling Records</Typography>
                </Box>


                <Box>
                  <SellingRecords />
                </Box>
              </Stack> */}
            </Box>

          </Stack>
        </Box>
      </Container>
    </div>
  );
};

export default SellProperty;
