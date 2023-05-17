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
    Container
} from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { useNavigate } from "react-router-dom";

const UpdateProperty = () => {
    
    const navigate = useNavigate();

    const [propertyType, setPropertyType] = React.useState("house");

    const handleChange = (event) => {
        setPropertyType(event.target.value);
    };

    const [alert, setAlert] = useState({
        status: false,
        msg: "",
        type: ""
    });

    useEffect(() => {
        if (alert.status === true) {
            setTimeout(() => {

                navigate('/dashboard/listproperty')

            }, 5000);

            
        }

    })
    const handleSubmit = (e) => {
        e.preventDefault();
        let confirm = window.confirm("Are you sure want to Submit?");
        if (confirm) {
            setAlert({
                status: true,
                msg: "Submitted Successfuly!",
                type: "success"
            });
        }
    };

    const glassMorphismStyle = {
        background: "rgba(255, 255, 255, 0.2)",
        boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
    };
    return (
        <div>
            <Box>
                <Container>
                    <Box sx={[glassMorphismStyle, { borderRadius: 2, padding: 2, my: 2 }]}>
                        <h1>Update Property</h1>
                    </Box>
                    <Box sx={{ backgroundColor: 'white', padding: 2, borderRadius: 2, mb: 2 }} >
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
                                        label="Title"
                                    />
                                </Grid>

                                <Grid item sm={6} md={6} lg={4} xs={12}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        required
                                        id="price"
                                        name="price"
                                        label="Price"
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
                                        label="Location Head"
                                    />
                                </Grid>

                                <Grid item sm={6} md={6} lg={4} xs={12}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        required
                                        id="detailsLocation"
                                        name="detailsLocation"
                                        label="Location Details"
                                    />
                                </Grid>

                                <Grid item sm={6} md={6} lg={4} xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="city-label">City</InputLabel>

                                        <Select
                                            fullWidth
                                            required
                                            labelId="city-label"
                                            id="propertyType"
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

                            </Grid>

                            <Box textAlign="center">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, px: 5 }}
                                >
                                    Update
                                </Button>
                            </Box>
                            {alert.status ? <Alert severity={alert.type} sx={{ mt: 3 }}>{alert.msg}</Alert> : ''}
                        </Box>
                    </Box>
                </Container>
            </Box>
        </div>
    )
}

export default UpdateProperty