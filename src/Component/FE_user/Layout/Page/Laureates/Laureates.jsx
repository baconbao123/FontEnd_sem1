import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import PersonCard from "./PersonCard";


function Laureates () {
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        async function fetchData() {
        const res = await axios.get('http://127.0.0.1:8000/api/allpersons');
        if (res && res.data && res.data.persons) {
            setPersons(res.data.persons);
        }
    }

    fetchData();
  }, []);

  const activePersons = persons.filter((person) => person.status === 'active' || person.nobel_prizes?.status === 'active');

  return (
    <section className="all-nobel-person container" style={{ marginTop: '130px'}}>
    <div> <h1 style={{color: '#F1A40E', fontWeight: 700}}>NOBEL PRIZE LAUREATES</h1></div>  
    <Row>
        {activePersons.map((person) => (
        <Col lg={3} md={4} key={person.id}>
            <PersonCard person={person} />
        </Col>
        ))}
    </Row>
</section>
  )
}

export default Laureates;