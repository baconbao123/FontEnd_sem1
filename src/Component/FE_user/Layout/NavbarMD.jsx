import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NavbarMD.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { MdOutlineMessage } from "react-icons/md";
import { CiMedal } from "react-icons/ci";
import { AiOutlineHome } from "react-icons/ai";
import { BsPersonUp } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
function NavbarMD() {
  useEffect(() => {
    AOS.init();
  }, []);

  const [clickHidden, setClickHidden] = useState(true);
  const [dropDown, setDropDown] = useState(false);
  function handleOnClickHidden() {
    setClickHidden(!clickHidden);
  }
  function handleDropDown() {
    setDropDown(!dropDown);
  }
  return (
    <section className="row">
      {clickHidden && (
        <>
          <div
            className=" col-md-4 nav-bar-md d-lg-none "
            data-aos="fade-right"
          >
            <img
              src={require(`../../img/logo-admin.png`)}
              alt="logo"
              width={200}
              className="mt-4"
            />
            <ul className="list-menu">
              <li>
                <Link to='/' onClick={handleOnClickHidden}>
                  <AiOutlineHome className="icon-menu" ></AiOutlineHome> Home{" "}
                </Link>
              </li>
              <li className="dropdown" onClick={handleDropDown}>
                <Link>
                  <CiMedal className="icon-menu" /> Nobel Prizes{" "}
                </Link>
                <span>
                  <BsChevronDown />
                </span>
              </li>
              {dropDown && (
                <div className="drop-down-list" data-aos='fade'>
                  <li>
                    <Link to="/nobel-prizes" onClick={handleOnClickHidden}>All Nobel Prize</Link>
                  </li>
                  <li>
                    <Link to="nobel/literature" onClick={handleOnClickHidden}>Literature</Link>
                  </li>
                  <li>
                    <Link to="nobel/medicine" onClick={handleOnClickHidden}>Medicine</Link>
                  </li>
                  <li>
                    <Link to="nobel/chemistry">Chemistry</Link>
                  </li>
                  <li>
                    <Link to="nobel/peace" onClick={handleOnClickHidden}>Peace</Link>
                  </li>
                  <li>
                    <Link to="nobel/physic" onClick={handleOnClickHidden}>Physics</Link>
                  </li>
                  <li>
                    <Link to="nobel/economic sciences" onClick={handleOnClickHidden}>Economic Sciences</Link>
                  </li>
                </div>
              )}
              <li className="dropdown">
                <Link to='/laureates' onClick={handleOnClickHidden}>
                  <BsPersonUp className="icon-menu" /> Laureates{" "}
                </Link>
              </li>
              <li>
                <Link to='/blog' onClick={handleOnClickHidden}>
                  <MdOutlineMessage className="icon-menu" /> Blogs{" "}
                </Link>
              </li>
              <li>
                <Link to='/alfred-nobel' onClick={handleOnClickHidden}> Alfred Nobel</Link>
              </li>
              <li>
                <Link to='/alfred-nobel/nobel-will' onClick={handleOnClickHidden}>Testament</Link>
              </li>
              <li>
                <Link to='/about' onClick={handleOnClickHidden}>About Us </Link>
              </li>
            </ul>
          </div>
          <div
            className="col-md-8 out-side d-lg-none "
            onClick={handleOnClickHidden}
          ></div>
        </>
      )}
    </section>
  );
}

export default NavbarMD;
