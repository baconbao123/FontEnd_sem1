import React, { useEffect, useState } from "react";
import { Form, Card, Col, Row } from "react-bootstrap";
import axios from "axios";
import './style.scss'
import { useParams, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import BlogDetail from "./BlogDetail";

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
    const [ selectedYear, setSelectedYear] = useState(null)
    const {id} = useParams()
     // effect srcoll
     useEffect(() => {
        AOS.init();
      }, []);
    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`https://648e8bc475a96b6644440fa9.mockapi.io/api/person/blog/`)
            if (res && res.data) {
                setBlogData(res.data)
            }
        }

        fetchData()
    }, [id])

    const handleChange = (e) => {
        setSelectedYear(e.target.value)
    }

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
                            <option  value="" selected> All Years </option>
                            {blogData && blogData.sort((a,b) => b.year - a.year).map((item, index) => (
                                <option key={index}>{item.year}</option>
                            ))}
                        </Form.Select>
                    </section>
                </Row>

                {/* card */}
                <section className="card-blog">
                    <Row>
                        {blogData && blogData.filter(item => selectedYear ? item.year == selectedYear : true).map((item, index) => (
                            <Col lg={4} key={index}>
                                <Card key={index} style={{width: '23rem'}}>
                                    <Card.Img className="c-img" variant="top" src={item.image[0]}></Card.Img>
                                    <Card.Body className="c-body" style={{ backgroundColor: '#fff',  borderRadius: '5px'}}>
                                        <Card.Subtitle style={{ color: 'gray', marginTop: '10px'}}>Topic: {item.year}</Card.Subtitle>
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