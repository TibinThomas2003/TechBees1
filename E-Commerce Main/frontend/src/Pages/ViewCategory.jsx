// ViewCategory.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';

const ViewCategory = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/product/viewproductsbycategory/${category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products by category');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products by category:', error);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  return (
    <div>
      <Typography variant="h4" gutterBottom><br />
        <center>{category} Category</center>
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={9} sm={6} md={3} key={product._id}>
            <Card>
              <CardMedia
                component="img"
                image={product.image1} 
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body1" color="textSecondary">{product.description}</Typography>
                <Typography variant="h6" color="primary">${product.price}</Typography>
                <Button component={Link} to={`/viewproduct/${product._id}`} variant="contained" color="primary" >
                  View Product
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ViewCategory;
