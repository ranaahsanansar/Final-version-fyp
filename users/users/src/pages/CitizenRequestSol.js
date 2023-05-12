import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React from "react";

const CitizenRequestSol = () => {
  return (
    <div>
      <Container>
        <Box>
          <Typography>New Cititzen Request</Typography>
          <Typography>Please give your Details for approval</Typography>
        </Box>

        <Box>
          <Box component="form" noValidate sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12} md={4} lg={3}>
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  id="cnic"
                  name="cnic"
                  label="CNIC"
                  type="number"
                />
              </Grid>

              <Grid item sm={6} xs={12} md={4} lg={3}>
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  id="firstName"
                  name="firstName"
                  label="First Name"
                />
              </Grid>

              <Grid item sm={6} xs={12} md={4} lg={3}>
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                />
              </Grid>

              <Grid item sm={12} xs={12} md={12} lg={12}>
                <Box>
                  <p>Current Address</p>
                </Box>
                <TextareaAutosize
                  aria-label="address"
                  minRows={3}
                  placeholder="Enter your current Address"
                  style={{ width: "100%", padding: "10px" }}
                  name="address"
                  id="address"
                />
              </Grid>

              <Grid item sm={6} xs={12} md={4} lg={3}>
                <Box>
                  {" "}
                  <p>CNIC Front</p>{" "}
                </Box>
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  id="cnicFront"
                  name="cnicFront"
                  type="file"
                />
              </Grid>

              <Grid item sm={6} xs={12} md={4} lg={3}>
                <Box>
                  {" "}
                  <p>CNIC Back</p>{" "}
                </Box>
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  id="cnicBack"
                  name="cnicBack"
                  type="file"
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
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default CitizenRequestSol;
