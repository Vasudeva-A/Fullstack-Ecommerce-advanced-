import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Category = () => {
  let [products, setProducts] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState(null);
  // const API_URL = "http://127.0.0.1:8000";
  useEffect(() => {
    let fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        let response = await fetch("http://127.0.0.1:8000/accounts/category/");
        if (!response.ok) {
          // console.log(response)
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message || "Something went wrong. Please try again.");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "40px", fontSize: "1.2rem" }}>
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: "red", textAlign: "center", padding: "40px" }}>
        Error: {error}
      </div>
    );
  }
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Product Catalog
      </h2>

      {/* 4. Responsive CSS Grid container wrapper */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((category) => (
          <div
            key={category.id}
            style={{
              // border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "8px",
              display:"flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Link to={`/category/${category.id}`}>
              <img
                src={category.image}
                alt={category.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "contain",
                  marginBottom: "10px",
                }}
              
              />
              </Link>
              <h3 style={{ fontSize: "1.1rem", margin: "10px 0 5px" ,textAlign:"center"}}>
                {category.name}
              </h3>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
