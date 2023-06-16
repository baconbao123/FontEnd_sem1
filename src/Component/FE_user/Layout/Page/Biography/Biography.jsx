import React, {useState, useRef, useEffect} from 'react';
import {Container, Row, Col, Image, Carousel } from 'react-bootstrap'
import {AiOutlineDownload} from 'react-icons/ai';
import {saveAs} from 'file-saver';
import AOS from "aos";
import "aos/dist/aos.css";

import './style.scss'
import mc3 from './pictures/mc3.jpg'
import tn from './pictures/tn.jpg'
import mc2 from './pictures/mc2.jpg'
import bgbio from './pictures/bg-bio.jpg'
import nobel from './pictures/nobel.jpg'


const Biography = ({data}) => {
    const {title, nobelprize, birthplace, name, born, died, prizemotivation, prizeshare, life, work, achievement, timeline, quote, nbprizedes, imgper} = data;

    
    useEffect(() => {
        AOS.init();
      }, []);
     
    
    const pdfRef = useRef();

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    const groupImgPer = (imgper) => {
      const result = [...imgper];
      while (result.length % 3 !== 0) {
        result.push({});
      }
      const groups = [];
      for (let i = 0; i < result.length; i += 3) {
        groups.push(result.slice(i, i + 3));
      }
      return groups;
    }
// effect srcoll

    const groupedImgPer = groupImgPer(imgper);
  
    // Kiểm tra số lượng ảnh
    if (imgper.length < 3) {
      return null; // Ẩn component nếu không đủ ảnh
    }

    const downFlie = () => {
        const pdfURL = 'http://www.istitutolipani.com/wp-content/uploads/2019/09/Marie-Curie.pdf'
        const pdfName = "Marie Curie"
        saveAs(pdfURL, pdfName)
    }


    return (
        <Container fluid ref={pdfRef}  id="pdfRef">
            <section className='block-content-white-1 '>
            <section className='block-content-white-top container'>
                <h1 className='heading-page text-center'>{data.title}</h1>
                    <section>
                        <Row>
                            <Col lg={4}>
                                <div className='img-per-site'>
                                    <img src={mc3} alt='mc3'/>
                                </div>
                            </Col>
                            
                            <Col lg={8}>
                                <div className='content-des-sum'>
                                    <div style={{ marginBottom: 10 }} className='name-des'>{name}</div>
                                    <div style={{ marginBottom: 10 }}>{name}, {birthplace} <br/> {nobelprize}</div>
                                    <div style={{ marginBottom: 10 }}><strong>Born: </strong>{born}</div>
                                    <div style={{ marginBottom: 10 }}><strong>Died: </strong>{died}</div>
                                    <div style={{ marginBottom: 10 }}><strong>Prize motivation: </strong>{prizemotivation}</div>
                                    <div style={{ marginBottom: 10 }}><strong>Prize share: </strong>{prizeshare}</div>
                                    <div style={{ marginBottom: 10 }}><strong>Books</strong></div>
                                </div>
                                <div className='btn-down-site'>
                                    <button className="btn-down" onClick={downFlie}>DOWNLOAD BIO <span className='item-icon-down'>&nbsp;<AiOutlineDownload/></span>
                                    </button>
                                </div>
                            </Col>
                        </Row>        
                    </section>
                </section>
            </section>
            <section className='block-content-bg-1' style={{backgroundImage: `url(${bgbio})`}}>
                <section className='container'>
                    <Row>
                        <Col lg={4}>
                            <h1 className='label-bio' data-aos="flip-left" data-aos-duration="1000">{title}</h1>
                        </Col>
                        <Col lg={8}>
                            <section className='content-bio' data-aos="fade-left" data-aos-duration="1000">
                                <section className='content-bio-life'>
                                    <div className='title-bio'>
                                        <strong>Life</strong>
                                    </div>
                                    <div className="content-bio-des">{life}</div>
                                </section>
                                <section>
                                    <div className='title-bio'>
                                        <strong>Work</strong>
                                    </div>
                                    <div className="content-bio-des">{work}</div>
                                </section>
                            </section>
                        </Col>
                    </Row>
                </section>
            </section>
            <section className='outside-block-black'>
                <section className="block-content-black-1 container">
                    <Row>
                        <Col lg={4}>
                            <section className='achive-topic-site'
                            data-aos="fade-right" data-aos-duration="1000">
                                <div className='achive-label'>
                                    <strong>Achievement</strong>
                                </div>
                                <div className='img-achive-site'>
                                    <img src={tn} alt='tn'/>
                                </div>
                            </section>
                        </Col>
                        <Col lg={8}>
                            <section className='achive-des-site' data-aos="fade-left" data-aos-duration="1000">
                                <div className='achive-des-content'>
                                    <div>{achievement}</div>
                                </div>
                            </section>
                        </Col>
                    </Row>
                </section>
            </section>
            <section className='block-content-white-1'>
                <section className="block-content-white-bottom container">
                    <Row>
                        <Col lg={6}>
                            <section className='tl-site'>
                                <div className='tl-topic'>
                                    {name} TimeLine
                                </div>
                                <ul className='tl-list' data-aos="fade-right"
                                data-aos-duration="1000">
                                    {timeline.map((item, index)=>(
                                        <li key={index}>
                                            <span className='year'>{item.year}</span> <br/>
                                            <span className='event'>{item.event}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </Col>
                        <Col lg={6}>
                            <section className='quote-site'
                            data-aos="fade-left"
                            data-aos-duration="1000">
                                <div className='img-quote'>
                                    <img src={mc2} alt='mc2'/>
                                </div>
                                <div className='block-quote-black'>
                                    <div className='quote-content'>{quote}</div>
                                </div>
                            </section>
                        </Col>
                    </Row>
                </section>
            </section>
            <section className='outside-block-black'>
                <section className="block-content-black-2 container">
                    <Row>
                        <Col lg={5}>
                            <div className='rhombus-bg'>
                                <div className='img-nobel'>
                                    <img src={nobel} alt='nobel'></img>
                                    <div className='nobel'>NOBEL PRIZE</div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={7}>
                            <div className='nbprize-des'
                             data-aos="zoom-in-up"
                             data-aos-duration="1000">
                                {nbprizedes}
                            </div>
                        </Col>
                    </Row>
                </section>
            </section>
            <section className='block-content-white-1'>
                <section className='block-content-white-gallery container'>
                    <div className='gallery'>Gallery</div>
                    <div className='block-per-img'>
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                        {groupedImgPer.map((group, index) => (
                        <Carousel.Item key={index}>
                            <Row>
                            {group.map((img, index2) => (
                                <Col key={index2} md={4}>
                                <Image src={img.src} fluid />
                                </Col>
                            ))}
                            </Row>
                        </Carousel.Item>
                        ))}
                    </Carousel>
                    </div>
                </section>
            </section>
        </Container>

    )
}

export default Biography;
