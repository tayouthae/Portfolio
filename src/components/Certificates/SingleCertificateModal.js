import React, { useEffect, useState, useCallback } from "react";
import "./Certificates.css";

function SingleCertificateModal({ isOpen, onClose, certificate }) {
  const [isVisible, setIsVisible] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  
  // Zoom state management
  const [zoomState, setZoomState] = useState({
    scale: 1,
    translateX: 0,
    translateY: 0,
    lastTap: 0
  });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [lastDistance, setLastDistance] = useState(0);

  // Zoom utility functions
  const getDistance = (touch1, touch2) => {
    return Math.sqrt(
      Math.pow(touch2.pageX - touch1.pageX, 2) + 
      Math.pow(touch2.pageY - touch1.pageY, 2)
    );
  };

  const resetZoom = useCallback(() => {
    setZoomState({
      scale: 1,
      translateX: 0,
      translateY: 0,
      lastTap: 0
    });
  }, []);

  // Mouse wheel zoom for desktop
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.min(Math.max(zoomState.scale * delta, 1), 4);
    
    if (newScale !== zoomState.scale) {
      setZoomState(prev => ({
        ...prev,
        scale: newScale
      }));
    }
  }, [zoomState.scale]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      resetZoom(); // Reset zoom when modal opens
      document.body.style.overflow = "hidden";
    } else {
      setIsVisible(false);
      document.body.style.overflow = "unset";
      resetZoom(); // Reset zoom when modal closes
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, resetZoom]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCloseButtonClick = () => {
    onClose();
  };

  const handleTouchStart = (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - zoomState.lastTap;
    
    if (e.touches.length === 1) {
      // Single touch - could be tap, double tap, or pan start
      const touch = e.touches[0];
      setStartY(touch.clientY);
      setPanStart({ x: touch.pageX, y: touch.pageY });
      
      // Double tap detection
      if (tapLength < 500 && tapLength > 0) {
        e.preventDefault();
        if (zoomState.scale > 1) {
          resetZoom();
        } else {
          // Zoom to 2x at tap location
          const rect = e.currentTarget.getBoundingClientRect();
          const centerX = touch.pageX - rect.left - rect.width / 2;
          const centerY = touch.pageY - rect.top - rect.height / 2;
          
          setZoomState(prev => ({
            ...prev,
            scale: 2,
            translateX: -centerX / 2,
            translateY: -centerY / 2
          }));
        }
      } else {
        setZoomState(prev => ({ ...prev, lastTap: currentTime }));
      }
      
      if (zoomState.scale > 1) {
        setIsPanning(true);
      }
    } else if (e.touches.length === 2) {
      // Pinch start
      e.preventDefault();
      const distance = getDistance(e.touches[0], e.touches[1]);
      setLastDistance(distance);
      setIsPanning(false);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isPanning && zoomState.scale > 1) {
      // Pan gesture - prevent default to avoid scrolling
      e.preventDefault();
      const touch = e.touches[0];
      const deltaX = touch.pageX - panStart.x;
      const deltaY = touch.pageY - panStart.y;
      
      setZoomState(prev => ({
        ...prev,
        translateX: prev.translateX + deltaX / prev.scale,
        translateY: prev.translateY + deltaY / prev.scale
      }));
      
      setPanStart({ x: touch.pageX, y: touch.pageY });
    } else if (e.touches.length === 2) {
      // Pinch zoom gesture - prevent default to avoid browser zoom
      e.preventDefault();
      const distance = getDistance(e.touches[0], e.touches[1]);
      
      if (lastDistance > 0) {
        const scaleFactor = distance / lastDistance;
        const newScale = Math.min(Math.max(zoomState.scale * scaleFactor, 1), 4);
        
        setZoomState(prev => ({
          ...prev,
          scale: newScale
        }));
      }
      
      setLastDistance(distance);
    } else if (e.touches.length === 1 && !isPanning) {
      // Check for swipe to close (only when not zoomed) - allow default for regular scrolling
      if (zoomState.scale === 1) {
        setCurrentY(e.touches[0].clientY);
      }
    }
  };

  const handleTouchEnd = (e) => {
    if (e.touches.length === 0) {
      setIsPanning(false);
      setLastDistance(0);
      
      // Handle swipe to close (only when not zoomed)
      if (zoomState.scale === 1) {
        const deltaY = currentY - startY;
        if (deltaY > 100) {
          onClose();
        }
      }
      
      setStartY(0);
      setCurrentY(0);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isVisible || !certificate) return null;

  return (
    <div className="certificate-modal-overlay" onClick={handleOverlayClick}>
      <div 
        className="certificate-modal single-certificate-modal"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="certificate-modal-close" 
          onClick={handleCloseButtonClick}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="mobile-swipe-indicator"></div>

        <div className="certificate-modal-header">
          <h2 className="certificate-modal-title">
            {certificate.title}
          </h2>
        </div>

        <div 
          className="single-certificate-container"
          onWheel={handleWheel}
        >
          <div className="certificate-image-container">
            <img
              src={certificate.image}
              alt={certificate.title}
              className="certificate-image"
              loading="lazy"
              style={{
                transform: `scale(${zoomState.scale}) translate(${zoomState.translateX}px, ${zoomState.translateY}px)`,
                transformOrigin: 'center center',
                transition: zoomState.scale === 1 ? 'transform 0.3s ease-out' : 'none',
                cursor: zoomState.scale > 1 ? 'grab' : 'default'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleCertificateModal;