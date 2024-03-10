import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCartPlus } from 'react-icons/fa';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 20px auto;
`;

const CategoriesContainer = styled.div`
  flex: 1;
  padding: 10px;
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
  font-size: 16px;
  font-weight: 400;
  flex-wrap: wrap;
`;

const ProductItem = styled.div`
  width: 30%;
  margin: 10px;
  padding: 20px;
  border-radius: 12px;
  border: 2px solid ${({ selected }) => (selected ? '#ff6347' : '#3d5a80')};
  position: relative;
  text-align: center;
  overflow: hidden;

  &:hover {
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

const AddToCartIcon = styled(FaCartPlus)`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  width: 50px;
  height: 50px;
  background-color: #3d5a80;
  border-radius: 50%;
  font-size: 20px;
  padding: 8px;
  cursor: pointer;
  z-index: 999;
`;

const DummyCartContainer = styled.div`
  width: 30%;
  padding: 20px;
  font-size: 15px;
  border-radius: 12px;
  border: 2px solid #3d5a80;
`;

const CartTitle = styled.h2`
  color: #3d5a80;
  font-size: 24px;
`;

const CartCategoryName = styled.span`
  color: red;
  font-weight: 500;
`;

const CartItemDetails = styled.div`
  margin-top: 10px;
`;

const IndianRupeeSymbol = '\u20B9';

const CustomPC = ({ history }) => {
  const [categories] = useState([
    'Processor',
    'GPU',
    'RAM',
    'Storage',
    'Motherboard',
    'Power Unit',
    'Case',
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    if (selectedCategory) {
      fetchProducts(selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    const total = cartItems.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price;
    }, 0);
    setTotalValue(total);
  }, [cartItems]);

  const fetchProducts = async (category) => {
    try {
      const response = await fetch(`http://localhost:5000/api/product/customproducts?category=${category}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };


  const addToCart = async (product) => {
    try {
      // Make a request to add the product to the database
      const response = await axios.post('http://localhost:5000/api/custompc/add', product);
      if (response.status === 201) {
        console.log('Product added to CustomPC model:', response.data);
        // Update the cartItems state with the selected product
        setCartItems([...cartItems, product]);
      } else {
        console.error('Failed to add product to CustomPC model:', response.data.message);
        // Handle failure
      }
    } catch (error) {
      console.error('Error adding product to CustomPC model:', error);
      // Handle error
    }
  };
  

  const handleProceedToPayment = async () => {
    try {
      if (cartItems.length > 0) {
        const productIds = cartItems.map((item) => item._id);
        console.log('Product IDs:', productIds);
        window.location.href = `/placeordercustompc?productIds=${JSON.stringify(productIds)}`;
      } else {
        console.error('No products selected.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <CategoriesContainer>
        <h1 style={{ color: '#3d5a80', textAlign: 'center', fontSize: '24px' }}>Custom PC Builder</h1>
        {categories.map((category, index) => (
          <CategoryContainer key={index}>
            <CategoryTitle onClick={() => setSelectedCategory(category)}>{category}</CategoryTitle>
            {selectedCategory === category && (
              <ProductContainer>
                {products.map((product) => (
                  <ProductItem key={product.id} selected={selectedProduct === product}>
                    <ProductImage src={product.image1} alt={product.name} />
                    <AddToCartIcon onClick={() => addToCart(product)} />
                    <p>{product.name.substring(0, 80)}</p>
                    <p>Price: {IndianRupeeSymbol} {product.price.toFixed(2)}</p>
                  </ProductItem>
                ))}
              </ProductContainer>
            )}
          </CategoryContainer>
        ))}
      </CategoriesContainer>

      <DummyCartContainer>
        <CartTitle>Custom Cart</CartTitle>
        {cartItems.map((item, index) => (
          <CartItemDetails key={index}>
            <CartCategoryName>{item.category} -</CartCategoryName> {item.name}
          </CartItemDetails>
        ))}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h3>Total Value: {IndianRupeeSymbol} {totalValue.toFixed(2)}</h3>
          <button onClick={handleProceedToPayment} style={{ padding: '10px 20px', backgroundColor: '#3d5a80', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Proceed to Payment</button>
        </div>
      </DummyCartContainer>
    </Container>
  );
};

export default CustomPC;
