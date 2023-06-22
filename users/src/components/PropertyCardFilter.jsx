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
import { path } from "../dataVariables";

const PropertyCardFilter = ({ data }) => {
  // console.log(data)
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
            src={path+data.photos[0]}
            // src={data.img}
            style={{ objectFit: "cover" , backgroundSize: 'cover' }}
            width="100%"
            height="210px"
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
                WebkitLineClamp: 1 , color: 'black'  } ] }>
                {data.title}
              </Typography>
              <Box display="flex">
                {/* <MonetizationOnIcon fontSize="medium" /> */}
                <Typography
                  fontWeight="bold"
                  fontSize="large"
                  sx={ [{display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1, color: '#060606' } ] }
                  ml={1}
                >
                  RS.{data.price}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <LocationOnIcon fontSize="small" />
              <Typography fontSize="small" sx={{display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1} } >{data.location.head}</Typography>
            </Box>
            <Typography
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}
            >
              {data.description}
            </Typography>
            <NavLink  to={`/details/${data._id}`} style={{ textDecoration: 'none' }} >
              <Button
              sx={{backgroundColor: '#F3E5AB'}}
            >
              <Typography  color="black" fontWeight="bold">
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