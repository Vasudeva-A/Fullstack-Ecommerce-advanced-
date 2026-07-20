import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Login = () => {
  let{setIsLoggedIn } = useContext(AuthContext)
  let [errors, setErrors] = useState({});
  let [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  let navigate = useNavigate();
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(formData);
      let res = await fetch("http://127.0.0.1:8000/accounts/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      let data = await res.json();
      console.log(data);

      if (res.ok) {
        setErrors({});
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        alert("Login Successful!");
        console.log(data);
        setFormData({
          username: "",
          password: "",
        });
        setIsLoggedIn(true)
        navigate('/')
      } else {
        console.log(data);
        setErrors(data);
        // alert("Login Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  let handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded">
            <div className="row text-center">
              <div className="col">
                <h1 className="display-6 fw-bold text-muted">Login</h1>
              </div>
            </div>
            <div className="row">
              <div className="mb-3 ">
                <label className="form-label">Username </label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Enter Your Username"
                  required
                  onChange={handleChange}
                  value={formData.username}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  value={formData.password}
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter Your Password"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <button type="submit" className="btn btn-primary">
                  submit
                </button>
                <div className="mb-3 text-center">
                  <p className="text-muted">
                    Don't have an account? <Link to="/register">Register</Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
