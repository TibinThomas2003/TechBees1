import React from 'react';
import img1 from '../Pages/Assets/PC1.png';
import img2 from '../Pages/Assets/PC2.jpg';
import img3 from '../Pages/Assets/PC3.jpg';
import img4 from '../Pages/Assets/PC5.jpg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ExploreSection = styled.div`
  text-align: center;
  margin: 30px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 30px;
  height: 1100px;
  padding: 20px;
`;

const ProductCard = styled.div`
  position: relative;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 20px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  width: 100%;
  max-height: 400px;
  border-radius: 8px 8px 0 0;
  margin-bottom: 15px;
  margin-top: 20px;
  object-fit: contain;
  transition: transform 0.3s ease-in-out;
`;

const ProductDescription = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const ProductPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #4caf50;
  margin-bottom: 15px;
`;

const BuyNowButton = styled.button`
  color: #f9f9f9;
  background-color: #0375c1;
  padding: 10px 20px;
  border: 2px solid #0375c1;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #004b7f;
  }
`;

const CategoriesSection = styled.div`
  text-align: center;
  margin: 30px;
`;

const CategorySection = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 30px;
`;

const Category = styled.div`
  border: 2px solid #000;
  padding: 20px;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const Home = () => {
  const products = [
    {
      id: 1,
      image: img1,
      description: 'Product 1 description',
      price: '$999.99',
    },
    {
      id: 2,
      image: img2,
      description: 'Product 2 description',
      price: '$1299.99',
    },
    {
      id: 3,
      image: img3,
      description: 'Product 3 description',
      price: '$1299.99',
    },
    {
      id: 4,
      image: img2,
      description: 'Product 4 description',
      price: '$1299.99',
    },
    {
      id: 5,
      image: img1,
      description: 'Product 5 description',
      price: '$1299.99',
    },
  ];

  return (
    <div>
      <br /><br />
      <div className="mx-auto text-center">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" data-interval="3000">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <ProductImage src={img1} alt="Carousel 1" />
            </div>
            <div className="carousel-item">
              <ProductImage src={img2} alt="Carousel 2" />
            </div>
            <div className="carousel-item">
              <ProductImage src={img3} alt="Carousel 3" />
            </div>
            <div className="carousel-item">
              <ProductImage src={img4} alt="Carousel 4" />
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>

      <CategoriesSection>
        <h2>Categories</h2>
        <CategorySection>
          <Category>
            <h3><Link to="/viewcategory/PC_Office">Office Use PC</Link></h3>
          </Category>
          <Category>
            <h3><Link to="/viewcategory/PC_Gaming">Gaming PC</Link></h3>
          </Category>
        </CategorySection>
      </CategoriesSection>

      <ExploreSection>
        <h2>Explore Our Creative PCs</h2>
        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product.id}>
              <ProductImage src={product.image} alt={`Product ${product.id}`} />
              <ProductDescription>{product.description}</ProductDescription>
              <ProductPrice>{product.price}</ProductPrice>
              <BuyNowButton>Buy Now</BuyNowButton>
            </ProductCard>
          ))}
        </ProductGrid>
      </ExploreSection>
    </div>
  );
};

export default Home;
