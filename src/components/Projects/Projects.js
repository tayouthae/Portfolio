import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import ScrollIndicator from "../ScrollIndicator";
import { ProjectConstants } from "./ProjectConstants";

function Projects() {
  const hasAnimated = sessionStorage.getItem('projectsAnimated');
  
  const containerVariants = {
    hidden: { opacity: hasAnimated ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: hasAnimated ? 0 : 0.8,
        staggerChildren: hasAnimated ? 0 : 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: hasAnimated ? 1 : 0, y: hasAnimated ? 0 : -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: hasAnimated ? 0 : 0.6, ease: "easeOut" }
    }
  };

  React.useEffect(() => {
    if (!hasAnimated) {
      sessionStorage.setItem('projectsAnimated', 'true');
    }
  }, [hasAnimated]);

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={headerVariants}>
            <h1 className="project-heading">
              My Recent <strong className="purple">Works </strong>
            </h1>
            <p style={{ color: "white" }}>
              Here are a few projects I've worked on recently.
            </p>
          </motion.div>
          
          <Row id="projects-container" style={{ justifyContent: "center", paddingBottom: "10px" }}>
            {ProjectConstants.map((project, index) => (
              <Col md={4} className="project-card" key={index} style={{ marginBottom: "30px" }}>
                <ProjectCard
                  imgPath={project.imgPath}
                  title={project.title}
                  desc={project.desc}
                  demoLink={project.demoLink}
                  gitHubLink={project.gitHubLink}
                  vercelLink={project.vercelLink}
                />
              </Col>
            ))}
          </Row>
        </motion.div>
      </Container>
      <ScrollIndicator containerId="projects-container" />
    </Container>
  );
}

export default Projects;
