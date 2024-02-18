import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlaceOrderCart = () => {
  const [productIds, setProductIds] = useState([]);
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    // Retrieve product IDs from local storage
    const storedProductIds = localStorage.getItem('productIds');
    if (storedProductIds) {
      const parsedProductIds = JSON.parse(storedProductIds);
      setProductIds(parsedProductIds);

      // Fetch product details for each product ID
      const fetchProductDetails = async () => {
        try {
          const promises = parsedProductIds.map(async (productId) => {
            const response = await axios.get(`http://localhost:5000/api//product/${productId}`);
            return response.data;
          });
          const resolvedProductDetails = await Promise.all(promises);
          setProductDetails(resolvedProductDetails);
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      };

      fetchProductDetails();
    }
  }, []);

  return (
    <div>
      <h1>Place Order</h1>
      <h2>Product Details:</h2>
      <ul>
        {productDetails.map(product => (
          <li key={product._id}>
            <h3>{product.name}</h3>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceOrderCart;
