import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

/**
 * 
 * @returns Navbar.jsx
 */
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="navbar-brand">Radiologist Reporting System</h1>
        <ul className="navbar-nav">
          <li className="nav-item reports">
            <Link to="/" className="nav-link">Reports</Link>
          </li>
          <li className="nav-item add-new">
            <Link to="/create" className="nav-link">Add Report</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
