import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { CertificateConstants } from "./CertificateConstants";
import "./Certificates.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function CertificateModal({ isOpen, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsVisible(false);
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCloseButtonClick = () => {
    onClose();
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setStartY(touch.clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1) {
      setCurrentY(e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    const deltaY = currentY - startY;
    if (deltaY > 100) {
      onClose();
    }
    setStartY(0);
    setCurrentY(0);
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

  if (!isVisible) return null;

  return (
    <div className="certificate-modal-overlay" onClick={handleOverlayClick}>
      <div 
        className="certificate-modal"
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
            <span className="trophy">🏆</span>
            Recent Professional Achievements
          </h2>
        </div>

        <div 
          className="certificate-slider-container"
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            loop={CertificateConstants.length > 1}
            spaceBetween={30}
            slidesPerView={1}
            speed={400}
            touchRatio={1.2}
            threshold={20}
            touchStartPreventDefault={false}
            resistanceRatio={0.5}
            longSwipesRatio={0.3}
            allowTouchMove={true}
            className="certificate-swiper"
          >
            {CertificateConstants.map((certificate) => (
              <SwiperSlide key={certificate.id} className="certificate-slide">
                <div className="certificate-image-container">
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    className="certificate-image"
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default CertificateModal;