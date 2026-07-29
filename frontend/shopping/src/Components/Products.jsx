import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader/Loader";
import {BASE_URL} from "../config"
import { SearchContext } from "../Context/SearchContext";
const Products = () => {
  let [products, setProducts] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState(null);
  let {search} = useContext(SearchContext)
  // const API_URL = "http://127.0.0.1:8000";
  useEffect(() => {
    let fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        let response = await fetch(`${BASE_URL}/products/?search=${search}`);
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
  }, [search]);
  if (isLoading) {
    return (
      <Loader/>
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
        {products.map((product) => (
          
          <div
            key={product.id}
            style={{
              // border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Link to={`/products/${product.id}/`}>
              <img
                // src={`${API_URL}/${product.img}`}
                // src={`http://127.0.0.1:8000${product.img}`}
                src={product.img}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "contain",
                  marginBottom: "10px",
                }}
              />
              </Link>
              <h3 style={{ fontSize: "1.1rem", margin: "10px 0 5px" }}>
                {product.name}
              </h3>
              <p
                style={{
                  color: "#174497",
                  fontSize: "0.85rem",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                }}
              >
                {product.cate.name}
              </p>
              <p
                style={{ fontSize: "0.9rem", lineHeight: "1.4", color: "#444" }}
              >
                {product.description}
              </p>
            </div>

            <div style={{ marginTop: "15px" }}>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  margin: "5px 0",
                }}
              >
                Rs.{product.offer_price}
              </p>
              {/* {product.rating && (
                <p style={{ fontSize: "0.85rem", color: "#666" }}>
                  ⭐ {product.rating.rate} ({product.rating.count} reviews)
                </p>
                )} */}

              <p style={{ fontSize: "0.85rem", color: "#666",textDecorationLine:"line-through" }}>
                Rs.{product.original_price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
