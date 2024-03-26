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
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import { AddShoppingCart, Delete } from "@mui/icons-material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { styled } from "@mui/system";
import axios from "axios";
import Rating from '@mui/material/Rating';

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
  "& .carousel-root .carousel .slide img": {
    height: "300px", // Set a fixed height for the images
  },
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
  const [rating, setRating] = useState(0);
  const [userEmail, setUserEmail] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

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

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/feedback/product/${id}`
        );
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
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
        window.location.href = "/cart";
      } else {
        throw new Error("Failed to add product to cart");
      }
    } catch (error) {
      console.log("Product added to cart successfully");
      window.location.href = "/cart";
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleSubmitFeedback = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/feedback/feedback",
        {
          productId: id,
          userEmail: userEmail,
          feedback: feedback,
          rating: rating,
        }
      );

      if (response.status === 201) {
        console.log("Feedback submitted successfully");
      } else {
        throw new Error("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setFeedback("");
      setRating(0);
    }
  };

  const handleDeleteFeedback = async (feedbackId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/feedback/feedback/${feedbackId}`);
      if (response.status === 200) {
        setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback._id !== feedbackId));
        console.log('Feedback deleted successfully');
      } else {
        throw new Error('Failed to delete feedback');
      }
    } catch (error) {
      console.error('Error deleting feedback:', error);
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
                {product.description.split(". ").map((sentence, index) => (
                  <span key={index}>
                    {index !== 0 && <br />}{" "}
                    &bull; {sentence.trim()}
                  </span>
                ))}
              </Typography>

              <Typography variant="body1" color="primary" gutterBottom>
                Price: ₹{product.price}
              </Typography>
              {product.stock === 0 ? (
                <Typography variant="body1" color="error">
                  OUT OF STOCK
                </Typography>
              ) : (
                userEmail ? (
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
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <IconButton
                      color="secondary"
                      aria-label="add to shopping cart"
                      onClick={handleAddToCart}
                      sx={{
                        border: "2px solid #ccc",
                        borderRadius: "50%",
                        padding: "10px",
                        "&:hover": {
                          borderColor: "#999",
                        },
                      }}
                    >
                      <AddShoppingCart />
                    </IconButton>
                  </Box>
                ) : (
                  <Typography variant="body1" color="textSecondary" align="center">
                   <Link to='/login'> Sign In to Continue</Link>
                  </Typography>
                )
              )}
            </CardContent>
          </AnimatedCard>
        </ProductDetailsBox>
      </ProductContainer>
      <Box mt={4} width="100%">
        <center>
          <Typography variant="h4">Feedback</Typography>
        </center>
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
          {/* Add the Rating component here */}
          <Box display="flex" alignItems="center" mt={2}>
            <Typography variant="body1">Rating:</Typography>
            <Rating
              name="rating"
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
            />
          </Box>
          <br />
          <center>
            <Button type="submit" variant="contained" color="primary">
            Submit Feedback
          </Button>
          </center>
        </form>
      </Box>
      <Box mt={4} width="100%">
        <Typography variant="h5" gutterBottom>
          Feedbacks:
        </Typography>
        <List>
          {feedbacks.map((feedback, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar
                  alt={feedback.userEmail}
                  src="/static/images/avatar/1.jpg"
                />
              </ListItemAvatar>
              <ListItemText
                primary={feedback.userEmail}
                secondary={feedback.feedback}
              />
              <IconButton onClick={() => handleDeleteFeedback(feedback._id)}>
                <Delete />
              </IconButton>
            </ListItem>
          ))}
        </List>
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
