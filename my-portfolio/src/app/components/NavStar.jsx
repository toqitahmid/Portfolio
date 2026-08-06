"use client";
import { startTransition, useEffect, useState } from "react";

const NavStar = () => {
  const [stars, setStars] = useState([]);

  const generateStars = () => {
    const numberOfStars = Math.max(
      12,
      Math.floor((window.innerWidth * window.innerHeight) / 80000),
    );

    const newStars = [];
    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 1.5 + 0.2,
        animationDuration: Math.random() * 4 + 2,
      });
    }
    setStars(newStars);
  };

  useEffect(() => {
    let idleId = null;
    let timeoutId = null;
    let resizeTimer = null;

    const runDeferred = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(() => generateStars(), {
          timeout: 500,
        });
      } else {
        timeoutId = setTimeout(() => generateStars(), 200);
      }
    };

    runDeferred();

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
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: -10 }}
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
    </div>
  );
};

export default NavStar;
