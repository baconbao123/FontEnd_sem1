import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import "./style.scss";
import AOS from "aos";
import "aos/dist/aos.css";


function splitContent(content, limit) {
  if (content.length <= limit) {
    return [content, '', ''];
  }

  const content1 = content.substring(0, limit);
  const remainingContent = content.substring(limit);

  // Tìm vị trí của dấu chấm gần limit trong phần còn lại của nội dung
  const dotIndex = remainingContent.indexOf('.', Math.floor(limit / 2));

  let content2 = '';
  let content3 = '';

  if (dotIndex !== -1) {
    content2 = remainingContent.substring(0, dotIndex + 1);
    content3 = remainingContent.substring(dotIndex + 1);
  } else {
    content2 = remainingContent;
  }

  return [content1, content2, content3];
}


const BlogDetail = () => {
  const limit = 1000;
  const [blogData, setBlogData] = useState({});
  const [content1, content2, content3] = blogData.content ? splitContent(blogData.content, limit) : ['', '', ''];
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
                <Col lg={3} md={5} xs={12}>
                  {images[0] && (
                    <div>
                      <img
                        src={`http://127.0.0.1:8000/api/images/${images[0]}`}
                        alt="pic1"  
                      />
                    </div>
                  )}
                </Col>
                <Col lg={9} md={7} xs={12}>
                  <div className="bd-pov-content-1">{content1}</div>
                </Col>
              </Row>
            </section>
            <section className="bd-pov-2">
              <Row>
                <Col lg={9} md={7}>
                  <div className="bd-pov-content-1">{content2}</div>
                </Col>
                <Col lg={3} md={5}>
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
                <Col lg={4} md={4} className="d-none d-lg-block d-md-block">
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
                <Col lg={8} md={8}>
                  <div className="bd-pov-content-1">{content3}</div>
                </Col>
              </Row>
            </section>
          </>
        )}
        {!activeBlog && <p>Loading...</p>}
      </section>
    </section>
  );
};
export default BlogDetail;