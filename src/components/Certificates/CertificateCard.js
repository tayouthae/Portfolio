import React from "react";
import Card from "react-bootstrap/Card";
import "./Certificates.css";

function CertificateCard({ certificate }) {
  return (
    <Card className="certificate-card">
      <Card.Img 
        variant="top" 
        src={certificate.image} 
        alt={certificate.title}
        className="certificate-card-image"
      />
      <Card.Body>
        <Card.Title className="certificate-card-title">
          {certificate.title}
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default CertificateCard;