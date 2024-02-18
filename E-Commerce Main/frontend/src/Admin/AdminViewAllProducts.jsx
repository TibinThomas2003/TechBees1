import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Container, Grid, Card, CardContent, CardActions } from '@mui/material';
import Sidebar from './SideBar';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/product/viewproducts');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Handle error
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?');

    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:5000/api/product/delete/${productId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete product');
        }
        setProducts(products.filter(product => product._id !== productId));
        window.alert('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        window.alert('Failed to delete product.');
      }
    }
  };

  const sidebarStyle = {
    width: '14%',
    height: '100%',
    backgroundColor: '#fff', // Adjust as needed
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Adjust as needed
    borderRadius: '8px', // Adjust as needed
    marginRight: '20px', // Adjust as needed
    padding: '20px', // Adjust as needed
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#f9f9f9',
    }}>
      <div style={sidebarStyle}>
        <Sidebar />
      </div>
      <main className="right-panel" style={{
        flex: '1',
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
          <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>View Products</h1>
          <Typography variant="subtitle1">Explore and manage all products.</Typography>
        </header>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Category: {product.category}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Description: {product.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Price: ${product.price}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Stock: {product.stock}
                    </Typography>
                    {product.image1 && <img src={product.image1} alt={product.name} style={{ maxWidth: '100%', height: 'auto' }} />}
                  </CardContent>
                  <CardActions sx={{ marginTop: 'auto' }}>
                    <Button
                      component={Link}
                      to={`/adminupdateproduct/${product._id}`}
                      variant="contained"
                      color="primary"
                      startIcon={<UpdateIcon />}
                      sx={{
                        backgroundColor: '#333',
                        color: '#fff',
                        '&:hover': {
                          backgroundColor: 'brown'
                        },
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => handleDelete(product._id)}
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      sx={{
                        backgroundColor: '#333',
                        color: '#fff',
                        '&:hover': {
                          backgroundColor: 'brown'
                        },
                      }}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default ViewProducts;
