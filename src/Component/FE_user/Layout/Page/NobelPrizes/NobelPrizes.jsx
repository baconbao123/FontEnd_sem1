import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Link ,useParams} from "react-router-dom";
import axios from "axios";
import "./NobelPrizes.css";
import { BiRefresh } from "react-icons/bi";
import AOS from "aos";
import "aos/dist/aos.css";
function NobelPrizes() {
  // effect srcoll
  useEffect(() => {
    AOS.init();
  }, []);
  useEffect(() => {
    document.title = 'Nobel-All-Prize';
  }, []);
  // Data
  const [nobelPrize, setNobelPrize]=useState([]);
  const {name,year,id} = useParams();
  useEffect(() => {
    // simulate fetching data from an API
    const fetchData = async () => {
      const res = await axios.get('http://127.0.0.1:8000/api/personprizes/');
      if (res && res.data) {
        setNobelPrize(res.data);
    }
    };
    fetchData();
  }, [name,year,id]);


  console.log(nobelPrize);
  // State for search
  const [selectedPrize, setSelectedPrize] = useState("Nobel Prizes");
  const [selectedYear, setSelectedYear] = useState("Year");
  // reset
  const handleReset = () => {
    setSelectedPrize("Nobel Prizes");
    setSelectedYear("Year");
  };
  // Filtered Nobel Prizes
  const filteredPrizes = nobelPrize.map((prize) => ({
    id: prize.nobelPrize[0].id,
    year: prize.year,
    nobelPrize: prize.nobelPrize.filter(
      (p) =>
        (selectedPrize === "Nobel Prizes" ||
          p.namePrize.toLowerCase() === selectedPrize.toLowerCase()) &&
        p.status === "active"
    ),
    status: prize.status,
  })).filter(
    (prize) =>
      (selectedYear === "Year" || prize.year === selectedYear) &&
      prize.nobelPrize.length > 0
  );

  return (
    <div className="container nobel-prizes">
      <section className="row col-lg-6 col-lg-6 title-nobel-prizes text-light">
        <h1 data-aos="fade-up">All Nobel Prizes</h1>
      </section>

      {/* Form select search */}
      <section className="row mt-1 form-year-nobel-detail gap-3">
        <Form.Select
          className="form-select-nobel col-lg-12"
          value={selectedPrize}
          onChange={(e) => setSelectedPrize(e.target.value)}
        >
          <option className="active">Nobel Prizes</option>
          <option value="Physic Prize">Physics</option>
          <option value="Chemistry Prize">Chemistry</option>
          <option value="Literature Prize">Literature</option>
          <option value="Medicine Prize">Medical</option>
          <option value="Peace Prize">Peace</option>
          <option value="Prize in Economic Sciences">Economic Sciences</option>
        </Form.Select>
        <Form.Select
          className="form-select-nobel col-lg-12"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option className="active">All Year</option>
          {nobelPrize.map((prize, index) => (
            <option value={prize.year} key={index}>
              {prize.year}
            </option>
          ))}
        </Form.Select>

        <button
          type="button"
          className="btn btn-outline-primary btn-reset col-lg-12"
          onClick={() => handleReset()}
        >
          Reset <BiRefresh />
        </button>
      </section>

      {/* Item-nobel-prize */}
      <section className="item-nobel-prizes w-100 mt-4 mb-4" >
        {filteredPrizes.length === 0 ? (
          <div style={{ color: "gray" }} className="row justify-content-center col-lg-12 col-md-12" > 
            <img src={require(`../../../../img/no-data.png`)} alt="" className="w-25" style={{filter: 'grayscale(100%)'}} />
            <p className="text-center">No Nobel Prizes found for the selected category.</p>
          </div>
        ) : (
          filteredPrizes.map(
            (item, index) =>
              item.status === "active" && (
                <React.Fragment key={index}>
                  <div className="year text-light mt-4">
                    <h3>{item.year}</h3>
                  </div>
                  {item.nobelPrize.map(
                    (prize, i) =>
                      prize.status === "active" && (
                        <Link
                          to={`/nobel-prizes/${prize.namePrize}/${item.year}/${prize.id}`}
                          key={`${index}-${i}`}
                          
                        >
                          <div className="item-nobel-prize col-lg-12 bg-light mt-4" data-aos='fade' >
                            <h3 className="title-nobel-prize mb-4">
                              The Nobel Prize in {prize.namePrize.replace('Prize in' &&'Prize' ,'')} {item.year}
                            </h3>
                            <p className="sub-nobel-prize">
                              <span>{prize.namePerson.join(", ")}:</span>{" "}
                              <span className="text-dark">
                                {prize.motivation}
                              </span>{" "}
                            </p>
                          </div>
                        </Link>
                      )
                  )}
                </React.Fragment>
              )
          )
        )}
      </section>
    </div>
  );
}

export default NobelPrizes;
