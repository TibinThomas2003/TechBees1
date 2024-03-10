import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlaceOrderCustomPC = () => {
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const productIds = urlParams.getAll('productId'); // Get all product IDs from URL parameters
    if (productIds.length > 0) {
      fetchProductDetails(productIds);
    }
  }, []);

  const fetchProductDetails = async (productIds) => {
    try {
      const response = await axios.get('/api/products', {
        params: {
          ids: productIds.join(','), // Pass array of product IDs as comma-separated string
        },
      });
      setProductDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  return (
    <div>
      <h1>Product Details</h1>
      {loading ? (
        <p>Loading product details...</p>
      ) : (
        <div>
          {productDetails.map((product) => (
            <div key={product._id}>
              <h2>{product.name}</h2>
              <p>Category: {product.category}</p>
              <p>Price: {product.price}</p>
              {/* Display other product details */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaceOrderCustomPC;
