import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Card, Col, Form, Row } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TruncatedContent = ({content}) => {
    if(content.length > 100) {
        return <Card.Text>{content.slice(0,200)}...</Card.Text>
    }
    else {
        return <Card.Text>{content}</Card.Text>
    }
}

function Blog() {
    const [blogData, setBlogData] = useState(null)
    const [selectedYear, setSelectedYear] = useState(null)
    const {id} = useParams()

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`http://127.0.0.1:8000/api/allblogs`)
            if (res && res.data && Array.isArray(res.data.blogs)) {
              setBlogData(res.data.blogs)
            }
        }

        fetchData()
    }, [id])

    const activeBlog = blogData?.filter((blog) => blog.status === 'active')

    const handleChange = (e) => {
        setSelectedYear(e.target.value)
    }
    
    let images = [];
    if (blogData && blogData.length > 0 && blogData[0] && blogData[0].img) {
        images = blogData[0].img.split(',');
    }

    const uniqueYears = [...new Set(blogData?.map(item => new Date(item.created_at).getFullYear()))];

    return (
        <section className="container blog-page">
            <section className="content-body">
                {/* title */}
                <Row>
                    <section className="c-header">
                            <div data-aos='fade-up'>All Blogs</div>
                    </section>
                </Row>
                {/* select */}
                <Row className="row-select">
                    <section className="select">
                        <Form.Select onChange={handleChange}>
                            <option value="" selected> All Years </option>
                            {uniqueYears.map((year, index) => (
                                <option key={index}>{year}</option>
                            ))}
                        </Form.Select>
                    </section>
                </Row>

                {/* card */}
                <section className="card-blog">
                    <Row>
                        {activeBlog && activeBlog
                          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                          .filter(item => selectedYear ? new Date(item.created_at).getFullYear() == selectedYear : true)
                          .map((item, index) => (
                            <Col lg={4} key={index}>
                                <Card key={index} style={{width: '23rem'}}>
                                    <Card.Img className="c-img" variant="top" src={"http://127.0.0.1:8000/api/images/"+images[0]}></Card.Img>
                                    <Card.Body className="c-body" style={{ backgroundColor: '#fff',  borderRadius: '5px'}}>
                                        <Card.Subtitle style={{ color: 'gray', marginTop: '10px'}}>Topic: {new Date(item.created_at).getFullYear()}</Card.Subtitle>
                                        <Link className="card-link c-title" to={`${item.id}`}>{item.title}</Link>
                                        <TruncatedContent content={item.content} />
                                        <Link className="card-link c-see-more" to={`${item.id}`}>See more</Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                          ))}
                    </Row>
                </section>
            </section>
        </section>

  )
    
}

export default Blog;