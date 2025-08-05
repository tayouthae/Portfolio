import React from "react";
import Card from "react-bootstrap/Card";
import "./Certificates.css";

function CertificateCard({ certificate, onClick }) {
  return (
    <Card 
      className="project-card-view" 
      onClick={() => onClick(certificate)}
      style={{ cursor: "pointer" }}
    >
      <Card.Img 
        variant="top" 
        src={certificate.image} 
        alt={certificate.title}
      />
      <Card.Body>
        <Card.Title>{certificate.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          Professional certification demonstrating expertise and achievement in the field.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CertificateCard;