"use client";
import { startTransition, useEffect, useState } from "react";

const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  const generateStars = () => {
    const numberOfStars = Math.max(
      30,
      Math.floor((window.innerWidth * window.innerHeight) / 3999),
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
    const numberOfMeteors = 4;
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
    // generate on mount
    startTransition(() => generateStars());
    startTransition(() => generateMeteors());

    // regenerate on resize so stars fill the available area
    const onResize = () => startTransition(() => generateStars());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
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
