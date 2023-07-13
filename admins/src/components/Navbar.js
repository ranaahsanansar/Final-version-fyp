import { AppBar, Box, Toolbar, Typography, Button, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useDispatch, useSelector } from 'react-redux';
import { setAddress } from '../features/connectWallet';


const Navbar = () => {

  const { ethereum } = window;
  const dispatch = useDispatch();

  const currentAddress = useSelector((state)=> state.connectWallet.address)


  const handleConnectWallet = async (e) => {
    e.preventDefault();
    await ethereum.request({
      method: "wallet_requestPermissions",
      params: [{
        eth_accounts: {}
      }]
    });

    let accounts = await ethereum.request({
      method: "eth_requestAccounts"
    });

    dispatch(setAddress({ address: accounts[0] }));
    
  }

  return <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#A9D6C6' , border: "3px solid black" }}>
        <Toolbar>
          <Typography variant='h5' component="div" sx={{ flexGrow: 1 , color: '#060606' }}>Real Estate Tokenization</Typography>
          

          <Stack direction='row' spacing={2} >
          <Typography>{currentAddress}</Typography>
            {/* <Typography color='black' >Connect Wallet</Typography> */}
            <Box onClick={handleConnectWallet} >
              <AccountBalanceWalletIcon style={{color: 'black'}}  />
            </Box>

          </Stack>

        </Toolbar>
      </AppBar>
    </Box>
  </>;
};

export default Navbar;