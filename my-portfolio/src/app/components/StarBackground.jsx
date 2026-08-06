"use client";
import { startTransition, useEffect, useState } from "react";

const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  const generateStars = () => {
    const numberOfStars = Math.max(
      20,
      Math.floor((window.innerWidth * window.innerHeight) / 12000),
    );

    const newStars = [];
    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 4 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 1.5 + 0.2,
        animationDuration: Math.random() * 4 + 2,
      });
    }
    setStars(newStars);
  };
  const generateMeteors = () => {
    const numberOfMeteors = 3;
    const newMeteors = [];

    for (let i = 0; i < numberOfMeteors; i++) {
      newMeteors.push({
        id: i,
        size: Math.random() * 7 + 1,
        x: Math.random() * 100,
        y: Math.random() * 20,
        delay: Math.random() * 10,
        animationDuration: Math.random() * 4 + 3,
      });
    }

    setMeteors(newMeteors);
  };
  useEffect(() => {
    let idleId = null;
    let timeoutId = null;
    let resizeTimer = null;

    const runDeferred = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(
          () => {
            generateStars();
            generateMeteors();
          },
          { timeout: 500 },
        );
      } else {
        timeoutId = setTimeout(() => {
          generateStars();
          generateMeteors();
        }, 200);
      }
    };

    // generate on mount but defer so initial paint isn't blocked
    runDeferred();

    // regenerate on resize (debounced)
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => generateStars(), 250);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (idleId && window.cancelIdleCallback)
        window.cancelIdleCallback(idleId);
      if (timeoutId) clearTimeout(timeoutId);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: -20 }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            width: star.size + "px",
            height: star.size + "px",
            left: star.x + "%",
            top: star.y + "%",
            transform: "translate(-50%, -50%)",
            opacity: star.opacity,
            animationDuration: star.animationDuration + "s",
          }}
        />
      ))}
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          style={{
            width: meteor.size + "px",
            height: meteor.size + "px",
            left: meteor.x + "%",
            top: meteor.y + "%",
            animationDelay: meteor.delay + "s",
            animationDuration: meteor.animationDuration + "s",
          }}
        />
      ))}
    </div>
  );
};

export default StarBackground;
