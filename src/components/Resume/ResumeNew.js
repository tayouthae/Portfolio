import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import resume from "../../Assets/../Assets/Tayouth-Resume.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import resumeImg from "../../Assets/Tayouth-Resume.png";

function ResumeNew() {
  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />
        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href={resume}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>

        <Row className="resume">
          <Col md={8}>
            <img src={resumeImg} alt="about" className="img-fluid" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;
