import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import "./style.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import swal from 'sweetalert';

const BlogDetail = () => {
  const [blogData, setBlogData] = useState({});
  const [contentParts, setContentParts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  // effect scroll
  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    fetchData();
  }, [id]);
  useEffect(() => {
    document.title = 'Nobel-Blog-Detail';
  }, []);
  async function fetchData() {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/blogs/${id}`);
      if (res && res.data && res.data.blog) {
        if (res.data.blog.status === 'active') {
          setBlogData(res.data.blog);
        } else {
          swal("Error", "Blog is not active.", "error");
        }
      } else {
        swal("Error", "Blog not found.", "error");
      }
    } catch (e) {
      swal("Error", "Id not found.", "error");
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    if (blogData && blogData.content) {
      const parts = blogData.content.split(/\r?\n\r?\n/).map(part => part.trim());
      setContentParts(parts);
    }
  }, [blogData]);

  const mergeContentParts = () => {
    let mergedParts = [];
    for (let i = 2; i < contentParts.length; i++) {
      mergedParts.push(contentParts[i]);
    }
    return mergedParts.join("\n\n");
  };

  const activeBlog = blogData && blogData.status === 'active' ? blogData : null;

  let images = [];
  if (blogData && blogData.img) {
    images = blogData.img.split(",");
  }

  return (
    <section className="bd-page">
      {loading ? (
        <h1 style={{ color: 'white', textAlign: 'center', marginTop: '400px' }}>Loading...</h1>
      ) : activeBlog && blogData.title ? (
        <section className="container">
          <section className="bd-title pt-5">
            <span className="bd-title-content" data-aos="fade-up">
              {blogData.title}
            </span>
          </section>
          <section className="bd-auth" data-aos="fade-up">
            {blogData.author}
          </section>
          <section className="bd-pov-1">
            <Row>
              <Col lg={3} md={12} xs={12}>
                {images[0] && (
                  <div>
                    <img
                      src={`http://127.0.0.1:8000/api/images/${images[0]}`}
                      alt="pic1"
                      className="d-none d-md-block d-sm-block d-lg-blog"
                    />
                  </div>
                )}
              </Col>
              <Col lg={9} md={12} xs={12}>
                {contentParts[0] && (
                  <div className="bd-pov-content-1">
                    {contentParts[0].split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </Col>
            </Row>
          </section>
          <section className="bd-pov-2">
            <Row>
              <Col lg={9} md={12}>
                {contentParts[1] && (
                  <div className="bd-pov-content-1">
                    {contentParts[1].split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </Col>
              <Col lg={3} md={12}>
                {images[1] && (
                  <div>
                    <img
                      src={`http://127.0.0.1:8000/api/images/${images[1]}`}
                      alt="pic2"
                      className="bd-img w-100 mt-3 d-lg-block d-none"
                    />
                  </div>
                )}
              </Col>
            </Row>
          </section>
          <section className="bd-pov-3">
            <Row>
              <Col lg={4} md={12} className="d-none d-lg-block d-md-block">
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
              <Col lg={8} md={12}>
                {mergeContentParts() && (
                  <div className="bd-pov-content-1 w-100">
                    {mergeContentParts().split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </Col>
            </Row>
          </section>
        </section>
      ) : (
        <h1 style={{ color: 'black', textAlign: 'center', marginTop: '400px' }}>Cannot find a blog</h1>
      )}
    </section>
  );
};
export default BlogDetail;