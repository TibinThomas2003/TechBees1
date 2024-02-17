import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cart/get-cart-items');
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div>
      <h1>Cart Items</h1>
      <ul>
        {cartItems.map(item => (
          <li key={item._id}>
            <div>
              <img src={item.image1} alt={item.name} style={{ width: '100px', height: '100px' }} />
            </div>
            <div>
              <h3>{item.name}</h3>
              <p>Description: {item.description}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>User Email: {item.userEmail}</p>
              <p>Product ID: {item.productId}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
