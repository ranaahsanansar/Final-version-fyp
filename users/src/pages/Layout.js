import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ResponsiveNavbar from "../components/responsiveNavbar";


const Layout = () => {
  return <>
    <CssBaseline />
    <ResponsiveNavbar />
    <Outlet />
  </>;
};

export default Layout;
