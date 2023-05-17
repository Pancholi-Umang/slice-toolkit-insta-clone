import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setSingleUser } from "../redux/LoginSlice";


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const removeUser = () => {
    localStorage.removeItem('Logins');
    dispatch(setSingleUser({}))
    navigate("/login")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-info navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Facebook-Clone
          </a>
          <ul className="navbar-nav d-flex flex-row me-1">
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle text-white"
                id="navbarDropdown"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-user mx-1" /> Profile
              </Link>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <Link className="dropdown-item" to="/profile">
                    My account
                  </Link>
                </li>
                <li>
                  <button onClick={removeUser}
                  className="dropdown-item">
                    Log out
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
