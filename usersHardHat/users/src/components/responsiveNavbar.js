import { useRef } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "./responsiveNavbar.css";

import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { getToken } from "../services/LocalStorageService";

function ResponsiveNavbar() {
  const navRef = useRef();
  const token = getToken("token");
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <h3>Real Estate</h3>
      <nav ref={navRef}>
        <Button
          component={NavLink}
		  onClick={showNavbar}
          to="/"
          style={({ isActive }) => {
            return { backgroundColor: isActive ? "#6d1b7b" : "" };
          }}
          sx={{ color: "white", textTransform: "none" }}
        >
          Home
        </Button>
        <Button
          component={NavLink}
		  onClick={showNavbar}
          to="/filter"
          style={({ isActive }) => {
            return { backgroundColor: isActive ? "#6d1b7b" : "" };
          }}
          sx={{ color: "white", textTransform: "none" }}
        >
          Explore
        </Button>
        {/* <a href="/#">My work</a>
        <a href="/#">Blog</a>
        <a href="/#">About me</a> */}
		{token ? (
              <Button
                component={NavLink}
                to="/dashboard"
				onClick={showNavbar}
                style={({ isActive }) => {
                  return { backgroundColor: isActive ? "#6d1b7b" : "" };
                }}
                sx={{ color: "white", textTransform: "none" }}
              >
                Dashboard
              </Button>
            ) : (
              <Button
                component={NavLink}
				onClick={showNavbar}
                to="/login" 
                style={({ isActive }) => {
                  return { backgroundColor: isActive ? "#6d1b7b" : "" };
                }}
                sx={{ color: "white", textTransform: "none" }}
              >
                Login/Registration
              </Button>
            )}
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <CloseIcon />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <MenuIcon />
      </button>
    </header>
  );
}

export default ResponsiveNavbar;
