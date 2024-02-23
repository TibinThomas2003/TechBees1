import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Changed import to useNavigate
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ViewListIcon from '@mui/icons-material/ViewList';
import PeopleIcon from '@mui/icons-material/People';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Sidebar = () => {
  const navigate = useNavigate();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false); // State for logout dialog

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      sessionStorage.clear();
      localStorage.clear();
      console.log('User logged out');
    }
    
    // Redirect user to the login page
    navigate('/login'); // Using navigate instead of history.push
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

  return (
    <div style={{ marginTop: '20px' }}> {/* Add margin-top for the whole component */}
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
          {/* Logout Button */}
          <ListItem button onClick={openLogoutDialog}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      {/* Logout Confirmation Dialog */}
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
    </div>
  );
};

export default Sidebar;
