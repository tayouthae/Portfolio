import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollIndicator = ({ containerId = "projects-container" }) => {
  const [showIndicator, setShowIndicator] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const projectsContainer = document.querySelector(`#${containerId}`);
      if (!projectsContainer) return;

      const containerRect = projectsContainer.getBoundingClientRect();
      const containerBottom = containerRect.bottom;
      const windowHeight = window.innerHeight;
      
      const projectCards = projectsContainer.querySelectorAll('.project-card');
      if (projectCards.length === 0) return;

      const totalCards = projectCards.length;
      const cardsPerRow = 3;
      const lastRowStartIndex = Math.floor((totalCards - 1) / cardsPerRow) * cardsPerRow;
      const lastRowCards = Array.from(projectCards).slice(lastRowStartIndex);
      
      let lastRowVisible = false;

      lastRowCards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        if (cardRect.top < windowHeight - 100) {
          lastRowVisible = true;
        }
      });

      if (lastRowVisible || containerBottom <= windowHeight + 50) {
        setShowIndicator(false);
      } else {
        setShowIndicator(true);
      }
    };

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [containerId]);

  return (
    <AnimatePresence>
      {showIndicator && isVisible && (
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="scroll-arrow"
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 13L12 18L17 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 6L12 11L17 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
          <motion.p
            className="scroll-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Scroll to see more projects
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollIndicator;
