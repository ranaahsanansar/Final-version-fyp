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
  Container,Stack
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PropertyCardFilter from "../components/PropertyCardFilter";
import { cardData } from "../data";


const Filter = () => {
  const [sequence, setSequence] = React.useState("random");
  const handleSequenceChange = (event) => {
    setSequence(event.target.value);
  };

  const [propertyType, setPropertyType] = React.useState("");
  const hadnlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
  };
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



  return (
    <>
      <Container>
        <Box mb={2} >
          <Box marginY={4}>
          <Typography sx={gradiantText} variant="h5" fontWeight="bold">
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
                  <FormControl>
                    <InputLabel id="sortLable">Sort</InputLabel>
                    <Select
                      labelId="sorting"
                      id="sortInput"
                      value={sequence}
                      label="Sort"
                      onChange={handleSequenceChange}
                    >
                      <MenuItem value="low-high">Price Low to High</MenuItem>
                      <MenuItem value="high-low">High to low</MenuItem>
                      <MenuItem value="random">Random</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box height='90%'  >
                <Stack spacing={2} >
                    {cardData.map( (item) => <PropertyCardFilter data={item} /> )}
                </Stack>
                </Box>


              </Box>
            </Grid>

            {/* Right Grid  */}
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
                      >
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
                          value="Plot"
                          control={<Radio />}
                          label="plot"
                        />
                      </RadioGroup>
                      
                    </Box>
                  <Box mb={2}>
                    {/* <Typography>City</Typography> */}
                    {/* Options */}
                    
                    <FormControl  >
                      <InputLabel id="sortLable">City</InputLabel>
                      <Select
                      labelId="sorting"
                      id="sortInput"
                      value={sequence}
                      label="City"
                      onChange={handleSequenceChange}
                    >
                      <MenuItem value="low-high">Lahore</MenuItem>
                      <MenuItem value="high-low">Islamabad</MenuItem>
                      <MenuItem value="random">Karachi</MenuItem>
                    </Select>
                    </FormControl>
                    
                  </Box>

                  <Box mb={2}>
                    {/* <Typography>Area</Typography> */}
                    {/* Options */}
                    <FormControl>
                      <InputLabel id="sortLable">Area</InputLabel>
                    <Select
                      labelId="sorting"
                      id="sortInput"
                      value={sequence}
                      label="Sort"
                      onChange={handleSequenceChange}
                    >
                      <MenuItem value="low-high">Price Low to High</MenuItem>
                      <MenuItem value="high-low">High to low</MenuItem>
                      <MenuItem value="random">Random</MenuItem>
                    </Select>
                    </FormControl>
                    
                  </Box>
                  <Box display='flex' justifyContent='space-between' >
                      <Button fontSize='small' sx={gradiantText} >Clear All</Button>
                      <Button sx={{
                      backgroundImage:
                        "linear-gradient(to right , #9936a0 ,  #1d399f)",
                    }} > <Typography color='whitesmoke' fontWeight='bold' fontSize='small' >Apply</Typography> </Button>

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
