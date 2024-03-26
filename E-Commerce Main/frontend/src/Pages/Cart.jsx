import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Typography,
  Grid,
  Card,
  CardMedia,
  IconButton,
  Button,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from "@mui/icons-material";
import styled from "styled-components";

const Container = styled.div`
  width: 80%;
  margin: 20px auto;
`;

const ProductCard = styled(Card)`
  margin-bottom: 20px;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BuyNowButton = styled(Button)`
  && {
    background-color: #f50057; /* Pink */
    color: white;
    width: 100px;
    height: 40px;
    padding: 15px 30px;
    border-radius: 20px;
    font-weight: bold;
    transition: background-color 0.3s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;

    &:hover {
      background-color: #d81b60; /* Darker Pink */
    }
  }
`;

const Cart = ({ history }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");
        if (userEmail) {
          const response = await axios.get(
            `http://localhost:5000/api/cart/cart/get-cart-items?email=${userEmail}`
          );
          setCartItems(response.data);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = async (itemId, newQuantity) => {
    // Ensure the new quantity is within the range of 1 to 5
    newQuantity = Math.min(Math.max(1, newQuantity), 5);
  
    try {
      const response = await axios.put(
        `http://localhost:5000/api/cart/update-quantity/${itemId}`,
        { quantity: newQuantity }
      );
      if (response.status === 200) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item._id === itemId ? { ...item, quantity: newQuantity } : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  

  const handleDelete = async (itemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/cart/delete-item/${itemId}`
      );
      if (response.status === 200) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemId)
        );
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleBuyNow = (item) => {
    const productId = item.productId;
    const quantity = item.quantity;
    window.location.href = `/placeorder/${productId}?quantity=${quantity}`;
  };

  const calculateSubtotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };


  return (
    <Container>
      <br />
      {cartItems.length > 0 && (
        <>
          <center style={{ backgroundColor: "#f0f0f0", padding: "10px" }}>
            <Typography variant="h4">
              <strong>Subtotal:</strong> ₹{calculateSubtotal()}
            </Typography>
          </center>

          <br />
          <center>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/placeordercart"
            >
              Proceed to Payment
            </Button>
          </center>
        </>
      )}

      <br />
      <br />
      <br />
      <br />
      <Grid container justifyContent="center">
        {cartItems.length === 0 ? (
          <Typography variant="body1" align="center">
            Your cart is empty
          </Typography>
        ) : (
          cartItems.map((item) => (
            <Grid item xs={12} key={item._id}>
              <ProductCard>
                <Grid container alignItems="center">
                  <Grid item xs={12} sm={2}>
                    <CardMedia
                      component="img"
                      src={item.image1}
                      alt={item.name}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    container
                    direction="column"
                    justifyContent="space-between"
                    style={{ padding: "20px" }}
                  >
                    <Typography variant="h6" gutterBottom>
                      {item.name}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Description:</strong> {item.description}
                    </Typography>
                    <br />
                    <Typography variant="body1" color="red">
                      <strong>Price:</strong> ₹{item.price}
                    </Typography>
                    <br />
                    <BuyNowButton
                      variant="contained"
                      onClick={() => handleBuyNow(item)}
                    >
                      Buy Now
                    </BuyNowButton>
                  </Grid>
                  <Grid item xs={12} sm={2} style={{ padding: "20px" }}>
                    <QuantityContainer>
                      <IconButton
                        aria-label="Remove"
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity - 1)
                        }
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body1">{item.quantity}</Typography>
                      <IconButton
                        aria-label="Add"
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity + 1)
                        }
                      >
                        <AddIcon />
                      </IconButton>
                    </QuantityContainer>
                  </Grid>
                  <Grid item xs={12} sm={2} style={{ padding: "20px" }}>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => handleDelete(item._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </ProductCard>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Cart;
