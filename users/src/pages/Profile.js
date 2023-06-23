import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography, 
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "../features/connectWallet";
import { setIsConnected } from "../features/profileSlice";
import { NavLink } from "react-router-dom";
import citizenContract from "../artifacts/contracts/Citizens.sol/Citizens.json";
import { ethers } from "ethers";
import {nodeProviderUrl} from "../dataVariables";
import { citizenContractAddress } from "../dataVariables";
import YourPropertiesDetails from "../components/YourPropertiesDetails";
import Chart from "../components/ChartComponent";
import axios from "axios";


const Profile = () => {
  const [alert, setAlert] = useState({
    status: false,
    msg: "",
    type: ""
  });


  const { ethereum } = window;
  const dispatch = useDispatch();
  // const [walletConnection, setWalletConnection] = useState(false);
  const { token } = useSelector(state => state.auth)


  const [userName , setUserName]  = useState("Rana Ahsan Ansar");


  const fetchUser = async () => {
    const response = await axios.get('http://localhost:8000/api/user/loggeduser', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log(response.data.user.name)
    setUserName(response.data.user.name)
    // console.log(userName)
    
  }
  useEffect(()=>{
    fetchUser()
  } , [])



  const glassMorphismStyle = {
    background: "rgba(255, 255, 255, 0.2)",
    boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  };

  const currentAddress = useSelector((state)=> state.connectWallet.address)
  const isConnected = useSelector((state)=> state.connectWallet.address)
  const [approvStatus , setApprovStatus] = useState(false);

  const handleConnectWallet = async () => {

    try{

   
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


    let contractAddress = citizenContractAddress;

    const nodeProvider = new ethers.providers.JsonRpcProvider(
      nodeProviderUrl
    )
    const getContractData = new ethers.Contract(
      contractAddress,
      citizenContract.abi,
      nodeProvider
    )

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")

    const _accounts = await provider.send("eth_requestAccounts", []);

    const _address = _accounts[0];
    console.log(_address)

    const dataResult = await getContractData.getCitizenIsApproved(_address);

    console.log(dataResult);

    setApprovStatus(dataResult);
  }catch(err){
    setAlert({
      status: true,
      msg: "Kindly Install meta mask Wallet and login your account",
      type: "error"
    })
  }

  }

  useEffect(() => {
    // console.log("1")
    if (alert.status === true) {
      setTimeout(() => {

        setAlert({
          status: false,
          msg: "",
          type: ""
        })
      }, 5000);
    }

  })

  return (
    <>
      <Box>
        <Container>
          <Box mt={2}>
            <Stack spacing={2}>
          {alert.status ? <Alert severity={alert.type} sx={{ mt: 3 }}>{alert.msg}</Alert> : ''}

              <Box sx={ [ {borderRadius: 2, padding: 2 , backgroundColor: 'white' , display: 'flex' , alignItems: 'center' , justifyContent:'space-between' }] }>
                <Box>
                <h1>{userName}</h1>
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
                </Box>
                 
                <Box
                  onClick={() => {
                    handleConnectWallet()
                  }}

                  sx={{ border: '1px solid black' , fontWeight:'bold' ,paddingX: '32px', paddingY: '14px' , borderRadius: '5px' , backgroundColor:'#F3E5AB' , cursor: 'pointer' }}
                >
                  <Typography onClick={() => {
                    handleConnectWallet()
                  }} >Connect Wallet</Typography> 
                  {/* <AccountBalanceWalletIcon style={{fontSize: '50px'}} /> */}
                </Box>
              </Box>

              <Box>
                <Box>
                  <Grid container spacing={2} >
                    {/* <Grid item xs={12} sm={3}>
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
                      
                    </Grid> */}

                    {/* <Grid item xs={12} sm={3}>
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
                      
                    </Grid> */}

                    {/* <Grid item xs={12} sm={3}>
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
                      
                    </Grid> */}

                    <Grid item xs={12} sm={3}>
                    {/* <Box  sx={{display: "flex" , backgroundColor: 'white' , border: '2px solid gray' , padding: '10px' , borderRadius: '10px' }} >
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
                          
                            approvStatus ? (<Typography
                              variant="h3"
                              fontWeight="bold"
                              fontSize="large"
                              color='green'
                            >
                              Approved
                            </Typography>) : (<Typography
                              variant="h3"
                              fontWeight="bold"
                              fontSize="large"
                              color='green'
                              component={NavLink} to='/dashboard/approvalRequest' 
                            >
                              Pending
                            </Typography>)
                          
                          
                        ) : (
                          <Typography variant="h3"
                          fontWeight="bold"
                          fontSize="large">
                            Connect Wallet
                          </Typography>
                        )}
                      </Box>
                      </Box> */}
                      
                    </Grid>
                  </Grid>
                </Box>
              </Box>
                  {/* Your Property Details */}
                  <YourPropertiesDetails />
              <Box> 

                
                
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Profile;
