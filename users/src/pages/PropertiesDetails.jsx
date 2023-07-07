import { Email, Padding } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  Stack,
  Tab,
  Tabs,
  Typography,
  Container
} from "@mui/material";
import './propertiesDetails.css'
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import NotInterestedRoundedIcon from "@mui/icons-material/NotInterestedRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";

import ShresDetailsTable from "../components/SharesDetailsTable";

import { propertiesImageData } from "../data";

import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import OfferMailForm from "../components/OfferMailForm";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}


const PropertiesDetails = () => {

  const { id } = useParams();
  console.log(id)

  const [idState, setIdState] = useState(id);
  const [propertyDetails, setPropertyDetils] = useState({
    id : "",
    title: "",
    locationTitle: "",
    description: "",
    price: "",
    minitDescription: "",
    locationBold: "",
    locationBody: "",
    selleName: "",
    sellerEmail: "",
    sharesForSale: 20,
    sellerPhone: ""
  });

  const [imagesData, setImagesData] = useState([{
    img: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "house",
    rows: 2,
    cols: 2,
  }],)

  // Image Sliders 
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? imagesData.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === imagesData.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };


  function TabPanel(props) {
    const { children, value, index } = props;
    return <>{value === index && <>{children}</>}</>;
  }
  const sharesTableColumns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "sahres", label: "Shares", minWidth: 100 },
    { id: "contact", label: "Contact", minWidth: 100 },
  ];

  function createData(name, sahres, contact) {
    return { name, sahres, contact };
  }

  const sharesTableRows = [
    createData("Rana Ahsan Ansar", "70", "03091045145"),
    createData("Talal", "20", "03091045145"),
    createData("Sufyan Asghar", "10", "03091045145"),
  ];

  const historyTableColumns = [
    { id: "seller", label: "Seller", minWidth: 170 },
    { id: "buyer", label: "Buyer", minWidth: 100 },
    { id: "shares", label: "Shares", minWidth: 100 },
    { id: "time", label: "Time", minWidth: 100 },
  ];

  function createHistoryData(seller, buyer, shares, time) {
    return { seller, buyer, shares, time };
  }

  const historyTableRows = [
    createHistoryData("Rana Ahsan Ansar", "Talal", "70", "5246"),
    createHistoryData("Talal", "Talal", "70", "5246"),
    createHistoryData("Sufyan Asghar", "Talal", "70", "5246"),
  ];
  const gradiantText = {
    backgroundcolor: "primary",
    color: 'black',
    backgroundSize: "100%",
    backgroundRepeat: "repeat",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    display: "table",
  };
  const glassMorphismStyle = {
    background: "rgba(255, 255, 255, 0.2)",
    boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  };

  const [value, setValue] = React.useState(0);

  const handleTabs = (event, newValue) => {
    setValue(newValue);
  };

  const fetchProperty = async (id) => {
    const url = `http://localhost:8000/api/dashboard/property/getProperty/${id}`
    const property = await axios.get(url)
    const fetchdetails = property.data.details

    const compeletData = {
      id: fetchdetails.propertyId,
      title: fetchdetails.title,
      locationTitle: fetchdetails.location.head,
      des: fetchdetails.description,
      price: fetchdetails.price,
      minitDescription: fetchdetails.priceDes,
      locationBold: fetchdetails.location.head,
      locationBody: fetchdetails.location.details,
      selleName: fetchdetails.ownerId.name,
      sellerEmail: fetchdetails.ownerId.email,
      sharesForSale: fetchdetails.shares,
      sellerPhone: fetchdetails.phone,
      city: fetchdetails.city
    }

    const imagesArray = []

    await fetchdetails.photos.forEach((element, i) => {
      let path = `http://localhost:8000/public/uploads/propertyImage/${element}`
      if (i == 0) {
        let imageObj = {
          img: path,
          title: element,
        };
        imagesArray.push(imageObj)
      } else {
        let imageObj = {
          img: path,
          title: element,
        };
        imagesArray.push(imageObj)

      }
    });

    setImagesData(imagesArray);



    setPropertyDetils(compeletData)

  }

  useEffect(async () => {
    await fetchProperty(idState)
  }, [])
  return (
    <>
      <Container>
        <Box marginY={4}>
          <Button component={NavLink} to='/filter' startIcon={<ArrowBackIcon />} variant='contained' sx={{ fontWeight: 'bold' , color:'black' , textTransform: 'none' , mb: 2 , backgroundColor: '#A9D6C6'}} >
            Back
          </Button>
          <Typography sx={gradiantText} variant="h5" fontWeight="bold">
            {propertyDetails.title}
          </Typography>
          <Typography variant="body2" color="gray">
            {propertyDetails.locationTitle}
          </Typography>
        </Box>

        {open && (
          <div className="slider" key={slideNumber}  >
           
            <CloseIcon className="close"
              onClick={() => setOpen(false)} />
            
            <ArrowBackIosNewIcon sx={{ left: "10px" }} className="arrow"
              onClick={() => handleMove("l")} />
            <div className="sliderWrapper">
              <img key={slideNumber} src={imagesData[slideNumber].img} alt="" className="sliderImg" />
            </div>
            
            <ArrowForwardIosIcon sx={{ right: "10px" }} className="arrow"
              onClick={() => handleMove("r")} />
          </div>
        )}

        <Box mb={4} >
          <Box position="relative"   >
            <Box
              sx={glassMorphismStyle}
              borderRadius={2}
              position="absolute"
              zIndex={1}
              bottom={7}
              right={7}

            >
              <Typography
                fontWeight="bold"
                color="black"
                padding={1}
                variant="subtitle1"
                onClick={() => {
                  setOpen(!open)
                }}
                sx={{ cursor: 'pointer' , border: '1px solid black' , borderRadius: 2 }}
              >
                Show all Images
              </Typography>
            </Box>
            <Box border='2px solid gray'  >
              <ImageList
                // sx={{ height: 450 }}
                variant='standard'
                cols={4}
                rowHeight={200}
              >
                {imagesData.map((item, index) => {
                  if (index < 4) {
                    return (
                      <ImageListItem
                        key={item.img}
                        cols={item.cols || 1}
                        rows={item.rows || 1}
                        sx={{ overflow: 'hidden' }}
                      >

                        <img
                          {...srcset(item.img, 121, item.rows, item.cols)}
                          alt={item.title}
                          loading="lazy"
                        />
                      </ImageListItem>
                    )
                  }
                })}
              </ImageList>
            </Box>
          </Box>
        </Box>

        <Box mb={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8} md={8} lg={8}>
              <Stack>
                <Box>
                  
                </Box>
                <Divider />

                <Box>
                  <Typography sx={gradiantText} variant="h6" fontWeight="bold">
                    Description
                  </Typography>
                  <Typography color='black' >
                    {
                      propertyDetails.des
                    }

                  </Typography>
                </Box>
              </Stack>
            </Grid>

            <Grid justifyContent="center" item xs={12} sm={4} md={4} lg={4}>
              <Box
                borderRadius={3}
                padding={1}
                sx={{
                  backgroundColor: "#F3E5AB",
                }}
              >
                <Box borderRadius={3} padding={2} sx={glassMorphismStyle}>
                  <Stack spacing={2}>
                    <Box display="flex" alignItems="center">

                      <Typography fontWeight="bold" mr={1} variant="h6">
                        RS.{propertyDetails.price}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="black">
                      {propertyDetails.minitDescription}
                    </Typography>

                    <Box display="flex">
                      <Typography mr={1}>Shares to be sold: </Typography>
                      <Typography fontWeight="bold">{propertyDetails.sharesForSale} out of 100</Typography>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box
          mb={4}
          sx={{
            background: "#A9D6C6",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
          padding={2}
          borderRadius={3}
        >
          <Typography sx={gradiantText} variant="h6" fontWeight="bold">
            Location
          </Typography>
          <Stack spacing={2}>
            <Typography fontWeight="bold">
              {propertyDetails.locationBold}
            </Typography>
            <Typography>
              <span style={{ fontWeight: 'bold' }} >Near to: </span>{propertyDetails.locationBody}
            </Typography>
            <Typography>
              <span style={{ fontWeight: 'bold' }} >City: </span>{propertyDetails.city}
            </Typography>
          </Stack>
        </Box>

        <Grid container spacing={2} >
          <Grid item xs={12} sx={12} md={6} lg={6} >
            <Box mb={4} >
              <Typography sx={gradiantText} variant="h6" fontWeight="bold">
                Seller Information
              </Typography>
              <Stack>
                <span>Name: </span>
                <Typography fontWeight="bold">{propertyDetails.selleName}</Typography>
                <span>Contact Inforamtion: </span>
                <Box display="flex">
                  <EmailIcon />

                  <Typography ml={1} fontWeight="bold">{propertyDetails.sellerEmail}</Typography>
                </Box>
                <Box display="flex">
                  <LocalPhoneIcon />

                  <Typography ml={1} fontWeight="bold">{propertyDetails.sellerPhone}</Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} sx={12} md={6} lg={6} >
            <Box sx={{ mb: '10px' }} >
              <Typography sx={{ fontWeight:'bold' , fontSize: '22px' }} >Leave a message for seller</Typography>
              <OfferMailForm  id={propertyDetails.id} title={propertyDetails.title} sellerMail={propertyDetails.sellerEmail} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PropertiesDetails;
