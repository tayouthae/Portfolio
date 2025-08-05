import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Resume from "./components/Resume/ResumeNew";
import Certificates from "./components/Certificates/Certificates";
import CertificateModal from "./components/Certificates/CertificateModal";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, upadateLoad] = useState(true);
  const [showCertModal, setShowCertModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!load) {
      const hasSeenCertModal = localStorage.getItem('hasSeenCertificateModal');
      if (!hasSeenCertModal) {
        const modalTimer = setTimeout(() => {
          setShowCertModal(true);
        }, 1500);
        return () => clearTimeout(modalTimer);
      }
    }
  }, [load]);

  const handleCloseCertModal = () => {
    setShowCertModal(false);
    localStorage.setItem('hasSeenCertificateModal', 'true');
  };

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
        <CertificateModal 
          isOpen={showCertModal} 
          onClose={handleCloseCertModal} 
        />
      </div>
    </Router>
  );
}

export default App;
