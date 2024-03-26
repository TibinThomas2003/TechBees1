import React, { useState, useEffect } from "react";
import Sidebar from './SideBar';
import profile from '../Components/Assets/profile_icon.jpg';
import {
  Paper,
  Typography,
  Grid,
  Button,
  Avatar,
  CircularProgress,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

// Header component
const ViewAllUsersHeader = () => (
  <header
    style={{
      backgroundColor: "#333",
      color: "#fff",
      padding: "20px",
      textAlign: "center",
      borderRadius: "8px",
      marginBottom: "20px",
    }}
  >
    <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>View All Users</h1>
    <Typography variant="subtitle1">Explore and manage all users.</Typography>
  </header>
);

const ViewAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch users from the backend API
        const response = await fetch(
          "http://localhost:5000/api/auth/viewusers"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        // Sort users array to display admin user first
        const sortedUsers = data.sort((a, b) => {
          if (a.email === "admin@gmail.com") return -1; // admin user comes first
          if (b.email === "admin@gmail.com") return 1; // admin user comes first
          return 0; // keep other users in their original order
        });
        setUsers(sortedUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    // Display confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      // If the user cancels deletion, return
      return;
    }

    try {
      // Send a delete request to the backend API
      const response = await fetch(
        `http://localhost:5000/api/auth/deleteusers/${userId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Remove the deleted user from the users array
      setUsers(users.filter((user) => user._id !== userId));

      // Display success alert
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle error
    }
  };

  const handleUpdatePassword = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleConfirmUpdatePassword = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/admin/updatepassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });
      if (!response.ok) {
        throw new Error('Failed to update password');
      }
      alert('Password updated successfully');
      handleCloseDialog();
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Failed to update password');
    }
  };

  const handleSearchUser = (email) => {
    const foundUser = users.find(user => user.email === email);
    if (foundUser) {
      setSearchedUser(foundUser);
    } else {
      setSearchedUser(null);
      alert("User not found!");
    }
  };

  return (
    <div
      style={{ display: "flex", height: "100vh", backgroundColor: "#f9f9f9" }}
    >
      {/* Sidebar */}
      <Sidebar style={{ width: "30%" }} />

      {/* Main content */}
      <main
        className="right-panel"
        style={{
          width: "100%",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        {/* Header */}
        <ViewAllUsersHeader />

        {/* Search Input */}
        <TextField
          style={{ position: "absolute",width:"300px",height:"55px", top: "20px", right: "20px",backgroundColor:"white" 
                  ,borderRadius:"5px", zIndex: 1, marginTop:"30px" , marginRight:"5px" }}
          label="Search User"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchUser(searchQuery);
            }
          }}
        />
        
        {/* Main content of ViewAllUsers component */}
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <>
            {searchedUser ? (
              <Paper elevation={3} style={{ margin: "20px", padding: "20px" }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    
                    <Avatar
                      alt={`${searchedUser.firstName} ${searchedUser.lastName}`} // Use backticks for interpolation
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 500, height: 100, marginRight: 2}}
                    />
                    <Typography variant="h5" gutterBottom>
                      {searchedUser.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Email: {searchedUser.email}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Address: {searchedUser.address}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Pincode: {searchedUser.pincode}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Landmark: {searchedUser.landmark}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Phone Number: {searchedUser.phoneNumber}
                    </Typography>
                    {searchedUser.email === "admin@gmail.com" && (
                      <Typography
                        variant="body1"
                        gutterBottom
                        style={{ fontWeight: "bold", color: "green" }}
                      >
                        Role: Admin
                      </Typography>
                    )}
                  </Grid>
                  <Grid item  xs={12} sm={6} container justifyContent="flex-end">
                    {searchedUser.email === "admin@gmail.com" && (
                      // Render update button for admin
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpdatePassword}
                      >
                        Update Password
                      </Button>
                    )}
                    {searchedUser.email !== "admin@gmail.com" && (
                      // Render delete button for non-admin users
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteUser(searchedUser._id)}
                      >
                        Delete
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            ) : (
              users.map((user) => (
                <Paper
                  key={user._id}
                  elevation={3}
                  style={{ margin: "20px", padding: "20px" }}
                >
                  {/* Added key prop to the outermost div */}
                  <div key={user._id}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={6}>
                        <Avatar style={{ border: `2px solid black` ,width: '80px', height:'80px'}}
                          alt={`${user.firstName} ${user.lastName}`} // Use backticks for interpolation
                          src={profile}
                          sx={{ width: 100, height: 100, marginRight: 2 }}
                        />
                        <Typography variant="h5" gutterBottom>
                          {user.name}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          Email: {user.email}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          Address: {user.address}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          Pincode: {user.pincode}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          Landmark: {user.landmark}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          Phone Number: {user.phoneNumber}
                        </Typography>
                        {user.email === "admin@gmail.com" && (
                          <Typography
                            variant="body1"
                            gutterBottom
                            style={{ fontWeight: "bold", color: "green" }}
                          >
                            Role: Admin
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6} container justifyContent="flex-end">
                        {user.email === "admin@gmail.com" && (
                          // Render update button for admin
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleUpdatePassword}
                          >
                            Update Password
                          </Button>
                        )}
                        {user.email !== "admin@gmail.com" && (
                          // Render delete button for non-admin users
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            Delete
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </div>
                </Paper>
              ))
            )}
          </>
        )}

        {/* Update Password Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Update Password</DialogTitle>
          <DialogContent>
            <TextField
              margin="normal"
              label="Current Password"
              type="password"
              fullWidth
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              label="New Password"
              type="password"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              label="Confirm New Password"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleConfirmUpdatePassword} color="primary">
              Update Password
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </div>
  );
};

export default ViewAllUsers;

