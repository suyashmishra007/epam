import React from "react";
import "./header.css";

function Header() {
  return (
    <div>
      <div className="topbercontainer">
        <span className="topText">The GradeBook</span>
        <span className="topTextRight">Paritosh Parihar</span>
      </div>

      <div className="container1">
        <div className="contleft">
          <p>University: Lovely Professional University</p>
          <p>Department: CSE</p>
          <p>Title: frontEnd Project</p>
        </div>
        <div className="contight">
          <p>Professor: Mr. Mir Junaid</p>
          <p>Group:K19KB</p>
          <p>Semester:8</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
