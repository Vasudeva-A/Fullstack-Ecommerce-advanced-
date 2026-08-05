import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auths/AuthContext";
import { SearchContext } from "../Context/SearchContext";

const Navbar = () => {
  const { search, setSearch } = useContext(SearchContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsLoggedIn(false);
    navigate("/login");
    alert("Successfully Logged Out");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow sticky-top">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand fw-bold fs-3 text-warning" to="/">
          <i className="bi bi-bag-heart-fill me-2"></i>
          Shopping Mart
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          {/* Left Menu */}
          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="bi bi-house-door me-1"></i>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/products">
                <i className="bi bi-grid me-1"></i>
                Products
              </Link>
            </li>

            {/* Categories Dropdown */}

            <li className="nav-item  ">
              <Link
                to='/category'
                className="nav-link "
                 
              >
                <i className="bi bi-list-ul me-1"></i>
                Categories
              </Link>

              
            </li>

            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    <i className="bi bi-cart3 me-1"></i>
                    Cart
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/chatbot">
                    <i className="bi bi-cart3 me-1"></i>
                    Chatbot
                  </Link>
                </li>

                {/* User Dropdown */}

                <li className="nav-item dropdown">

                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-person-circle me-1"></i>
                    My Account
                  </a>

                  <ul className="dropdown-menu dropdown-menu-end">

                    <li>
                      <Link className="dropdown-item" to="/profile">
                        <i className="bi bi-person me-2"></i>
                        Profile
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/orders">
                        <i className="bi bi-box-seam me-2"></i>
                        My Orders
                      </Link>
                    </li>

                    <li>
                      <hr className="dropdown-divider" />
                    </li>

                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
                      </button>
                    </li>

                  </ul>

                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="btn btn-warning ms-lg-3 mt-2 mt-lg-0" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}

          </ul>

          {/* Search */}

          <form
            className="d-flex ms-lg-4 mt-3 mt-lg-0"
            role="search"
          >
            <div className="input-group">

              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-search"></i>
              </span>

              <input
                type="search"
                className="form-control border-start-0"
                placeholder="Search Products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>
          </form>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;