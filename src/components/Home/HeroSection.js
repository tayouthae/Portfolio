import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import homeImg from "../../Assets/homeImg.png";
import Type from "./Type";
import LazyImage from "../LazyImage";

function HeroSection() {
  const hasAnimated = sessionStorage.getItem('heroAnimated');
  
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
      sessionStorage.setItem('heroAnimated', 'true');
    }
  }, [hasAnimated]);

  return (
    <Container fluid className="home-section" id="home">
      <Container className="home-content">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Row>
            <Col md={7} className="home-header">
              <motion.div variants={itemVariants}>
                <h1 style={{ paddingBottom: 15 }} className="heading">
                  Hi There!{" "}
                  <motion.span 
                    className="wave" 
                    role="img" 
                    aria-labelledby="wave"
                    animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity, 
                      repeatDelay: 1 
                    }}
                  >
                    👋🏻
                  </motion.span>
                </h1>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h1 className="heading-name">
                  I'M
                  <strong className="main-name"> TAYOUTH MALLA</strong>
                </h1>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                style={{ padding: "50px 0", textAlign: "left" }}
              >
                <Type />
              </motion.div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <motion.div variants={imageVariants}>
                <LazyImage
                  src={homeImg}
                  alt="home pic"
                  className="img-fluid"
                  style={{ maxHeight: "450px", width: "100%" }}
                />
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </Container>
  );
}

export default HeroSection;