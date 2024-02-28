import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Container, Typography, Grid, TextField, TextareaAutosize, Button } from '@mui/material';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    file: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData({
        ...formData,
        file: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here, like sending the data to a server
    console.log(formData);
    // Reset form fields after submission
    setFormData({
      name: '',
      email: '',
      message: '',
      file: null
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h2" align="center" gutterBottom>
        Get in Touch
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              id="name"
              name="name"
              label="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              variant="outlined"
              placeholder="Enter your name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="email"
              id="email"
              name="email"
              label="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              variant="outlined"
              placeholder="Enter your email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              fullWidth
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              minRows={5}
              placeholder="Enter your message"
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              id="file"
              name="file"
              accept="image/*, video/*"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Send Message
            </Button>
          </Grid>
        </Grid>
      </form>
      <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
        <Grid item>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: '24px', color: '#007bff', marginRight: '10px' }} />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} style={{ fontSize: '24px', color: '#007bff', marginRight: '10px' }} />
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} style={{ fontSize: '24px', color: '#007bff' }} />
          </a>
        </Grid>
      </Grid>
    </Container>
  );
};
