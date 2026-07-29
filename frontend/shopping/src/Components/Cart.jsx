import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import Loader from "./Loader/Loader";
import { AuthContext } from "../Auths/AuthContext";
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Cart = () => {
  let navigate= useNavigate()
  const { user } = useContext(AuthContext);
  // console.log(user);
  // let {id} = useParams()
  let token = localStorage.getItem("access");
  let [cartItems, setCartItems] = useState([]);
  let [isLoading, setIsLoading] = useState(false);

  let increaseQuantity = async (id) => {
    // setIsLoading(true);
    try {
      let response = await fetch(`${BASE_URL}/increase/${id}/`, {
        method: "PATCH",
        headers: {
          // "Content-Type":"application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();
      if (response.ok) {
        fetchcart();
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };
  let decreaseQuantity = async (id) => {
    // setIsLoading(true);
    try {
      let response = await fetch(`${BASE_URL}/decrease/${id}/`, {
        method: "PATCH",
        headers: {
          // "Content-Type":"application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();
      if (response.ok) {
        fetchcart();
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  let removeCart = async (id) => {
    try {
      let response = await fetch(`${BASE_URL}/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();
      if (response.ok) {
        fetchcart();
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  let fetchcart = async () => {
    setIsLoading(true);
    try {
      let response = await fetch(`${BASE_URL}/cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();
      if (response.ok) {
        setCartItems(data);
        console.log(data);
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchcart();
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-4">
        {user?.username ? `${user.username}'s Cart` : "My Cart"}
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <h4 className="text-muted">No Products Found</h4>
        </div>
      ) : (
        cartItems.map((item) => (
          <div className=" shadow-lg border-1 mb-4" key={item.id}>
            <div className="row g-0 align-items-center">
              {/* Product Image */}
              <div className="col-md-3 text-center p-3">
                <img
                  src={item.product.img}
                  alt={item.product.name}
                  className="img-fluid rounded"
                  style={{
                    height: "180px",
                    objectFit: "contain",
                    cursor: "pointer"
                  }}
                  onClick={() => navigate(`/products/${item.product.id}`)}
                />
              </div>

              {/* Product Details */}
              <div className="col-md-6 p-3">
                <h4 className="fw-bold">{item.product.name}</h4>

                <p className="text-muted mb-2">
                  Quantity :
                  <span className="fw-bold ms-2">{item.quantity}</span>
                </p>

                <p className="mb-2">
                  <span className="text-decoration-line-through text-danger me-2">
                    ₹{item.product.original_price}
                  </span>

                  <span className="fw-bold fs-5 text-success">
                    ₹{item.product.offer_price}
                  </span>
                </p>

                <h5 className="text-primary">Total : ₹{item.total}</h5>
              </div>

              {/* Buttons */}
              <div className="col-md-3 text-center">
                <button
                  className="btn btn-outline-primary w-75 mb-2"
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </button>

                <button
                  className="btn btn-outline-secondary w-75 mb-2"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </button>

                <button onClick={()=>removeCart(item.id)} className="btn btn-danger w-75">Remove</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
