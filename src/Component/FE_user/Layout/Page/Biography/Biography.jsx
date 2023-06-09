import React, { useState, useEffect } from "react";
import { Row, Col, Image, Carousel } from "react-bootstrap";
import { AiOutlineDownload } from "react-icons/ai";
import URL from "../../../../api/api";
import AOS from "aos";
import "aos/dist/aos.css";

import "./style.scss";
import tn from "./pictures/tn.jpg";
import bgbio from "./pictures/bg-bio.jpg";
import nobel from "./pictures/nobel.jpg";
import axios from "axios";
import { IoMdShareAlt } from "react-icons/io";
import { FaFacebookSquare } from "react-icons/fa";
import { EmailShareButton, FacebookShareButton } from "react-share";
import {SiGmail} from 'react-icons/si'
const Biography = ({ personData }) => {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    document.title = `Nobel- ${personData.name}`;
  }, [personData]);
  // cut string in img
  // img
  let images = [];
  if (personData && personData.img) {
    images = personData.img.split(",");
  }

  //  Download PDF file
  // fetch request is sent to the server to get the PDF file from the specified URL
  const getPdfUrl = async () => {
    try {
      const response = await axios.get(`${URL}/api/pdfs/${personData.pdf}`, {
        responseType: "blob",
      });

      const fileData = new Blob([response.data], { type: "application/pdf" });
      const fileUrl = window.URL.createObjectURL(fileData);

      const downloadLink = document.createElement("a");
      downloadLink.href = fileUrl;
      downloadLink.setAttribute("download", personData.pdf);
      downloadLink.click();

      URL.revokeObjectURL(fileUrl);
    } catch (error) {
      <></>;
    }
  };

  const avatar = personData.avatar;

  const sortedNobels = personData.nobel.sort(
    (a, b) => b.nobel_year - a.nobel_year
  );

  const latestNobelYear = sortedNobels[0].nobel_year;

  // Search for information about the Nobel Prize with the year corresponding to the latest award
  const latestNobel = sortedNobels.find(
    (nobel) => nobel.nobel_year === latestNobelYear
  );
  const [iconShare, setIconShare] = useState(false);
  function handleClickIcon() {
    setIconShare(!iconShare);
  }
  return (
    <div>
      "
      <section className="block-content-white-1 ">
        <section className="block-content-white-top container">
          <h1 className="heading-page text-center">Biography</h1>
          <section>
            <Row className="m-auto">
              <Col lg={4} md={5} className="col-avatar">
                <div className="img-per-site">
                  <img src={`${URL}/api/images/` + avatar} alt="mc3" />
                </div>
              </Col>

              <Col lg={8} md={7}>
                <div className="content-des-sum">
                  <div style={{ marginBottom: 10 }} className="name-des">
                    {personData.name}
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    {personData.name}, {personData.national} <br /> The Nobel
                    Prize in {latestNobel.nobel_name} {latestNobel.nobel_year}
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <strong>Born: </strong>
                    {personData.birthdate}
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <strong>Died: </strong>
                    {personData.deathdate}
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <strong>Prize motivation: </strong>
                    {latestNobel.pivot.motivation}
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <strong>Prize share: </strong>
                    {latestNobel.pivot.nobel_share}
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <strong>Books: </strong>
                    {personData.books}
                  </div>
                </div>

                <div className="btn-down-site">
                  <button className="btn-down" onClick={getPdfUrl}>
                    DOWNLOAD BIO{" "}
                    <span className="item-icon-down">
                      &nbsp;
                      <AiOutlineDownload />
                    </span>
                  </button>
                </div>
             
              </Col>
            </Row>
            <Row>
              <Col lg={5} md={5}>
                <div className="d-flex gap-2 mt-2">
                  <button
                    className=" btn btn-outline-primary btn-share"
                    onClick={handleClickIcon}
                    style={{ height: "40px" }}
                  >
                    <span className="m-auto">
                      {" "}
                      Share <IoMdShareAlt />
                    </span>
                  </button>
                  {iconShare && (
                    <>
                      <FacebookShareButton
                        url={`http://nobelprize.atwebpages.com/biography/${personData.id}`}
                        hashtag="#TheNobelPrizes"
                        quote={`${personData.name}`}
                       
                        className="icon-f"
                      >
                        <span className="icon-share-face" data-aos="fade-left">
                          <FaFacebookSquare />{" "}
                        </span>
                      </FacebookShareButton>
                      <EmailShareButton
                      className="icon-f"
                        url={`http://nobelprize.atwebpages.com/biography/${personData.id}`}
                        
                        subject={personData.name} 
                      >
                        <span className="icon-share-mail" data-aos="fade-left">
                          <SiGmail />{" "}
                        </span>
                      </EmailShareButton>
                    </>
                  )}
                </div>
              </Col>
            </Row>
          </section>
        </section>
      </section>
      <section
        className="block-content-bg-1"
        style={{ backgroundImage: `url(${bgbio})` }}
      >
        <section className="container">
          <Row>
            <Col lg={4} md={12} className="label-content">
              <h1
                className="label-bio"
                data-aos="flip-right"
                data-aos-duration="1000"
              >
                Biography
              </h1>
            </Col>
            <Col lg={8} md={12}>
              <section
                className="content-bio"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <section className="content-bio-life">
                  <div className="title-bio">
                    <strong>Life</strong>
                  </div>
                  <div className="content-bio-des">{personData.life}</div>
                </section>
                <section className="content-bio-edu">
                  <div className="title-bio">
                    <strong>Education</strong>
                  </div>
                  <div className="content-bio-des">{personData.education}</div>
                </section>
                <section>
                  <div className="title-bio">
                    <strong>Work</strong>
                  </div>
                  <div className="content-bio-des">{personData.work}</div>
                </section>
                <section className="content-bio-struggle">
                  <div className="title-bio">
                    <strong>Struggles</strong>
                  </div>
                  <div className="content-bio-des">{personData.struggles}</div>
                </section>
              </section>
            </Col>
          </Row>
        </section>
      </section>
      <section className="outside-block-black">
        <section className="block-content-black-1 container">
          <Row>
            <Col
              lg={4}
              md={5}
              xs={5}
              className="d-lg-block d-md-block d-none col-achive"
            >
              <section
                className="achive-topic-site"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <strong className="achive-label">Achievement</strong>
                <div className="achive-label"></div>
                <div className="img-achive-site">
                  <img src={tn} alt="tn" />
                </div>
              </section>
            </Col>
            <Col xs={12} className="d-block d-md-none d-lg-none">
              <section
                className="achive-topic-site"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <strong className="achive-label">Achievement</strong>
              </section>
            </Col>
            <Col lg={8} md={7} xs={12} className="col-ahive-detail">
              <section
                className="achive-site"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <div className="achive-des-content">
                  {personData.achievements_detail &&
                    personData.achievements_detail
                      .split("\n")
                      .map((achievement, index) => (
                        <p key={index}>{achievement}</p>
                      ))}
                </div>
              </section>
            </Col>
          </Row>
        </section>
      </section>
      <section className="block-content-white-1">
        <section className="block-content-white-bottom container">
          <Row>
            <Col lg={6} md={6} xs={12}>
              <section className="tl-site">
                <div className="tl-topic">{personData.name} TimeLine</div>
                <ul
                  className="tl-list"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  {personData.time_line &&
                    personData.time_line.split("\n").map((item, index) => {
                      const match = item.match(/^(\d{4})(-?\d{0,4})?(.*)$/);
                      // ^(\d{4}): Start the line with a string of 4 digits (representing the year)
                      // (-?\d{0,4})?: Dash character - may or may not appear, followed by a string that can be 0 to 4 digits (representing month or day).
                      // (.*)$: Any string after the stated section, up to the end of the line (representing the event).
                      if (match) {
                        const year = `${match[1]}${
                          match[2] ? `${match[2]}` : ""
                        }`;
                        return (
                          <li key={item.id}>
                            <span className="year">{year}:</span>{" "}
                            <span className="event">{match[3].trim()}</span>
                          </li>
                        );
                      } else {
                        return null;
                      }
                    })}
                </ul>
              </section>
            </Col>
            <Col lg={6} md={6} xs={12}>
              <section
                className="quote-site"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <div className="img-quote">
                  <img src={`${URL}/api/images/` + images[1]} alt="mc2" />
                </div>
                <div className="block-quote-black">
                  <div className="quote-content">{personData.quote}</div>
                </div>
              </section>
            </Col>
          </Row>
        </section>
      </section>
      <section className="outside-block-black">
        <section className="block-content-black-2 container">
          <Row>
            <Col lg={4} md={5} xs={12} className="col-nbprize">
              <div className="rhombus-bg">
                <div className="img-nobel">
                  <img src={nobel} alt="nobel"></img>
                  <div className="nobel">NOBEL PRIZE</div>
                </div>
              </div>
            </Col>
            <Col lg={8} md={7} xs={12} className="col-nbprize-des">
              <div
                className="nbprize-des"
                data-aos="zoom-in-up"
                data-aos-duration="1000"
              >
                {personData.nobelYears.map((year, index) => (
                  <div key={index}>
                    <span style={{ fontWeight: "1000", color: "#d59d3f" }}>
                      {year}
                    </span>{" "}
                    &nbsp; {personData.motivations[index]}
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </section>
      </section>
      <section className="block-content-white-img block-content-white-1">
        <section className="block-content-white-gallery container">
          <div className="gallery">Gallery</div>
          <div className="block-per-img">
            <Carousel>
              <Carousel.Item>
                <Row className="carousel-xs">
                  <img
                    style={{ objectFit: "cover" }}
                    src={`${URL}/api/images/` + images[0]}
                    alt="mc2"
                  />
                  <img
                    style={{ objectFit: "cover" }}
                    src={`${URL}/api/images/` + images[1]}
                    alt="mc2"
                  />
                  <img
                    style={{ objectFit: "cover" }}
                    src={`${URL}/api/images/` + images[2]}
                    alt="mc2"
                  />
                </Row>
              </Carousel.Item>
            </Carousel>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Biography;
