import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const PersonCard = ({ person }) => {
  const images = person.img.split(",");

  return (
    <section>
      <div className="row d-flex justify-content-center">
        <Card>
          <Card.Img
            src={"http://127.0.0.1:8000/api/images/" + images[0]}
            alt="img"
            height={275}
          />
          <Card.Body style={{ backgroundColor: "#fff" }}>
            <Link to={`/chemistry/biography/${person.id}`}>
              <Card.Title className="card-title-person">{person.name}</Card.Title>
              <Card.Text className="prizes">
                <p>The Nobel Prize in {person.nobel_name} {person.nobel_year}</p>
              </Card.Text>
              <Button variant="primary">Explore</Button>{" "}
            </Link>
          </Card.Body>
        </Card>
      </div>
    </section>
  );
};

export default PersonCard;