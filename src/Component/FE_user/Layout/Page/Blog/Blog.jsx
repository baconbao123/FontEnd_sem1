import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Card, Col, Form, NavLink, Row } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import swal from 'sweetalert';

const TruncatedContent = ({content}) => {
    if(content.length > 100) {
        return <Card.Text>{content.slice(0,150)}...</Card.Text>
    }
    else {
        return <Card.Text>{content}</Card.Text>
    }
}

function Blog() {
    const [blogData, setBlogData] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [loading, setLoading] = useState(true);
    const {id} = useParams()

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/allblogs`);
                if (res && res.data && Array.isArray(res.data.blogs)) {
                    const activeBlogs = res.data.blogs.filter(blog => blog.status === 'active');
                    if (activeBlogs.length > 0) {
                        setBlogData(activeBlogs);
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

    const activeBlog = blogData?.filter((blog) => blog.status === 'active')

    const handleChange = (e) => {
        setSelectedYear(e.target.value)
    }

    if (loading) {
        return (
          <h1 style={{ color: 'white', textAlign: 'center', marginTop: '400px' }}>
            Loading...
          </h1>
        );
    }
    
    if (!blogData) {
    return (
      <>
        <h1 style={{ color: 'white', textAlign: 'center', marginTop: '400px' }}>
        Not find a blog
        </h1>
          <Link to="/" style={{textAlign: 'center'}} className='card-back'>
            <div className='to-home'>Back to Home</div>
          </Link>
      </>
    );
    }

    const uniqueYears = [...new Set(blogData?.map(item => new Date(item.created_at).getFullYear()))];
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
                    {' '}
                    All Years{' '}
                  </option>
                  {sortedYears}
                </Form.Select>
              </section>
            </Row>
      
            {/* card */}
            <section className="card-blog">
              <Row>
                {activeBlog
                  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                  .filter((item) =>
                    selectedYear
                      ? new Date(item.created_at).getFullYear() == selectedYear
                      : true
                  )
                  .map((item, index) => (
                    <Col lg={4} md={6} key={index}>
                      <Card className="card-1" style={{ width: '23rem' }}>
                        <Card.Img
                          className="c-img"
                          variant="top"
                          src={'http://127.0.0.1:8000/api/images/' + item.avatar}
                        ></Card.Img>
                        <Card.Body
                          className="c-body"
                          style={{
                            backgroundColor: '#e9ecef',
                            borderRadius: '5px',
                          }}
                        >
                          <Card.Subtitle
                            style={{ color: 'gray', marginTop: '10px' }}
                          >
                            Topic: {new Date(item.created_at).getFullYear()}
                          </Card.Subtitle>
                          <Link className="card-link c-title" to={`${item.id}`}>
                            {item.title}
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
          </section>
        </section>
      );
    
}

export default Blog;