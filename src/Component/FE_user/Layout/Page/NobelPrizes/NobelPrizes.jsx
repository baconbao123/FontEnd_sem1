import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import "./NobelPrizes.css";
import { Paginator } from "primereact/paginator";

import { GoSearch } from "react-icons/go";
import { BiRefresh } from "react-icons/bi";

function NobelPrizes() {
  // Data
  const nobelPrizes = [
    {
      year: "2022",
      nobelPrize: [
        {
          namePrize: "Physics",
          namePerson: ["Alain Aspect", "Anton Zeilinger", "John F. Clauser"],
          motivation:
            "for experiments with entangled photons, establishing the violation of Bell inequalities and pioneering quantum information science",
        },
        {
          namePrize: "Literature",
          namePerson: ["Alain Aspect"],
          motivation:
            "for experiments with entangled photons, establishing the violation of Bell inequalities and pioneering quantum information science",
        },
        {
          namePrize: "Chemistry",
          namePerson: ["Alain Aspect", "Anton Zeilinger", "John F. Clauser"],
          motivation:
            "for experiments with entangled photons, establishing the violation of Bell inequalities and pioneering quantum information science",
        },
        {
          namePrize: "Economic Sciences",
          namePerson: ["Alain Aspect", "Anton Zeilinger", "John F. Clauser"],
          motivation:
            "for experiments with entangled photons, establishing the violation of Bell inequalities and pioneering quantum information science",
        },
        {
          namePrize: "Peace",
          namePerson: ["Alain Aspect", "Anton Zeilinger", "John F. Clauser"],
          motivation:
            "for experiments with entangled photons, establishing the violation of Bell inequalities and pioneering quantum information science",
        },
      ],
    },
    {
      year: "2021",
      nobelPrize: [
        {
          namePrize: "Physics",
          namePerson: ["Alain Aspect", "Anton Zeilinger", "John F. Clauser"],
          motivation:
            "for experiments with entangled photons, establishing the violation of Bell inequalities and pioneering quantum information science",
        },
        {
          namePrize: "Literature",
          namePerson: ["Alain Aspect"],
          motivation:
            "for experiments with entangled photons, establishing the violation of Bell inequalities and pioneering quantum information science",
        },
        {
          namePrize: "Chemistry",
          namePerson: ["Alain Aspect", "Anton Zeilinger", "John F. Clauser"],
          motivation:
            "for experiments with entangled photons, establishing the violation of Bell inequalities and pioneering quantum information science",
        },
        {
          namePrize: "Economic Sciences",
          namePerson: ["Alain Aspect", "Anton Zeilinger", "John F. Clauser"],
          motivation:
            "for experiments with entangled photons, establishing the violation of Bell inequalities and pioneering quantum information science",
        },
        {
          namePrize: "Peace",
          namePerson: ["Alain Aspect", "Anton Zeilinger", "John F. Clauser"],
          motivation:
            "for experiments with entangled photons, establishing the violation of Bell inequalities and pioneering quantum information science",
        },
      ],
    },
    {
      year: "2020",
      nobelPrize: [
        {
          namePrize: "Physics",
          namePerson: ["Alain Aspect", "Anton Zeilinger", "John F. Clauser"],
          motivation:
            "for experiments with entangled photons, establishing the violation of Bell inequalities and pioneering quantum information science",
        },
        {
          namePrize: "Literature",
          namePerson: ["Alain Aspect"],
          motivation:
            "for experiments with entangled photons, establishing the violation of Bell inequalities and pioneering quantum information science",
        },
        {
          namePrize: "Chemistry",
          namePerson: ["Alain Aspect", "Anton Zeilinger", "John F. Clauser"],
          motivation:
            "for experiments with entangled photons, establishing the violation of Bell inequalities and pioneering quantum information science",
        },
        {
          namePrize: "Economic Sciences",
          namePerson: ["Alain Aspect", "Anton Zeilinger", "John F. Clauser"],
          motivation:
            "for experiments with entangled photons, establishing the violation of Bell inequalities and pioneering quantum information science",
        },
        {
          namePrize: "Peace",
          namePerson: ["Alain Aspect", "Anton Zeilinger", "John F. Clauser"],
          motivation:
            "for experiments with entangled photons, establishing the violation of Bell inequalities and pioneering quantum information science",
        },
      ],
    },
    // Add more data for other years
  ];
  // State for pagination
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(2);

  // Calculate the number of pages based on the number of rows
  const totalRecords = nobelPrizes.length;
  const totalPages = Math.ceil(totalRecords / rows);

  // Handle page change
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  // State for search
  const [selectedPrize, setSelectedPrize] = useState("Nobel Prizes");
  const [selectedYear, setSelectedYear] = useState("Year");
  // reset
  const handleReset = () => {
    setSelectedPrize("Nobel Prizes");
    setSelectedYear("Year");
  };
  return (
    <div className="container nobel-prizes">
      <section className="row col-lg-6 col-lg-6 title-nobel-prizes text-light">
        <h1>All Nobel Prizes</h1>
      </section>
      {/* Form select search */}
      <section className="row mt-5 form-nobel-prizes ">
        <div className="d-flex">
          <div className="col-lg-6"> </div>
          <div className="col-lg-6 col-md-7 gap-2 d-flex">
            <Form.Select
              className="w-25"
              value={selectedPrize}
              onChange={(e) => setSelectedPrize(e.target.value)}
            >
              <option className="active">Nobel Prizes</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Literature">Literature</option>
              <option value="Medical">Medical</option>
              <option value="Peace">Peace</option>
              <option value="Economic Sciences">Economic Sciences</option>
            </Form.Select>
            <Form.Select
              className="w-25"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option className="active">Year</option>
              {nobelPrizes.map((year, index) => (
                <option value={year.year} key={index}>
                  {year.year}
                </option>
              ))}
            </Form.Select>
            {selectedPrize !== "Nobel Prizes" || selectedYear !== "Year" ? (
              <button
                type="button"
                className="btn btn-outline-primary w-25"
                onClick={() => handleReset()}
              >
                Reset <BiRefresh />
              </button>
            ) : null}
          </div>
        </div>
      </section>
      {/* Item-nobel-prize */}
      <section className="item-nobel-prizes w-100 mt-4 mb-4">
        {nobelPrizes
          .filter((prize) =>
            selectedYear === "Year" ? true : prize.year === selectedYear
          )
          .map((item, index) => (
            <React.Fragment key={index}>
              <div className="year text-light mt-4">
                <h3>{item.year}</h3>
              </div>
              {item.nobelPrize
                .filter((prize) =>
                  selectedPrize === "Nobel Prizes"
                    ? true
                    : prize.namePrize === selectedPrize
                )
                .map((prize, i) => (
                  <Link
                    to={`/nobel-prizes/${prize.namePrize}/${item.year}`}
                    key={`${index}-${i}`}
                  >
                    <div className="item-nobel-prize col-lg-12 bg-light mt-4">
                      <h3 className="title-nobel-prize mb-4">
                        The Nobel Prize in {prize.namePrize} {item.year}
                      </h3>
                      <p className="sub-nobel-prize">
                        <span>{prize.namePerson.join(", ")}:</span>{" "}
                        <span className="text-dark">"{prize.motivation}"</span>{" "}
                      </p>
                    </div>
                  </Link>
                ))}
            </React.Fragment>
          ))}
      </section>
      {/* Pagination */}
      <section className="mt-4">
        <Paginator
          first={first}
          rows={rows}
          totalRecords={totalRecords}
          onPageChange={onPageChange}
          className="paginator"
        />
      </section>
    </div>
  );
}

export default NobelPrizes;
