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
import { NavLink } from "react-router-dom";

const myData = [
  {
    title: "Gulberg",
    size: "10 Marla, 3 floor",
    price: "3",
    image:
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb",
  },
  {
    title: "Madina Park",
    size: "1 kanal, 2 story",
    price: "5",
    image:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&",
  },
  {
    title: "Buptiya",
    size: "2 kanal",
    price: "4",
    image:
      "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&",
  },
  {
    title: "Defence",
    size: "1 kanal",
    price: "7",
    image:
      "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const ListPropertiesSection = () => {
  const glassMorphismStyle = {
    /* From https://css.glass */
    background: "rgba(255, 255, 255, 0.2)",
    boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  };

  return (
    <section>
      <Container>
        <Box height="100%" width='100%' alignItems="center" paddingY={3}>
        <Box
              marginBottom={5}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontSize="32px" fontWeight='bold'>Listed Properties</Typography>
              <Typography fontSize={18} fontWeight="bold">
                <a href="#">See All</a>
              </Typography>
            </Box>
          <Grid container spacing={2} alignItems='start' >
            
            {myData.map((item) => (
                <Grid item xs={12} md={6} lg={4} >
                <Box
                  position="relative"
                  borderRadius="10px"
                  overflow="hidden"
                  height='350px'
                  mb={2}
                  sx={{ boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.207)" }}
                >
                  <img
                    src={item.image}
                    alt="house"
                    width="100%"
                    height="100%"
                  />

                  <Box
                    position="absolute"
                    display="flex"
                    top="20px"
                    width="100%"
                    alignItems="center"
                    justifyContent="space-between"
                    padding="10px"
                  >
                    {/* <Box paddingX={2}>
                      <FavoriteBorderIcon fontSize="medium" />
                    </Box> */}
                    <Box
                      display="flex"
                      paddingX={2}
                      sx={{ backgroundColor: "#AE69B3" }}
                      alignItems="center"
                      borderRadius={20}
                    >
                      <MonetizationOnSharpIcon />
                      <Typography ml={1} fontWeight="bold" fontSize={22}>
                        {item.price}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={glassMorphismStyle}
                    position="absolute"
                    bottom="20px"
                    width="100%"
                    padding="10px"
                  >
                    <Stack alignItems="flex-start">
                      <Typography
                        color="black"
                        fontSize={30}
                        fontWeight={700}
                        sx={{
                          display: "-webkit-box",
                          overflow: "hidden",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1,
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        color="black"
                        fontSize={18}
                        fontWeight={400}
                        sx={{
                          display: "-webkit-box",
                          overflow: "hidden",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1,
                        }}
                      >
                        {item.size}
                      </Typography>
                      <NavLink to='/details' style={{ textDecoration: 'none' }} >
                        <Button sx={{ color: "#440149" }}>
                       
                        <Typography fontWeight="bold" fontSize={20}>
                          Buy Now
                        </Typography>
                      </Button>
                      </NavLink>
                      
                    </Stack>
                  </Box>
                </Box>
                </Grid>
              ))}
            
            
          </Grid>

          {/* <Box width="100%">
            <Box
              marginBottom={5}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h3">Listed Properties</Typography>
              <Typography fontSize={18} fontWeight="bold">
                <a href="#">See All</a>
              </Typography>
            </Box>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-around"
              width="100%"
              flexWrap={{ xs: "wrap", md: "wrap", lg: "wrap" }}
            >
              {myData.map((item) => (
                <Box
                  position="relative"
                  borderRadius="10px"
                  overflow="hidden"
                  height="400px"
                  width="350px"
                  mb={2}
                  sx={{ boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.207)" }}
                >
                  <img
                    src={item.image}
                    alt="house"
                    width="100%"
                    height="100%"
                  />

                  <Box
                    position="absolute"
                    display="flex"
                    top="20px"
                    width="100%"
                    alignItems="center"
                    justifyContent="space-between"
                    padding="10px"
                  >
                    <Box paddingX={2}>
                      <FavoriteBorderIcon fontSize="medium" />
                    </Box>
                    <Box
                      display="flex"
                      paddingX={2}
                      sx={{ backgroundColor: "#AE69B3" }}
                      alignItems="center"
                      borderRadius={20}
                    >
                      <MonetizationOnSharpIcon />
                      <Typography ml={1} fontWeight="bold" fontSize={22}>
                        {item.price}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={glassMorphismStyle}
                    position="absolute"
                    bottom="20px"
                    width="100%"
                    padding="10px"
                  >
                    <Stack alignItems="flex-start">
                      <Typography
                        color="black"
                        fontSize={30}
                        fontWeight={700}
                        sx={{
                          display: "-webkit-box",
                          overflow: "hidden",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1,
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        color="black"
                        fontSize={18}
                        fontWeight={400}
                        sx={{
                          display: "-webkit-box",
                          overflow: "hidden",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1,
                        }}
                      >
                        {item.size}
                      </Typography>
                      <Button sx={{ color: "#440149" }}>
                        {" "}
                        <Typography fontWeight="bold" fontSize={20}>
                          Buy Now
                        </Typography>{" "}
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box> */}
        </Box>
      </Container>
    </section>
  );
};

export default ListPropertiesSection;
