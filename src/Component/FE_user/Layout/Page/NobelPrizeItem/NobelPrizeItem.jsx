import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BiRefresh } from "react-icons/bi";
import AOS from "aos";
import "aos/dist/aos.css";
import "./NobelPrizeItem.css";
import Footer from "../../Footer";
//
import { FaMedal } from "react-icons/fa";
import { BsPersonFillUp } from "react-icons/bs";
function NobelPrizeItem() {
  // effect srcoll
  useEffect(() => {
    AOS.init();
  }, []);
  // Data
  const [nobelPrize, setNobelPrize] = useState([]);
  const [totalPrize, setPrize] = useState("");
  const [totalPerson, setPerson] = useState("");
  const [infoData, setInfoData] = useState([]);
  const { namePrize } = useParams();
  useEffect(() => {
    // simulate fetching data from an API
    const fetchData = async () => {
      const res = await axios.get(`http://127.0.0.1:8000/api/nobel/${namePrize}`);
      if (res && res.data.groupedPersonPrizes) {
        setNobelPrize(res.data.groupedPersonPrizes);
        setPrize(res.data.totalPrizes);
        setPerson(res.data.totalPersons);
      }
    };
    fetchData();
  }, [namePrize]);

  useEffect(() => {
    const data = async () => {
      const dataInfo = [
        {
          id: "literature",
          quote:
            "“The said interest shall be divided into five equal parts, which shall be apportioned as follows: /- – -/ one part to the person who shall have produced in the field of literature the most outstanding work in an ideal direction …” (Excerpt from the will of Alfred Nobel)",
          content:
            "Alfred Nobel had broad cultural interests. During his early youth, he developed his literary interests which lasted throughout his life. His library consisted of a rich and broad selection of literature in different languages. During the last years of his life, he tried his hand as an author and began writing fiction. Literature was the fourth prize area Nobel mentioned in his will.",
          place: "Swedish Academy, Stockholm, Sweden.",
        },
        {
          id: "chemistry",
          quote:
            "“The said interest shall be divided into five equal parts, which shall be apportioned as follows: /- – -/ one part to the person who shall have made the most important chemical discovery or improvement…” (Excerpt from the will of Alfred Nobel.)",
          content:
            "Chemistry was the most important science for Alfred Nobel’s own work. The development of his inventions as well as the industrial processes he employed were based upon chemical knowledge. Chemistry was the second prize area that Nobel mentioned in his will.",
          place: "Royal Swedish Academy of Sciences, Stockholm, Sweden",
        },
        {
          id: "medicine",
          quote:
            "“The said interest shall be divided into five equal parts, which shall be apportioned as follows: /- – -/ one part to the person who shall have made the most important discovery within the domain of physiology or medicine …” (Excerpt from the will of Alfred Nobel)",
          content:
            "Alfred Nobel had an active interest in medical research. Through Karolinska Institutet, he came into contact with Swedish physiologist Jöns Johansson around 1890. Johansson worked in Nobel’s laboratory in Sevran, France during a brief period the same year. Physiology or medicine was the third prize area Nobel mentioned in his will.",
          place: " Nobel Assembly at Karolinska Institutet, Stockholm, Sweden",
        },
        {
          id: "peace",
          quote:
            "“The said interest shall be divided into five equal parts, which shall be apportioned as follows: /- – -/ one part to the person who shall have done the most or the best work for fraternity between nations, the abolition or reduction of standing armies and for the holding and promotion of peace congresses.”  (Excerpt from the will of Alfred Nobel)",
          content:
            "Alfred Nobel showed a big interest in social issues and was engaged in the peace movement. His acquaintance with Bertha von Suttner, who was a driving force in the international peace movement in Europe and later awarded the Peace Prize, influenced his views on peace. Peace was the fifth and final prize area that Nobel mentioned in his will.",
          place: "Norwegian Parliament (Stortinget).",
        },
        {
          id: "physic",
          quote:
            "“The said interest shall be divided into five equal parts, which shall be apportioned as follows: /- – -/ one part to the person who shall have made the most important discovery or invention within the field of physics …” (Excerpt from the will of Alfred Nobel)",
          content:
            "Physics was the prize area which Alfred Nobel mentioned first in his will from 1895. At the end of the nineteenth century, many people considered physics as the foremost of the sciences, and perhaps Nobel saw it this way as well. His own research was also closely tied to physics.",
          place: "Royal Swedish Academy of Sciences, Stockholm, Sweden.",
        },
        {
          id: "economic sciences",
          quote:
            "",
          content:
            "In 1968, Sveriges Riksbank (Sweden’s central bank) established the Prize in Economic Sciences in Memory of Alfred Nobel, founder of the Nobel Prize. The prize is based on a donation received by the Nobel Foundation in 1968 from Sveriges Riksbank on the occasion of the bank’s 300th anniversary. The first prize in economic sciences was awarded to Ragnar Frisch and Jan Tinbergen in 1969.",
          place: "Royal Swedish Academy of Sciences, Stockholm, Sweden",
        },
      ];
      const selectedData = dataInfo.find((item) => item.id === namePrize);
      setInfoData(selectedData ? [selectedData] : []);
    };
    data();
  }, [namePrize]);
  console.log(infoData);
  // State for search
  const [selectedPrize, setSelectedPrize] = useState("Nobel Prizes");
  const [selectedYear, setSelectedYear] = useState("Year");
  // reset
  const handleReset = () => {
    setSelectedPrize("Nobel Prizes");
    setSelectedYear("Year");
  };
  // Filtered Nobel Prizes
  const filteredPrizes = nobelPrize
    .map((prize) => ({
      id: prize.nobelPrize[0].id,
      year: prize.year,
      nobelPrize: prize.nobelPrize.filter(
        (p) =>
          (selectedPrize === "Nobel Prizes" ||
            p.namePrize.toLowerCase() === selectedPrize.toLowerCase()) &&
          p.status === "active"
      ),
      status: prize.status,
    }))
    .filter(
      (prize) =>
        (selectedYear === "Year" || prize.year === selectedYear) &&
        prize.nobelPrize.length > 0
    );

  return (
    <div className="container">
      <div className="overlay">
        {/* header content */}
        <header className="header-nobel-prize-item">
          <div className="overlay"></div>
          <div className="header-content">
            <h1 className="header-title">
              {`All ${
                namePrize.charAt(0).toUpperCase() + namePrize.slice(1)
              } Prize -`}
            </h1>
          </div>
        </header>

        {/* info Nobel */}
        <div className=" container info-nobel">
          <section className=" mt-5 ">
            <div className="row text-light ">
              <div className="col-lg-12 col-md-12 ">
                <h4 className=" mb-4" style={{ color: "#F1A40E" }}>
                  About The Prize
                </h4>
                {infoData.map((info, index) => (
                  <div data-aos='fade-right'>
                    <p>
                      <i>{info.quote}</i>
                    </p>
                    <p>{info.content}</p>
                    <p >
                      The Nobel Prize in{" "}
                      <span className="text-info">{`${
                        namePrize.charAt(0).toUpperCase() + namePrize.slice(1)
                      }`}</span>{" "}
                      is awarded by the{" "}
                      <span className="text-primary">
                        {info.place}
                      </span>
                      .
                    </p>
                  </div>
                ))}
              </div>
              <div className=" row ">
                <div className="col-lg-12 col-md-12 info-nobel-about " data-aos='fade-left'>
                  <h4 className="mb-4 ">Quick Facts</h4>
                  <strong>{`${
                    namePrize.charAt(0).toUpperCase() + namePrize.slice(1)
                  } prizes `}</strong>
                  : <span>{`${totalPrize}`}</span>{" "}
                  <strong>
                    <FaMedal />
                  </strong>{" "}
                  <br />
                  <strong>{`${
                    namePrize.charAt(0).toUpperCase() + namePrize.slice(1)
                  } laureates`}</strong>
                  : <span>{`${totalPerson}`} </span>{" "}
                  <strong>
                    <BsPersonFillUp />
                  </strong>
                </div>
              </div>
            </div>
            <hr style={{ color: "gray" }} />
          </section>
        </div>

        {/* Form select search */}
        <section className=" container row mt-1 form-year-nobel-detail gap-3">
          <Form.Select
            className="form-select-nobel col-lg-12"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option className="active" value="Year">
              All Year
            </option>
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
        <section className="container item-nobel-prizes w-100 mt-4 mb-4">
          {filteredPrizes.length === 0 ? (
            <div
              style={{ color: "gray" }}
              className="row justify-content-center col-lg-12 col-md-12"
            >
              <img
                src={require(`../../../../img/no-data.png`)}
                alt=""
                className="w-25"
                style={{ filter: "grayscale(100%)" }}
              />
              <p className="text-center">
                No Nobel Prizes found for the selected category.
              </p>
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
                            <div className="item-nobel-prize col-lg-12 bg-light mt-4">
                              <h3 className="title-nobel-prize mb-4">
                                The Nobel Prize in {prize.namePrize} {item.year}
                              </h3>
                              <p className="sub-nobel-prize">
                                <span>{prize.namePerson.join(", ")}:</span>{" "}
                                <span className="text-dark">
                                  "{prize.motivation} "
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
        <Footer />
      </div>
    </div>
  );
}

export default NobelPrizeItem;
