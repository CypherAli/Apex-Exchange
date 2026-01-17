"use client";
import { useEffect, useState } from "react";

const phrases = [
  "Look first",
  "Research deep",
  "Trade smart",
  "Invest wisely",
  "Build wealth",
];

export default function TypingEffect() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < currentPhrase.length) {
            setCurrentText(currentPhrase.slice(0, currentText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      isDeleting ? 50 : 150
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentPhraseIndex]);

  return (
    <span className="text-white">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
