import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import { BASE_URL } from "../config";
import ButtonLoader from "../Components/Loader/ButtonLoader";
import Swal from "sweetalert2";

const ProductDetailPage = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  let token = localStorage.getItem("access");
  const handleBuyNow = async () => {
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/buy-now/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await Swal.fire({
          title: "Order Placed!",
          text: "Your order has been placed successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/orders");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.error || "Something went wrong",
        });
      }
    } catch (err) {
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  let handleAddToCart = async () => {
    setIsLoading(true);
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }
    try {
      let res = await fetch(`${BASE_URL}/add-to-cart/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product.id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          title: "Item Added To Cart",
          icon: "success",
          draggable: true,
        });
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch(`${BASE_URL}/products/${id}/`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return <Loader />;
  }

  return (
    <div className="container py-5">
      <div className="   border-0 rounded-4">
        <div className="row g-0">
          {/* Product Image */}
          <div className="col-md-5 text-center p-4 ">
            <img
              src={product.img}
              alt={product.name}
              className="img-fluid rounded"
              style={{
                maxHeight: "450px",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Product Details */}
          <div className="col-md-7">
            <div className="card-body p-4">
              <span className="badge bg-primary mb-3 fs-6">
                {product.cate?.name}
              </span>

              <h2 className="fw-bold">{product.name}</h2>

              <div className="my-3">
                <span className="fs-2 fw-bold text-success">
                  ₹{product.offer_price}
                </span>

                <span className="text-muted text-decoration-line-through ms-3 fs-5">
                  ₹{product.original_price}
                </span>

                <span className="badge bg-danger ms-3">
                  {Math.round(
                    ((product.original_price - product.offer_price) /
                      product.original_price) *
                      100,
                  )}
                  % OFF
                </span>
              </div>

              {product.is_trend && (
                <span className="badge bg-warning text-dark mb-3">
                  🔥 Trending Product
                </span>
              )}

              <hr />

              <h5>Description</h5>

              <p className="text-secondary">{product.description}</p>

              <hr />

              <div className="d-flex align-items-center">
                <img
                  src={product.cate?.image}
                  alt={product.cate?.name}
                  width="60"
                  height="60"
                  className="rounded-circle border"
                />

                <div className="ms-3">
                  <h6 className="mb-0">Category</h6>

                  <strong>{product.cate?.name}</strong>
                </div>
              </div>

              <div className="mt-4 d-flex gap-3">
                <button
                  className="btn btn-outline-dark btn-lg border-1 shadow-lg"
                  onClick={handleAddToCart}
                  disabled={isLoading}
                >
                  {isLoading ? "Adding..." : "Add To Cart"}
                </button>

                <button
                  className="btn btn-warning"
                  onClick={handleBuyNow}
                  disabled={isLoading}
                >
                  {isLoading ? <ButtonLoader /> : "Buy Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
