import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 20px auto;
`;

const CategoriesContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const CategoryContainer = styled.div`
  margin-bottom: 20px;
`;

const CategoryTitle = styled.h2`
  color: #3d5a80;
  cursor: pointer;
  font-size: 18px;
`;

const ProductContainer = styled.div`
  display: flex;
  font-size: 10px;
  flex-wrap: wrap;
`;

const ProductItem = styled.div`
  width: 30%;
  margin: 10px;
  padding: 20px;
  border-radius: 12px;
  border: 2px solid #3d5a80;
  transition: transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  }
`;

const DummyCartContainer = styled.div`
  width: 30%;
  padding: 20px;
  font-size: 15px;
  border-radius: 12px;
  border: 2px solid #3d5a80;
  position: relative;
`;

const CartTitle = styled.h2`
  color: #3d5a80;
  font-size: 30px;
`;

const SubtotalContainer = styled.div`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  color: red;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const DeleteIcon = styled(FaTrash)`
  color: #ff6347;
  cursor: pointer;
`;

const ProceedToPaymentButton = styled.button`
  margin-top: 10px;
  padding: 15px;
  background-color: #4caf50; /* Green */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049; /* Darker green on hover */
  }
`;

const IndianRupeeSymbol = '\u20B9'; // Unicode for Indian Rupee symbol

export const CustomPC = () => {
  const [categories] = useState([
    {
      id: 1,
      title: 'CPU',
      products: [
        { id: 101, name: 'Intel Core i9', price: 50000, category: 'CPU' },
        { id: 102, name: 'AMD Ryzen 7', price: 45000, category: 'CPU' },
        // Add more CPU options
      ],
    },
    {
      id: 2,
      title: 'GPU',
      products: [
        { id: 201, name: 'NVIDIA RTX 3080', price: 117000, category: 'GPU' },
        { id: 202, name: 'AMD Radeon RX 6800', price: 7000, category: 'GPU' },
        // Add more GPU options
      ],
    },
    {
      id: 3,
      title: 'RAM',
      products: [
        { id: 301, name: 'Corsair Vengeance 16GB', price: 12000, category: 'RAM' },
        { id: 302, name: 'G.SKILL Ripjaws V 32GB', price: 20000, category: 'RAM' },
        // Add more RAM options
      ],
    },
    {
      id: 4,
      title: 'Storage',
      products: [
        { id: 401, name: 'Samsung 970 EVO 1TB SSD', price: 15000, category: 'Storage' },
        { id: 402, name: 'Seagate Barracuda 2TB HDD', price: 10000, category: 'Storage' },
        // Add more storage options
      ],
    },
    {
      id: 5,
      title: 'Motherboard',
      products: [
        { id: 501, name: 'ASUS ROG Strix B550-F', price: 56000, category: 'Motherboard' },
        { id: 502, name: 'MSI MPG Z490 Gaming Edge', price: 35000, category: 'Motherboard' },
        // Add more motherboard options
      ],
    },
    {
      id: 6,
      title: 'Power Supply',
      products: [
        { id: 601, name: 'EVGA SuperNOVA 750W', price: 4999, category: 'Power Supply' },
        { id: 602, name: 'Corsair RM850x 850W', price: 36999, category: 'Power Supply' },
        // Add more power supply options
      ],
    },
    {
      id: 7,
      title: 'Case',
      products: [
        { id: 701, name: 'NZXT H510i', price: 17999, category: 'Case' },
        { id: 702, name: 'Fractal Design Meshify C', price: 25999, category: 'Case' },
        // Add more case options
      ],
    },
    // Add more categories as needed
  ]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dummyCart, setDummyCart] = useState([]);

  const addToCart = (product) => {
    // Check if a product from the same category already exists in the cart
    const categoryExistsInCart = dummyCart.some((item) => item.category === product.category);

    // If the category already exists, you can choose to replace the existing product
    if (categoryExistsInCart) {
      // Find the index of the existing product in the cart
      const existingProductIndex = dummyCart.findIndex((item) => item.category === product.category);

      // Replace the existing product with the new one
      const updatedCart = [...dummyCart];
      updatedCart[existingProductIndex] = product;

      setDummyCart(updatedCart);
    } else {
      // If the category doesn't exist, simply add the product to the cart
      setDummyCart([...dummyCart, product]);
    }
  };

  const removeFromCart = (index) => {
    const updatedCart = [...dummyCart];
    updatedCart.splice(index, 1);
    setDummyCart(updatedCart);
  };


  const calculateSubtotal = () => {
    const subtotal = dummyCart.reduce((total, item) => total + item.price, 0);
    return `${IndianRupeeSymbol} ${subtotal.toFixed(2)}`;
  };

  return (
    <Container>
      <CategoriesContainer>
        <h1 style={{ color: '#3d5a80', textAlign: 'center', fontSize: '24px' }}>Custom PC Builder</h1>
        {categories.map((category) => (
          <CategoryContainer key={category.id}>
            <CategoryTitle onClick={() => setSelectedCategory(category.id)}>
              {category.title}
            </CategoryTitle>
            {selectedCategory === category.id && (
              <ProductContainer>
                {category.products.map((product) => (
                  <ProductItem key={product.id} onClick={() => addToCart(product)}>
                    <h3>{product.name}</h3>
                    <p>Price: {IndianRupeeSymbol} {product.price.toFixed(2)}</p>
                  </ProductItem>
                ))}
              </ProductContainer>
            )}
          </CategoryContainer>
        ))}
      </CategoriesContainer>

      <DummyCartContainer>
        <CartTitle>Custom Cart</CartTitle><br />  
        {dummyCart.map((item, index) => (
          <CartItem key={index}>
            <div>
              <h3>{item.name}</h3>
              <p>Price: {IndianRupeeSymbol} {item.price.toFixed(2)}</p>
            </div>
            <DeleteIcon onClick={() => removeFromCart(index)} />
          </CartItem>
        ))}
        <SubtotalContainer>Subtotal: {calculateSubtotal()}</SubtotalContainer>
        <ProceedToPaymentButton>Proceed to Payment</ProceedToPaymentButton>
      </DummyCartContainer>
    </Container>
  );
};

export default CustomPC;
