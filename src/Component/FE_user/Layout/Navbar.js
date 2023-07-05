import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../../Component/img/logo.png";
import { Link, useLocation } from "react-router-dom";
import { GoSearch } from 'react-icons/go'
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
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
  function onClickSearch1() {
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

  const [personList, setPersonList] = useState('');
  const [storePerson, setStorePerson] = useState([]);
  const handlePerson = (value) => {
    setPersonList(value);
    getPerson(value)
  }
  console.log(personList);
  async function getPerson(value) {
    const res = await axios.get('http://127.0.0.1:8000/api/person');
    let stores = res.data.filter(store => {
      return store.name.toLowerCase().includes(value.toLowerCase()) && store.status === 'active';
    })
    setStorePerson(stores)
  }
  console.log(storePerson)
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
              (<ul class="dropdown arrow-top" data-aos='fade'>
                <li><Link to="/laureates">Laureates</Link></li>
                <li><Link to='/nobel-prizes'> Nobel Prizes</Link></li>
                <li><Link to="nobel/literature">Literature</Link></li>
                <li><Link to="nobel/medicine">Medicine</Link></li>
                <li><Link to="nobel/chemistry">Chemistry</Link></li>
                <li><Link to="nobel/peace">Peace</Link></li>
                <li><Link to="nobel/physic">Physics</Link></li>
                <li><Link to="nobel/economic sciences">Economic Sciences</Link></li>
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
              (<ul class="dropdown arrow-top" data-aos='fade'>
                <li><Link to='/alfred-nobel'>Alfred Nobel</Link></li>
                <li><Link to="/blog"> Blogs</Link></li>
                <li><Link to="/about"> About us</Link></li>
              </ul>)
            }
          </li>
          <li className="nav-item search" ref={searchRef}>
            <a className="nav-link search-toggle" onClick={onClickSearch} style={{ cursor: 'pointer' }}>
              <GoSearch /> Search
            </a>
            {clickSearch && (
              <div className="search-wrapper" >
                <form>
                  <input
                    type="search"
                    className="form-control"
                    placeholder="search by laureates..."
                    onChange={(e) => handlePerson(e.target.value)}
                    value={personList}
                  />
                </form>
                {/* Display search results */}
                <div className="search-results " data-aos='fade' >
                  {storePerson.length > 0 ? (
                    storePerson.map((person, index) => (
                      <div className="item-person w-100">                     
                      <Link to={`/biography/${person.id}`} key={index} className="search-result-item " style={{padding:'10px 20px 10px 15px'}} onClick={onClickSearch1} >
                        <div className="search-result-info">
                          <p style={{ fontSize: '14px' }}>{person.name}</p>
                        </div>
                        <img src={`http://127.0.0.1:8000/api/images/${person.avatar}`} alt={person.name} width={30} />
                      </Link>
                      </div>
                    ))
                  ) : (
                    <div className="no-data">Results not found</div>
                  )}

                </div>
              </div>

            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
