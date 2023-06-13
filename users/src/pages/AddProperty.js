import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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
} from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import axios from "axios";
import { useSelector } from "react-redux";

const validationSchema = Yup.object().shape({
  propertyId: Yup.number().required("Id is required"),
  title: Yup.string().required("Ad Title is required"),
  price: Yup.number().required("Price Per Share is required"),
  priceDes: Yup.string().required("Price Description is required"),
  headLocation: Yup.string().required("Exact Location is required"),
  detailsLocation: Yup.string().required("Nearest Land Mark is required"),
  city: Yup.string().required("City is required"),
  propertyType: Yup.string().required("Property Type is required"),
  description: Yup.string().required("Property Details is required"),
});

const AddProperty = () => {

  const { token } = useSelector(state => state.auth)



  const [propertyType, setPropertyType] = useState("house");
  const [alert, setAlert] = useState({
    status: false,
    msg: "",
    type: "",
  });

  const handleChange = (event) => {
    setPropertyType(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      propertyId: "",
      title: "",
      price: "",
      priceDes: "",
      headLocation: "",
      detailsLocation: "",
      city: "",
      propertyType: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      let confirm = window.confirm("Are you sure you want to Submit?");
      if (confirm) {
        const formData = new FormData();
        formData.append("id", values.propertyId);
        formData.append("title", values.title);
        formData.append("priceCoin", values.price);
        formData.append("priceDes", values.priceDes);
        formData.append("locationHead", values.headLocation);
        formData.append("locationDetails", values.detailsLocation);
        formData.append("city", values.city);
        formData.append("propertyType", values.propertyType);
        formData.append("description", values.description);

        // const document = {

        // }

        const fileInput = document.querySelector('input[type="file"]');
        for (let i = 0; i < fileInput.files.length; i++) {
          formData.append("propertyImage", fileInput.files[i]);
        }

        try {
          const response = await axios.post(
            "http://localhost:8000/api/dashboard/property/list-new-property",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${token}`
              },
            }
          );

          setAlert({
            status: true,
            msg: response.data.message,
            type: response.data.status === "success" ? "success" : "error",
          });
        } catch (error) {
          setAlert({
            status: true,
            msg: "Error occurred while submitting the form",
            type: "error",
          });
        }
      }
    },
  });

  return (
    <Box sx={{ backgroundColor: "white", padding: 2, borderRadius: 2 }}>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Grid container spacing={1}>
          <Grid item sm={6} md={6} lg={4} xs={12}>
            <TextField
              margin="normal"
              fullWidth
              id="propertyId"
              name="propertyId"
              label="Property ID"
              value={formik.values.propertyId}
              onChange={formik.handleChange}
              error={formik.touched.propertyId && Boolean(formik.errors.title)}
              helperText={formik.touched.propertyId && formik.errors.propertyId}
            />
          </Grid>

          {/* Rest of the form fields... */}
<Grid item sm={6} md={6} lg={4} xs={12}>
            <TextField
              margin="normal"
              fullWidth
              required
              id="title"
              name="title"
              label="Ad Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
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
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
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
              value={formik.values.priceDes}
              onChange={formik.handleChange}
              error={formik.touched.priceDes && Boolean(formik.errors.priceDes)}
              helperText={formik.touched.priceDes && formik.errors.priceDes}
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
              value={formik.values.headLocation}
              onChange={formik.handleChange}
              error={formik.touched.headLocation && Boolean(formik.errors.headLocation)}
              helperText={formik.touched.headLocation && formik.errors.headLocation}
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
              value={formik.values.detailsLocation}
              onChange={formik.handleChange}
              error={formik.touched.detailsLocation && Boolean(formik.errors.detailsLocation)}
              helperText={formik.touched.detailsLocation && formik.errors.detailsLocation}
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
                value={formik.values.city}
                label="City"
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
              >
                <MenuItem value="house">Lahore</MenuItem>
                <MenuItem value="appartment">Karachi</MenuItem>
                <MenuItem value="plot">Quetta</MenuItem>
              </Select>
              {formik.touched.city && formik.errors.city && (
                <Box sx={{ color: "red" }}>{formik.errors.city}</Box>
              )}
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
                value={formik.values.propertyType}
                label="Property Type"
                onChange={formik.handleChange}
                error={formik.touched.propertyType && Boolean(formik.errors.propertyType)}
              >
                <MenuItem value="house">House</MenuItem>
                <MenuItem value="appartment">Appartment</MenuItem>
                <MenuItem value="plot">Plot</MenuItem>
              </Select>
              {formik.touched.propertyType && formik.errors.propertyType && (
                <Box sx={{ color: "red" }}>{formik.errors.propertyType}</Box>
              )}
            </FormControl>
          </Grid>

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
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
            />
            {formik.touched.description && formik.errors.description && (
              <Box sx={{ color: "red" }}>{formik.errors.description}</Box>
            )}
          </Grid>

          {/* ----------------------------------- */}

          <Grid item sm={12} md={12} lg={12} xs={12}>
            <p>Images</p>
            <input type="file" name="propertyImage" multiple />
          </Grid>
        </Grid>

        <Box textAlign="center">
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, px: 5 , backgroundColor: '#F3E5AB' , color: 'black' }}>
            Submit
          </Button>
        </Box>
      </form>
      {alert.status ? (
        <Alert severity={alert.type} sx={{ mt: 3 }}>
          {alert.msg}
        </Alert>
      ) : (
        ""
      )}
    </Box>
  );
};

export default AddProperty;
