import React, { useEffect, useState } from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Alert,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";

const AddProperty = () => {
  

  const [propertyType, setPropertyType] = React.useState("house");

  const handleChange = (event) => {
    setPropertyType(event.target.value);
  };

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
  return (
    <Box sx={{ backgroundColor: 'white' , padding: 2 , borderRadius: 2 }} >
      <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        id="registration-form"
        onSubmit={handleSubmit}
      >
        <Grid container spacing={1}>
          <Grid item sm={6} md={6} lg={4} xs={12}>
            <TextField
              margin="normal"
              fullWidth
              id="propertyId"
              name="propertyId"
              label="Property ID"
            />
          </Grid>

          <Grid item sm={6} md={6} lg={4} xs={12}>
            <TextField
              margin="normal"
              fullWidth
              required
              id="title"
              name="title"
              label="Ad Title"
            />
          </Grid>

          <Grid item sm={6} md={6} lg={4} xs={12}>
            <TextField
              margin="normal"
              fullWidth
              required
              id="price"
              name="price"
              label="Price Per Share"
            />
          </Grid>

          <Grid item sm={6} md={6} lg={4} xs={12}>
            <TextField
              margin="normal"
              fullWidth
              required
              id="priceDes"
              name="priceDes"
              label="Price Description"
            />
          </Grid>

          <Grid item sm={6} md={6} lg={4} xs={12}>
            <TextField
              margin="normal"
              fullWidth
              required
              id="headLocation"
              name="headLocation"
              label="Exact Location"
            />
          </Grid>

          <Grid item sm={6} md={6} lg={4} xs={12}>
            <TextField
              margin="normal"
              fullWidth
              required
              id="detailsLocation"
              name="detailsLocation"
              label="Nearest Land Mark"
            />
          </Grid>

          <Grid item sm={6} md={6} lg={4} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="city-label">City</InputLabel>
           
            <Select
              fullWidth
              required
              labelId="city-label"
              id="city"
              name="city"
              value={propertyType}
              label="City"
              onChange={handleChange}
            >
              <MenuItem value="house">Lahore</MenuItem>
              <MenuItem value="appartment">Karachi</MenuItem>
              <MenuItem value="plot">Quetta</MenuItem>
            </Select>
            </FormControl>
          </Grid>

          <Grid item sm={6} md={6} lg={4} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="property-type-label">Property Type</InputLabel>
              <Select
                required
                labelId="property-type-label"
                id="propertyType"
                name="propertyType"
                value={propertyType}
                label="Property Type"
                onChange={handleChange}
              >
                <MenuItem value="house">House</MenuItem>
                <MenuItem value="appartment">Appartment</MenuItem>
                <MenuItem value="plot">Plor</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* <Grid item sm={6} md={6} lg={4} xs={12}>
            <TextField
              margin="normal"
              fullWidth
              required
              id="hereType"
              name="hereType"
              label="Title"
            />
          </Grid> */}
          <Grid item sm={12} md={12} lg={12} xs={12}>
            <Box>
              <h3>Property Details</h3>
            </Box>
            <TextareaAutosize
              aria-label="desciption"
              minRows={8}
              placeholder="Enter details of Property"
              style={{ width: "100%", padding: "10px" }}
              name="description"
            />
          </Grid>

          <Grid item sm={12} md={12} lg={12} xs={12}>
            <p>Images</p>
            <input type='file' name="propertyImage" multiple />
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
  );
};

export default AddProperty;
