import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "../features/connectWallet";
import { setIsConnected } from "../features/profileSlice";
import { NavLink } from "react-router-dom";

const Profile = () => {

  const { ethereum } = window;
  const dispatch = useDispatch();
  // const [walletConnection, setWalletConnection] = useState(false);



  const glassMorphismStyle = {
    background: "rgba(255, 255, 255, 0.2)",
    boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  };

  const currentAddress = useSelector((state)=> state.connectWallet.address)
  const isConnected = useSelector((state)=> state.connectWallet.address)

  const handleConnectWallet = async () => {
    await ethereum.request({
      method: "wallet_requestPermissions",
      params: [{
        eth_accounts: {}
      }]
    });

    let accounts = await ethereum.request({
      method: "eth_requestAccounts"
    });

    if(isConnected){
      dispatch(setIsConnected());
    }else{
      dispatch(setAddress({ address: accounts[0] }));
    dispatch(setIsConnected());
    }

    
  }

  return (
    <>
      <Box>
        <Container>
          <Box mt={2}>
            <Stack spacing={2}>
              <Box sx={ [glassMorphismStyle , {borderRadius: 2, padding: 2 }] }>
                <h1>Rana Ahsan Ansar</h1>
                {
                  isConnected ? (<Typography  sx={{
                    display: '-webkit-box',
                    overflow: 'scroll',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3,
                    '&::-webkit-scrollbar': {
                      display: "none"
                  },
                  '&::-webkit-scrollbar-thumb': {
                      backgroundColor: `rgba(0, 0, 0, 0.05)`,
                      display: "none"
                  }
                }}>{currentAddress}</Typography>) : (<Typography>Connect your crypto Wallet to communicate with Blockchain</Typography>)
                }
                 
                <Box
                  onClick={() => {
                    handleConnectWallet()
                  }}
                >
                  <AccountBalanceWalletIcon />
                </Box>
              </Box>

              <Box>
                <Box>
                  <Grid container spacing={2} >
                    <Grid item xs={12} sm={3}>
                      <Box  sx={{display: "flex" , backgroundColor: 'white' , border: '2px solid gray' , padding: '10px' , borderRadius: '10px' }} >
                        <Box>
                          <Typography
                          variant="h6"
                          fontWeight="bold"
                          fontSize="large"
                        >
                          Listed Properties
                        </Typography>
                        <br />
                        <Typography
                          variant="h3"
                          fontWeight="bold"
                          fontSize="large"
                        >
                          24
                        </Typography>
                        </Box>
                        

                      </Box>
                      
                    </Grid>

                    <Grid item xs={12} sm={3}>
                    <Box  sx={{display: "flex" , backgroundColor:'white' , border: '2px solid gray' , padding: '10px' , borderRadius: '10px' }} >
                      <Box>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          fontSize="large"
                        >
                          My Properties
                        </Typography>
                        <br />
                        {isConnected ? (
                          <Typography
                            variant="h3"
                            fontWeight="bold"
                            fontSize="large"
                          >
                            24
                          </Typography>
                        ) : (
                          <Typography variant="h3"
                          fontWeight="bold"
                          fontSize="large">
                            Connect Wallet
                          </Typography>
                        )}
                      </Box>
                    </Box>
                      
                    </Grid>

                    <Grid item xs={12} sm={3}>
                    <Box  sx={{display: "flex" , backgroundColor: 'white' , border: '2px solid gray' , padding: '10px' , borderRadius: '10px' }} >
                      <Box>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          fontSize="large"
                        >
                          My Deals
                        </Typography>
                        <br />
                        {isConnected ? (
                          <Typography
                            variant="h3"
                            fontWeight="bold"
                            fontSize="large"
                          >
                            10
                          </Typography>
                        ) : (
                          <Typography variant="h3"
                          fontWeight="bold"
                          fontSize="large">
                            Connect Wallet
                          </Typography>
                        )}
                      </Box>
                      </Box>
                      
                    </Grid>

                    <Grid item xs={12} sm={3}>
                    <Box  sx={{display: "flex" , backgroundColor: 'white' , border: '2px solid gray' , padding: '10px' , borderRadius: '10px' }} >
                      <Box>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          fontSize="large"
                        >
                          My Status
                        </Typography>
                        <br />
                        {isConnected ? (
                          <Typography
                          variant="h3"
                          fontWeight="bold"
                          fontSize="large"
                          color='green'
                          component={NavLink} to='/dashboard/approvalRequest' 
                        >
                          Approved
                          
                          
                        </Typography>
                        ) : (
                          <Typography variant="h3"
                          fontWeight="bold"
                          fontSize="large">
                            Connect Wallet
                          </Typography>
                        )}
                      </Box>
                      </Box>
                      
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Profile;
