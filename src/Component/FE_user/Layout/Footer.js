import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="contact-section">
      <div className="overlay"></div>
      <div className="container">
        <footer className="footer">
          <p className="infos">
            &copy; {new Date().getFullYear()}, Made with{' '}
            <i className="ti-heart text-danger"></i> by{' '}
            <a>Baconbao Team</a>
          </p>
          <span>|</span>
          <div className="links">
            <Link to="/about">About</Link>
            <Link to='/nobel-prizes'>Explore</Link>
            <Link to="/blog">Journal</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
