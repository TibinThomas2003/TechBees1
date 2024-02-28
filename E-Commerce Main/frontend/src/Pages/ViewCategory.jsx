import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
} from "@mui/material";

const ViewCategory = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/product/viewproductsbycategory/${category}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products by category");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products by category:", error);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        <br />
        <center>{category} Category</center>
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={9} sm={6} md={3} key={product._id}>
            <Card>
              <center>
                <CardMedia
                  component="img"
                  image={product.image1}
                  alt={product.name}
                  sx={{ maxWidth: "50%", height: "auto" }} // Reduce image width
                />
              </center>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description.split(". ").map((sentence, index) => (
                    <span key={index}>
                      {index !== 0 && <br />}{" "}
                      &bull; {sentence.split(" ").slice(0, 20).join(" ")}{" "}
                    </span>
                  ))}
                </Typography>

                <Typography variant="h6" color="primary">
                  ₹{product.price}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "auto",
                    height: "50px",
                  }}
                >
                  <Button
                    component={Link}
                    to={`/viewproduct/${product._id}`}
                    variant="contained"
                    color="primary"
                    sx={{ width: "100%", height: "100%" }} // Full width and height
                  >
                    View Product
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ViewCategory;
