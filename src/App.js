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
  useLocation,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, upadateLoad] = useState(true);
  const [showCertModal, setShowCertModal] = useState(false);

  useEffect(() => {
    // Clear all modal-related flags on page load/refresh
    sessionStorage.removeItem('hasSeenModalThisLoad');
    sessionStorage.removeItem('hasNavigatedInSession');
    sessionStorage.setItem('isInitialLoad', 'true');
    
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!load) {
      const hasNavigatedInSession = sessionStorage.getItem('hasNavigatedInSession');
      const hasSeenModalThisLoad = sessionStorage.getItem('hasSeenModalThisLoad');
      
      if (!hasNavigatedInSession && !hasSeenModalThisLoad) {
        const modalTimer = setTimeout(() => {
          setShowCertModal(true);
          sessionStorage.setItem('hasSeenModalThisLoad', 'true');
        }, 1500);
        return () => clearTimeout(modalTimer);
      }
    }
  }, [load]);

  const handleCloseCertModal = () => {
    setShowCertModal(false);
  };

  function NavigationTracker() {
    const location = useLocation();
    
    useEffect(() => {
      const currentPath = sessionStorage.getItem('currentPath');
      const isInitialLoad = sessionStorage.getItem('isInitialLoad');
      
      if (currentPath && currentPath !== location.pathname && !isInitialLoad) {
        // This is actual navigation, not a page load
        sessionStorage.setItem('hasNavigatedInSession', 'true');
      }
      
      sessionStorage.setItem('currentPath', location.pathname);
      sessionStorage.removeItem('isInitialLoad'); // Remove after first useEffect
    }, [location]);

    return null;
  }

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <NavigationTracker />
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
