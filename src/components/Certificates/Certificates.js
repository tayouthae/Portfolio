import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CertificateCard from "./CertificateCard";
import Particle from "../Particle";
import { CertificateConstants } from "./CertificateConstants";
import "./Certificates.css";

function Certificates() {
  return (
    <Container fluid className="certificate-page">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Professional <strong className="purple">Certificates </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are my recent professional achievements and certifications.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {CertificateConstants.map((certificate) => (
            <Col md={6} lg={4} className="project-card" key={certificate.id}>
              <CertificateCard certificate={certificate} />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Certificates;