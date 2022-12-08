// import * as React from "react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../auth/UserContext";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Button, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import "../components/component.css";


// export default function Header() {
export default function Header({ logout }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  const { isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  const handleClick = () => {
      logout();
      // navigate.push("/");
      navigate("/")
  }

  // const handleChange = (event) => {};

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: "inherit" }} className="mainbox">
      <AppBar className="secondBox">
        <Toolbar sx={{ justifyContent: "space-around" }}>
          <Typography variant="h6" component="div" style={{ color: "skyblue" }}>
            LOGO
          </Typography>

          <div>
            {mobile && isLoggedIn ? (
              <>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={handleMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Home</MenuItem>
                  <MenuItem to="/company" type="AboutUs" onClick={handleClose}>About Us</MenuItem>
                  <MenuItem to="/programs" type="Programs" onClick={handleClose}>
                    Programs for Kids & Adults
                  </MenuItem>
                  <MenuItem to="/business" type="Business" onClick={handleClose}>Business</MenuItem>
                  <MenuItem to="/publications" type="Publications" onClick={handleClose}>Publications</MenuItem>
                  <MenuItem to="/contact" type="Contact" onClick={handleClose}>Contact</MenuItem>
                  <MenuItem to="/login" type="login" onClick={handleClose}>Login</MenuItem>
                  <MenuItem to="/" type="logout" onClick={handleClick}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <div className="navBar">
                <Button variant="contained">Home</Button>
                <Button to="/company" type="AboutUs" variant="contained">About Us</Button>
                <Button to="/programs" type="Programs" variant="contained">Programs for Kids & Adults</Button>
                <Button to="/business" type="Business" variant="contained">Business</Button>
                <Button to="/publications" type="Publications" variant="contained">Publications</Button>
                <Button to="/login" type="Login" Click={handleClose}>Login</Button>
                <Button to="/signup" type="Signup" Click={handleClose}>Signup</Button>
                <Button to="/contact" type="Contact" variant="contained">Contact</Button>
                <Button variant="contained">Eng/Rus</Button>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
