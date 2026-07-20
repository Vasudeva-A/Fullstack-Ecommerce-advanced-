import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/accounts/products/${id}/`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary"></div>
      </div>
    );
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

              <h2 className="fw-bold">
                {product.name}
              </h2>

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
                      100
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

              <p className="text-secondary">
                {product.description}
              </p>

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
                  <h6 className="mb-0">
                    Category
                  </h6>

                  <strong>{product.cate?.name}</strong>
                </div>

              </div>

              <div className="mt-4 d-flex gap-3">

                <button className="btn btn-warning btn-lg">
                  🛒 Add to Cart
                </button>

                <button className="btn btn-success btn-lg">
                  Buy Now
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