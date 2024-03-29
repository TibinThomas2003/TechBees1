// PlaceOrderCustomPC.jsx
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
import { Link } from 'react-router-dom';

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

const StyledCard = styled(Card)({
  display: "flex",
  marginBottom: "20px",
  height: "100px",
  objectFit: "contain",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const StyledCardContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
});

const StyledCardMedia = styled(CardMedia)({
  width: 50,
  height: 60,
  objectFit: "contain",
});

const PlaceOrderCustomPC = () => {
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    shippingAddress: "",
    pincode: "",
    phoneNumber: "",
    landmark: "",
    alternatePhoneNumber: "",
    email: "",
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/custompc/placeordercustompc"
        );
        setProductDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();

    const userEmail = localStorage.getItem("userEmail");
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      email: userEmail || "",
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({
      ...customerDetails,
      [name]: value,
    });
  };

const handlePlaceOrder = async () => {
  try {
    const orderItems = productDetails.map((product) => {
      // Include null checks to ensure properties are defined
      const productName = product.name ? product.name.substring(0, 60) : "";
      const productCategory = product.category ? product.category.substring(0, 20) : "";
      const productDescription = product.description ? product.description.substring(0, 50) : "";

      return {
        productId: product._id,
        ...customerDetails,
        quantity: product.quantity,
        totalValue: product.price * product.quantity,
        productName,
        productCategory,
        productPrice: product.price,
        productDescription,
        status: "Order Placed",
      };
    });

    const response = await axios.post(
      "http://localhost:5000/api/custompcorder/placeordercustompc",
      {
        items: orderItems,
      }
    );

    console.log("Order placed:", response.data);
  } catch (error) {
    console.error("Error placing order:", error);
  }
};


  // Calculate total value
  const totalValue = productDetails.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <StyledContainer container justifyContent="center">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" align="center" gutterBottom>
            Custom PC Order Details
          </Typography>
          <Typography variant="h5" align="center" color="red" gutterBottom>
            Total Value: ₹ {totalValue.toFixed(2)}
          </Typography>
          {loading ? (
            <p>Loading product details...</p>
          ) : (
            productDetails.map((product, index) => (
              <StyledPaper key={index} elevation={3}>
                <StyledCard>
                  <StyledCardMedia
                    component="img"
                    height="60px"
                    width="50px"
                    image={product.image1}
                    alt={product.name}
                  />
                  <StyledCardContent>
                    <div>
                      <Typography variant="body1">
                        {product.name.substring(0, 60)}....{" "}
                      </Typography>
                      <Typography variant="body2">
                        Category: {product.category.substring(0, 20)}{" "}
                      </Typography>
                      <Typography variant="body2" color="red">
                        Price: ₹ {product.price}
                      </Typography>
                      <Typography variant="body2" color="orange">
                        Quantity: {product.quantity}
                      </Typography>
                    </div>
                  </StyledCardContent>
                </StyledCard>
              </StyledPaper>
            ))
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledDiv>
            <Typography variant="h6" gutterBottom>
              User Details
            </Typography>
            <StyledForm>
              <StyledTextField
                type="text"
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                required
                onChange={handleInputChange}
              />
              <StyledTextField
                type="text"
                id="shippingAddress"
                name="shippingAddress"
                label="Shipping Address"
                variant="outlined"
                fullWidth
                required
                onChange={handleInputChange}
              />
              <StyledTextField
                type="text"
                id="pincode"
                name="pincode"
                label="Pincode"
                variant="outlined"
                fullWidth
                required
                onChange={handleInputChange}
              />
              <StyledTextField
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                label="Phone Number"
                variant="outlined"
                fullWidth
                required
                onChange={handleInputChange}
              />
              <StyledTextField
                type="text"
                id="landmark"
                name="landmark"
                label="Landmark"
                variant="outlined"
                fullWidth
                required
                onChange={handleInputChange}
              />
              <StyledTextField
                type="text"
                id="alternatePhoneNumber"
                name="alternatePhoneNumber"
                label="Alternate Contact (Optional)"
                variant="outlined"
                fullWidth
                onChange={handleInputChange}
              />
            </StyledForm>
            <Link to="/customorder">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
            </Link>
          </StyledDiv>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default PlaceOrderCustomPC;
