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
  Typography, Container, Stack
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { NavLink } from "react-router-dom";

const PropertyCardFilter = ({ data }) => {
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

  return (
    <Box
      backgroundColor="rgba(190, 186, 186, 0.256)"
      overflow="hidden"
      borderRadius={3}
    >
      {/* Card  */}
      <Box display="flex">
        <Box width={{ xs: '40%' , sm:'40%' , md:'30%' , lg: '30%' }} height="inherit" display="flex">
          <img
            src={data.img}
            // style={{ objectFit: "cover" , backgroundSize: 'cover' }}
            width="100%"
            height="100%"
          />
        </Box>
        <Box display="flex" padding={2} width={{ xs: '60%',sm:'60%' , md:'70%' , lg: '70%' }}>
          <Stack spacing={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontWeight="bold" fontSize="large" sx={ [{display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1} , gradiantText ] }>
                {data.title}
              </Typography>
              <Box display="flex">
                <MonetizationOnIcon fontSize="medium" />
                <Typography
                  fontWeight="bold"
                  fontSize="large"
                  sx={ [{display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1} , gradiantText ] }
                  ml={1}
                >
                  {data.prize}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <LocationOnIcon fontSize="small" />
              <Typography fontSize="small" sx={{display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1} } >{data.loc}</Typography>
            </Box>
            <Typography
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}
            >
              {data.body}
            </Typography>
            <NavLink  to='/details' style={{ textDecoration: 'none' }} >
              <Button
              sx={{
                backgroundImage:
                  "linear-gradient(to right , #9936a0 ,  #1d399f)",
              }}
            >
              <Typography color="white" fontWeight="bold">
                Check Details
              </Typography>
            </Button>
            </NavLink>
            
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyCardFilter;
