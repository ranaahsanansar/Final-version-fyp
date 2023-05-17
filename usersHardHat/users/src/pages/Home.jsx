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
    /* From https://css.glass */
    background: "rgba(255, 255, 255, 0.2)",
    boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  };
  return (
    <>
      {/* Main Hero Section  */}

      <HeroSection />

      {/* We offers  */}
      <WeOfferSection />

      {/* List some Properties to display of Home Page  */}
      <ListPropertiesSection />

      {/* How it works */}

      <section
        style={{
          backgroundImage:
            "linear-gradient(to right bottom , #9936a0 ,#22b2cf ,  #1d399f)",
        }}
      >
        <Container>
          <Box height="100%" display="flex" alignItems="center" paddingY={3}>
            <Box width="100%">
              <Box marginBottom={5}>
                <Typography fontSize="32px" fontWeight='bold'>How it works</Typography>
              </Box>

              <Grid container spacing={2} alignItems='start'  >

                <Grid item xs={12} md={6} lg={4} >
                <Box
                  height="300px"
                  sx={glassMorphismStyle}
                  padding={2} 
                  borderRadius={5}
                  marginY={2}
                  marginX={{ xs: "0px", sm: "4px", md: "4px", lg: "5px" }}
                >
                  <Stack spacing={1}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography>Step 1</Typography>
                      <AccountBalanceWalletIcon fontSize="large" />
                    </Box>
                    <Box>
                      {" "}
                      <Typography variant="h6" fontWeight="bold">
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
                  sx={glassMorphismStyle}
                  padding={2}
                  borderRadius={5}
                  marginY={2}
                  marginX={{ xs: "0px", sm: "4px", md: "4px", lg: "5px" }}
                >
                  <Stack spacing={1}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography>Step 2</Typography>
                      <FingerprintIcon fontSize="large" />
                    </Box>
                    <Box>
                      {" "}
                      <Typography variant="h6" fontWeight="bold">
                        {" "}
                        Verification
                      </Typography>{" "}
                    </Box>
                    <Box>
                      <Typography
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
                  sx={glassMorphismStyle}
                  padding={2}
                  borderRadius={5}
                  marginY={2}
                  marginX={{ xs: "0px", sm: "4px", md: "4px", lg: "5px" }}
                >
                  <Stack spacing={1}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography>Step 3</Typography>

                      <SellIcon fontSize="large" />
                    </Box>
                    <Box>
                      {" "}
                      <Typography variant="h6" fontWeight="bold">
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
                      >
                        Our smart contracts enhance security and efficiency in real estate transactions. They enable seamless transfer of property ownership and eliminate the need for intermediaries. Experience the future of real estate transactions with us.
                      </Typography>{" "}
                    </Box>
                  </Stack>
                </Box>
                </Grid>
                
              </Grid>

              {/* <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexWrap={{ xs: "wrap", md: "wrap", lg: "wrap" }}
              >
                <Box
                  width="300px"
                  height="300px"
                  sx={glassMorphismStyle}
                  padding={2}
                  borderRadius={5}
                  marginY={2}
                  marginX={{ xs: "0px", sm: "4px", md: "4px", lg: "5px" }}
                >
                  <Stack spacing={1}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography>Step 1</Typography>
                      <AccountBalanceWalletIcon fontSize="large" />
                    </Box>
                    <Box>
                      {" "}
                      <Typography variant="h6" fontWeight="bold">
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
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Harum, odio. Facilis placeat obcaecati repellendus est
                        unde voluptatem velit harum officia dolores recusandae.
                        Ipsum, pariatur? Modi cumque est quo quia facere?
                      </Typography>{" "}
                    </Box>
                  </Stack>
                </Box>

                <Box
                  width="300px"
                  height="300px"
                  sx={glassMorphismStyle}
                  padding={2}
                  borderRadius={5}
                  marginY={2}
                  marginX={{ xs: "0px", sm: "4px", md: "4px", lg: "5px" }}
                >
                  <Stack spacing={1}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography>Step 1</Typography>
                      <FingerprintIcon fontSize="large" />
                    </Box>
                    <Box>
                      {" "}
                      <Typography variant="h6" fontWeight="bold">
                        {" "}
                        Verification
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
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Harum, odio. Facilis placeat obcaecati repellendus est
                        unde voluptatem velit harum officia dolores recusandae.
                        Ipsum, pariatur? Modi cumque est quo quia facere?
                      </Typography>{" "}
                    </Box>
                  </Stack>
                </Box>

                <Box
                  width="300px"
                  height="300px"
                  sx={glassMorphismStyle}
                  padding={2}
                  borderRadius={5}
                  marginY={2}
                  marginX={{ xs: "0px", sm: "4px", md: "4px", lg: "5px" }}
                >
                  <Stack spacing={1}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography>Step 1</Typography>

                      <SellIcon fontSize="large" />
                    </Box>
                    <Box>
                      {" "}
                      <Typography variant="h6" fontWeight="bold">
                        Sell Properties with smart Contract
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
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Harum, odio. Facilis placeat obcaecati repellendus est
                        unde voluptatem velit harum officia dolores recusandae.
                        Ipsum, pariatur? Modi cumque est quo quia facere?
                      </Typography>{" "}
                    </Box>
                  </Stack>
                </Box>
              </Box> */}
            </Box>
          </Box>
        </Container>
      </section>
    </>
  );
};

export default Home;
