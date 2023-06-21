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
import { useParams } from "react-router-dom";
import axios from "axios";

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
      // console.log(propertiesImageData.length)
      // console.log(newSlideNumber)
    } else {
      newSlideNumber = slideNumber === imagesData.length - 1 ? 0 : slideNumber + 1;
      // console.log(propertiesImageData.length)
      // console.log(newSlideNumber)

    }

    setSlideNumber(newSlideNumber)
  };


  // function TabPanel(props) {
  //   const { children, value, index } = props;
  //   return <>{value === index && <>{children}</>}</>;
  // }
  // Shares Table Data
  // const sharesTableColumns = [
  //   { id: "name", label: "Name", minWidth: 170 },
  //   { id: "sahres", label: "Shares", minWidth: 100 },
  //   { id: "contact", label: "Contact", minWidth: 100 },
  // ];

  function createData(name, sahres, contact) {
    return { name, sahres, contact };
  }

  // const sharesTableRows = [
  //   createData("Rana Ahsan Ansar", "70", "03091045145"),
  //   createData("Talal", "20", "03091045145"),
  //   createData("Sufyan Asghar", "10", "03091045145"),
  // ];

  // Property Purchasing logs
  const historyTableColumns = [
    { id: "seller", label: "Seller", minWidth: 170 },
    { id: "buyer", label: "Buyer", minWidth: 100 },
    { id: "shares", label: "Shares", minWidth: 100 },
    { id: "time", label: "Time", minWidth: 100 },
  ];

  function createHistoryData(seller, buyer, shares, time) {
    return { seller, buyer, shares, time };
  }

  // const historyTableRows = [
  //   createHistoryData("Rana Ahsan Ansar", "Talal", "70", "5246"),
  //   createHistoryData("Talal", "Talal", "70", "5246"),
  //   createHistoryData("Sufyan Asghar", "Talal", "70", "5246"),
  // ];
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

  // tabs Settings
  const [value, setValue] = React.useState(0);

  // const handleTabs = (event, newValue) => {
  //   setValue(newValue);
  // };

  const fetchProperty = async (id) => {
    const url = `http://localhost:8000/api/dashboard/property/getProperty/${id}`
    const property = await axios.get(url)
    // console.log(property.data.details)
    const fetchdetails = property.data.details


  //   const compeletData = {
  //     title: "Apartment Complex",
  //     locationTitle: "4th floor Gulberg Plaza",
  //     des: "Located a 5-minute walk from Al rehman garden gate 2, Tower Street Apartments has accommodations with air conditioning and free WiFi. The units come with hardwood floors and feature a fully equipped kitchenette with a microwave, a flat-screen TV, and a private bathroom with shower and a hairdryer. A fridge is also offered, as well as an electric tea pot and a coffee machine. Popular points of interest near the apartment include Cloth Hall, Main Market Square and Town Hall Tower. The nearest airport is John Paul II International Kraków–Balice, 16.1 km from Tower Street Apartments, and the property offers a paid airport shuttle service.",
  //     price: "20,000",
  //     minitDescription: "Property is already approved and listed on blockchain. Per sheare price is 20,000. Price is negotiable.",
  //     locationBold: "293 4th Floor, Gulberg Plaza,Lahore Pakistan",
  //     locationBody: "House no.2, Street no. 12, New garden town near Himayat-e-Islam Collage, band road, Lahore.",
  //     selleName: "Rana Ahsan Ansar",
  //     sellerEmail: "asn.cs21@gmail.com",
  //     sharesForSale: 20,
  //     sellerPhone: "03091045145"
  // }

  const compeletData = {
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
    sellerPhone: "03091045145"
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
//     console.log(fetchdetails.des)
// console.log(compeletData.des)

  }

  useEffect(async () => {
    await fetchProperty(idState)
    // console.log(propertyDetails)
    // console.log(imagesData)
  }, [])
  return (
    <>
      <Container>
        <Box marginY={4}>
          <Typography sx={gradiantText} variant="h5" fontWeight="bold">
            {propertyDetails.title}
          </Typography>
          <Typography variant="body2" color="gray">
            {propertyDetails.locationTitle}
          </Typography>
        </Box>

        {open && (
          <div className="slider" key={slideNumber}  >
            {/* <FontAwesomeIcon
              icon={CloseIcon}
              className="close"
              onClick={() => setOpen(false)}
            /> */}
            <CloseIcon className="close"
              onClick={() => setOpen(false)} />
            {/* <FontAwesomeIcon
              icon={ArrowBackIosNewIcon}
              className="arrow"
              onClick={() => handleMove("l")}
            /> */}
            <ArrowBackIosNewIcon sx={{ left: "10px" }} className="arrow"
              onClick={() => handleMove("l")} />
            <div className="sliderWrapper">
              <img key={slideNumber} src={imagesData[slideNumber].img} alt="" className="sliderImg" />
            </div>
            {/* <FontAwesomeIcon
              icon={ArrowForwardIosIcon}
              className="arrow"
              onClick={() => handleMove("r")}
            /> */}
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
                color="whitesmoke"
                padding={1}
                variant="subtitle1"
                onClick={() => {
                  setOpen(!open)
                }}
                sx={{ cursor: 'pointer' }}
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
                        sx={{overflow: 'hidden'}} 
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
                  {/* <Box display="flex" alignItems="center">
                    <Typography
                      sx={gradiantText}
                      variant="h6"
                      fontWeight="bold"
                    >
                      Verified
                    </Typography>
                    <VerifiedRoundedIcon color="success" />
                  </Box> */}
                </Box>
                <Divider />

                <Box>
                  <Typography sx={gradiantText} variant="h6" fontWeight="bold">
                    Description
                  </Typography>
                  <Typography color='black' >
                    {
                     propertyDetails.des
                      // return propertyDetails.description
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
                  backgroundImage: "linear-gradient(to left, #5514B4, #9d149d)",
                }}
              >
                <Box borderRadius={3} padding={2} sx={glassMorphismStyle}>
                  <Stack spacing={2}>
                    <Box display="flex" alignItems="center">
                      <MonetizationOnRoundedIcon />
                      <Typography fontWeight="bold" mr={1} variant="h6">
                        {propertyDetails.price}
                      </Typography>
                      {/* <span
                        style={{
                          fontSize: 14,
                          textDecoration: "underline",
                          color: "black",
                        }}
                      >
                        per share
                      </span> */}
                    </Box>
                    <Typography variant="body2" color="white">
                      {propertyDetails.minitDescription}
                    </Typography>

                    <Box display="flex">
                      <Typography mr={1}>Shares to be sold: </Typography>
                      <Typography fontWeight="bold">{propertyDetails.sharesForSale} out of 100</Typography>
                    </Box>
                    {/* <Box display="flex">
                      <Typography mr={1}>Total: </Typography>
                      <Typography fontWeight="bold">800,000</Typography>
                    </Box> */}

                    {/* <Button
                      variant="contained"
                      sx={{
                        backgroundImage:
                          "linear-gradient(to right , #AE69B3 , #4868DB)",
                      }}
                    >
                      Buy Property
                    </Button> */}
                  </Stack>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box
          mb={4}
          sx={{
            background: "rgba(190, 186, 186, 0.256)",
            // boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)",
            // backdropFilter: "blur(5px)",
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
              {propertyDetails.locationBody}
            </Typography>
          </Stack>
        </Box>

        <Box mb={4}>
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

        {/* <Box
          mb={4}
          sx={{
            background: "rgba(190, 186, 186, 0.256)",
          }}
          padding={1}
          borderRadius={2}
        >
          <Tabs
            value={value}
            onChange={handleTabs}
            variant="scrollable"
            scrollButtons={false}
            textColor="primary"
            TabIndicatorProps={{
              style: {
                backgroundImage: "linear-gradient(to left, #5514B4, #9d149d)",
              },
            }}
          >
            
            <Tab
              label="Transaction History"
              style={{ textTransform: "none", fontWeight: "bold" }}
            />
          </Tabs>

          
          <TabPanel value={value} index={0}>
            <Box mt={2}>
              <ShresDetailsTable key="transaction"
                columsArray={historyTableColumns}
                rowsArray={historyTableRows}
              />
            </Box>
          </TabPanel>
        </Box> */}
        {/* Share Holders Table  */}
        {/* <Box
          mb={4}
          sx={{
            background: "rgba(190, 186, 186, 0.256)",
          }}
          padding={1}
          borderRadius={2}
        >
          <Typography sx={gradiantText} variant="h6" fontWeight="bold">
            Share Holders
          </Typography>

          <Box mt={2}>
            <ShresDetailsTable
              columsArray={sharesTableColumns}
              rowsArray={sharesTableRows} 
            />
          </Box>
        </Box> */}
        {/* Buying History Table  */}
        {/* <Box
          mb={4}
          sx={{
            background: "rgba(190, 186, 186, 0.256)",
          }}
          padding={1}
          borderRadius={2}
        >
          <Typography sx={gradiantText} variant="h6" fontWeight="bold">
            Buying History
          </Typography>

          <Box mt={2}>
            <ShresDetailsTable
              columsArray={historyTableColumns}
              rowsArray={historyTableRows}
            />
          </Box>
        </Box> */}
      </Container>
    </>
  );
};

export default PropertiesDetails;
