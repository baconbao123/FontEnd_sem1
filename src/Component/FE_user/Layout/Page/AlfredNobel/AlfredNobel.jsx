import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./AlfredNobel.css";
import { Link } from "react-router-dom";
import Footer from "../../Footer";
// img
import testament from "../../../../img/nobel-ditruc.jpg";
function AlfredNobel() {
  useEffect(() => {
    AOS.init();
  }, []);
  useEffect(() => {
    document.title = 'Nobel-AlfredNobel';
  }, []);
  return (
    <div className="container alfred-nobel-page">
      <div className="overlay-nobel">
        {/* header content */}
        <header className="header-alfred-nobel d-none d-lg-block d-md-block">
          <div className="overlay"></div>
        </header>
        {/* title-bio */}
        <section className="text-light text-center mt-4">
          <div className="col-md-12 col-lg-7 m-auto">
            <h1 className="title-bio mb-4" data-aos-duration="800" data-aos='zoom-in'>
              ​THE MAN BEHIND THE PRIZE – ALFRED NOBEL
            </h1>
          </div>
        </section>
        {/* content-bio */}
        <section className="text-light container">
          <div className="row ">
            <div
              className="col-lg-7 col-md-7 "
              // data-aos="fade-right"
              data-aos-duration="800"
            >
              <h4 className="title-bio-nobel">
                ​For the greatest benefit to humankind
              </h4>
              <p className="sub-title-bio-nobel">
                ​Alfred Nobel was an inventor, entrepreneur, scientist and
                businessman who also wrote poetry and drama. His varied
                interests are reflected in the prize he established and which he
                lay the foundation for in 1895 when he wrote his last will,
                leaving much of his wealth to the establishment of the prize.{" "}
                <br />
                 Since 1901, the Nobel Prize has been honoring men and women
                from around the world for outstanding achievements in physics,
                chemistry, physiology or medicine, literature and for work in
                peace.
              </p>
            </div>
            <div
              className="col-lg-5 col-md-5 "
              // data-aos="fade-left"
              // data-aos-duration="800"
            >
              <h4 className="title-bio-nobel">​Quick facts</h4>
              <ul className="sub-title-bio-nobel ">
                <li>
                  <span className="strong-text">Born:</span>
                  <span> October 1833</span>
                </li>
                <li>
                  <span className="strong-text">Died:</span>
                  <span>10 December 1896</span>
                </li>
                <li>
                  <span className="strong-text">Known for :</span>
                  <span> inventing dynamite and holder of 355 patents</span>
                </li>
                <li>
                  <span className="strong-text">Professions:</span>
                  <span>
                    chemist, inventor, engineer, entrepreneur, businessman,
                    author
                  </span>
                </li>
                <li>
                  <span className="strong-text">Will: </span>
                  <span>
                    left 31 million SEK (about 265 million dollar today) to fund
                    the prizes
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        {/* testament */}
        <div className="container testament-nobel">
          <section className="container">
            <div className="row text-dark">
              <div
                className="col-lg-6 col-md-12 content-testament-nobel"
                data-aos="fade-up"
                data-aos-offset="300"
                data-aos-easing="ease-in-sine"
              >
                <h3>The last will and testament</h3>
                <p>
                  ​Alfred Nobel signed his last will in Paris on November 27,
                  1895. He specified that the bulk of his fortune should be
                  divided into five parts and to be used for prizes in physics,
                  chemistry, physiology or medicine, literature and peace to
                  “those who, during the preceding year, shall have conferred
                  the greatest benefit to humankind.”
                </p>
                <Link to="/alfred-nobel/nobel-will">READ MORE</Link>
              </div>
              <div
                className="col-lg-6 col-md-12 content-testament-nobel text-center  "
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <Link to="/alfred-nobel/nobel-will">
                  <img src={testament} /> <br />
                  <sub>
                    The will of Alfred Nobel. © Nobel Media AB 2018. Photo:
                    Alexander Mahmoud
                  </sub>
                </Link>
              </div>
            </div>
          </section>
        </div>
        <Footer/>
      </div>
    </div>
  );
}

export default AlfredNobel;
