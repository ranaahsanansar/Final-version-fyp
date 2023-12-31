import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
  Container, Stack
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PropertyCardFilter from "../components/PropertyCardFilter";
import { cardData } from "../data";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { citites } from "../cities";


const Filter = () => {

  const [list, setList] = useState([]);

  const fetchProperties = async (req, res) => {
    const url = "http://localhost:8000/api/dashboard/property/allProperties";

    const exiosResponse = await axios.get(url);
    // console.log(exiosResponse.data.propertiesArray)
    setList(exiosResponse.data.propertiesArray)
  }

  useEffect(() => {
    fetchProperties();
  }, [])


  const [sequence, setSequence] = React.useState("random");
  const handleSequenceChange = (event) => {
    setSequence(event.target.value);
  };
  const [city, setCity] = useState("none")
  const handleChangeCity = (event) => {
    setCity(event.target.value)
  }

  const [propertyType, setPropertyType] = React.useState("none");
  const hadnlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
  };

  const handleFilterApply = async (req, res) => {
    const url = `http://localhost:8000/api/dashboard/property/filterProperty/${city}/${propertyType}`;
    console.log("URL" + url)
    try {
      const exiosResponse = await axios.get(url);
      setList(exiosResponse.data.propertiesArray)
      console.log(exiosResponse)
    } catch (err) {
      console.log('Can not fetch ');
    }
  }

  const gradiantText = {
    backgroundcolor: "primary",
    backgroundImage: `linear-gradient(to left, #5514B4, #9d149d)`,
    backgroundSize: "100%",
    backgroundRepeat: "repeat",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    display: "table",
    WebkitTextFillColor: "transparent",
  };
  const glassMorphismStyle = {
    background: "rgba(255, 255, 255, 0.2)",
    boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  };

  const handleClear = () => {
    setCity("none")
    setPropertyType("none")
  }


  return (
    <>
      <Container>
        <Box mb={2} >
          <Box marginY={4}>
            <Typography sx={{ color: '#060606' }} variant="h5" fontWeight="bold">
              Discover Properties
            </Typography>
          </Box>

          <Box >
            <Grid
              container
              spacing={2}
              direction={{
                xs: "column-reverse",
                sm: "row",
                md: "row",
                lg: "row",
              }}
            >
              {/* Left Grid  */}
              <Grid item xs={12} sm={8} md={8} lg={8}>
                <Box pt={1}>


                  <Box
                    display="flex"
                    mb={2}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography>Showing all Properties</Typography>
                  </Box>

                  <Box height='90%'  >
                    <Stack spacing={2} >
                      {list.map((item) => <PropertyCardFilter data={item} />)}
                    </Stack>
                  </Box>

                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <Box
                  sx={{ background: "rgba(190, 186, 186, 0.256)" }}
                  padding={2}
                  borderRadius="10px"
                >
                  <Stack>

                    <Box mb={2}>
                      <FormLabel id="demo-controlled-radio-buttons-group">
                        Property Type
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        onChange={hadnlePropertyTypeChange}
                        value={propertyType}
                      >
                         <FormControlLabel
                          value="none"
                          control={<Radio />}
                          label="none"
                          sx={{ display: 'none' }}
                        />
                        <FormControlLabel
                          value="apartment"
                          control={<Radio />}
                          label="Apartment"
                        />
                        <FormControlLabel
                          value="house"
                          control={<Radio />}
                          label="House"
                        />
                        <FormControlLabel
                          value="plot"
                          control={<Radio />}
                          label="Plot"
                        />
                      </RadioGroup>

                    </Box>
                    <Box mb={2}>
                      <FormControl  >
                        <InputLabel id="sortLable">City</InputLabel>
                        <Select
                          labelId="sorting"
                          id="sortInput"
                          value={city}
                          label="City"
                          onChange={handleChangeCity}
                        >
                          <MenuItem value="none">None</MenuItem>
                          {
                            citites.map((item) => {
                              return <MenuItem value={item.name}>{item.name}</MenuItem>
                            })
                          }
                        </Select>
                      </FormControl>

                    </Box>
                    <Box display='flex' justifyContent='space-between' >
                      <Button fontSize='small' sx={{ color: '#060606' }} onClick={handleClear}  >Clear All</Button>
                      <Button sx={{
                        backgroundColor: '#F3E5AB'
                      }} > <Typography color='black' fontWeight='bold' fontSize='small' onClick={handleFilterApply} >Apply</Typography> </Button>

                    </Box>


                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
    </>
  );
};

export default Filter;
