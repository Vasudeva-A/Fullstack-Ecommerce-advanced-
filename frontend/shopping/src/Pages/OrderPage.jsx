import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";

const OrderPage = () => {
  let [orders, setOrders] = useState([]);
  let token = localStorage.getItem("access");

 useEffect(() => {
  const fetchOrder = async () => {
    try {
      const response = await fetch(`${BASE_URL}/my-orders/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setOrders(data);
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  fetchOrder();
}, []); 
  return (
  <div className="container py-5">
    <h2 className="text-center fw-bold mb-5">📦 My Orders</h2>

    {orders.length === 0 ? (
      <div className="text-center mt-5">
        <h4 className="text-muted">No Orders Found</h4>
      </div>
    ) : (
      orders.map((order) => (
        <div className="card shadow-lg border-0 rounded-4 mb-5" key={order.id}>
          <div className="card-body">

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="fw-bold mb-1">Order #{order.id}</h5>
                <small className="text-muted">
                  {new Date(order.created_at).toLocaleString()}
                </small>
              </div>

              <span
                className={`badge fs-6 px-3 py-2 ${
                  order.status === "Pending"
                    ? "bg-warning text-dark"
                    : order.status === "Confirmed"
                    ? "bg-info"
                    : order.status === "Shipped"
                    ? "bg-primary"
                    : order.status === "Delivered"
                    ? "bg-success"
                    : "bg-danger"
                }`}
              >
                {order.status}
              </span>
            </div>

            <hr />

            {/* Ordered Products */}
            {order.items.map((item) => (
              <div
                key={item.id}
                className="row align-items-center border-bottom pb-3 mb-3"
              >
                <div className="col-md-2 text-center">
                  <img
                      src={`${BASE_URL.replace("/accounts", "")}${item.product.img}`}
                    alt={item.product.name}
                    className="img-fluid"
                    style={{
                      height: "120px",
                      objectFit: "contain",
                    }}
                  />
                </div>

                <div className="col-md-6">
                  <h5 className="fw-bold">{item.product.name}</h5>

                  <p className="text-muted mb-1">
                    Quantity : <strong>{item.quantity}</strong>
                  </p>

                  <p className="text-success fs-5 fw-bold">
                    ₹{item.price}
                  </p>
                </div>

                <div className="col-md-4 text-end">
                  <h5 className="text-primary">
                    ₹{Number(item.price) * item.quantity}
                  </h5>
                </div>
              </div>
            ))}

            {/* Order Summary */}
            <div className="row mt-4">

              <div className="col-md-6">
                <h6 className="fw-bold">Payment Status</h6>

                <span
                  className={`badge ${
                    order.payment_status === "Pending"
                      ? "bg-warning text-dark"
                      : "bg-success"
                  }`}
                >
                  {order.payment_status}
                </span>

                <p className="mt-3 mb-1">
                  <strong>Payment Method:</strong>{" "}
                  {order.payment_method || "Not Selected"}
                </p>

                <p className="mb-1">
                  <strong>Phone:</strong>{" "}
                  {order.phone || "Not Provided"}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {order.address || "Not Provided"}
                </p>
              </div>

              <div className="col-md-6 text-end">
                <h5 className="text-muted">Grand Total</h5>

                <h2 className="text-success fw-bold">
                  ₹{order.total_amount}
                </h2>

                <button className="btn btn-outline-primary mt-3 me-2">
                  View Details
                </button>

                <button className="btn btn-success mt-3">
                  Track Order
                </button>
              </div>

            </div>

          </div>
        </div>
      ))
    )}
  </div>
);
};

export default OrderPage;
