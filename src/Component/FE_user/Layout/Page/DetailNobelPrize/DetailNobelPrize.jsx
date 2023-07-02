import { useEffect, useState } from "react";
import React from "react";
import "./DetailNobelPrize.css";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function DetailNobelPrize() {
  const [jsonData, setJsonData] = useState([]); // State để lưu trữ dữ liệu JSON
  const { name, year, id } = useParams();

    useEffect(() => {
    async function prizeDetailsData() {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/nobel-prizes/${name}/${year}/${id}`
      );
      if (res && res.data) {
        setJsonData(res.data);
      }
    }
    prizeDetailsData();
  }, [name, year, id]);

  if (jsonData.length === 0) {
    return <div style={{ color: "gray" }}>No data </div>; // Nếu chưa có dữ liệu, không hiển thị gì cả
  }

  return (
    <div className="text-light card-nobel-prizes container">
      {/*---------- Select for Year---------- */}
      <section className="row mt-1 form-year-nobel-detail">
        <Form.Select className="form-select-nobel col-lg-12">
          <option className="active">All Years</option>
          {jsonData.map((data) => (
            <option key={data.year} value={data.year}>
              {data.year}
            </option>
          ))}
        </Form.Select>
      </section>
      {/* ----------------- Year----------------- */}
      <section className="year" style={{ color: "#B28836", fontSize: "36px" }}>
        <h3>{jsonData[0]?.year}</h3>
      </section>
      <hr />
      {/*---------- card item---------- */}
      <section>
        <div className="row d-flex justify-content-center">
          {jsonData[0]?.nobelPrize[0]?.persons.map((person) => (
            <Card key={person.name} className="col-lg-3">
              <Card.Img
                src={`http://127.0.0.1:8000/api/images/${person.avatar}`}
                alt="img"
                height={275}
              />
              <Card.Body style={{ backgroundColor: "#gainsboro" }}>
                <Link to={`/biography/${person.id_person}`}>
                  <Card.Title className="card-title-person">
                    {person.name}
                  </Card.Title>
                  <Card.Text className="prizes">
                    <p>
                      The Nobel Prize in {jsonData[0]?.nobelPrize[0]?.namePrize}{" "}
                      {jsonData[0]?.year}
                    </p>
                  </Card.Text>
                  <Button variant="primary">Explore</Button>{" "}
                </Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      </section>
      {/* motivation */}
      <section className="text-center row  mb-4">
        <p className=" col-lg-12 m-auto" style={{ maxWidth: "70%" }}>
          The Nobel Prize in {jsonData[0]?.nobelPrize[0]?.namePrize}{" "}
          {jsonData[0]?.year} was awarded jointly to{" "}
          <span className="text-info">
            {jsonData[0]?.nobelPrize[0]?.persons
              .map((person) => person.name)
              .join(", ")}
          </span>{" "}
          "{jsonData[0]?.nobelPrize[0]?.motivation}"
        </p>
      </section>
    </div>
  );
}

export default DetailNobelPrize;
