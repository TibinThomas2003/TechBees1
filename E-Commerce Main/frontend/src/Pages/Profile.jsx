import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Grid, Paper } from '@mui/material';

function ProfilePage() {
  const [userInfo, setUserInfo] = useState(null);
  const [editedUserInfo, setEditedUserInfo] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    // Fetch user details based on userEmail from local storage
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      fetch(`http://localhost:5000/api/auth/profile?email=${userEmail}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch user');
          }
          return response.json();
        })
        .then(data => {
          setUserInfo(data);
          setEditedUserInfo(data);
        })
        .catch(error => console.error('Error fetching user:', error));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserInfo({ ...editedUserInfo, [name]: value });
  };

  const handleUpdateClick = () => {
    // Make API call to update user info
    fetch('http://localhost:5000/api/auth/updateProfile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedUserInfo),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update user');
        }
        return response.json();
      })
      .then(data => {
        setUserInfo(data);
        setEditedUserInfo(data);
        setEditing(false);
      })
      .catch(error => console.error('Error updating user:', error));
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container justifyContent="center" style={{ marginTop: '30px' }}>
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={5} sx={{ padding: '20px', borderRadius: '10px' }}>
          <Typography variant="h6" gutterBottom>
            User Profile
          </Typography>
          <form>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Username"
              name="name"
              value={editing ? editedUserInfo.name : userInfo.name}
              onChange={handleInputChange}
              disabled={!editing}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Address"
              name="address"
              value={editing ? editedUserInfo.address : userInfo.address}
              onChange={handleInputChange}
              disabled={!editing}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email"
              name="email"
              value={userInfo.email}
              disabled
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Landmark"
              name="landmark"
              value={editing ? editedUserInfo.landmark : userInfo.landmark}
              onChange={handleInputChange}
              disabled={!editing}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Pincode"
              name="pincode"
              value={editing ? editedUserInfo.pincode : userInfo.pincode}
              onChange={handleInputChange}
              disabled={!editing}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={editing ? editedUserInfo.phoneNumber : userInfo.phoneNumber}
              onChange={handleInputChange}
              disabled={!editing}
            />
            {editing ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateClick}
                sx={{ marginTop: '20px' }}
              >
                Update
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setEditing(true)}
                sx={{ marginTop: '20px' }}
              >
                Edit
              </Button>
            )}
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ProfilePage;
