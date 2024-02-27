import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Box,
  FormControl,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { styled } from "@mui/system";
import axios from "axios";

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "50px 0",
});

const ProductContainer = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: "800px",
});

const ProductImagesBox = styled(Box)({
  width: "50%",
});

const ProductDetailsBox = styled(Box)({
  width: "45%",
});

const AnimatedCard = styled(Card)({
  maxWidth: "400px",
  padding: "30px",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState("");
  const [userEmail, setUserEmail] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const email = localStorage.getItem("userEmail");
      if (email) {
        setUserEmail(email);
      }
      try {
        const response = await fetch(
          `http://localhost:5000/api/product/vieweachproduct/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    setShowConfirmation(true);
  };

  const handleConfirmAddToCart = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/cart/add-to-cart",
        {
          productId: id,
          name: product.name,
          price: product.price,
          description: product.description,
          image1: product.image1,
          quantity: quantity,
          userEmail: userEmail,
        }
      );

      if (response.status === 201) {
        console.log("Product added to cart successfully");
      } else {
        throw new Error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleSubmitFeedback = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/feedback/feedback", // Update the URL with your backend endpoint
        {
          productId: id,
          userEmail: userEmail,
          feedback: feedback,
        }
      );
  
      if (response.status === 201) {
        console.log("Feedback submitted successfully");
        // Optionally, you can show a message to the user indicating successful submission
      } else {
        throw new Error("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      // Optionally, you can show a message to the user indicating failure
    } finally {
      setFeedback(""); // Clear the feedback field
    }
  };
  

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography variant="body1" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <StyledBox>
      <ProductContainer>
        <ProductImagesBox>
          <Carousel
            showArrows={true}
            showStatus={false}
            showThumbs={false}
            width={300}
          >
            <div>
              <img
                src={product.image1}
                alt={product.name}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <img
                src={product.image2}
                alt={product.name}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <img
                src={product.image3}
                alt={product.name}
                style={{ width: "100%" }}
              />
            </div>
          </Carousel>
        </ProductImagesBox>
        <ProductDetailsBox>
          <AnimatedCard>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
              <Typography variant="body1" color="primary" gutterBottom>
                Price: ${product.price}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Stock: {product.stock}
              </Typography>
              {product.stock === 0 ? (
                <Typography variant="body1" color="error">
                  OUT OF STOCK
                </Typography>
              ) : (
                <Box display="flex" justifyContent="center" marginTop={2}>
                  <FormControl>
                    <Select
                      value={quantity}
                      onChange={(event) => setQuantity(event.target.value)}
                    >
                      {[...Array(10).keys()].map((val) => (
                        <MenuItem key={val + 1} value={val + 1}>
                          {val + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: 10 }}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to={{
                      pathname: `/placeorder/${id}`,
                      search: `?quantity=${quantity}`,
                    }}
                  >
                    Buy Now
                  </Button>
                </Box>
              )}
            </CardContent>
          </AnimatedCard>
        </ProductDetailsBox>
      </ProductContainer>
      <Box mt={4} width="100%">
        <Typography variant="h6">Give Feedback</Typography>
        <form onSubmit={handleSubmitFeedback}>
          <TextField
            label="Your Feedback"
            variant="outlined"
            fullWidth
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            multiline
            rows={4}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Submit Feedback
          </Button>
        </form>
      </Box>
      <Dialog
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
      >
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to add this product to your cart?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmation(false)}>Cancel</Button>
          <Button onClick={handleConfirmAddToCart} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </StyledBox>
  );
};

export default ViewProduct;
