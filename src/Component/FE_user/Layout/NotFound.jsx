import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div style={{ color: "white", textAlign: "center", marginTop: "150px" }}>
      <img
        src={require(`../../img/404 Error-bro.png`)}
        alt="not page"
        width={400}
      />
      <div>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
