import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Typography, useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ViewListIcon from '@mui/icons-material/ViewList';
import PeopleIcon from '@mui/icons-material/People';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = () => {
  const navigate = useNavigate();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check if screen size is small (sm) or smaller
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      sessionStorage.clear();
      localStorage.clear();
      console.log('User logged out');
    }
    
    navigate('/login');
    window.location.reload();
  };
  
  const openLogoutDialog = () => {
    setLogoutDialogOpen(true);
  };

  const closeLogoutDialog = () => {
    setLogoutDialogOpen(false);
  };

  const confirmLogout = () => {
    handleLogout();
    closeLogoutDialog();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderSidebarContent = () => {
    if (isSmallScreen && !isMenuOpen) {
      return (
        <IconButton onClick={toggleMenu} style={{ marginBottom: '10px' }}>
          <MenuIcon />
        </IconButton>
      );
    } else {
      return (
        <Drawer
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <div sx={{ height: 64 }} />
          <List>
            <ListItem button component={Link} to="/admindashboard">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Admin Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/adminvieworders">
              <ListItemIcon>
                <ShoppingBasketIcon />
              </ListItemIcon>
              <ListItemText primary="Orders Management" />
            </ListItem>
            <ListItem button component={Link} to="/adminaddproduct">
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Add Product" />
            </ListItem>
            <ListItem button component={Link} to="/adminviewallproduct">
              <ListItemIcon>
                <ViewListIcon />
              </ListItemIcon>
              <ListItemText primary="View Products" />
            </ListItem>
            <ListItem button component={Link} to="/adminviewallusers">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="View All Users" />
            </ListItem>
            <ListItem button component={Link} to="/adminmanagehome">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Home" />
            </ListItem>
            <ListItem button onClick={openLogoutDialog}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
          <Dialog open={logoutDialogOpen} onClose={closeLogoutDialog}>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogContent>
              Are you sure you want to logout?
            </DialogContent>
            <DialogActions>
              <Button onClick={closeLogoutDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={confirmLogout} color="primary">
                Logout
              </Button>
            </DialogActions>
          </Dialog>
        </Drawer>
      );
    }
  };

  return (
    <div>
      {renderSidebarContent()}
    </div>
  );
};

export default Sidebar;
