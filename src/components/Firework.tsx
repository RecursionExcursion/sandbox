"use client";

import { CSSProperties, useEffect, useState } from "react";
import { colors } from "../styles/colors";

export default function Firework() {
  const distance = 150;
  const size = 3;

  const [sparks, setSparks] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const { innerWidth, innerHeight } = window;

    const minMultiplier = 0.1;
    const maxMultiplier = 0.9;

    const xRange = {
      min: innerWidth * minMultiplier,
      max: innerWidth * maxMultiplier,
    };

    const yRange = {
      min: innerHeight * minMultiplier,
      max: innerHeight * maxMultiplier,
    };

    const interval = setInterval(() => {
      const randomDOMPosition = {
        x: Math.floor(Math.random() * (xRange.max - xRange.min) + xRange.min),
        y: Math.floor(Math.random() * (yRange.max - yRange.min) + yRange.min),
      };

      const newSparks = generateSparks(distance, size, randomDOMPosition);

      setSparks(newSparks);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return <div>{sparks}</div>;
}

const getRandomColor = () => {
  const colorsArray = Object.values(colors);
  const numOfColors = Object.values(colors).length;
  const randomIndex = Math.floor(Math.random() * numOfColors);
  return colorsArray[randomIndex];
};

function generateCircleCoords(n: number, radius = 1) {
  const coords = [];
  const angleStep = (2 * Math.PI) / n; // Angle step in radians

  for (let i = 0; i < n; i++) {
    const angle = i * angleStep;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    coords.push({ x, y });
  }

  return coords;
}

const generateSparks = (
  distance: number,
  size: number,
  domCoords: { x: number; y: number }
) => {
  return generateCircleCoords(20, distance).map((coords, i) => {
    return (
      <div
        key={i + Math.random()}
        style={
          {
            position: "fixed",
            top: domCoords.y,
            left: domCoords.x,
            background: getRandomColor(),
            height: size,
            width: size,
            "--to-x": `${coords.x}px`,
            "--to-y": `${coords.y}px`,
            animation: "diagonalMove 1.4s ease-out 1",
            borderRadius: "50%",
          } as CSSProperties
        }
      />
    );
  });
};
