import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="contact-section">
      <div className="overlay"></div>
      <div className="container">
        <footer className="footer">
          <p className="infos">
            &copy; {new Date().getFullYear()}, Made with{' '}
            <i className="ti-heart text-danger"></i> by{' '}
            <a href="http://www.devcrud.com">Baconbao Team</a>
          </p>
          <span>|</span>
          <div className="links">
            <a href="#">About</a>
            <a href="#">Explore</a>
            <a href="#">Journal</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
