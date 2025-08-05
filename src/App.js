import React, { useState, useEffect, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CertificateModal from "./components/Certificates/CertificateModal";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = React.lazy(() => import("./components/Home/Home"));
const About = React.lazy(() => import("./components/About/About"));
const Projects = React.lazy(() => import("./components/Projects/Projects"));
const Resume = React.lazy(() => import("./components/Resume/ResumeNew"));
const Certificates = React.lazy(() => import("./components/Certificates/Certificates"));

function App() {
  const [load, upadateLoad] = useState(true);
  const [showCertModal, setShowCertModal] = useState(false);

  useEffect(() => {
    // Clear all modal-related flags on page load/refresh
    sessionStorage.removeItem('hasSeenModalThisLoad');
    sessionStorage.removeItem('hasNavigatedInSession');
    sessionStorage.setItem('isInitialLoad', 'true');
    
    // Reset animations on page refresh (but not on navigation)
    const isPageRefresh = performance.navigation.type === performance.navigation.TYPE_RELOAD;
    if (isPageRefresh) {
      sessionStorage.removeItem('heroAnimated');
      sessionStorage.removeItem('projectsAnimated');
      sessionStorage.removeItem('aboutAnimated');
    }
    
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

  function AnimatedRoutes() {
    const location = useLocation();
    
    const pageVariants = {
      initial: {
        opacity: 0,
        y: 20,
        scale: 0.98
      },
      in: {
        opacity: 1,
        y: 0,
        scale: 1
      },
      out: {
        opacity: 0,
        y: -20,
        scale: 1.02
      }
    };

    const pageTransition = {
      type: "tween",
      ease: "anticipate",
      duration: 0.5
    };

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/project" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <ErrorBoundary>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Preloader load={load} />
        <div className="App" id={load ? "no-scroll" : "scroll"}>
          <NavigationTracker />
          <Navbar />
          <ScrollToTop />
          <Suspense fallback={<LoadingSpinner />}>
            <AnimatedRoutes />
          </Suspense>
          <Footer />
          <CertificateModal 
            isOpen={showCertModal} 
            onClose={handleCloseCertModal} 
          />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
