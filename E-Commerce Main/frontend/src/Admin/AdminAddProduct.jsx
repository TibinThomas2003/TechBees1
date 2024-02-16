import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Paper, Alert, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const AddProduct = () => {
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
  const [alert, setAlert] = useState({ message: '', severity: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the backend API to add the product
      const response = await fetch('http://localhost:5000/api/product/addproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      const data = await response.json();
      console.log('Product added:', data);
      setAlert({ message: 'Product added successfully!', severity: 'success' });
      // Optionally, reset the form after successful submission
      setProductData({
        name: '',
        category: '',
        description: '',
        price: '',
        image1: '',
        image2: '',
        image3: '',
        stock: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
      setAlert({ message: 'Error adding product. Please try again later.', severity: 'error' });
      // Handle error
    }
  };

  return (
    
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#f9f9f9',
    }}>
      <main className="right-panel" style={{
        width: '100%',
        height: '100%',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}>
        <header style={{
          backgroundColor: '#333',
          color: '#fff',
          padding: '20px',
          textAlign: 'center',
          borderRadius: '8px',
          marginBottom: '20px',
        }}>
          <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Add Product</h1>
          <AddCircleOutlineIcon color="primary" style={{ fontSize: '42px' }} />
        </header>
        <Container maxWidth="md">
          <Paper elevation={5} style={{ padding: '20px' }}>
            {alert.message && (
              <Alert severity={alert.severity} onClose={() => setAlert({ message: '', severity: '' })}>
                {alert.message}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
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
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={productData.category}
                      onChange={handleChange}
                      label="Category"
                      name="category"
                    >
                      <MenuItem value="PC_Gaming">PC Gaming</MenuItem>
                      <MenuItem value="PC_Office">PC Office</MenuItem>
                      <MenuItem value="Motherboard">Motherboard</MenuItem>
                      <MenuItem value="Processor">Processor</MenuItem>
                      <MenuItem value="GPU">GPU</MenuItem>
                      <MenuItem value="RAM">RAM</MenuItem>
                      <MenuItem value="Storage">Storage</MenuItem>
                      <MenuItem value="Power Unit">Power Unit</MenuItem>
                      <MenuItem value="Cables">Cables</MenuItem>
                      <MenuItem value="Case">Case</MenuItem>
                    </Select>
                  </FormControl>
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
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                    required
                    multiline
                    rows={4}
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
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      backgroundColor: '#333',
                      '&:hover': {
                        backgroundColor: 'brown',
                      },
                    }}
                  >
                    Add Product
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </main>
    </div>
  );
};

export default AddProduct;
