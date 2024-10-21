import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {  FaArrowLeft, FaArrowRight,FaUserFriends, FaHome, FaBox,FaPlus  , FaList,FaArrowCircleLeft} from 'react-icons/fa';
import "./css/adminNavbar.css"
import { AiOutlineLink } from 'react-icons/ai';

import { useContext } from 'react';
import { MyContext } from '../context/context';
const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const location = useLocation(); 

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const getActiveClass = (path) => {
    return location.pathname === path ? 'active' : ''; 
  };

  return (
    <div className={`navbar ${isOpen ? 'open' : 'closed'} adminnavbar`}>
      <button className="toggle-btn" onClick={toggleNavbar} aria-label="Toggle navigation">
        {isOpen ? <FaArrowLeft /> : <FaArrowRight />}
      </button>
      <ul className="nav-links">
        <li className={getActiveClass('/dashboard')}>
          <Link to="/dashboard">
            <FaHome className="icon" />
            {isOpen && <span>Dashboard Home</span>}
          </Link>
        </li>
        <li className={getActiveClass('/all-events')}>
          <Link to="/all-events">
            <FaBox className="icon" />
            {isOpen && <span>All Events</span>}
          </Link>
        </li>
        <li className={getActiveClass('/teams')}>
          <Link to="/teams">
            <FaUserFriends className="icon" />
            {isOpen && <span>Teams</span>}
          </Link>
        </li>
        <li className={getActiveClass('/create-event')}>
          <Link to="/create-event">
            <FaPlus className="icon" />
            {isOpen && <span>Create Event</span>}
          </Link>
        </li>
      
        <li >
          <Link onClick={()=>{localStorage.removeItem("admin_token");window.location.reload()}} >
            <FaArrowCircleLeft className="icon" />
            {isOpen && <span>Logout</span>}
          </Link>
        </li>
        <li >
          <Link to="/home">
            <AiOutlineLink  className="icon" />
            {isOpen && <span>go to Website </span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminNavbar;
