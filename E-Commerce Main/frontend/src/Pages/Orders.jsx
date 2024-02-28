import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Paper, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const OrderItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
  },
}));

const OrderStatus = styled("div")(({ theme, status }) => ({
  color: "white",
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(1),
  fontWeight: "bold",
  textAlign: "center",
  backgroundColor: (() => {
    switch (status) {
      case "Processing":
        return "#ff9800";
      case "Order Placed":
        return "#03a9f4";
      case "Shipped":
        return "#4caf50";
      case "Delivered":
        return "#9c27b0";
      case "Canceled":
        return "#f44336";
      default:
        return "#666666";
    }
  })(),
}));

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(4); // Number of orders per page
  const userEmail = localStorage.getItem("userEmail");

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/orders/${userEmail}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const orders = await response.json();
      // Sort orders based on placement time (createdAt)
      orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const cancelOrder = async (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/orders/cancelorder/${orderId}`,
          {
            method: "PUT",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to cancel order");
        }
        const updatedOrder = await response.json();
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === updatedOrder._id ? updatedOrder : order
          )
        );
      } catch (error) {
        console.error("Error canceling order:", error);
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [userEmail]);

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Your Orders
      </Typography>
      {currentOrders.length === 0 ? (
        <Typography variant="subtitle1" align="center">
          You haven't placed any orders yet. Start shopping now!
        </Typography>
      ) : (
        currentOrders.map((order) => (
          <OrderItem key={order._id}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={12} md={8}>
                <Typography variant="h6">{order.productName}</Typography>
                <Typography variant="body1" paragraph>
                  Shipping Address: {order.shippingAddress}
                </Typography>
                <Typography variant="body1" paragraph>
                  Quantity: {order.quantity}
                </Typography>
                <Typography variant="body1">
                  Total Value: ${order.totalValue.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Placed on: {order.createdAt}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <OrderStatus status={order.status}>
                  {order.status}
                </OrderStatus>
                <br />  
                &nbsp;
                {order.status !== "Delivered" && order.status !== "Canceled" && (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => cancelOrder(order._id)}
                  >
                    Cancel Order
                  </Button>
                )}
              </Grid>
            </Grid>
          </OrderItem>
        ))
      )}
      {orders.length > 3 && (
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <Button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button onClick={() => paginate(currentPage + 1)}>
            Next
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Orders;
