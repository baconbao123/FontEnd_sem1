import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div style={{ color: "white", textAlign: "center", marginTop: "px" }}>
     <Link to='/'><img src={require(`../../img/logo.png`)} alt="logo" width={100} /></Link>  <br/>
      <img
        src={require(`../../img/404 Error-bro.png`)}
        alt="not page"
        width={425}
        className="mt-5"
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
