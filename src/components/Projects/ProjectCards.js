import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import { SiVercel } from "react-icons/si";
import LazyImage from "../LazyImage";

function ProjectCards({
  imgPath,
  title,
  desc,
  demoLink,
  gitHubLink,
  vercelLink,
}) {
  return (
    <Card className="project-card-view">
      <div style={{ height: "200px", overflow: "hidden", position: "relative" }}>
        <LazyImage 
          src={imgPath} 
          alt="card-img"
          style={{ height: "100%", borderRadius: "0.375rem 0.375rem 0 0" }}
        />
      </div>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>{desc}</Card.Text>
      </Card.Body>

      <Card.Footer>
        {demoLink && (
          <Button variant="primary" href={demoLink} target="_blank">
            <CgWebsite /> &nbsp; Demo
          </Button>
        )}

        {gitHubLink && (
          <Button
            variant="primary"
            href={gitHubLink}
            target="_blank"
            style={{ marginLeft: "10px" }}
          >
            <BsGithub /> &nbsp; GitHub
          </Button>
        )}

        {vercelLink && (
          <Button
            variant="primary"
            href={vercelLink}
            target="_blank"
            style={{ marginLeft: "10px" }}
          >
            <SiVercel /> &nbsp; Vercel
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
}
export default ProjectCards;
