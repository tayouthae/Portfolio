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
        threshold: 0.1,
        rootMargin: "50px"
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
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: "opacity 0.3s ease-in-out",
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
          {!isLoaded && (
            <img
              src={placeholder}
              alt="Loading..."
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "blur(5px)"
              }}
            />
          )}
        </>
      )}
      {!isInView && (
        <img
          src={placeholder}
          alt="Loading..."
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(5px)"
          }}
        />
      )}
    </div>
  );
};

export default LazyImage;