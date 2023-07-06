import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link, useParams, NavLink } from "react-router-dom";
import axios from "axios";
import PersonCard from "./PersonCard";
import swal from 'sweetalert';



function Laureates () {
    const [persons, setPersons] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        document.title = 'Nobel-Laureates';
      }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/allpersons');
                if (res && res.data && res.data.persons) {
                    const activePersons = res.data.persons.filter((person) => person.status === 'active' || person.nobel_prizes?.status === 'active');
                    if(activePersons.length > 0 ) {
                        setPersons(activePersons)
                    } else {
                        swal("Error", "No active laureates found", "error")
                    }
                } else {
                    swal("Error", "Invalid blog data.", "error");
                }
            } catch (e) {
                // Handle the error here
                swal("Error", "Failed to fetch laureates data.", "error");
            } finally {
                setLoading(false);
            }
        }
    
        fetchData();
    }, []);

  const activePersons = persons.filter((person) => person.status === 'active' || person.nobel_prizes?.status === 'active');

  if (loading) {
    return (
            <h1 style={{ color: 'white', textAlign: 'center', marginTop: '400px' }}>
                Loading...
            </h1>

    );
}

if (activePersons.length === 0) {
    return (
        <>
            <h1 style={{ color: '#F1A40E', textAlign: 'center', marginTop: '400px' }}>
                Not find a laureates
            </h1>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <div style={{ textAlign: 'center', marginTop: "20px", fontSize: "30px" }}>Back to Home</div>
            </Link>
        </>
    );
}

  return (
      <section className="all-nobel-person container" style={{ marginTop: '130px'}}>
        <Row>
         <div> <h1 style={{color: '#F1A40E', fontWeight: 700}}>NOBEL PRIZE LAUREATES</h1></div>  
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