import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Import your images here 
import img1 from "../Components/Assets/b1.jpg";
import img2 from "../Components/Assets/bg2.jpeg"; 
import img3 from "../Components/Assets/bg3.jpeg";
import officePCImg from "../Components/Assets/officepc.png";
import gamingPCImg from "../Components/Assets/gamingpc.png";

const ExploreSection = styled.div`
  text-align: center;
  padding: 50px 0;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin: 100px;
  padding: 10px;
`;

const ProductCard = styled.div`
  position: relative;
  border: 1px solid #ddd;
  border-radius: 12px;
  height:400px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProductDescription = styled.p`
  font-size: 16px;
  margin: 10px 0;
`;

const ProductPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #4caf50;
`

const BuyNowButton = styled(Link)`
  display: inline-block;
  background-color: #0375c1;
  padding: 8px 16px;
  border: 2px solid #0375c1;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
  text-decoration: none;
  color: #f9f9f9;

  &:hover {
    background-color: #004b7f;
    transform: scale(1.05);
  }
`;

const CategoriesSection = styled.div`
  text-align: center;
  padding: 50px 0;
`;

const CategorySection = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const CategoryText = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`;


const Category = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.05);
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 250px; /* Adjust this height as needed */
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const OverlayText = styled.div`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/home/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      <div className="carousel-container mx-auto text-center position-relative">
        
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
          data-interval="2000"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src={img1} alt="Carousel 1" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={img2} alt="Carousel 2" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={img3} alt="Carousel 3" />
            </div>
          </div>
          <Overlay>
          <OverlayText>Welcome To TechBees<br/>Discover Our Latest Collection</OverlayText>
          <BuyNowButton to="" className="btn btn-primary">Explore Now</BuyNowButton>
        </Overlay>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>

      <CategoriesSection>
        <h2>Explore by Category</h2>
        <br /><br />
        <CategorySection>
          <Link to="/viewcategory/PC_Office" style={{ textDecoration: "none" }}>
            <Category>
              <CategoryImage src={officePCImg} alt="Office PC" />
              <CategoryText>Office Use PC</CategoryText>
            </Category>
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/viewcategory/PC_Gaming" style={{ textDecoration: "none" }}>
            <Category>
              <CategoryImage src={gamingPCImg} alt="Gaming PC" />
              <CategoryText>Gaming PC</CategoryText>
            </Category>
          </Link>
        </CategorySection>
      </CategoriesSection>

      <ExploreSection>
        <h2>Explore Our Great Products</h2>
        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product._id}>
              <ProductImage src={product.image} alt={`Product ${product.id}`} />
              <ProductDescription>
                {product.description &&
                  (product.description.length > 50
                    ? `${product.description.substring(0, 70)}...`
                    : product.description)}
              </ProductDescription>
              <ProductPrice> ₹ {product.price}</ProductPrice>
              <BuyNowButton to={`/viewproduct/${product._id}`}>Buy Now</BuyNowButton>
            </ProductCard>
          ))}
        </ProductGrid>
      </ExploreSection>
    </div>
  );
};

export default Home;
