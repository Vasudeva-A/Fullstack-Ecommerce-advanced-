import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'

const Register = () => {
  let [errors, setErrors] = useState({});
  let [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      let res = await fetch("http://127.0.0.1:8000/accounts/register/", {
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
        alert("Registration Successful!");
        console.log(data);
        setFormData({
          username: "",
          email: "",
          password: "",
          confirm_password: "",
        });
      } else {
        console.log(data);
        setErrors(data);
        // alert("Registration Failed");
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
                <h1 className="display-6 fw-bold text-muted">Register</h1>
              </div>
            </div>
            <div className="row">
              <div className="mb-3 ">
                <label className="form-label">Uername </label>
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
                <label className="form-label">Email </label>
                <input
                  value={formData.email}
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter Your Email"
                  required
                  onChange={handleChange}
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
                <label className="form-label">Confirm Password</label>
                <input
                  value={formData.confirm_password}
                  name="confirm_password"
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  required
                  onChange={handleChange}
                />
                {errors.confirm_password && (
                  <small className="text-danger">
                    {errors.confirm_password}
                  </small>
                )}
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary">
                  submit
                </button>
              </div>
              <div className="mb-3 text-center">
                <p className="text-muted">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
