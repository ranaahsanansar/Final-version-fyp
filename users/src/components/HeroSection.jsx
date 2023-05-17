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

const HeroSection = () => {
  const glassMorphismStyle = {
    /* From https://css.glass */
    background: "rgba(255, 255, 255, 0.2)",
    boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  };
  return (
    <section style={{ backgroundColor: "rgba(207, 203, 203, 0.414)" }}>
      <Container >
        <Box height="100%" display="flex" >
          <Grid container spacing={2} mt='10px' >
            <Grid item  xs={12} md={6} lg={6}>
            <Box padding={2} borderRadius={5} sx={glassMorphismStyle}>
              <Stack spacing={2}>
                <Typography fontSize="32px" fontWeight='bold'>
                Pakistan's First Block-chain Powered Real-Estate Marketplace.
                </Typography>
                <Typography fontSize='22px' >
                Our innovative digital platform leverages the power of blockchain technology to provide a secure, transparent, and efficient way to buy and sell properties in Pakistan. Find the property of your dreams and close the deal without any intermediaries.
                </Typography>
                <Stack direction="row" spacing={3}>
                <NavLink to='/login' style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundImage:
                        "linear-gradient(to right , #AE69B3 , #4868DB)",
                    }}
                  >
                    <Typography fontWeight="bold">Connect Wallet</Typography>
                  </Button>
                </NavLink>
                  
                  <NavLink to='/filter' style={{ textDecoration: 'none' }}>
                  <Button variant="outlined">Explore Properties</Button>
                  </NavLink>
                </Stack>
              </Stack>
            </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={6} >
            <Box>
              <img src="/images/main.png" width="100%" />
            </Box>
            </Grid>
            
          </Grid>

          <Box
            display="flex"
            flexWrap={{ xs: "wrap", sm: "wrap", md: "nowrap", lg: "nowrap" }}
            alignItems="center"
          >
            {/* <Box padding={2} borderRadius={5} sx={glassMorphismStyle}>
              <Stack spacing={2}>
                <Typography variant="h2" fontWeight={500}>
                  Digitalizing Real Estate
                </Typography>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea
                  eos magnam amet quod laudantium nihil molestias accusamus
                  quisquam quasi fugit voluptas cum consequatur eveniet libero
                  hic eius, sunt maiores dolorem!
                </Typography>
                <Stack direction="row" spacing={3}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundImage:
                        "linear-gradient(to right , #AE69B3 , #4868DB)",
                    }}
                  >
                    <Typography fontWeight="bold">Connect Wallet</Typography>
                  </Button>
                  <Button variant="outlined">Explore Properties</Button>
                </Stack>
              </Stack>
            </Box> */}

            {/* <Box>
              <img src="/images/main.png" width="100%" />
            </Box> */}
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default HeroSection;
