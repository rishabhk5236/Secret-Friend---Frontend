import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import noteContext from "../Context/Notes/noteContext";

export default function Navbar() {
  const context = useContext(noteContext);
  const { userDetails } = context;

  let location = useLocation();
  let navigate = useNavigate();

  const handleLogoutBtn = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/">
          Secret Friend
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                } aria-current="page" `}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }  `}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
        {!localStorage.getItem("token") ? (
          <div className="d-flex" role="search">
            <Link
              className="btn btn-outline-light mx-1"
              to="/login"
              type="submit"
            >
              Login
            </Link>
            <Link
              className="btn btn-outline-light mx-1"
              to="/signup"
              type="submit"
            >
              SignUp
            </Link>
          </div>
        ) : (
          <div className="d-flex">
            <div className="userDetails align-middle mx-3">
             

              <div class="dropdown show">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Welcome {userDetails.name}
                </button>

                <div class="dropdown-menu userDetailMenu" aria-labelledby="dropdownMenuLink">
                  <div className="container">
                    <p className="user-detail-name">{userDetails.name}</p>
                    <p className="user-detail-email">email: {userDetails.email}</p>
                    <p className="user-detail-id">id : {userDetails.id}</p>

                  </div>
                </div>
              </div>
            </div>
            <button className="btn btn-outline-light" onClick={handleLogoutBtn}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
