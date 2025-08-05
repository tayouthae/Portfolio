import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeImg from "../../Assets/homeImg.png";
import Type from "./Type";
import LazyImage from "../LazyImage";

function HeroSection() {
  return (
    <Container fluid className="home-section" id="home">
      <Container className="home-content">
        <Row>
          <Col md={7} className="home-header">
            <h1 style={{ paddingBottom: 15 }} className="heading">
              Hi There!{" "}
              <span className="wave" role="img" aria-labelledby="wave">
                👋🏻
              </span>
            </h1>

            <h1 className="heading-name">
              I'M
              <strong className="main-name"> TAYOUTH MALLA</strong>
            </h1>

            <div style={{ padding: 50, textAlign: "left" }}>
              <Type />
            </div>
          </Col>

          <Col md={5} style={{ paddingBottom: 20 }}>
            <LazyImage
              src={homeImg}
              alt="home pic"
              className="img-fluid"
              style={{ maxHeight: "450px", width: "100%" }}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default HeroSection;