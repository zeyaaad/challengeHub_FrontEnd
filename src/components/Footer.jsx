import React, { useContext } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn,FaGithub  } from 'react-icons/fa';
import './css/Footer.css'; // Import the external CSS file
import { MyContext } from '../context/context';
import { Link } from 'react-router-dom';

export default function Footer() {
        const{isLogIn}=useContext(MyContext);
  return (
    <footer className="footer mt-5">
      <div className="footer-container">
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            {isLogIn?<>
                <li><Link to="/home">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/myEvents">My  Events</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            </>: 
            <>
            
            <li><Link to="/login">LogIn</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/admin-login">Admin Dashboard</Link></li>
            </>
            }
            
           
          </ul>
        </div>
        <div className="footer-social">
          <h4>Follow Me</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com/zeyd.mohad" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://x.com/Zeyad1468" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/zeyad.__.mohamed/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/in/zeyad-m-muhammedin-2a3097287/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
             <a href="https://github.com/zeyaaad" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ChallengeHub. All rights reserved.</p>
      </div>
    </footer>
  );
}
