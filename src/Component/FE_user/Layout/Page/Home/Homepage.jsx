import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import item1 from "../../../../img/1.png";
import item2 from "../../../../img/2.png";
import item3 from "../../../../img/3.png";
import item4 from "../../../../img/4.png";
import item5 from "../../../../img/5.png";
import item6 from "../../../../img/6.png";

import post1 from "../../../../img/blog-1.jpg";
import post2 from "../../../../img/blog-2.jpg";

import AOS from "aos";
import "aos/dist/aos.css";
import { FaAngleDoubleRight } from "react-icons/fa";

function Homepage() {
  // effect srcoll
  useEffect(() => {
    AOS.init();
  }, []);
  // DATA
  const itemCategorys = [
    {
      title: "Literature",
      subtitle:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      img: item1,
    },
    {
      title: "Chemistry",
      subtitle:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      img: item2,
    },
    {
      title: "Medicine",
      subtitle:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      img: item3,
    },
    {
      title: "Peace",
      subtitle:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      img: item4,
    },
    {
      title: "Physics",
      subtitle:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      img: item5,
    },
    {
      title: "Economic Sciences",
      subtitle:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      img: item6,
    },
  ];

  const posts = [
    {
      imgPost: post1,
      timePost: "6/14/2023",
      titlePost: "How many peace laureates can you match?",
      subtitlePost:
        "Can you match the right peace laureate with the right accomplishment? Have a try!",
    },
    {
      imgPost: post2,
      timePost: "6/14/2023",
      titlePost: "How many peace laureates can you match?",
      subtitlePost:
        "Can you match the right peace laureate with the right accomplishment? Have a try!",
    },
    {
      imgPost: post2,
      timePost: "6/14/2023",
      titlePost: "How many peace laureates can you match?",
      subtitlePost:
        "Can you match the right peace laureate with the right accomplishment? Have a try!",
    },
  ];

  // set show max 2 post
  const [numPosts, setNumPosts] = useState(2);
  return (
    <div className="container">
      <div className="overlay">
      
        {/* header content */}
        <header className="header">
          <div className="overlay"></div>
          <div className="header-content">
            <h1
              className="header-title"
              data-aos-duration="800"
              data-aos="zoom-in"
            >
              "FOR THE GREATEST BENEFIT TO HUMANKIND"
            </h1>
            <p className="header-subtitle">- Alfred Nobel -</p>
          </div>
        </header>

        <section className="container page-container text-light text-center">
          <div className="col-md-10 col-lg-7 m-auto">
            <h6 className="title mb-4">Explore Nobel Prizes</h6>
            <p
              className="mb-5 text-container"
              data-aos="fade-up"
              data-aos-duration="800"
            >
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
              <div
                className="col-md-4 col-lg-4"
                key={index}
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <a href="#" className="overlay-img">
                  <img src={item.img} alt={item.title} />
                  <div className="overlay"></div>
                  <div className="des text-center text-light">
                    <h1 className="title">{item.title}</h1>
                    <h6 className="subtitle">Nobel prize</h6>
                    <p>{item.subtitle}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </section>
        {/* btn all nobel prize */}
        <div className="btn-conteiner">
          <a className="btn-content btn text-light" href="#">
            <span className="btn-title">All Nobel Prize</span>
            <span className="icon-arrow fs-4">
              <FaAngleDoubleRight />
            </span>
          </a>
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
                  src={post.imgPost}
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
}

export default Homepage;
