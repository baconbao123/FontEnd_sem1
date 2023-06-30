import React, {useState, useEffect} from 'react';
import { Row, Col, Image, Carousel } from 'react-bootstrap'
import {AiOutlineDownload} from 'react-icons/ai';
import AOS from "aos";
import "aos/dist/aos.css";

import './style.scss'
import tn from './pictures/tn.jpg'
import bgbio from './pictures/bg-bio.jpg'
import nobel from './pictures/nobel.jpg'


const Biography = ({personData}) => {
    const [pdfUrl, setPdfUrl] = useState(null);
    
    useEffect(() => {
        AOS.init();
      }, []);
      
// img
    let images = [];
    if (personData && personData.img) {
      images = personData.img.split(",");
    }
    

//  Download PDF file  
    const getPdfUrl = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/pdfs/${personData.pdf}`)
        const blob = await response.blob()
        const fileUrl = URL.createObjectURL(blob)
        setPdfUrl(fileUrl)
    }

    return (
        <div>
            <section className='block-content-white-1 '>
            <section className='block-content-white-top container'>
                <h1 className='heading-page text-center'>Biography</h1>
                    <section>
                        <Row>
                            <Col lg={4} md={5}>
                                <div className='img-per-site'>
                                    <img src={"http://127.0.0.1:8000/api/images/"+images[0]} alt='mc3'/>
                                </div>
                            </Col>
                            
                            <Col lg={8} md={7}>
                                <div className='content-des-sum'>
                                    <div style={{ marginBottom: 10 }} className='name-des'>{personData.name}</div>
                                    <div style={{ marginBottom: 10 }}>{personData.name}, {personData.national} <br/> The Nobel Prize in {personData.nobel_name} {personData.nobel_year}</div>
                                    <div style={{ marginBottom: 10 }}><strong>Born: </strong>{personData.birthdate}</div>
                                    <div style={{ marginBottom: 10 }}><strong>Died: </strong>{personData.deathdate}</div>
                                    <div style={{ marginBottom: 10 }}><strong>Prize motivation: </strong>{personData.motivation}</div>
                                    <div style={{ marginBottom: 10 }}><strong>Prize share: </strong>{personData.nobel_share}</div>
                                    <div style={{ marginBottom: 10 }}><strong>Books: </strong>{personData.books}</div>
                                </div>
                                <div className='btn-down-site'>
                                     <button className="btn-down" onClick={getPdfUrl}>DOWNLOAD BIO <span className='item-icon-down'>&nbsp;<AiOutlineDownload/></span></button>
                                </div>
                                    {pdfUrl && (
                                        <a href={pdfUrl} download={personData.pdf} className="btn-download-link">Detailed biography (.doc)</a>
                                    )}
                            </Col>
                        </Row>        
                    </section>
                </section>
            </section>
            <section className='block-content-bg-1' style={{backgroundImage: `url(${bgbio})`}}>
                <section className='container'>
                    <Row>
                        <Col lg={4}  className='label-content'>
                            <h1 className='label-bio' data-aos="flip-left" data-aos-duration="1000">Biography</h1>
                        </Col>
                        <Col lg={8} md={12}>
                            <section className='content-bio' data-aos="fade-left" data-aos-duration="1000">
                                <section className='content-bio-life'>
                                    <div className='title-bio'>
                                        <strong>Life</strong>
                                    </div>
                                    <div className="content-bio-des">{personData.life}</div>
                                </section>
                                <section className='content-bio-edu'>
                                    <div className='title-bio'>
                                        <strong>Education</strong>
                                    </div>
                                    <div className="content-bio-des">{personData.education}</div>
                                </section>
                                <section>
                                    <div className='title-bio'>
                                        <strong>Work</strong>
                                    </div>
                                    <div className="content-bio-des">{personData.work}</div>
                                </section>
                                <section className='content-bio-struggle'>
                                    <div className='title-bio'>
                                        <strong>Struggles</strong>
                                    </div>
                                    <div className="content-bio-des">{personData.struggles}</div>
                                </section>
                            </section>
                        </Col>
                    </Row>
                </section>
            </section>
            <section className='outside-block-black'>
                <section className="block-content-black-1 container">
                    <Row>
                        <Col lg={4} className='d-lg-block d-md-none d-xs-none'>
                            <section className='achive-topic-site' data-aos="fade-right" data-aos-duration="1000">
                                <div className='achive-label'>
                                    <strong>Achievement</strong>
                                </div>
                                <div className='img-achive-site'>
                                    <img src={tn} alt='tn'/>
                                </div>
                            </section>
                        </Col>
                        <Col lg={8} md={12}>
                            <section className='achive-site' data-aos="fade-left" data-aos-duration="1000">
                                <div className='achive-des-content'>
                                    <div>{personData.achievements_detail}</div>
                                </div>
                            </section>
                        </Col>
                    </Row>
                </section>
            </section>
            <section className='block-content-white-1'>
                <section className="block-content-white-bottom container">
                    <Row>
                        <Col lg={6} md={7} xs={12}>
                            <section className='tl-site'>
                                <div className='tl-topic'>
                                    {personData.name} TimeLine
                                </div>
                                <ul className='tl-list' data-aos="fade-right"
                                data-aos-duration="1000">
                                    {personData.time_line && personData.time_line.split('\n').map((item, index) => {
                                        const match = item.match(/^(\d{4})(-?\d{0,2})?(.*)$/);
                                        if (match) {
                                        const year = `${match[1]}${match[2] ? `${match[2]}` : ''}`;
                                        return (
                                            <li key={item.id}>
                                            <span className='year'>{year}:</span> <span className='event'>{match[3].trim()}</span>
                                            </li>
                                        );
                                        } else {
                                        return null;
                                        }
                                    })}
                                </ul>
                            </section>
                        </Col>
                        <Col lg={6} md={5} xs={12}>
                            <section className='quote-site' data-aos="fade-left" data-aos-duration="1000">
                                <div className='img-quote'>
                                    <img src={"http://127.0.0.1:8000/api/images/"+images[1]} alt='mc2'/>
                                </div>
                                <div className='block-quote-black'>
                                    <div className='quote-content'>{personData.quote}</div>
                                </div>
                            </section>
                        </Col>
                    </Row>
                </section>
            </section>
            <section className='outside-block-black'>
                <section className="block-content-black-2 container">
                    <Row>
                        <Col lg={4} md={12} >
                            <div className='rhombus-bg'>
                                <div className='img-nobel'>
                                    <img src={nobel} alt='nobel'></img>
                                    <div className='nobel'>NOBEL PRIZE</div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={8} md={12}>
                            <div className='nbprize-des' data-aos="zoom-in-up" data-aos-duration="1000">
                                {personData.nobel_year} &nbsp; {personData.motivation}
                            </div>
                        </Col>
                    </Row>
                </section>
            </section>
            <section className='block-content-white-img block-content-white-1'>
                <section className='block-content-white-gallery container'>
                    <div className='gallery'>Gallery</div>
                    <div className='block-per-img'>
                    <Carousel>
                        <Carousel.Item>
                            <Row>
                                <img style={{objectFit: 'cover'}} src={"http://127.0.0.1:8000/api/images/"+images[1]} alt='mc2'/>
                                <img style={{objectFit: 'cover'}} src={"http://127.0.0.1:8000/api/images/"+images[4]} alt='mc2'/>
                                <img style={{objectFit: 'cover'}} src={"http://127.0.0.1:8000/api/images/"+images[3]} alt='mc2'/>
                            </Row>
                        </Carousel.Item>
                    </Carousel>
                    </div>
                </section>
            </section>
        </div>

    )
}

export default Biography;

