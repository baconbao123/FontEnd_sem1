import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavbarMD.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { MdOutlineMessage } from "react-icons/md";
import { CiMedal } from "react-icons/ci";
import { AiOutlineHome } from "react-icons/ai";
import { BsPersonUp } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
function NavbarMD({ show }) {
  useEffect(() => {
    AOS.init({ once: true }); // Initialize AOS with the "once" option set to true
  }, []);

  useEffect(() => {
    if (show !== null) {
      const handleClick = () => {
        setClickHidden(!clickHidden);
      };
      show.current.addEventListener("click", handleClick);
      // return () => {
      //   show.current.removeEventListener("click", handleClick);
      // };
    }
  }, [show]);
  const [clickHidden, setClickHidden] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  function handleOnClickHidden() {
    setClickHidden(!clickHidden);
  }
  function handleDropDown() {
    setDropDown(!dropDown);
  }

  // path active
  const [activeLink, setActiveLink] = useState("");

  const location = useLocation();
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);


  return (
    <section className={`row ${clickHidden ? "" : "d-none"}`}>
      <div className=" col-md-4 nav-bar-md d-lg-none " >
        <img
          src={require(`../../img/logo-admin.png`)}
          alt="logo"
          width={200}
          className="mt-4"
        />
        <ul className={`list-menu `}>
          <li className={`${activeLink === '/' ? 'active-nav' : ''}`}>
            <Link to="/" onClick={handleOnClickHidden} >
              <AiOutlineHome className="icon-menu"></AiOutlineHome> Home{" "}
            </Link>
          </li>
          <li onClick={handleDropDown} className={`dropdown`}>
            <Link>
              <CiMedal className="icon-menu" /> Nobel Prizes{" "}
            </Link>
            <span>
              <BsChevronDown />
            </span>
          </li>
          {dropDown && (
            <div className="drop-down-list" data-aos="fade">
              <li className={`${activeLink === '/nobel-prizes' ? 'active-nav' : ''}`}>
                <Link to="/nobel-prizes" onClick={handleOnClickHidden}>
                  All Nobel Prize
                </Link>
              </li>
              <li className={`${activeLink === '/nobel/literature' ? 'active-nav' : ''}`}>
                <Link to="nobel/literature" onClick={handleOnClickHidden}>
                  Literature
                </Link>
              </li>
              <li className={`${activeLink === '/nobel/medicine' ? 'active-nav' : ''}`}>
                <Link to="nobel/medicine" onClick={handleOnClickHidden}>
                  Medicine
                </Link>
              </li>
              <li className={`${activeLink === '/nobel/chemistry' ? 'active-nav' : ''}`}>
                <Link to="nobel/chemistry"  onClick={handleOnClickHidden}>Chemistry</Link>
              </li>
              <li className={`${activeLink === '/nobel/peace' ? 'active-nav' : ''}`}>
                <Link to="nobel/peace" onClick={handleOnClickHidden}>
                  Peace
                </Link>
              </li>
              <li className={`${activeLink === '/nobel/physic' ? 'active-nav' : ''}`}>
                <Link to="nobel/physic" onClick={handleOnClickHidden}>
                  Physics
                </Link>
              </li>
              <li className={`${activeLink === 'nobel/economic sciences' ? 'active-nav' : ''}`}>
                <Link
                  to="nobel/economic sciences"
                  onClick={handleOnClickHidden}
                >
                  Economic Sciences
                </Link>
              </li>
            </div>
          )}
          <li className={`${activeLink === '/laureates' ? 'active-nav' : ''}`} >
            <Link to="/laureates" onClick={handleOnClickHidden}>
              <BsPersonUp className="icon-menu" /> Laureates{" "}
            </Link>
          </li>
          <li className={`${activeLink === '/blog' ? 'active-nav' : ''}`}>
            <Link to="/blog" onClick={handleOnClickHidden}>
              <MdOutlineMessage className="icon-menu" /> Blogs{" "}
            </Link>
          </li>
          <li className={`${activeLink === '/alfred-nobel' ? 'active-nav' : ''}`}>
            <Link to="/alfred-nobel" onClick={handleOnClickHidden}>
              {" "}
              Alfred Nobel
            </Link>
          </li>
          <li className={`${activeLink === '/alfred-nobel/nobel-will' ? 'active-nav' : ''}`}>
            <Link to="/alfred-nobel/nobel-will" onClick={handleOnClickHidden}>
              Testament
            </Link>
          </li>
          <li className={`${activeLink === '/about' ? 'active-nav' : ''}`}>
            <Link to="/about" onClick={handleOnClickHidden}>
              About Us{" "}
            </Link>
          </li>
        </ul>
      </div>
      <div
        className="col-md-8 out-side d-lg-none "
        onClick={handleOnClickHidden}
      ></div>
    </section>
  );
}

export default NavbarMD;
