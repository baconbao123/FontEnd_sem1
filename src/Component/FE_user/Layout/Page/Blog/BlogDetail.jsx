import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import "./style.scss";
import AOS from "aos";
import "aos/dist/aos.css";

const BlogDetail = () => {
  const [blogData, setBlogData] = useState({});
  const { id } = useParams();

  // effect scroll
  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`http://127.0.0.1:8000/api/blogs/${id}`);
      if (res && res.data) {
        setBlogData(res.data.blog);
      }
    }
    fetchData();
  }, [id]);

  const activeBlog = blogData && blogData.status === 'active' ? blogData : null;

  let images = [];
  if (blogData && blogData.img) {
    images = blogData.img.split(",");
  }

  return (
    <section className="bd-page">
      <section className="container">
        {activeBlog && blogData.title && (
          <>
            <section className="bd-title pt-5">
              <span className="bd-title-content" data-aos="fade-right">
                {blogData.title}
              </span>
            </section>
            <section className="bd-auth" data-aos="fade-left">
              {blogData.author}
            </section>
            <section className="bd-pov-1">
              <Row>
                <Col lg={3}>
                  {images[0] && (
                    <div>
                      <img
                        src={`http://127.0.0.1:8000/api/images/${images[0]}`}
                        alt="pic1"
                        width={300}
                      />
                    </div>
                  )}
                </Col>
                <Col lg={9}>
                  <div className="bd-pov-content-1">{blogData.content}</div>
                </Col>
              </Row>
            </section>
            <section className="bd-pov-2">
              <Row>
                <Col lg={9}>
                  <div className="bd-pov-content-1">{blogData.content}</div>
                </Col>
                <Col lg={3}>
                  {images[1] && (
                    <div>
                      <img
                        src={`http://127.0.0.1:8000/api/images/${images[1]}`}
                        alt="pic2"
                        className="bd-img w-100 mt-3"
                      />
                    </div>
                  )}
                </Col>
              </Row>
            </section>
            <section className="bd-pov-3">
              <Row>
                <Col lg={4}>
                  {images[2] && (
                    <div>
                      <img
                        src={`http://127.0.0.1:8000/api/images/${images[2]}`}
                        alt="pic3"
                        className="bd-img w-100 mt-3"
                      />
                    </div>
                  )}
                </Col>
                <Col lg={8}>
                  <div className="bd-pov-content-1">{blogData.content}</div>
                </Col>
              </Row>
            </section>
          </>
        )}
        {!activeBlog && <p>Post này không tồn tại</p>}
      </section>
    </section>
  );
};

export default BlogDetail;