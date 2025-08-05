import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.png";
import Tilt from "react-parallax-tilt";
import LazyImage from "../LazyImage";

function IntroSection() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              The first programming language taught in the B.Sc. CSIT course is
              C programming language. After becoming familiar with the basics of
              the C programming language, I was driven to learn more programming
              languages. I tried to excel in almost all the programming languages
              that were taught to us. My interest in these courses made me
              realize that I might have a knack for programming.
              <br />
              <br />I am fluent in classics like
              <i>
                <b className="purple"> C, C++, Javascript, and Python. </b>
              </i>
              <br />
              <br />
              My area of interest is to become as familiar with and
              knowledgeable about&nbsp;
              <i>
                <b className="purple">Web Technologies and Products </b> as
                possible.
              </i>
              <br />
              <br />
              Whenever possible, I also apply my passion for developing products
              with <b className="purple">Node.js</b> and
              <i>
                <b className="purple">
                  {" "}
                  Modern Javascript Library, and Frameworks
                </b>
              </i>
              &nbsp; like
              <i>
                <b className="purple"> React.js and Next.js.</b>
              </i>
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <LazyImage src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default IntroSection;