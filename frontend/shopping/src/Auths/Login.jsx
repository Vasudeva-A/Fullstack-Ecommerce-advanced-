import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthContext";
import ButtonLoader from "../Components/Loader/ButtonLoader";
import { BASE_URL } from "../config";

const Login = () => {
  const { setIsLoggedIn, setUser } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setErrors("");

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);

        const profileResponse = await fetch(`${BASE_URL}/profile/`, {
          headers: {
            Authorization: `Bearer ${data.access}`,
          },
        });

        if (profileResponse.ok) {
          const profile = await profileResponse.json();
          setUser(profile);
        }

        setIsLoggedIn(true);

        Swal.fire({
          icon: "success",
          title: "Welcome Back 👋",
          text: "Login Successful",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/");
      } else {
        setErrors(
          data.detail ||
            data.non_field_errors?.[0] ||
            "Invalid Username or Password"
        );
      }
    } catch (err) {
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <div className="col-md-6 col-lg-5">

        <div className="card border-0 shadow-lg rounded-4">

          <div className="card-body p-5">

            <div className="text-center mb-4">

              <i
                className="bi bi-person-circle text-primary"
                style={{ fontSize: "70px" }}
              ></i>

              <h2 className="fw-bold mt-3">Welcome Back</h2>

              <p className="text-muted">
                Login to continue shopping
              </p>

            </div>

            {errors && (
              <div className="alert alert-danger">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {errors}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="mb-3">

                <label className="form-label fw-semibold">
                  Username
                </label>

                <div className="input-group">

                  <span className="input-group-text">
                    <i className="bi bi-person"></i>
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                  />

                </div>

              </div>

              <div className="mb-4">

                <label className="form-label fw-semibold">
                  Password
                </label>

                <div className="input-group">

                  <span className="input-group-text">
                    <i className="bi bi-lock"></i>
                  </span>

                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                  />

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    <i
                      className={`bi ${
                        showPassword
                          ? "bi-eye-slash"
                          : "bi-eye"
                      }`}
                    ></i>
                  </button>

                </div>

              </div>

              <button
                className="btn btn-primary w-100 py-2"
                disabled={isLoading}
              >
                {isLoading ? <ButtonLoader /> : "Login"}
              </button>

            </form>

            <div className="text-center mt-4">

              <Link
                to="/forgot-password"
                className="text-decoration-none"
              >
                Forgot Password?
              </Link>

            </div>

            <hr />

            <div className="text-center">

              <span className="text-muted">
                Don't have an account?
              </span>

              <Link
                className="fw-bold ms-2 text-decoration-none"
                to="/register"
              >
                Register
              </Link>

            </div>

            {/* Google Login Button */}

            <div className="d-grid mt-4">

              <button
                type="button"
                className="btn btn-outline-dark"
              >
                <i className="bi bi-google me-2"></i>

                Continue with Google

              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;