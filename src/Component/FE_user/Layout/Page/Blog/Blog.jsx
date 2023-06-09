import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Card, Col, Form, Row } from "react-bootstrap";
import { Paginator } from "primereact/paginator";
import URL from "../../../../api/api";
import AOS from "aos";
import "aos/dist/aos.css";
import swal from "sweetalert";

const TruncatedContent = ({ content }) => {
  if (content.length > 100) {
    return <Card.Text>{content.slice(0, 150)}...</Card.Text>;
  } else {
    return <Card.Text>{content}</Card.Text>;
  }
};

const TruncatedTitle = ({ content }) => {
  if (content.length > 50) {
    return <Card.Title>{content.slice(0, 50)}...</Card.Title>;
  } else {
    return <Card.Title>{content}</Card.Title>;
  }
};

function Blog() {
  const [blogData, setBlogData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(6);
  const [totalRecords, setTotalRecords] = useState(0);
  useEffect(() => {
    document.title = "Nobel-Blogs";
  }, []);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${URL}/api/allblogs`);
        if (res && res.data && Array.isArray(res.data.blogs)) {
          const activeBlogs = res.data.blogs.filter(
            (blog) => blog.status === "active"
          );
          if (activeBlogs.length > 0) {
            setBlogData(activeBlogs);
            setTotalRecords(activeBlogs.length);
          } else {
            swal("Error", "No active blogs found.", "error");
          }
        } else {
          swal("Error", "Invalid blog data.", "error");
        }
      } catch (error) {
        swal("Error", "Failed to fetch blog data.", "error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const activeBlog = blogData?.filter((blog) => blog.status === "active");

  const handleChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  if (loading) {
    return (
      <h1 style={{ color: "white", textAlign: "center", marginTop: "400px" }}>
        Loading...
      </h1>
    );
  }

  if (!blogData) {
    return (
      <>
        <h1
          style={{
            color: "white",
            textAlign: "center",
            marginTop: "400px",
            backgroundColor: "#212529",
          }}
        >
          Not find a blog
        </h1>
        <Link to="/" style={{ textAlign: "center" }} className="card-back">
          <div className="to-home">Back to Home</div>
        </Link>
      </>
    );
  }

  const uniqueYears = [
    ...new Set(
      blogData?.map((item) => new Date(item.created_at).getFullYear())
    ),
  ];
  uniqueYears.sort((a, b) => b - a);

  const sortedYears = uniqueYears.map((year, index) => (
    <option key={index}>{year}</option>
  ));

  return (
    <section className="container blog-page">
      <section className="content-body">
        {/* title */}
        <Row>
          <section className="c-header">
            <div data-aos="fade-up">All Blogs</div>
          </section>
        </Row>
        {/* select */}
        <Row className="row-select">
          <section className="select">
            <Form.Select onChange={handleChange}>
              <option value="" selected>
                {" "}
                All Years{" "}
              </option>
              {sortedYears}
            </Form.Select>
          </section>
        </Row>

        {/* card */}
        <section className="card-blog">
          <Row className="m-auto">
            {activeBlog
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .filter((item) =>
                selectedYear
                  ? new Date(item.created_at).getFullYear() == selectedYear
                  : true
              )
              .slice(first, first + rows)
              .map((item, index) => (
                <Col
                  lg={4}
                  md={6}
                  className="d-flex justify-content-center"
                  key={index}
                >
                  <Card className="card-1" style={{ width: "23rem" }}>
                    <Card.Img
                      className="c-img"
                      variant="top"
                      src={`${URL}/api/images/` + item.avatar}
                    ></Card.Img>
                    <Card.Body
                      className="c-body"
                      style={{
                        backgroundColor: "#e9ecef",
                        borderRadius: "5px",
                      }}
                    >
                      <Card.Subtitle
                        style={{ color: "gray", marginTop: "10px" }}
                      >
                        Topic: {new Date(item.created_at).getFullYear()}
                      </Card.Subtitle>
                      <Link className="card-link c-title" to={`${item.id}`}>
                        <TruncatedTitle content={item.title} />
                      </Link>
                      <TruncatedContent content={item.content} />
                      <Link className="card-link c-see-more" to={`${item.id}`}>
                        See more
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </section>
        <Paginator
          first={first}
          rows={rows}
          totalRecords={totalRecords}
          rowsPerPageOptions={[3, 6, 9]} // Lựa chọn số bài viết trên mỗi trang
          onPageChange={onPageChange}
        />
      </section>
    </section>
  );
}

export default Blog;
