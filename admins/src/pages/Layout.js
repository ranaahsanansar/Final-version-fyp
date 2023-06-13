import { Box, Button, CssBaseline, Grid, Stack, Typography } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return <>
    <CssBaseline />
    <Navbar />
    <Box>
      <Grid container sx={{height: '90vh'}} >
        <Grid item lg={2} md={2} sm={2} sx={{ height: '100%' , backgroundColor: '#F3E5AB' , overflow: 'scroll' , '&::-webkit-scrollbar': {
          display: "none"
      },
      '&::-webkit-scrollbar-thumb': {
          backgroundColor: `rgba(0, 0, 0, 0.05)`,
          display: "none"
      } }} >
          <Box height='100%'  >
            <Box height='100%'>
              <Stack >
                <Box my={2} padding={2} >
                  <Typography variant="h4" fontWeight='bold' fontSize='lg' color='black' >Admins</Typography>
                </Box>
                <Box mx={2} >
                  <Stack spacing={2}>
                  <Button
                    component={NavLink} 
                    to='/'
                    sx={{ backgroundColor: "#A9D6C6" , color: '#060606'}}
                    variant='contained' style={({ isActive }) => {
                      return { backgroundColor: isActive ? "white" : "#A9D6C6" };
                    }} >Property Details</Button>
                  <Typography variant="h6"  fontSize='medium' color='black' >LandInspector</Typography>
                    <Button
                    component={NavLink} 
                    to='/add-property'
                    sx={{ backgroundColor: "#A9D6C6"  ,  color: '#060606'}}
                    variant='contained' 
                    style={({ isActive }) => {
                      return { backgroundColor: isActive ? "white" : "#A9D6C6" };
                    }}
                    >Add Property</Button>
                    
                    <Button
                    component={NavLink} 
                    to='/transaction'
                    sx={{ backgroundColor: "#A9D6C6" , color: '#060606'}}
                    variant='contained' style={({ isActive }) => {
                      return { backgroundColor: isActive ? "white" : "#A9D6C6" };
                    }}  >Transactions</Button>
                    <Typography variant="h6"  fontSize='medium' color='black' >Gov. Authority</Typography>
                    <Button
                    component={NavLink}
                    to='/citizen-approval'
                    sx={{ backgroundColor: "#A9D6C6" , color: '#060606'}}
                    variant='contained' style={({ isActive }) => {
                      return { backgroundColor: isActive ? "white" : "#A9D6C6" };
                    }}  >Citizen Approval</Button>
                    <Button
                    component={NavLink}
                    to='/manage-citizen'
                    sx={{ backgroundColor: "#A9D6C6" , color: '#060606'}}
                    variant='contained' style={({ isActive }) => {
                      return { backgroundColor: isActive ? "white" : "#A9D6C6" };
                    }}  >Manage Citizen</Button>
                  
                    <Button
                    component={NavLink} 
                    to='/manage-society'
                    sx={{ backgroundColor: "#A9D6C6" , color: '#060606'}}
                    variant='contained' style={({ isActive }) => {
                      return { backgroundColor: isActive ? "white" : "#A9D6C6" };
                    }}  >Manage Society</Button>
                    
                    <Typography variant="h6"  fontSize='medium' color='black' >High Court</Typography>
                    <Button
                    component={NavLink} 
                    to='/manage-properties'
                    sx={{ backgroundColor: "#A9D6C6" , color: '#060606' }}
                    variant='contained' style={({ isActive }) => {
                      return { backgroundColor: isActive ? "white" : "#A9D6C6" };
                    }}  >Manage</Button>
                    <Box mt={2} ></Box>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={10} md={10} sm={10} sx={{ height: '100%' , overflowY: 'scroll' , backgroundColor:'#A9D6C6' , '&::-webkit-scrollbar': {
          display: "none"
      } }}>
          <Outlet /> 
        </Grid>
      </Grid>
    </Box>
  </>;
};

export default Layout;