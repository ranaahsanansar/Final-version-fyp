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
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant='h5' component="div" sx={{ flexGrow: 1 }}>Real Estate Tokenization</Typography>
          

          <Stack direction='row' spacing={2} >
          <Typography>{currentAddress}</Typography>
            <Typography>Connect Wallet</Typography>
            <Box onClick={handleConnectWallet} >
              <AccountBalanceWalletIcon />
            </Box>

          </Stack>

          {/* <Button component={NavLink} to='/' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Home</Button>

          <Button component={NavLink} to='/contact' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Contact</Button>

          <Button component={NavLink} to='/login' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Login/Singup</Button> */}

        </Toolbar>
      </AppBar>
    </Box>
  </>;
};

export default Navbar;
