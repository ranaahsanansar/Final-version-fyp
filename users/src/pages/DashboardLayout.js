import React from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import { NavLink, Outlet } from "react-router-dom";
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../services/LocalStorageService";
import ChangePassword from "./auth/ChangePassword";
import { useGetLoggedUserQuery } from "../services/userAuthApi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo, unsetUserInfo } from "../features/userSlice";
import { unsetUserToken } from "../features/authSlice";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(unsetUserToken({ token: null }));
    dispatch(unsetUserInfo({ name: "", email: "" }));
    removeToken("token");
    navigate("/login");
  };

  const token = getToken();
  const { data, isSuccess } = useGetLoggedUserQuery(token);

  const [userData, setUserData] = useState({
    email: "",
    name: "",
  });

  // Store User Data in Local State
  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        email: data.user.email,
        name: data.user.name,
      });
    }
  }, [data, isSuccess]);

  // Store User Data in Redux Store
  const dispatch = useDispatch();
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(
        setUserInfo({
          email: data.user.email,
          name: data.user.name,
        })
      );
    }
  }, [data, isSuccess, dispatch]);

  return (
    <div>
      <DashboardNavbar />
      <Grid container  >
        <Grid
          item
          lg={2}
          md={2}
          sx={{
            backgroundColor: "#F3E5AB",
            p: 2,
            color: "white",
            display: { xs: "none", sm: "none", md: "block" },
            height: { lg: '90vh', md: '90vh', sm: 'auto', xs: 'auto' },
            overflow: 'scroll',
            '&::-webkit-scrollbar': {
              display: "none"
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: `rgba(0, 0, 0, 0.05)`,
              display: "none"
            }
          }}
        >
          <Box sx={{ mb: '20px' }}>
            <h1 style={{ color: 'black' }} >Dashboard</h1>
          </Box>


          <Stack spacing={1}>
            <Button
              component={NavLink}
              variant="contained"
              to="/"
              style={({ isActive }) => {
                return { backgroundColor: isActive ? "white" : "#A9D6C6" };
              }}
              sx={{ color: "black", textTransform: "none", width: "100%" }}
            >
              Home
            </Button>
            <Button
              component={NavLink}
              variant="contained"
              to="profile"
              style={({ isActive }) => {
                return { backgroundColor: isActive ? "white" : "#A9D6C6" };
              }}
              sx={{ color: "black", textTransform: "none", width: "100%" }}
            >
              Profile
            </Button>
            <Button
              component={NavLink}
              variant="contained"
              to="propertyLogs"
              style={({ isActive }) => {
                return { backgroundColor: isActive ? "white" : "#A9D6C6" };
              }}
              sx={{ color: "black", textTransform: "none", width: "100%" }}
            >
              Property Info
            </Button>
            <Button
              component={NavLink}
              variant="contained"
              to="listproperty"
              style={({ isActive }) => {
                return { backgroundColor: isActive ? "white" : "#A9D6C6" };
              }}
              sx={{ color: "black", textTransform: "none", width: "100%" }}
            >
              List Property
            </Button>
            <Button
              component={NavLink}
              variant="contained"
              to="buyPropertyBlockchain"
              style={({ isActive }) => {
                return { backgroundColor: isActive ? "white" : "#A9D6C6" };
              }}
              sx={{ color: "black", textTransform: "none", width: "100%" }}
            >
              Buy Property
            </Button>
            <Button
              component={NavLink}
              variant="contained"
              to="sellPropertyBlockchain"
              style={({ isActive }) => {
                return { backgroundColor: isActive ? "white" : "#A9D6C6" };
              }}
              sx={{ color: "black", textTransform: "none", width: "100%" }}
            >
              Sell Property
            </Button>
            <Button
              component={NavLink}
              variant="contained"
              to="changePassword"
              style={({ isActive }) => {
                return { backgroundColor: isActive ? "white" : "#A9D6C6" };
              }}
              sx={{ color: "black", textTransform: "none", width: "100%" }}
            >
              Change Password
            </Button>
            <Button
              component={NavLink}
              variant="contained"
              to="approvalRequest"
              style={({ isActive }) => {
                return { backgroundColor: isActive ? "white" : "#A9D6C6" };
              }}
              sx={{ color: "black", textTransform: "none", width: "100%" }}
            >
              Approval Request
            </Button>
            <Button

              variant="contained"
              onClick={handleLogout}
              sx={{ color: "black", textTransform: "none", width: "100%", backgroundColor: '#A9D6C6' }}
            >
              Logout
            </Button>
          </Stack>

        </Grid>
        <Grid item sm={12} lg={10} md={10} xs={12}
          sx={{
            height: { lg: '90vh', md: '90vh', sm: '90vh', xs: '90vh' },
            // backgroundColor : "#353839",
            backgroundColor: "#A9D6C6",
            overflow: 'scroll', '&::-webkit-scrollbar': {
              display: "none"
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: `rgba(0, 0, 0, 0.05)`,
              display: "none"
            }
          }}
        >
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardLayout;
