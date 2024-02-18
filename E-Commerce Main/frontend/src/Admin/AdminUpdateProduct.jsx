import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, TextField, Button, Container, Grid, Paper, Snackbar } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import Alert from '@mui/material/Alert';
import Sidebar from './SideBar';

// Header component
const Header = () => {
};

const UpdateProduct = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    image1: '',
    image2: '',
    image3: '',
    stock: '',
  });
  const [updateStatus, setUpdateStatus] = useState({ open: false, message: '', severity: '' });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/product/vieweachproduct/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/product/update/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      setUpdateStatus({ open: true, message: 'Product updated successfully', severity: 'success' });
    } catch (error) {
      console.error('Error updating product:', error);
      setUpdateStatus({ open: true, message: 'Failed to update product', severity: 'error' });
    }
  };

  const handleClose = () => {
    setUpdateStatus({ ...updateStatus, open: false });
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh', // 100% height of the viewport
      backgroundColor: '#f9f9f9',
    }}>
      {/* Header */}
      <Header />
      <Sidebar style={{ width: "30%" }} />
      {/* Right Division */}
      <main className="right-panel" style={{
        width: '80%',
        height: '100%',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}>
        <Container maxWidth="md">
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
              Update Product
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    name="name"
                    value={productData.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Category"
                    variant="outlined"
                    name="category"
                    value={productData.category}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Price"
                    variant="outlined"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    type="number"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Image URL 1"
                    variant="outlined"
                    name="image1"
                    value={productData.image1}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Image URL 2"
                    variant="outlined"
                    name="image2"
                    value={productData.image2}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Image URL 3"
                    variant="outlined"
                    name="image3"
                    value={productData.image3}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Stock"
                    variant="outlined"
                    name="stock"
                    value={productData.stock}
                    onChange={handleChange}
                    type="number"
                    required
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  marginTop: '20px',
                  backgroundColor: '#333',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: 'brown',
                  },
                }}
              >
                <UpdateIcon style={{ marginRight: '8px' }} />
                Update Product
              </Button>
            </form>
          </Paper>
          <Snackbar
            open={updateStatus.open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert onClose={handleClose} severity={updateStatus.severity}>
              {updateStatus.message}
            </Alert>
          </Snackbar>
        </Container>
      </main>
    </div>
  );
};

export default UpdateProduct;
