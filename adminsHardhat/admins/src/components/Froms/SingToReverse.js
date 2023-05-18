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
  import React, { useState ,useEffect } from "react";

const SingToReverse = () => {
    const [distric, setDistric] = useState("lahore");
    const [province, setProvince] = useState("punjab");
    const [society, setSociety] = useState("none");
    const [block, setBlock] = useState("park-view");
    
  const [alert, setAlert] = useState({
    status: false,
    msg: "",
    type: ""
  });

  useEffect(()=>{
    if(alert.status === true){
        setTimeout(() => {
      
      setAlert({
        status: false,
        msg: "",
        type: ""
      })
    }, 5000);
    } 
    
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    let confirm = window.confirm("Are you sure want to Submit?");
    if (confirm){
      setAlert({
      status: true,
      msg: "Submitted Successfuly!",
      type: "success"
    });
    }
    
  };

  
    const handleChangeProvience = (event) => {
      setProvince(event.target.value);
    };
    const handleChangeDistric = (event) => {
      setDistric(event.target.value);
    };
    const handleChangeSociety = (event) => {
      setSociety(event.target.value);
    };
    const handleChangeBlock = (event) => {
      setBlock(event.target.value);
    };
    return (
      <Box
        width="100%"
        sx={{
          border: "2px solid gray",
          padding: 2,
          borderRadius: "15px", backgroundColor: '#f2f2f2'
        }}
      >
        <Typography variant="h4" fontSize="25px" fontWeight="bold" color='primary'>
          Signature to Reverse Case
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
                    <MenuItem value="punjab">punjab</MenuItem>
                    <MenuItem value="sindh">Karachi</MenuItem>
                    <MenuItem value="balochistan">Sialkot</MenuItem>
                    <MenuItem value="KPK">KPK</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
  
              <Grid item lg={4} md={4} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="distric-label">Distric</InputLabel>
  
                  <Select
                    fullWidth
                    required
                    labelId="distric-label"
                    id="distric"
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
                    <MenuItem value="park-view">Park View</MenuItem>
                    <MenuItem value="bahria">Bahria</MenuItem>
                    <MenuItem value="rehman-garden">Rehman Garden</MenuItem>
                    <MenuItem value="iqbal-town">Iqbal Town</MenuItem>
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
                    <MenuItem value="park-view">A Block</MenuItem>
                    <MenuItem value="bahria">B Block</MenuItem>
                    <MenuItem value="rehman-garden">X Block</MenuItem>
                    <MenuItem value="iqbal-town">Y Block</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
  
              
  
              <Grid item lg={4} md={4} sm={4}>
                <TextField
                  fullWidth
                  id="propertyID"
                  name="propertyID"
                  label="Property ID"
                  variant="outlined"
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
                />
              </Grid>
              <Grid item lg={4} md={4} sm={4}>
                <TextField
                  fullWidth
                  id="OTPCodeVerify"
                  name="OTPCodeVerify"
                  label="OTP Verification Code"
                  variant="outlined"
                  type="Number"
                  inputProps={{ minLength: 8 ,  }}
                  placeholder="Minimum 8 Digits Code"
                />
              </Grid>
              <Grid item lg={4} md={4} sm={4}>
                <TextField
                  fullWidth
                  id="newOTP"
                  name="newOTP"
                  label="New OTP Code"
                  variant="outlined"
                  type="Number"
                  inputProps={{ minLength: 8 ,  }}
                  placeholder="Minimum 8 Digits Code"
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
                Signature
              </Button>
            </Box>
          {alert.status ? <Alert severity={alert.type} sx={{ mt: 3 }}>{alert.msg}</Alert> : ''}

          </Box>
        </Box>
      </Box>
    );
}

export default SingToReverse