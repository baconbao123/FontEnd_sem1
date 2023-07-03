import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import axios from "axios";
import "./Homepage.css";
import Navbar from "../../Navbar";
import Footer from "../../Footer";

import AOS from "aos";
import "aos/dist/aos.css";
import { FaAngleDoubleRight } from "react-icons/fa";

const Homepage = React.memo(() => {
  // effect srcoll
  useEffect(() => {
    AOS.init();
  }, []);

  // DATA
  const itemCategorys = useMemo(() => [
    {
      title: "Literature",
      subtitle:
        "The Nobel Prize in Literature is awarded by the Swedish Academy, Stockholm, Sweden.",
      img: "1.jpg",
    },
    {
      title: "Chemistry",
      subtitle:
        "The Nobel Prize in Chemistry is awarded by the Royal Swedish Academy of Sciences, Stockholm, Sweden.",
      img: "2.jpg",
    },
    {
      title: "Medicine",
      subtitle:
        "The Nobel Prize in Physiology or Medicine is awarded by the Nobel Assembly at Karolinska Institutet, Stockholm, Sweden",
      img: "3.jpg",
    },
    {
      title: "Peace",
      subtitle:
        "The Norwegian Nobel Committee, consisting of five members appointed by the Norwegian parliament, awards the Nobel Peace Prize.",
      img: "4.jpg",
    },
    {
      title: "Physic",
      subtitle:
        "The Nobel Prize in Physics is awarded by the Royal Swedish Academy of Sciences, Stockholm, Sweden.",
      img: "5.jpg",
    },
    {
      title: "Economic Sciences",
      subtitle:
        "The prize in economic sciences is awarded by the Royal Swedish Academy of Sciences, Stockholm, Sweden.",
      img: "6.jpg",
    },
  ]);

  const posts = useMemo(() => [
    {
      imgPost: "blog-1.jpg",
      timePost: "6/14/2023",
      titlePost: "How many peace laureates can you match?",
      subtitlePost:
        "Can you match the right peace laureate with the right accomplishment? Have a try!",
    },
    {
      imgPost: "blog-2.jpg",
      timePost: "6/14/2023",
      titlePost: "How many peace laureates can you match?",
      subtitlePost:
        "Can you match the right peace laureate with the right accomplishment? Have a try!",
    },
    {
      imgPost: "blog-1.jpg",
      timePost: "6/14/2023",
      titlePost: "How many peace laureates can you match?",
      subtitlePost:
        "Can you match the right peace laureate with the right accomplishment? Have a try!",
    },
  ]);

  // set show max 2 post
  const [numPosts, setNumPosts] = useState(2);

  const handleButtonClick = useCallback(() => {
    // Xử lý sự kiện khi nút được nhấn
  }, []);

  return (
    <div className="container">
      <div className="overlay">
        {/* header content */}
        <header className="header">
          <div className="overlay"></div>
          <div className="header-content">
            <h1 className="header-title">
              "FOR THE GREATEST BENEFIT TO HUMANKIND"
            </h1>
            <p className="header-subtitle">- Alfred Nobel -</p>
          </div>
        </header>

        <section className="container page-container text-light text-center">
          <div className="col-md-10 col-lg-7 m-auto">
            <h6 className="title mb-4">Explore Nobel Prizes</h6>
            <p className="mb-5 text-container">
              Between 1901 and 2022, the Nobel Prizes and the Sveriges Riksbank
              Prize in Economic Sciences in Memory of Alfred Nobel were awarded
              615 times to 989 people and organisations. With some receiving the
              Nobel Prize more than once, this makes a total of 954 individuals
              and 27 organisations. Below, you can view the full list of Nobel
              Prizes and Nobel Prize laureates.
            </p>
          </div>
          {/* category-item */}
          <div className="row mb-3 container container-category-item m-auto">
            {itemCategorys.map((item, index) => (
              <div className="col-md-4 col-lg-4" key={index}>
                <Link
                  to={`/nobel/${item.title.toLocaleLowerCase()}`}
                  className="overlay-img"
                >
                  <img
                    src={require(`../../../../img/${item.img}`)}
                    alt={item.title}
                  />
                  <div className="overlay"></div>
                  <div className="des text-center text-light">
                    <h1 className="title">{item.title}</h1>
                    <h6 className="subtitle">Nobel prize</h6>
                    <p>{item.subtitle}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
        {/* btn all nobel prize */}
        <div className="btn-conteiner">
          <Link to="/nobel-prizes" className="btn-content btn text-light">
            <span className="btn-title">All Nobel Prize</span>
            <span className="icon-arrow fs-4">
              <FaAngleDoubleRight />
            </span>
          </Link>
        </div>
        {/* Post  */}
        <div className="col-md-10 col-lg-8 m-auto text-light text-center">
          <h6 className="title mb-4 mt-4 pt-5 ">The Journal</h6>
        </div>
        <div className="row container m-auto container-item-post mb-3">
          {posts.slice(0, numPosts).map((post, index) => (
            <div
              className="col-md-6 col-lg-6"
              key={index}
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <a href="#" className="card">
                <img
                  src={require(`../../../../img/${post.imgPost}`)}
                  className="card-img"
                  alt={post.titlePost}
                />
                <div className="card-body">
                  <h6 className="card-subtitle">{post.timePost}</h6>
                  <h3 className="card-title">{post.titlePost}</h3>
                  <p>{post.subtitlePost}</p>
                </div>
              </a>
            </div>
          ))}
          <Link to="/blog" className="text-center">
            <button className="learn-more">
              <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
              </span>
              <span className="button-text">All Posts</span>
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    </div>
  );
});

export default Homepage;
