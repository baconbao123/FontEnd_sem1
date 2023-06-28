import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Biography from "./Biography";
import './content_style.scss'
import axios from 'axios'
import swal from 'sweetalert';


function BiographyContent () {
  const [personData, setPersonData] = useState(null)
  const {id} =  useParams();
  
  useEffect(() => {
    (async () => await fetchData())()
  }, [id])

    async function fetchData() {
      const res = await axios.get(`http://127.0.0.1:8000/api/persons/${id}`);
      if (res && res.data && res.data.persons ) {
        
          console.log('hello')
         if(
          res.data.persons ?.personsstatus === 'active' &&
          res.data.persons ?.lifestatus === 'active' &&
          res.data.persons ?.nobelprizesstatus === 'active'
         )
       
        setPersonData(res.data.persons );
      } 

    }
 
  return(
    <section className="content">
      {personData && (
        <Biography personData={personData} />
        )}
      {!personData && <h1 className="mt-5" style={{color: 'white'}}>Loading.......</h1> }
    </section>
  )
}

export default BiographyContent;


