import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuthStore } from '../store/useAuthStore';


const Navbar = () => {
  // Simulate user authentication state (replace with real auth logic)
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { authUser, logout, organiser } = useAuthStore();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleHamburgerClick = () => {
    setMenuOpen((prev) => !prev);
    setDropdownOpen(false);
  };

  const handleNavLinkClick = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleDropdownToggle = (e) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  // Simulate login/logout for demo



  return (
    <nav>
      <div className="logo">
        <h1>Events Hub</h1>
      </div>
      <div className={`hamburger${menuOpen ? ' open' : ''}`} onClick={handleHamburgerClick} aria-label="Toggle navigation" tabIndex={0} role="button">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`nav-links${menuOpen ? ' active' : ''}`}>
        <li><a href="/" onClick={handleNavLinkClick}>Home</a></li>


        {organiser && (
        <li className="dropdown" ref={dropdownRef}>
          <button className="dropdown-toggle" onClick={handleDropdownToggle} aria-haspopup="true" aria-expanded={dropdownOpen}>
            Events
            <span className="dropdown-arrow">▼</span>
          </button>
          <ul className={`dropdown-menu${dropdownOpen ? ' show' : ''}`}>
        <li><Link to={'/my-events'} onClick={handleNavLinkClick}>My Events</Link></li>
        <li><Link to={'/add-events'} onClick={handleNavLinkClick}>Add Events</Link></li>
          </ul>
        </li>
        )}



        <li><a href="/about" onClick={handleNavLinkClick}>About</a></li>
        <li><a href="/contact" onClick={handleNavLinkClick}>Contact</a></li>
        {!authUser && (
          <li className="dropdown" ref={dropdownRef}>
            <button className="dropdown-toggle" onClick={handleDropdownToggle} aria-haspopup="true" aria-expanded={dropdownOpen}>
              Login / Register
              <span className="dropdown-arrow">▼</span>
            </button>
            <ul className={`dropdown-menu${dropdownOpen ? ' show' : ''}`}>
              <li><Link to={"/login"} >Login</Link></li>
              <li><Link to={"/signup"} onClick={handleNavLinkClick}>Register</Link></li>
            </ul>
          </li>
        )}
        {authUser && (
          <>
            <li><a href="/profile" onClick={handleNavLinkClick}>Profile</a></li>
            <li><a onClick={() => {
              handleNavLinkClick();
              logout();
            }} style={{ cursor: "pointer" }}>Logout</a></li>
          </>
        )}
      </ul>
      <div className="search-bar">
        <input type="text" placeholder="Search events..." />
        <button type="submit">Search</button>
      </div>
    </nav>
  );
};

export default Navbar;