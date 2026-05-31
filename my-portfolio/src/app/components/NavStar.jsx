"use client";
import { startTransition, useEffect, useState } from "react";

const NavStar = () => {
  const [stars, setStars] = useState([]);

  const generateStars = () => {
    const numberOfStars = Math.max(
      30,
      Math.floor((window.innerWidth * window.innerHeight) / 19999),
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
    // generate on mount
    startTransition(() => generateStars());

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
    </div>
  );
};

export default NavStar;
