import React, { useState, useRef, useEffect } from "react";

const LazyImage = ({ 
  src, 
  alt, 
  className, 
  style,
  placeholder = "data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3C/svg%3E"
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.01,
        rootMargin: "100px"
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div ref={imgRef} className={className} style={style}>
      {isInView && (
        <>
          <img
            src={src}
            alt={alt}
            onLoad={handleLoad}
            loading="lazy"
            decoding="async"
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: "opacity 0.2s ease-in-out",
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
          {!isLoaded && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, rgba(119, 53, 136, 0.1) 0%, rgba(199, 112, 240, 0.1) 100%)",
                backdropFilter: "blur(10px)"
              }}
            />
          )}
        </>
      )}
      {!isInView && (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, rgba(119, 53, 136, 0.1) 0%, rgba(199, 112, 240, 0.1) 100%)",
            backdropFilter: "blur(10px)"
          }}
        />
      )}
    </div>
  );
};

export default LazyImage;