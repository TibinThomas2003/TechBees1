import React from 'react';
import { Typography, Container, Grid, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#333', color: '#fff', padding: '50px 0' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Welcome To TechBees</Typography>
            <Typography variant="body1">
              Welcome to Our PC Store called TechBees ! We specialize in providing high-quality PCs tailored to your needs. Whether you're a gamer,
               a professional, or a casual user, we have the perfect PC for you.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} style={{ textAlign: 'right' }}>
            <Typography variant="h6">Connect With Us</Typography>
            <IconButton href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook style={{ color: '#fff' }} />
            </IconButton>
            <IconButton href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter style={{ color: '#fff' }} />
            </IconButton>
            <IconButton href="https://www.instagram.com/the_helixzz/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram style={{ color: '#fff' }} />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="body2" style={{ marginTop: '20px', textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} TechBees. All rights reserved.
        </Typography>
        <Typography variant="body2" style={{ textAlign: 'center' }}>
          For inquiries, please email us at admin@gmail.com or call +91 8138057448.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
