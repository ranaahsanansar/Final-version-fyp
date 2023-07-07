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

            <SellPropertyForm />

            <Box sx={{mt: 2}} > 
            </Box>

          </Stack>
        </Box>
      </Container>
    </div>
  );
};

export default SellProperty;
