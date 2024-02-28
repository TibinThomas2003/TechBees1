import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, TextField, Button, Grid, Card, CardMedia, Dialog, DialogTitle, DialogContent, DialogActions, Link } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Grid)({
  padding: '20px',
});

const StyledForm = styled('form')({
  width: '100%',
  marginTop: '20px',
});

const StyledTextField = styled(TextField)({
  marginBottom: '20px',
});

const StyledButton = styled(Button)({
  margin: '20px 0',
});

const StyledCard = styled(Card)({
  maxWidth: '400px',
});

const StyledCardMedia = styled(CardMedia)({
  height: '200px',
  objectFit:'contain',
  backgroundSize: 'contain',
});

const StyledDiv = styled('div')({
  padding: '20px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
});

const TotalValueBox = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f5f5f5',
  borderRadius: '5px',
  padding: '10px',
  marginTop: '20px',
  fontSize: '24px',
});

const PlaceOrder = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const quantity = parseInt(queryParams.get('quantity')) || 1; // Default quantity to 1 if not provided

  const [customerName, setCustomerName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [landmark, setLandmark] = useState('');
  const [alternatePhoneNumber, setAlternatePhoneNumber] = useState('');
  const [currentUser, setCurrentUser] = useState(null); // State to hold current user details

  const [product, setProduct] = useState(null); // Define product state
  const [totalValue, setTotalValue] = useState(0); // State to hold the total value

  const [confirmationOpen, setConfirmationOpen] = useState(false);

  useEffect(() => {
    // Fetch current user details based on email stored in local storage
    const email = localStorage.getItem('userEmail');
    if (email) {
      fetchCurrentUser(email);
    }
  }, []);

  const fetchCurrentUser = async (email) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/details/${email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch current user details');
      }
      const data = await response.json();
      setCurrentUser(data); // Set current user data when fetched successfully
    } catch (error) {
      console.error('Error fetching current user details:', error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/product/vieweachproduct/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data); // Set product data when fetched successfully
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    // Update total value whenever quantity or product price changes
    if (product) {
      const totalPrice = product.price * quantity;
      setTotalValue(totalPrice);
    }
  }, [product, quantity]);

  const handleConfirmationOpen = () => {
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!customerName || !shippingAddress || !phoneNumber) {
        throw new Error('Please fill in all required fields');
      }

      handleConfirmationOpen();
    } catch (error) {
      console.error('Error placing order:', error);
      // You can handle errors such as displaying an error message to the user
    }
  };

  const handlePlaceOrder = async () => {
    try {
      // Fetch product details
      const productResponse = await fetch(`http://localhost:5000/api/product/vieweachproduct/${id}`);
      if (!productResponse.ok) {
        throw new Error('Failed to fetch product details');
      }
      const productData = await productResponse.json();

      // Create order with product details
      const response = await fetch('http://localhost:5000/api/orders/placeorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName,
          shippingAddress,
          pincode,
          phoneNumber,
          landmark,
          alternatePhoneNumber,
          quantity,
          totalValue,
          productId: id,
          productName: productData.name, // Include product name
          productDescription: productData.description, // Include product description
          status: 'Pending',
          userEmail: currentUser.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }
      console.log('Order placed successfully');
      // Redirect to orders page
      window.location.href = '/orders';
    } catch (error) {
      console.error('Error placing order:', error);
      // You can handle errors such as displaying an error message to the user
    } finally {
      handleConfirmationClose();
    }
  };

  return (
    <StyledContainer container justifyContent="center">
      <Grid container spacing={3}>
        {/* Left Division - Product Details */}
        <Grid item xs={12} md={6}>
          <StyledDiv>
            <Typography variant="h4" align="center" gutterBottom>
              Place Your Order
            </Typography>
            {product && (
              <center>
                <StyledCard>
                  <StyledCardMedia
                    component="img"
                    image={product.image1}
                    alt={product.name}
                  />
                </StyledCard>
              </center>
            )}
            <Typography variant="h6" gutterBottom>
              Product Details:
            </Typography>
            {product && (
              <>
                <Typography variant="body1" gutterBottom>
                  Name: {product.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Description: {product.description}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Price: ₹{product.price}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Quantity: {quantity}
                </Typography>
              </>
            )}
            <TotalValueBox>
              Total Value: {totalValue}
            </TotalValueBox>
          </StyledDiv>
        </Grid>
        {/* Right Division - Balance */}
        <Grid item xs={12} md={6}>
          <StyledDiv>
            <Typography variant="h6" gutterBottom>
              Order Details:
            </Typography>
            {currentUser && (
              <StyledForm onSubmit={handleSubmit}>
                <StyledTextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={customerName} 
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
                <StyledTextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={currentUser.email} 
                  disabled
                  required
                />
                <StyledTextField
                  label="Shipping Address"
                  variant="outlined"
                  fullWidth
                  value={shippingAddress} 
                  onChange={(e) => setShippingAddress(e.target.value)}
                  required
                />
                <StyledTextField
                  label="Pincode"
                  variant="outlined"
                  fullWidth
                  value={pincode} 
                  onChange={(e) => setPincode(e.target.value)}
                  required
                />
                <StyledTextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  value={phoneNumber} 
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
                <StyledTextField
                  label="Landmark"
                  variant="outlined"
                  fullWidth
                  value={landmark} 
                  onChange={(e) => setLandmark(e.target.value)}
                />
                <StyledTextField
                  label="Alternate Contact (Optional)"
                  variant="outlined"
                  fullWidth
                  value={alternatePhoneNumber}
                  onChange={(e) => setAlternatePhoneNumber(e.target.value)}
                  defaultValue="Nil"
                />
                <StyledButton type="button" onClick={handleConfirmationOpen} variant="contained" color="primary" fullWidth>
                  Place Order
                </StyledButton>
              </StyledForm>
            )}
          </StyledDiv>
        </Grid>
      </Grid>
      <Dialog open={confirmationOpen} onClose={handleConfirmationClose}>
        <DialogTitle>Confirm Order</DialogTitle>
        <DialogContent>
          Are you sure you want to place this order?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePlaceOrder} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default PlaceOrder;
