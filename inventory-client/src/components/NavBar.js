import React from "react";
import { NavLink, useParams } from "react-router-dom";
import "../styles/navbar.css"; 

const NavBar = () => {
  const { id } = useParams();
  console.log("navbar", id);
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">Inventory Manager</div>
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to={`/Inventory/${id}`} activeClassName="active">Inventory</NavLink>
              <NavLink to="/Logout" activeClassName="active">Logout</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
