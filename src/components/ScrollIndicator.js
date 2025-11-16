import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollIndicator = ({ containerId = "projects-container", isMobile = false }) => {
  const [showIndicator, setShowIndicator] = useState(false);
  const [hiddenCount, setHiddenCount] = useState(0);

  useEffect(() => {
    const checkVisibility = () => {
      const projectsContainer = document.querySelector(`#${containerId}`);
      if (!projectsContainer) return;

      const windowHeight = window.innerHeight;
      const projectCards = projectsContainer.querySelectorAll('.project-card');
      
      if (projectCards.length === 0) return;

      let hiddenCards = 0;
      let allVisible = true;

      projectCards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        if (cardRect.top > windowHeight - 50) {
          hiddenCards++;
          allVisible = false;
        }
      });

      setHiddenCount(hiddenCards);
      setShowIndicator(!allVisible && hiddenCards > 0);
    };

    const timer = setTimeout(checkVisibility, 300);
    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility, { passive: true });
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, [containerId]);

  if (isMobile) {
    return null;
  }

  return (
    <AnimatePresence>
      {showIndicator && (
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.div 
            className="scroll-hint"
            animate={{ y: [0, 4, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="scroll-icon"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.3"
              />
              <path
                d="M12 8v8m0 0l-3-3m3 3l3-3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="scroll-count">{hiddenCount} more</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollIndicator;
