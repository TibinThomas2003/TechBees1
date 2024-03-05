import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardMedia,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled(Grid)({
  padding: "20px",
});

const StyledForm = styled("form")({
  width: "100%",
  marginTop: "20px",
});

const StyledTextField = styled(TextField)({
  marginBottom: "20px",
});

const StyledDiv = styled("div")({
  padding: "20px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
});

const StyledPaper = styled(Paper)({
  padding: "20px",
  marginBottom: "20px",
  backgroundColor: "#f9f9f9",
});

const PlaceOrderCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    setUserEmail(userEmail);
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/cart/cart/get-cart-items?email=${userEmail}`
        );
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    if (userEmail) {
      fetchCartItems();
    }
  }, [userEmail]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productDetails = await Promise.all(
          cartItems.map(async (cartItem) => {
            const response = await axios.get(
              `http://localhost:5000/api/product/vieweachproduct/${cartItem.productId}`
            );
            return response.data;
          })
        );
        setProductDetails(productDetails);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (cartItems.length > 0) {
      fetchProductDetails();
    }
  }, [cartItems]);

  const handlePlaceOrder = async () => {
    try {
      const customerName = document.getElementById("name").value;
      const shippingAddress = document.getElementById("shipping-address").value;
      const pincode = document.getElementById("pincode").value;
      const phoneNumber = document.getElementById("phone-number").value;
      const landmark = document.getElementById("landmark").value;
      const alternatePhoneNumber = document.getElementById("alternate-phone").value;

      const orderItems = cartItems.map((item) => ({
        productId: item.productId,
        customerName: customerName,
        shippingAddress: shippingAddress,
        pincode: pincode,
        phoneNumber: phoneNumber,
        landmark: landmark,
        alternatePhoneNumber: alternatePhoneNumber,
        quantity: item.quantity,
        totalValue: item.quantity * item.price, // Calculate total value here
        productName: item.name,
        productDescription: item.description,
        status: "Order Placed",
      }));

      const response = await axios.post(
        "http://localhost:5000/api/orders/placeordercart",
        {
          userEmail: userEmail,
          items: orderItems,
        }
      );

      console.log("Order placed:", response.data);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <StyledContainer container justifyContent="center">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
        <Typography variant="h4" align="center" gutterBottom>
                Place Your Order
              </Typography>
               
              <Typography variant="h6" gutterBottom>
                Product Details:
              </Typography>
          {productDetails.map((product, index) => (
            <StyledPaper key={index} elevation={3}>
             
              <Card style={{ display: "flex" }}>
                <CardMedia
                  component="img"
                  height="150"
                  width="auto"
                  image={product.image1}
                  alt={product.name}
                  style={{ marginRight: "20px", objectFit: "contain" }}
                />
                <div>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography>
                    {product.description.length > 20
                      ? `${product.description.substring(0, 50)}...`
                      : product.description}
                  </Typography>
                  <Typography style={{ color: "red" }}>
                    Price: {product.price}
                  </Typography>
                </div>
              </Card>
            </StyledPaper>
          ))}
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledDiv>
            <Typography variant="h6" gutterBottom>
              User Details:
            </Typography>
            <StyledForm>
              <StyledTextField id="name" label="Name" variant="outlined" fullWidth />
              <StyledTextField
                id="shipping-address"
                label="Shipping Address"
                variant="outlined"
                fullWidth
              />
              <StyledTextField id="pincode" label="Pincode" variant="outlined" fullWidth />
              <StyledTextField
                id="phone-number"
                label="Phone Number"
                variant="outlined"
                fullWidth
              />
              <StyledTextField id="landmark" label="Landmark" variant="outlined" fullWidth />
              <StyledTextField
                id="alternate-phone"
                label="Alternate Contact (Optional)"
                variant="outlined"
                fullWidth
              />
              <Button
                onClick={handlePlaceOrder}
                variant="contained"
                color="primary"
                fullWidth
              >
                Place Order
              </Button>
            </StyledForm>
          </StyledDiv>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default PlaceOrderCart;
