import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MyContext } from '../context/context';
import logo from "./imgs/logo.png";
import "./css/navbar.css"
export default function Navbar() {
  const { isLogIn ,isAdmin} = useContext(MyContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };



  const handleLogout = () => {
    localStorage.removeItem("app_token");
    localStorage.removeItem("team_data");
    window.location.reload();
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="navbar-brand" to="/home">
          <img src={logo} className='logo' alt="Logo" />
          ChallengeHub
        </Link>

        <button className="navbar-toggler" onClick={handleToggle}>
          ☰
        </button>

        <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
          {isLogIn ? (
            <>
              <Link onClick={handleToggle} className={`nav-link ${isActive('/home')}`} to="/home">Home Page</Link>
              <Link onClick={handleToggle} className={`nav-link ${isActive('/events')}`} to="/events">Events</Link>
              <Link onClick={handleToggle} className={`nav-link ${isActive('/search')}`} to="/search">Search</Link>
              <Link onClick={handleToggle} className={`nav-link ${isActive('/myEvents')}`} to="/myEvents">My Subscribed Events</Link>
              <Link onClick={handleToggle} className={`nav-link ${isActive('/profile')}`} to="/profile">Profile</Link>
              {isAdmin&&<Link onClick={handleToggle} className={`nav-link ${isActive('/dashboard')}`} to="/dashboard">Dashboard</Link>}
              <Link onClick={handleLogout} className={`nav-link ${isActive('/logout')}`} >LogOut</Link>

            
            </>
          ) : (
            <>
              <Link onClick={handleToggle} className={`nav-link ${isActive('/register')}`} to="/register">Register</Link>
              <Link onClick={handleToggle} className={`nav-link ${isActive('/login')}`} to="/login">LogIn</Link>
              <Link onClick={handleToggle} className={`nav-link ${isActive('/admin-login')}`} to="/admin-login"> Admin Dashboard</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
