import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import teachingImg from "../../Assets/teaching.png";
import Toolstack from "./Toolstack";
import LazyImage from "../LazyImage";

function About() {
  const hasAnimated = sessionStorage.getItem('aboutAnimated');
  
  const containerVariants = {
    hidden: { opacity: hasAnimated ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: hasAnimated ? 0 : 0.8,
        staggerChildren: hasAnimated ? 0 : 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: hasAnimated ? 1 : 0, y: hasAnimated ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: hasAnimated ? 0 : 0.6, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { opacity: hasAnimated ? 1 : 0, scale: hasAnimated ? 1 : 0.8, x: hasAnimated ? 0 : 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: hasAnimated ? 0 : 0.8, ease: "easeOut" }
    }
  };

  React.useEffect(() => {
    if (!hasAnimated) {
      sessionStorage.setItem('aboutAnimated', 'true');
    }
  }, [hasAnimated]);

  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Row style={{ justifyContent: "center", padding: "10px" }}>
            <Col
              md={7}
              style={{
                justifyContent: "center",
                paddingTop: "30px",
                paddingBottom: "50px",
              }}
            >
              <motion.div variants={itemVariants}>
                <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
                  Know Who <strong className="purple">I AM</strong>
                </h1>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Aboutcard />
              </motion.div>
            </Col>
            <Col
              md={5}
              style={{ paddingTop: "120px", paddingBottom: "50px" }}
              className="about-img"
            >
              <motion.div variants={imageVariants}>
                <LazyImage 
                  src={teachingImg} 
                  alt="about" 
                  className="img-fluid"
                  style={{
                    borderRadius: "15px",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.3)"
                  }}
                />
              </motion.div>
            </Col>
          </Row>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="project-heading" style={{ textAlign: "center", marginTop: "60px" }}>
            Professional <strong className="purple">Skillset </strong>
          </h1>
          <Techstack />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className="project-heading" style={{ textAlign: "center", marginTop: "60px" }}>
            <strong className="purple">Tools</strong> I use
          </h1>
          <Toolstack />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          <Github />
        </motion.div>
      </Container>
    </Container>
  );
}

export default About;
