import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CertificateCard from "./CertificateCard";
import SingleCertificateModal from "./SingleCertificateModal";
import Particle from "../Particle";
import { CertificateConstants } from "./CertificateConstants";
import "./Certificates.css";

function Certificates() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCertificateClick = (certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  return (
    <Container fluid className="project-section">
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
            <Col md={4} className="project-card" key={certificate.id}>
              <CertificateCard 
                certificate={certificate} 
                onClick={handleCertificateClick}
              />
            </Col>
          ))}
        </Row>
      </Container>
      
      <SingleCertificateModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        certificate={selectedCertificate}
      />
    </Container>
  );
}

export default Certificates;