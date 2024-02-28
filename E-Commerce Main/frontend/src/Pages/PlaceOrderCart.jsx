import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlaceOrderCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [productDetails, setProductDetails] = useState([]); // Define productDetails state variable

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");
        const response = await axios.get(`http://localhost:5000/api/cart/cart/get-cart-items?email=${userEmail}`);
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productDetails = await Promise.all(
          cartItems.map(async cartItem => {
            const response = await axios.get(`http://localhost:5000/api/product/vieweachproduct/${cartItem.productId}`);
            return response.data;
          })
        );
        setProductDetails(productDetails); // Update productDetails state
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (cartItems.length > 0) {
      fetchProductDetails();
    }
  }, [cartItems]);

  return (
    <div>
      <h1>Place Order</h1>
      <h2>Product Details:</h2>
      <ul>
        {productDetails.map(product => (
          <li key={product._id}>
            <div>
              <strong>Name:</strong> {product.name}
            </div>
            <div>
              <strong>Description:</strong> {product.description}
            </div>
            <div>
              <strong>Price:</strong> {product.price}
            </div>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceOrderCart;
