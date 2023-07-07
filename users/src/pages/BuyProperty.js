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
import BuyingRecords from "../components/BuyingRecords";
import BuyPropertyForm from "../components/BuyPropertyForm";


const BuyProperty = () => {


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
                <Box sx={[{ borderRadius: 2, padding: 2 , backgroundColor: 'whitesmoke' }]} >
                  <Typography variant="h3">Buy Property</Typography>
                </Box>
                <Box sx={[{ borderRadius: 2, padding: 2 , backgroundColor: 'whitesmoke'}]} >
                  <Typography fontWeight="bold">
                    How to Buy property through Blockchain
                  </Typography>
                  <ul style={{ listStyle: "none" }} >
                  <li>1. Verify yourself as a Citizen.</li>
                    <li>2. Choose Property to buy form Listed Properties from our Platform.</li>
                    <li>3. Contact the seller and negotaite the price.</li>
                    <li>4. Then fill out the form below, By submiting it you are singing a deal which will be stored on blockchain.</li>
                    <li>5. Then visit land inspector/Patwari office of your area along with the seller to become the Owner of the Property.</li>
                    
                  </ul>
                </Box>


              </Stack>
            </Box>
            {/* Form to Buy Property  */}
            <Box sx={{ backgroundColor: 'white', borderRadius: 2, padding: 2 }} >
              <BuyPropertyForm />
            </Box>

            <Box sx={{mt:2}} >
              {/* <Stack spacing={2}>
                <Box sx={[glassMorphismStyle, { borderRadius: 2, padding: 2 }]} >
                  <Typography variant="h3">Buying Records</Typography>
                </Box>

                <BuyingRecords />
              </Stack> */}
            </Box>

          </Stack>
        </Box>
      </Container>
    </div>
  );
};

export default BuyProperty;