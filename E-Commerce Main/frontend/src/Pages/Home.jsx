import React, { useState, useEffect } from "react";
import styled from "styled-components";
import img1 from "../Pages/Assets/PC1.png";
import img2 from "../Pages/Assets/PC2.jpg";
import img3 from "../Pages/Assets/PC3.jpg";
import img4 from "../Pages/Assets/PC5.jpg";
import { Link } from "react-router-dom";

const ExploreSection = styled.div`
  text-align: center;
  margin: 30px;
  padding: 10px; /* Reduce padding */
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(250px, 1fr)
  ); /* Reduce minmax value */
  gap: 10px; /* Reduce gap */
  margin: 20px; /* Reduce margin */
  padding: 10px; /* Reduce padding */
`;

const ProductCard = styled.div`
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px; /* Reduce margin */
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  background-color: #fff;
  padding: 10px; /* Reduce padding */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  width: 100%;
  height: 180px; /* Reduce height */
  border-radius: 8px 8px 0 0;
  object-fit: contain;/
`;

const ProductDescription = styled.p`
  font-size: 14px; /* Reduce font size */
  margin-bottom: 5px; /* Reduce margin */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProductPrice = styled.p`
  font-size: 16px; /* Reduce font size */
  font-weight: bold;
  color: #4caf50;
  margin-bottom: 5px; /* Reduce margin */
`;

const BuyNowButton = styled(Link)`
  color: #f9f9f9;
  background-color: #0375c1;
  padding: 8px 16px; /* Reduce padding */
  border: 2px solid #0375c1;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  text-decoration: none; /* Remove default underline */

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
  width: auto;
  height: auto;
  transition: transform 0.3s ease-in-out; /* Add transition for hover effect */
  &:hover {
    transform: scale(1.05); /* Scale up on hover */
  }
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
      <br />
      <br />
      <div className="mx-auto text-center">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
          data-interval="3000"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              className="active"
            ></li>
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
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>

      <CategoriesSection>
        <h2>Categories</h2>
        <CategorySection>
          <Link to="/viewcategory/PC_Office">
            <Category>
              <h3>Office Use PC</h3>
            </Category>
          </Link>
          <Link to="/viewcategory/PC_Gaming">
            <Category>
              <h3>Gaming PC</h3>
            </Category>
          </Link>
        </CategorySection>
      </CategoriesSection>

      <ExploreSection>
        <h3>Explore Our Great Products</h3>
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
              <br />
              <BuyNowButton>Buy Now</BuyNowButton>
              <br />
              <br />
            </ProductCard>
          ))}
        </ProductGrid>
      </ExploreSection>
    </div>
  );
};

export default Home;
