import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import resume from "../../Assets/Tayouth-Resume.pdf";
import { AiOutlineDownload } from "react-icons/ai";

function ResumeNew() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

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

        <Row className="resume" style={{ justifyContent: "center", marginTop: "20px" }}>
          <Col md={8}>
            {/* React PDF viewer */}
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
              <div style={{ height: '800px' }}>
                <Viewer
                  fileUrl={resume}
                  plugins={[defaultLayoutPluginInstance]}
                />
              </div>
            </Worker>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;
