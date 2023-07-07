import { Button, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Stack from "@mui/material/Stack";
import MonetizationOnSharpIcon from "@mui/icons-material/MonetizationOnSharp";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarsSharpIcon from "@mui/icons-material/StarsSharp";

import FingerprintIcon from "@mui/icons-material/Fingerprint";
import SellIcon from "@mui/icons-material/Sell";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import HeroSection from "../components/HeroSection";
import WeOfferSection from "../components/WeOfferSection";
import ListPropertiesSection from "../components/ListPropertiesSection";

const Home = () => {
  const glassMorphismStyle = {
    background: "rgba(255, 255, 255, 0.2)",
    boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  };
  return (
    <>
      <HeroSection />

      <WeOfferSection />

      <ListPropertiesSection />


      <Box
      component='section'
        sx={{
          backgroundColor: "#A9D6C6",
          display: 'flex',
          alignItems: 'center',
          alignItems: 'center',
          height: {md: 'auto' , lg: '100vh' , sm: 'auto' },
        }}
        
      >
        <Container>
          <Box height="100%" display="flex" alignItems="center" paddingY={3}>
            <Box width="100%">
              <Box marginBottom={5}>
                <Typography fontSize="38px" fontWeight='bold' className="lato-font" >How it works</Typography>
              </Box>

              <Grid container spacing={2} alignItems='start'  >

                <Grid item xs={12} md={6} lg={4} >
                <Box
                  height="300px"
                  sx={{backgroundColor: '#F3E5AB'}}
                  padding={2} 
                  borderRadius={5}
                  marginY={2}
                  marginX={{ xs: "0px", sm: "4px", md: "4px", lg: "5px" }}
                >
                  <Stack spacing={1}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography className="lato-font"  color='black' >Step 1</Typography>
                      <AccountBalanceWalletIcon style={{ color:'black' }} fontSize="large" />
                    </Box>
                    <Box>
                      {" "}
                      <Typography variant="h6"  className="lato-font"  color='black'  fontWeight="bold">
                        Connect Wallet
                      </Typography>{" "}
                    </Box>
                    <Box>
                      {" "}
                      <Typography
                        sx={{
                          display: "-webkit-box",
                          overflow: "hidden",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 6,
                        }}
                        color='black' 
                      >
                        To get started, you'll need to connect your digital wallet to our platform. This is a simple and secure process that allows you to interact with our smart contracts and participate in real estate transactions.
                      </Typography>{" "}
                    </Box>
                  </Stack>
                </Box>
                </Grid>

                <Grid item xs={12} md={6} lg={4} >
                <Box
                  height="300px"
                  sx={{backgroundColor: '#F3E5AB'}}
                  padding={2}
                  borderRadius={5}
                  marginY={2}
                  marginX={{ xs: "0px", sm: "4px", md: "4px", lg: "5px" }}
                >
                  <Stack spacing={1}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography color='black' >Step 2</Typography>
                      <FingerprintIcon style={{ color:'black' }} fontSize="large" />
                    </Box>
                    <Box>
                      {" "}
                      <Typography variant="h6" color='black'  fontWeight="bold">
                        {" "}
                        Verification
                      </Typography>{" "}
                    </Box>
                    <Box>
                      <Typography
                       color='black' 
                        sx={{
                          display: "-webkit-box",
                          overflow: "hidden",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 6,
                        }}
                      >
                        To ensure the highest level of security and transparency, we require all users to complete a KYC (Know Your Customer) process before buying or selling properties on our platform. This helps us verify your identity and ensure that you are a legitimate user.
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
                </Grid>

                <Grid item xs={12} md={6} lg={4} >
                <Box
                  height="300px"
                  sx={{backgroundColor: '#F3E5AB'}}
                  padding={2}
                  borderRadius={5}
                  marginY={2}
                  marginX={{ xs: "0px", sm: "4px", md: "4px", lg: "5px" }}
                >
                  <Stack spacing={1}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography color='black' >Step 3</Typography>

                      <SellIcon style={{ color:'black' }} fontSize="large" />
                    </Box>
                    <Box>
                      {" "}
                      <Typography color='black'  variant="h6" fontWeight="bold">
                        Sell with smart Contract
                      </Typography>{" "}
                    </Box>
                    <Box>
                      {" "}
                      <Typography
                        sx={{
                          display: "-webkit-box",
                          overflow: "hidden",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 6,
                        }}
                        color='black' 
                      >
                        Our smart contracts enhance security and efficiency in real estate transactions. They enable seamless transfer of property ownership and eliminate the need for intermediaries. Experience the future of real estate transactions with us.
                      </Typography>{" "}
                    </Box>
                  </Stack>
                </Box>
                </Grid>
                
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home;
