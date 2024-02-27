import React, { useState, useEffect } from 'react';
import Sidebar from './SideBar';
import {
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const AdminManageHome = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(Array(5).fill(null).map(() => ({ product: null })));

  // Fetch all products from the database
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/product/admin/viewproducts');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Function to handle adding a product to the selected list of a specific section
  const addToSelectedProducts = (product, sectionIndex) => {
    const updatedSelectedProducts = [...selectedProducts];
    updatedSelectedProducts[sectionIndex] = { product };
    setSelectedProducts(updatedSelectedProducts);
  };

  // Function to handle removing a product from the selected list of a specific section
  const removeFromSelectedProducts = (sectionIndex) => {
    const updatedSelectedProducts = [...selectedProducts];
    updatedSelectedProducts[sectionIndex] = { product: null };
    setSelectedProducts(updatedSelectedProducts);
  };

  // JSX for rendering the list of products in dropdown options
  const renderProducts = () => {
    return products.map((product) => (
      <MenuItem key={product._id} value={product}>
        {product.name}
      </MenuItem>
    ));
  };

  const handleUpdate = async () => {
    try {
      const confirmed = window.confirm('Are you sure you want to update home products?');
      if (!confirmed) {
        return; // If user cancels, do nothing
      }
  
      const selectedProductDetails = selectedProducts
        .filter(item => item.product) // Filter out items with null product
        .map(item => ({
          name: item.product.name,
          description: item.product.description,
          price: item.product.price,
          category: item.product.category,
          image: item.product.image1 || '', // Include image property, set to empty string if undefined
          value: 'homemainproducts' // Add the value 'homemainproducts'
        }));
    
      const response = await fetch('http://localhost:5000/api/home/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedProductDetails),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update home products');
      }
  
      console.log('Home products updated successfully');
    } catch (error) {
      console.error('Error updating home products:', error);
    }
  };
  
  
  
  

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white' }}>
      <Sidebar style={{ flex: '0 0 30%' }} />
      <Container maxWidth="lg" style={{ padding: '20px', flex: '1' }}>
        <Grid container spacing={3}>
          {[...Array(5).keys()].map((index) => (
            <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
              <Paper style={{ padding: '20px' }}>
                <Typography variant="h5">Product {index + 1}</Typography>
                <FormControl fullWidth style={{ marginTop: '10px' }}>
                  <InputLabel>Select a Product</InputLabel>
                  <Select onChange={(e) => addToSelectedProducts(e.target.value, index)} value="">
                    {renderProducts()}
                  </Select>
                </FormControl>
                {selectedProducts[index].product && (
                  <div>
                    <center>
                    {selectedProducts[index].product.image1 && (
                      <img src={selectedProducts[index].product.image1} alt="Product" style={{ width: '100px', height: '100px', marginTop: '10px' }} />
                    )}
                    </center>
                    <Typography variant="h6">{selectedProducts[index].product.name}</Typography>
                    <Typography variant="body1">{selectedProducts[index].product.price}</Typography>
                    <Button onClick={() => removeFromSelectedProducts(index)}>Remove</Button>
                  </div>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={handleUpdate}>
          Update Home Products
        </Button>
      </Container>
    </div>
  );
};

export default AdminManageHome;
