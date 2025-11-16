import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import ScrollIndicator from "../ScrollIndicator";
import { ProjectConstants } from "./ProjectConstants";

function Projects() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  const [showParticles, setShowParticles] = React.useState(false);
  const hasAnimated = sessionStorage.getItem('projectsAnimated');
  const skipAnimation = isMobile || hasAnimated;
  
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowParticles(true);
    }, isMobile ? 100 : 0);
    return () => clearTimeout(timer);
  }, [isMobile]);

  const containerVariants = {
    hidden: { opacity: skipAnimation ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: skipAnimation ? 0 : 0.8,
        staggerChildren: skipAnimation ? 0 : 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: skipAnimation ? 1 : 0, y: skipAnimation ? 0 : -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: skipAnimation ? 0 : 0.6, ease: "easeOut" }
    }
  };

  React.useEffect(() => {
    if (!hasAnimated) {
      sessionStorage.setItem('projectsAnimated', 'true');
    }
  }, [hasAnimated]);

  return (
    <Container fluid className="project-section">
      {showParticles && <Particle />}
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
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
                  isMobile={isMobile}
                />
              </Col>
            ))}
          </Row>
        </motion.div>
      </Container>
      <ScrollIndicator containerId="projects-container" isMobile={isMobile} />
    </Container>
  );
}

export default Projects;
