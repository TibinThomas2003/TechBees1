import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './SideBar';

const AdminDashboard = () => {

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      marginTop: '20px',
    }}>
      <div style={{
        flex: '0 0 30%',
      }}>
        <Sidebar />
      </div>
      <div style={{
        flex: '0 0 70%',
        padding: '20px',
      }}>
        <h1 style={{
          fontSize: '2em',
          marginBottom: '20px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          color: 'red',
        }}>Welcome to the Admin Panel</h1>
        <p style={{
          color: '#333',
          fontSize: '1.2em',
          marginBottom: '20px',
        }}>This dashboard provides you with access to various administrative functionalities. You can manage users, products, orders, and generate reports from here.</p>
        <h2 style={{
          color: '#333',
          marginBottom: '15px',
        }}>Recent Activities:</h2>
        <div style={{
          marginBottom: '20px',
        }}>
          <p style={{
            marginBottom: '10px',
          }}>
            <strong>10 new orders:</strong> Check the latest orders placed by customers.
          </p>
          <p style={{
            marginBottom: '10px',
          }}>
            <strong>Inventory update:</strong> Ensure stock availability and update product details.
          </p>
          <p style={{
            marginBottom: '10px',
          }}>
            <strong>Monthly report:</strong> Generate monthly sales report for analysis.
          </p>
        </div>
        <h2 style={{
          color: '#333',
          marginBottom: '15px',
        }}>Quick Actions:</h2>
        <ul style={{
          listStyleType: 'none',
          padding: '0',
        }}>
          <li style={{
            marginBottom: '10px',
          }}>
            <Link to="/admin/add-product" style={{
              color: '#007bff',
              textDecoration: 'none',
            }}>Add New Product</Link>
          </li>
          <li style={{
            marginBottom: '10px',
          }}>
            <Link to="/admin/create-user" style={{
              color: '#007bff',
              textDecoration: 'none',
            }}>Create New User</Link>
          </li>
          <li style={{
            marginBottom: '10px',
          }}>
            <Link to="/admin/generate-report" style={{
              color: '#007bff',
              textDecoration: 'none',
            }}>Generate Report</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
  