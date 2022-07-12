import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Tayouth Malla </span>
            from <span className="purple"> Kathmandu, Nepal.</span>
            <br />I am a junior pursuing bachelors in B.Sc. CSIT at Deerwalk Institute of Technology.
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Sports and Games
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
            <li className="about-activity">
              <ImPointRight /> Watching Anime and Movies
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to learn more about life and myself!"
          </p>
          <footer className="blockquote-footer">Tayouth</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
