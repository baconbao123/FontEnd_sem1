import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../../Component/img/logo.png";
import { Link, useLocation } from "react-router-dom";
import { GoSearch } from 'react-icons/go'
import AOS from "aos";
import "aos/dist/aos.css";
function Navbar() {
  useEffect(() => {
    AOS.init();
  }, []);
  const [scrolled, setScrolled] = useState(false);
  const [clickSearch, setClickSearch] = useState(false);
  const [onMouseEnterNav, setOnMouseEnterNav] = useState(false);
  const [onMouseEnterNav1, setOnMouseEnterNav1] = useState(false);
  const searchRef = useRef(null);

  // path active
  const [activeLink, setActiveLink] = useState('');

  const location = useLocation();
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);
  //  scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = event => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setClickSearch(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  function onClickSearch() {
    setClickSearch(!clickSearch);
  }
  function onMouseEnterNavbar() {
    setOnMouseEnterNav(true);
  }

  function onMouseLeaveNavbar() {
    setOnMouseEnterNav(false);
  }
  function onMouseEnterNavbar1() {
    setOnMouseEnterNav1(true);
  }

  function onMouseLeaveNavbar1() {
    setOnMouseEnterNav1(false);
  }

  return (
    <div>
      <nav className={`page-navbar ${scrolled ? "scrolled" : ""} ${location.pathname.startsWith('/chemistry/biography/') ? 'black-bg' : ''} `}>
        <ul className="nav-navbar container">
          <li className="nav-item">
            <Link to='/' className={`nav-link nav-active-hover ${activeLink === '/' ? 'active-top-nav' : ''}`}>
              Home
            </Link>
          </li>
          <li className="nav-item has-children"
            onMouseEnter={onMouseEnterNavbar}
            onMouseLeave={onMouseLeaveNavbar}>
            <Link to='/nobel-prizes' className={`nav-link nav-active-hover ${activeLink === '/nobel-prizes' ? 'active-top-nav' : ''}`}>
              Nobel Prizes & Laureates
            </Link>
            {onMouseEnterNav &&
              (<ul class="dropdown arrow-top" data-aos='fade-up'>
                <li><a href="#1">Laureates</a></li>
                <li><a href="#2"> Nobel Prizes</a></li>
                <li><a href="#3">Literature</a></li>
                <li><a href="#3">Medicine</a></li>
                <li><a href="#3">Chemistry</a></li>
                <li><a href="#3">Peace</a></li>
                <li><a href="#3">Physics</a></li>
                <li><a href="#3">Economic Sciences</a></li>
              </ul>)
            }

          </li>
          <li className="nav-item">
            <Link to='/' className="nav-link nav-active-hover">
              <img src={logo} alt="Logo" width="100px" />
            </Link>
          </li>
          <li className="nav-item has-children"
            onMouseEnter={onMouseEnterNavbar1}
            onMouseLeave={onMouseLeaveNavbar1}
          >
            <Link to='/alfred-nobel' className={`nav-link nav-active-hover ${activeLink === '/alfred-nobel' ? 'active-top-nav' : ''}`}>
              Alfred Nobel &  Blog
            </Link>
            {onMouseEnterNav1 &&
              (<ul class="dropdown arrow-top" data-aos='fade-up'>
                <li><a href="#1">Alfred Nobel</a></li>
                <li><Link to="/blog"> Blogs</Link></li>
              </ul>)
            }
          </li>
          <li className="nav-item search">
            <a className="nav-link search-toggle" onClick={onClickSearch} style={{ cursor: 'pointer' }}>
              <GoSearch /> Search
            </a>
            {clickSearch && (
              <div className="search-wrapper" ref={searchRef} >
                <form>
                  <input
                    type="search"
                    className="form-control"
                    name=""
                    placeholder=" enter to search"
                  />
                </form>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
