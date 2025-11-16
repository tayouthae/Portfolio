import React, { useMemo } from "react";
import Particles from "react-tsparticles";

function Particle() {
  const isMobile = window.innerWidth <= 768;
  const isLowEnd = isMobile && (navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4);

  const particleConfig = useMemo(() => ({
    particles: {
      number: {
        value: isLowEnd ? 40 : (isMobile ? 80 : 160),
        density: {
          enable: true,
          value_area: isMobile ? 800 : 1500,
        },
      },
      line_linked: {
        enable: false,
        opacity: 0.03,
      },
      move: {
        direction: "right",
        speed: isMobile ? 0.03 : 0.05,
        random: true,
        straight: false,
        out_mode: "out",
      },
      size: {
        value: 1,
        random: true,
      },
      opacity: {
        value: isMobile ? 0.4 : 0.5,
        anim: {
          enable: true,
          speed: isMobile ? 0.5 : 1,
          opacity_min: 0.05,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onclick: {
          enable: !isMobile,
          mode: "push",
        },
        onhover: {
          enable: false,
        },
        resize: true,
      },
      modes: {
        push: {
          particles_nb: 1,
        },
      },
    },
    retina_detect: true,
    fpsLimit: isMobile ? 30 : 60,
    detectRetina: true,
  }), [isMobile, isLowEnd]);

  return (
    <Particles
      id="tsparticles"
      params={particleConfig}
    />
  );
}

export default React.memo(Particle);
