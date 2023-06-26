import React from "react";
import "./DetailNobelPrize.css";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {Link} from 'react-router-dom';
function DetailNobelPrize() {
  return (
    <div className="text-light card-nobel-prizes container">
      {/*---------- Select for Year---------- */}
      <section className="row mt-1 form-year-nobel-detail">
        <Form.Select className="form-select-nobel col-lg-12">
          <option className="active">All Years</option>
          <option value="2022">2022</option>
        </Form.Select>
      </section>
      {/* ----------------- Year----------------- */}
      <section className="year" style={{ color: "#B28836", fontSize: "36px" }}>
        <h3>2022</h3>
      </section>
      <hr />
      {/*---------- card item---------- */}
      <section>
        <div className="row d-flex justify-content-center">
          <Card className="col-lg-3">
            <Card.Img
              src={require(`../../../../img/physicer1.jpg`)}
              alt="img"
              height={275}
            />
            <Card.Body style={{ backgroundColor: "#fff" }}>
              <Link><Card.Title className="card-title-person">Alain Aspect</Card.Title>
              <Card.Text className="prizes"><p>​The Nobel Prize in Physics 2022</p></Card.Text>
              <Button variant="primary">Explore</Button> </Link>
            </Card.Body>
          </Card>
        </div>
      </section>
      {/* motivation */}
      <section className="text-center row  mb-4">
        <p className=" col-lg-12 m-auto" style={{ maxWidth: "70%" }}>
          ​The Nobel Prize in Physics 2022 was awarded jointly to <span className="text-info"> Alain Aspect,
          John F. Clauser , Anton Zeilinger</span> "for experiments with entangled
          photons, establishing the violation of Bell inequalities and
          pioneering quantum information science"
        </p>
      </section>
    </div>
  );
}
// hello
export default DetailNobelPrize;
