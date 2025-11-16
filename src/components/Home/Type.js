import React from "react";
import { Typewriter } from "react-simple-typewriter";

function Type() {
  return (
    <span className="typewriter-wrapper">
      <Typewriter
        words={["Developer", "Full Stack Developer"]}
        loop={true}
        cursor
        cursorStyle="|"
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1000}
      />
    </span>
  );
}

export default Type;
