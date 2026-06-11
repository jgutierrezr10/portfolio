"use client";
import { useState, useEffect } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const CHARS = "!<>-_\\\\/[]{}—=+*^?#________";

export default function ScrambleText({ text, className = "", style }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let iteration = 0;
    let animationFrameId: number;

    const scramble = () => {
      setDisplayText((currentText) =>
        currentText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            if (text[index] === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration < text.length) {
        iteration += 1 / 3; // Controls speed of unscrambling
        animationFrameId = requestAnimationFrame(scramble);
      }
    };

    animationFrameId = requestAnimationFrame(scramble);

    return () => cancelAnimationFrame(animationFrameId);
  }, [text]);

  return <span className={className} style={style}>{displayText}</span>;
}
