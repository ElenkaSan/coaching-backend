import * as React from "react";
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
export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const handleChange = (event) => {};

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
            {mobile ? (
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
                  <MenuItem onClick={handleClose}>About Us</MenuItem>
                  <MenuItem onClick={handleClose}>
                    Programs for Kids & Adults
                  </MenuItem>
                  <MenuItem onClick={handleClose}>Business</MenuItem>
                  <MenuItem onClick={handleClose}>Publications</MenuItem>
                  <MenuItem onClick={handleClose}>Contact</MenuItem>
                  <MenuItem onClick={handleClose}>Login</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <div className="navBar">
                <Button variant="contained">Home</Button>
                <Button variant="contained">About Us</Button>
                <Button variant="contained">Programs for Kids & Adults</Button>
                <Button variant="contained">Business</Button>
                <Button variant="contained">Publications</Button>
                <Button variant="contained">Contact</Button>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
