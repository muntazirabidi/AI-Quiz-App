import React from 'react';

// Declare the global confetti function added via CDN
declare global {
  interface Window {
    confetti: any;
  }
}

export const triggerSuccessConfetti = () => {
  if (window.confetti) {
    window.confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22c55e', '#4ade80', '#86efac', '#ffffff'] // Green theme
    });
  }
};

export const triggerCompletionConfetti = () => {
  if (window.confetti) {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      window.confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#6366f1', '#ec4899', '#22c55e', '#facc15']
      });
      window.confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#6366f1', '#ec4899', '#22c55e', '#facc15']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
};
