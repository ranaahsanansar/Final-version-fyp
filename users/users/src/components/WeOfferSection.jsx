import React from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import styled from "styled-components";
import Stack from "@mui/material/Stack";
import MonetizationOnSharpIcon from "@mui/icons-material/MonetizationOnSharp";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarsSharpIcon from "@mui/icons-material/StarsSharp";

import FingerprintIcon from "@mui/icons-material/Fingerprint";
import SellIcon from "@mui/icons-material/Sell";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const weOfferData = [
  {
    title: "Apartments",
    img: "https://images.pexels.com/photos/129494/pexels-photo-129494.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "House",
    img: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Plots",
    img: "https://assets-news.housing.com/news/wp-content/uploads/2020/10/01160004/Top-5-localities-for-buying-plots-in-Hyderabad-FB-1200x700-compressed.jpg",
  },
];
const WeOfferSection = () => {
  const glassMorphismStyle = {
    /* From https://css.glass */
    background: "rgba(255, 255, 255, 0.2)",
    boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  };
  return (
    <section style={{ backgroundColor: "rgba(190, 189, 189, 0.436)" }}>
      <Container>
        <Box height="100%" display="flex" alignItems="center" paddingY={3}>
          <Box width="100%">
            <Box marginBottom={5}>
              <Typography fontSize="32px" fontWeight='bold'>We Offer</Typography>
            </Box>

            <Grid container spacing={2} alignItems='start' >
              
              
              {weOfferData.map((item) => (
                <Grid item xs={12} md={6} lg={4}  >
                <Box
                  position="relative"
                  borderRadius="10px"
                  overflow="hidden"
                  height='250px'
                  margin={3}
                >
                  <img
                    src={item.img}
                    width="100%"
                    height="100%"
                    style={{ objectFit: "cover" }}
                  />
                  <Box
                    sx={glassMorphismStyle}
                    position="absolute"
                    bottom="20px"
                    width="100%"
                    padding="10px"
                  >
                    <Typography
                      variant="h3"
                      color="whitesmoke"
                      fontWeight={500}
                    >
                      {item.title}
                    </Typography>
                  </Box>
                </Box>
                </Grid>
              ))}
              
              
            </Grid>

            {/* <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
              flexWrap={{ xs: "wrap", md: "wrap", lg: "wrap" }}
            >
              {weOfferData.map((item) => (
                <Box
                  position="relative"
                  borderRadius="10px"
                  overflow="hidden"
                  height="300px"
                  width="300px"
                  margin={3}
                >
                  <img
                    src={item.img}
                    width="100%"
                    height="100%"
                    style={{ objectFit: "cover" }}
                  />
                  <Box
                    sx={glassMorphismStyle}
                    position="absolute"
                    bottom="20px"
                    width="100%"
                    padding="10px"
                  >
                    <Typography
                      variant="h3"
                      color="whitesmoke"
                      fontWeight={500}
                    >
                      {item.title}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box> */}
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default WeOfferSection;
