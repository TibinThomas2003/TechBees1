import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import { NavLink } from 'react-router-dom';
import logo from '../Assets/bees.png';

function ResponsiveAppBar({ cartItemCount, isLoggedIn, handleLogout }) {
  const userEmail = localStorage.getItem('userEmail');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (userEmail === 'admin@gmail.com') {
    return null; // Render nothing if userEmail is admin@gmail.com
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img  src={logo} alt="TechBees Logo" style={{filter: 'drop-shadow(1px 2px 3px #222)', width: '50px', marginRight: '10px' }} /> {/* Logo */}
          <Typography
            variant="h6"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': { // Remove hover effect
                textDecoration: 'none',
              }
            }}
          >
            TECHBEES
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!userEmail ? (
            <Button
              component={NavLink}
              to="/login"
              color="inherit"
              sx={{ '&:hover': { // Remove hover effect
                backgroundColor: 'transparent',
              }}}
            >
              Login
            </Button>
          ) : (
            <>
              <Button
                component={NavLink}
                to="/home"
                color="inherit"
                sx={{ '&:hover': { // Remove hover effect
                  backgroundColor: 'transparent',
                }}}
              >
                Home
              </Button>
              <Button
                component={NavLink}
                to="/orders"
                color="inherit"
                sx={{ '&:hover': { // Remove hover effect
                  backgroundColor: 'transparent',
                }}}
              >
                Orders
              </Button>
              <Button
                component={NavLink}
                to="/custom"
                color="inherit"
                sx={{ '&:hover': { // Remove hover effect
                  backgroundColor: 'transparent',
                }}}
              >
                Custom PC
              </Button>
              <Button
                component={NavLink}
                to="/contact"
                color="inherit"
                sx={{ '&:hover': { // Remove hover effect
                  backgroundColor: 'transparent',
                }}}
              >
                Contact
              </Button>
              <Button
                component={NavLink}
                to="/about"
                color="inherit"
                sx={{ '&:hover': { // Remove hover effect
                  backgroundColor: 'transparent',
                }}}
              >
                About
              </Button>
              <IconButton
                component={NavLink}
                to="/cart"
                color="inherit"
                sx={{ ml: 2, '&:hover': { // Remove hover effect
                  backgroundColor: 'transparent',
                }}}
              >
                <ShoppingCartIcon />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="profile"
                onClick={handleMenuOpen}
                sx={{ ml: 1, '&:hover': { // Remove hover effect
                  backgroundColor: 'transparent',
                }}}
              >
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem component={NavLink} to="/profile" onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
