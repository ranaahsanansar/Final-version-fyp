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
    <Box sx={{ backgroundColor: "#A9D6C6", height: { md: '100vh', lg: '100vh' }, alignItems: 'center', display: 'flex' }}>
      <Container   >
        <Box height="100%" display="flex" alignItems='center' justifyContent='center'  >
          <Grid container spacing={3} mt='10px' >
            <Grid item xs={12} md={6} lg={6} display="flex" alignItems='center' justifyContent='center'   >
              <Box padding={2} borderRadius={5} >
                <Stack spacing='24px'>
                  <Typography fontSize="46px" fontWeight='bold' className="lato-font" >
                    Digitalizing Real Estate of Pakistan
                  </Typography>
                  <Typography fontSize='17px' className="lato-font"  >
                    Discover a New Era of Real Estate. Seamlessly Buy, Sell, and invest in Properties Across Pakistan with our Cutting-Edge Decentralized Marketplace
                  </Typography>
                  <Stack direction="row" spacing={3}>
                    <NavLink to='/login' style={{ textDecoration: 'none' }}>
                      <Button
                        variant="contained"
                        sx={{
                          // backgroundImage:
                          //   "linear-gradient(to right , #AE69B3 , #4868DB)",
                          backgroundColor: "#F3E5AB", paddingX: '24px', paddingY: '12px',
                        }}
                      >
                        <Typography fontWeight="bold" className="lato-font" color='black' >Connect Wallet</Typography>
                      </Button>
                    </NavLink>

                    <NavLink to='/filter' style={{ textDecoration: 'none' }}>
                      <Button variant="outlined" sx={{ color: 'black', border: '1px solid black', fontWeight: 'bold', paddingX: '24px', paddingY: '12px' }} className="lato-font"  >Explore Properties</Button>
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
           
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
