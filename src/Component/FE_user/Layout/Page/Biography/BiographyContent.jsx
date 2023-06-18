import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Biography from "./Biography";
import './content_style.scss'
import axios from 'axios'



function BiographyContent () {
    const [personData, setPersonData] = useState(null)
    const {id} =  useParams();
    

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`https://648e8bc475a96b6644440fa9.mockapi.io/api/person/name/${id}`)
            if (res && res.data) {
                setPersonData(res.data);
              }
        }

        fetchData()
    },[id]);

    if(!personData) {
        return <div>Loading...</div>
    }

    return(
        <section className="content">
            {
                personData && <Biography personData={personData}/>
            }
        </section>
    )
}

export default BiographyContent;

