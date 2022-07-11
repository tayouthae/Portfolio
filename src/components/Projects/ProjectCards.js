import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import { SiVercel } from "react-icons/si";

function ProjectCards({imgPath, title, desc, demoLink, gitHubLink, vercelLink}) {
  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={imgPath} alt="card-img" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {desc}
        </Card.Text>

      </Card.Body>
      
      <Card.Footer>

        {demoLink && (
          <Button
          variant="primary"
          href={demoLink}
          target="_blank"
          >
            <CgWebsite /> &nbsp;
            Demo
          </Button>
        )}

        {gitHubLink &&
        <Button variant="primary" 
        href={gitHubLink} 
        target="_blank"
        style={{ marginLeft: "10px" }}
        >
          <BsGithub /> &nbsp;
          GitHub
        </Button>
        }

        {vercelLink &&
        <Button variant="primary" 
        href={vercelLink} 
        target="_blank"
        style={{ marginLeft: "10px"}}
        >
          <SiVercel /> &nbsp;
          Vercel
        </Button>
        }
        </Card.Footer>
    </Card>
  );
}
export default ProjectCards;
