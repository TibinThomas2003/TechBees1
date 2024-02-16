import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './SideBar'; // Import the new sidebar component

const AdminDashboard = () => {

  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    marginTop: '20px', // Add margin top to move the sidebar down
  };

  const sidebarStyle = {
    flex: '0 0 30%', // Sidebar takes 30% of the width, doesn't grow or shrink
  };

  const contentStyle = {
    flex: '0 0 70%', // Content area takes 70% of the width, doesn't grow or shrink
    padding: '20px',
  };

  const headingStyle = {
    fontSize: '2em',
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    color: '#fff',
  };

  return (
    <div style={containerStyle}>
      {/* Render the new Sidebar component */}
      <div style={sidebarStyle}>
        <Sidebar />
      </div>
      <div style={contentStyle}>
        <h1 style={headingStyle}>Welcome to the Admin Panel</h1>
        {/* Add more content for the main area */}
      </div>
    </div>
  );
};

export default AdminDashboard;
