import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import './navbar.css'; // Import the CSS file

export default function Navbar() {
  const { loggedIn, role, logOut } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        <div className="navbar-group">
          {!loggedIn ? (
            <>
              <li className="navbar-item">
                <Link to="/register" className="navbar-link">Register</Link>
              </li>
              <li className="navbar-item">
                <Link to="/login" className="navbar-link">Login</Link>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <button onClick={logOut} className="navbar-button">Logout</button>
              </li>
              <li className="navbar-item">
                {role === 'seller' ? (
                  <Link to="/buyer" className="navbar-link">View as Buyer</Link>
                ) : (
                  <Link to="/seller" className="navbar-link">View as Seller</Link>
                )}
              </li>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
}
