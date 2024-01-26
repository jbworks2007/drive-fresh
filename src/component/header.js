import React from "react";
//import ReactDOM from 'react-dom/client';
import logo1 from "../images/logos/Bharat_Petroleum_Logo.svg.png";
import logo2 from "../images/logos/Indian_Oil_Logo.svg.png";
import logo3 from "../images/logos/Hindustan_Petroleum_Logo.svg.png";
import logo4 from "../images/logos/drive-fresh-ogo.png";
import logo5 from "../images/logos/azadieng.png";
// import logo6 from "../images/logos/Ministry_of_Petroleum_India.svg";
// import logo7 from "../images/logos/Ministry_of_Tourism_India.svg";

export function Header() {
  return (
    <>
      <h1 className="mt-3 container" style={{ fontSize: "0px" }}>
        Drive Fresh - an initiative by Ministry of Petroleum & Natural Gas and
        Ministry of Tourism
      </h1>
      <div className="container sm-12 md-12 lg-12 text-center">
        <div style={{ float: "left" }}>
          <img
            className="logo-size"
            src={logo1}
            alt="bharat petroleum"
            //style={{ float: "left"}}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <img
            className="logo-size"
            src={logo2}
            alt="indian oil"
            //style={{ float: "left"}}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <img
            className="logo-size"
            src={logo3}
            alt="hindustan petroleum"
            //style={{ float: "left"}}
          />
        </div>
        <div className="text-end">
          <img
            className="logo-size"
            src={logo4}
            alt="drive fresh"
            //style={{ height: "50px"}}
          />
          &nbsp;
          <img
            className="logo-size"
            src={logo5}
            alt="azadi75"
            //style={{ height: "50px"}}
          />
        </div>
      </div>
    </>
  );
}
