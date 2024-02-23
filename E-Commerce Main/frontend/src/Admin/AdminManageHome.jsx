import React, { useState, useEffect } from 'react';
import Sidebar from './SideBar';

const AdminManageHome = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productDetails, setProductDetails] = useState([
    { name: '', description: '', price: '' },
    { name: '', description: '', price: '' },
    { name: '', description: '', price: '' },
    { name: '', description: '', price: '' },
    { name: '', description: '', price: '' },
  ]);

  // Fetch all products from the database
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/product/admin/viewproducts');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Function to handle adding a product to the selected list
  const addToSelectedProducts = (product) => {
    setSelectedProducts([...selectedProducts, product]);
  };

  // Function to handle removing a product from the selected list
  const removeFromSelectedProducts = (productId) => {
    setSelectedProducts(selectedProducts.filter((product) => product.id !== productId));
  };

  // Function to handle product selection
  const handleProductSelect = (productId, index) => {
    const selectedProduct = products.find(product => product.id === productId);
    if (selectedProduct) {
      const updatedProductDetails = [...productDetails];
      updatedProductDetails[index] = {
        name: selectedProduct.name,
        description: selectedProduct.description,
        price: selectedProduct.price
      };
      setProductDetails(updatedProductDetails);
    }
  };

  // JSX for rendering the list of products in dropdown options
  const renderProducts = () => {
    return (
      <>
        <option value="">Select a product</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>{product.name}</option>
        ))}
      </>
    );
  };
  
  // JSX for rendering the form to add product details
  const renderProductForm = () => {
    return productDetails.map((product, index) => (
      <div key={index}>
        <h3>Product {index + 1}</h3>
        <select onChange={(e) => handleProductSelect(e.target.value, index)}>
          {renderProducts()}
        </select>
        <p>Name: {product.name}</p>
        <p>Description: {product.description}</p>
        <p>Price: {product.price}</p>
      </div>
    ));
  };

  // JSX for rendering the selected product details
  const renderSelectedProductDetails = () => {
    return (
      <div>
        <h2>Selected Product Details</h2>
        {selectedProducts.map((product, index) => (
          <div key={index}>
            <h3>{product.name}</h3>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh', // 100% height of the viewport
      backgroundColor: '#f9f9f9',
    }}>
      <Sidebar style={{ width: "30%" }} />
      <div>
        <h2>Add Product Details</h2>
        {renderProductForm()}
        
        <h2>Selected Products</h2>
        {selectedProducts.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <button onClick={() => removeFromSelectedProducts(product.id)}>Remove</button>
          </div>
        ))}
        
        {/* Render selected product details */}
        {renderSelectedProductDetails()}
        
        {/* Add forms or components for managing About and Contact section details */}
      </div>
    </div>
  );
};

export default AdminManageHome;
