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
            {/* Heading Buying Property  */}
            <Box>
              <Stack spacing={2}>
                <Box sx={[glassMorphismStyle, { borderRadius: 2, padding: 2 }]} >
                  <Typography variant="h3">Buy Property</Typography>
                </Box>
                <Box sx={[glassMorphismStyle, { borderRadius: 2, padding: 2 }]} >
                  <Typography fontWeight="bold">
                    How to Buy property through Blockchain
                  </Typography>
                  <ul style={{ listStyle: "none" }} >
                  <li>Verify Your self as a Buyer.</li>
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
            {/* Form to Buy Property  */}
            <Box sx={{ backgroundColor: 'white', borderRadius: 2, padding: 2 }} >
              <BuyPropertyForm />
            </Box>

            <Box>
              <Stack spacing={2}>
                <Box sx={[glassMorphismStyle, { borderRadius: 2, padding: 2 }]} >
                  <Typography variant="h3">Buying Records</Typography>
                </Box>

                <BuyingRecords />
              </Stack>
            </Box>

          </Stack>
        </Box>
      </Container>
    </div>
  );
};

export default BuyProperty;