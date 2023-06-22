import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {Row,Col} from "react-bootstrap"
import axios from "axios";
import './style.scss'

const BlogDetail = () => {
    const [blogData, setBlogData] = useState(null)
    const {id} = useParams();


    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`https://648e8bc475a96b6644440fa9.mockapi.io/api/person/blog/${id}`)
            if(res && res.data) {
                setBlogData(res.data)
            }
        }
        fetchData()
    }, [id])

    return (
        <section className="bd-page">
            <section className="container">
                {blogData && (
                    <>
                        <section className="bd-title pt-5">
                                <span className="bd-title-content ">{blogData.title}</span>
                        </section>
                        <section className="bd-auth">{blogData.author}</section>
                        <section className="bd-pov-1">
                            <Row>
                                <Col lg={3}>
                                    <div>
                                        <img src={blogData.image[0]} className="bd-img w-100"/>
                                    </div>
                                </Col>
                                <Col lg={9}>
                                    <div className="bd-pov-content-1">{blogData.content}</div>
                                </Col>
                            </Row>
                        </section>
                        <section className="bd-pov-1">
                            <Row>
                                <Col lg={9}>
                                    <div className="bd-pov-content-1">{blogData.content}</div>
                                </Col>
                                <Col lg={3}>
                                    <div>
                                        <img src={blogData.image[1]} className="bd-img w-100 mt-3"/>
                                    </div>
                                </Col>
                            </Row>
                        </section>
                        <section className="bd-pov-1">
                            <Row>
                                <Col lg={4}>
                                    <div>
                                        <img src={blogData.image[2]} className="bd-img w-100 mt-3"/>
                                    </div>
                                </Col>
                                <Col lg={8}>
                                    <div className="bd-pov-content-1">{blogData.content}</div>
                                </Col>
                            </Row>
                        </section>
                    </>
                )}
            </section>
        </section>
    )
}

export default BlogDetail;