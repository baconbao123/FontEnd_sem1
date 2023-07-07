import React from "react";
import URL from "../../../../api/api"
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const PersonCard = ({ person }) => {
  const avatar = person.avatar;

  return (
    <section>
      <div className="row d-flex justify-content-center">
        <Card>
          <Card.Img
            src={`${URL}/api/images/` + avatar}
            alt="img"
            height={275}
          />
          <Card.Body style={{ backgroundColor: "#fff" }}>
            <Link to={`/biography/${person.id}`}>
              <Card.Title className="card-title-person">{person.name}</Card.Title>
              <Card.Text className="prizes">
                <p>The Nobel Prize in {person.nobel_name} {person.nobel_year}</p>
              </Card.Text>
              <Button variant="primary" className="btn-explore">Explore</Button>{" "}
            </Link>
          </Card.Body>
        </Card>
      </div>
    </section>
  );
};

export default PersonCard;