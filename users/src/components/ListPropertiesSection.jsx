import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { path } from "../dataVariables";
import { SignalCellularNullOutlined } from "@mui/icons-material";


const ListPropertiesSection = () => {

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

  const glassMorphismStyle = {
    /* From https://css.glass */
    background: "rgba(255, 255, 255, 0.2)",
    boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  };

  return (
    <section style={{ backgroundColor: '#B7D0B5' }} >
      <Container>
        <Box height="100%" width='100%' alignItems="center" paddingY={3}>
          <Box
            marginBottom={5}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontSize="38px" fontWeight='bold' className="lato-font" >Listed Properties</Typography>
            {/* <Typography fontSize={18} fontWeight="bold">
              <a href="#">See All</a>
            </Typography> */}
          </Box>
          <Grid container spacing={2} alignItems='start' >

            {list.map((item, index) => {
              console.log(item._id)
              if (index < 6) {
                  return (
                  <Grid item xs={12} md={6} lg={4} key={index} >
                    <Box
                      position="relative"
                      borderRadius="10px"
                      overflow="hidden"
                      height='350px'
                      mb={2}
                      sx={{ boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.207)" }}
                    >
                      <img
                        src={path + item.photos[0]}
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
                          sx={{ backgroundColor: "#F3E5AB" }}
                          alignItems="center"
                          justifyContent='center'
                          borderRadius={20}
                        >

                          <Typography ml={1} className="lato-font" fontWeight="bold" color='black' fontSize="18px">
                            RS.{item.price}
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        sx={{ backgroundColor: 'black' }}
                        position="absolute"
                        bottom="0px"
                        width="100%"
                        padding="10px"
                      >
                        <Stack direction='row' justifyContent='space-between' alignItems='center' >
                          <Box>
                            <Typography
                              color="whitesmoke"

                              fontWeight={700}
                              sx={{
                                display: "-webkit-box",
                                overflow: "hidden",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 1,
                                fontSize: '20px'
                              }}
                              className="lato-font"
                            >
                              {item.title}
                            </Typography>

                            <Typography
                              color="whitesmoke"

                              fontWeight={400}
                              sx={{
                                display: "-webkit-box",
                                overflow: "hidden",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 1,
                                fontSize: '16px'
                              }}
                              className="lato-font"
                            >
                              {item.location.head}
                            </Typography>
                          </Box>

                          <NavLink to={`/details/${item._id}`} style={{ textDecoration: 'none' }} >
                            <Button sx={{ color: "#060606", borderRadius: "20px", backgroundColor: "#F3E5AB", paddingX: '24px' }} >

                              <Typography fontWeight="bold" fontSize="14px" className="lato-font"  >
                                Buy Now

                              </Typography>
                            </Button>
                          </NavLink>

                        </Stack>
                      </Box>
                    </Box>
                  </Grid>)
              }else {
                return null;
              }
            }
            )}


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
