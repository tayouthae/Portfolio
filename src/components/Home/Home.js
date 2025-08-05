import React from "react";
import Particle from "../Particle";
import HeroSection from "./HeroSection";
import IntroSection from "./IntroSection";
import SocialLinks from "./SocialLinks";

function Home() {
  return (
    <section>
      <Particle />
      <HeroSection />
      <IntroSection />
      <SocialLinks />
    </section>
  );
}

export default Home;
