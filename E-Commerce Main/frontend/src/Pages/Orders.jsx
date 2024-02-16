import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const OrderContainer = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

const OrderItem = styled.div`
  display: flex;
  flex-direction: column; /* Changed direction to column for better layout */
  padding: 10px;
  border-radius: 12px;
  border: 2px solid #3d5a80;
  transition: transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  }
`;

const OrderDetails = styled.div`
  flex-grow: 1;
  text-align: left;
`;

const OrderDate = styled.div`
  font-size: 14px;
  color: #3d5a80;
`;

const OrderStatus = styled.div`
  color: white;
  padding: 8px;
  border-radius: 8px;
  font-weight: bold;
  ${({ status }) => {
    switch (status) {
      case "Processing":
        return "background-color: lightcoral;";
      case "Order Placed":
        return "background-color: darkorange;";
      case "Shipped":
        return "background-color: #3d5a80;";
      case "Delivered":
        return "background-color: green;";
      case "Canceled":
        return "background-color: red;";
      default:
        return "background-color: #3d5a80;";
    }
  }}
`;

const CancelButton = styled.button`
  background-color: red;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
`;

export const Orders = () => {
  const [orders, setOrders] = useState([]);

  const cancelOrder = async (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to cancel order');
        }
        // Remove canceled order from the state
        setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
      } catch (error) {
        console.error('Error canceling order:', error);
        // Handle error appropriately (e.g., show error message to the user)
      }
    }
  };

  useEffect(() => {
    // Fetch orders data from the database
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const orders = await response.json();
        console.log('Orders:', orders);
        setOrders(orders); // Update state with fetched orders
      } catch (error) {
        console.error('Error fetching orders:', error);
        // Handle error appropriately (e.g., show error message to the user)
      }
    };
      
    fetchOrders();
  }, []);

  return (
    <Container className="container">
      <Header>
        <h1 style={{ color: "#3d5a80" }}>Your Orders</h1>
      </Header>
      {orders.length === 0 ? (
        <div className="row">
          <div className="col-12">
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#8b4513" }}>
                You haven't placed any orders yet. Start shopping now!
              </p>
            </div>
          </div>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="row">
            <div className="col-12">
              <OrderContainer>
                <OrderItem>
                  <OrderDetails>
                    <h3 style={{ color: "#3d5a80" }}>{order.productName}</h3>
                    <p>Shipping Address: {order.shippingAddress}</p>
                    <p>Total Value: ${order.totalValue.toFixed(2)}</p>
                    <OrderDate>Placed on: {order.createdAt}</OrderDate>
                  </OrderDetails>
                  <OrderStatus status={order.status}>
                    <center>
                    {order.status}
                    </center>
                  </OrderStatus>
                </OrderItem>
                {order.status !== "Delivered" && order.status !== "Canceled" && (
                  <CancelButton onClick={() => cancelOrder(order._id)}>
                    Cancel Order
                  </CancelButton>
                )}
              </OrderContainer>
            </div>
          </div>
        ))
      )}
    </Container>
  );
};

export default Orders;
