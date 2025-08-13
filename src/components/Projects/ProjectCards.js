import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { motion } from "framer-motion";
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
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <Card className="project-card-view">
        <div style={{ height: "200px", overflow: "hidden", position: "relative" }}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
            style={{ height: "100%", width: "100%" }}
          >
            <LazyImage 
              src={imgPath} 
              alt="card-img"
              style={{ height: "100%", borderRadius: "0.375rem 0.375rem 0 0" }}
            />
          </motion.div>
        </div>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text style={{ textAlign: "justify" }}>{desc}</Card.Text>
        </Card.Body>

        <Card.Footer>
          <div className="project-buttons-container">
            {demoLink && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="primary" href={demoLink} target="_blank" className="project-btn">
                  <CgWebsite /> &nbsp; Demo
                </Button>
              </motion.div>
            )}

            {gitHubLink && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="primary"
                  href={gitHubLink}
                  target="_blank"
                  className="project-btn"
                >
                  <BsGithub /> &nbsp; GitHub
                </Button>
              </motion.div>
            )}

            {vercelLink && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="primary"
                  href={vercelLink}
                  target="_blank"
                  className="project-btn"
                >
                  <SiVercel /> &nbsp; Vercel
                </Button>
              </motion.div>
            )}
          </div>
        </Card.Footer>
      </Card>
    </motion.div>
  );
}
export default ProjectCards;
