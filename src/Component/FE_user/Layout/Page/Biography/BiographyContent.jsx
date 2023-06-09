import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Biography from "./Biography";
import URL from "../../../../api/api"
import axios from 'axios';
import swal from 'sweetalert';

function BiographyContent() {
  const [personData, setPersonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

    //fetch Api
  useEffect(() => {
    fetchData();
  }, [id]);

  async function fetchData() {
    try {
      const res = await axios.get(`${URL}/api/persons/${id}`);
      if (res.data && res.data.persons) {
        if (
          res.data.persons.personsstatus === 'active' &&
          res.data.persons.lifestatus === 'active' &&
          res.data.persons.nobelprizesstatus === 'active'
        ) {
          setPersonData(res.data.persons);
        } else {
          swal("Error", "Person is not active.", "error");
        }
      } else { ////if res.data.persons null or undefined return swal
        swal("Error", "Person not found.", "error");
      }
    } catch (error) { //network error or serve,.. return swal
      swal("Error", "Person not found.", "error");
    } finally { //the loading variable will be set to false after all tasks in fetchData() have completed, regardless of whether an exception occurred or not.
      setLoading(false);
    }
  }

  return (
    <section className="content">
      {loading ? (
        <h1 style={{ color: 'white', textAlign: 'center', marginTop: '400px' }}>Loading...</h1>
      ) : (
        personData ? (
          <Biography personData={personData} />
        ) : (
          <>
            <h1 style={{ color: 'white', textAlign: 'center', marginTop: '400px' }}>Cannot find a person</h1>
            <Link to="/" className='card-back'>
                <div className="home">Back to Home</div>
            </Link>
          </>
        )
      )}
    </section>
  );
}

export default BiographyContent;