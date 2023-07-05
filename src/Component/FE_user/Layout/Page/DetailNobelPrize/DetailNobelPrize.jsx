import { useEffect, useState } from "react";
import React from "react";
import "./DetailNobelPrize.css";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../../Footer";
function DetailNobelPrize() {
  const [jsonData, setJsonData] = useState([]);
  const [relatedWards, setRelateWards] = useState([]);
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
  useEffect(() => {
    async function relateWard() {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/nobel-prizes/${name}/${year}`
      );
      if (res && res.data) {
        setRelateWards(res.data);
      }
    }
    relateWard();
  }, [name, year]);
  console.log(relatedWards);

  if (jsonData.length === 0) {
    return <div style={{ color: "gray" }}>No data </div>;
  }

  return (
    <>
      <div className="text-light card-nobel-prizes container">
        {/* ----------------- Year----------------- */}
        <section
          className="year"
          style={{ color: "#B28836", fontSize: "36px" }}
        >
          <h3>{jsonData[0]?.year}</h3>
        </section>
        <hr />

        {jsonData[0]?.nobelPrize[0]?.persons.length === 0 ? (
          <section className="text-center row mb-4">
            <p className="col-lg-12 m-auto" style={{ color: "gray" }}>
              data not available
            </p>
          </section>
        ) : (
          <>
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
                    <Card.Body style={{ backgroundColor: "#fff" }}>
                      <Link to={`/biography/${person.id_person}`}>
                        <Card.Title className="card-title-person">
                          {person.name}
                        </Card.Title>
                        <Card.Text className="prizes">
                          <p>
                            The Nobel Prize in{" "}
                            {jsonData[0]?.nobelPrize[0]?.namePrize}{" "}
                            {jsonData[0]?.year}
                          </p>
                        </Card.Text>
                        <Button variant="primary" className="btn-explore">
                          Explore
                        </Button>{" "}
                      </Link>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </section>

            {/* motivation */}
            <section className="text-center row  mb-4">
              <p className=" col-lg-12 m-auto" style={{ maxWidth: "70%" }}>
                The Nobel Prize in{" "}
                {jsonData[0]?.nobelPrize[0]?.namePrize.replace(
                  "Prize" && "Prize in",
                  ""
                )}{" "}
                {jsonData[0]?.year} was awarded jointly to{" "}
                <span className="text-info">
                  {jsonData[0]?.nobelPrize[0]?.persons
                    .map((person) => person.name)
                    .join(", ")}
                </span>{" "}
                {jsonData[0]?.nobelPrize[0]?.motivation}
              </p>
            </section>
          </>
        )}

        <hr style={{ color: "gray" }} />

        {/* related awards */}
        <section className="related-awards row mt-4">
          {relatedWards.length > 0 && (
            <div className="row mb-4">
              <span className="col-lg-3 col-md-2">Related awards</span>
              <span className="col-lg-5 col-md-10 line w-100">{""}</span>
            </div>
          )}
          {relatedWards.map((relatedWard) =>
            relatedWard.nobelPrize.map((prize) =>
              prize.persons.map((person) => (
                <Card key={person.name} className="col-lg-3 col-md-3">
                  <Card.Img
                    src={`http://127.0.0.1:8000/api/images/${person.avatar}`}
                    alt="img"
                    height={225}
                  />
                  <Card.Body style={{ backgroundColor: "#fff" }}>
                    <Link to={`/biography/${person.id_person}`}>
                      <Card.Title className="card-title-person">
                        {person.name}
                      </Card.Title>
                      <Card.Text className="prizes">
                        <p>
                          The Nobel Prize in{" "}
                          {prize.namePrize.replace("Prize", "")}{" "}
                          {relatedWard.year}
                        </p>
                      </Card.Text>
                      <Button variant="primary" className="btn-explore">
                        Explore
                      </Button>{" "}
                    </Link>
                  </Card.Body>
                </Card>
              ))
            )
          )}
        </section>
      </div>
      <Footer />
    </>
  );
}

export default DetailNobelPrize;
