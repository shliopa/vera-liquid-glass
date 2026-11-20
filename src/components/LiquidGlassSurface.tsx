"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";

interface LiquidGlassSurfaceProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}

export function LiquidGlassSurface({
  children,
  className = "",
  interactive = true,
}: LiquidGlassSurfaceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(20);

  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 28, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 28, mass: 0.5 });

  const specularBg = useMotionTemplate`radial-gradient(280px circle at ${smoothX}% ${smoothY}%, rgba(255, 255, 255, 0.52), rgba(255, 255, 255, 0) 70%)`;

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!interactive || prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(((event.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((event.clientY - rect.top) / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    mouseX.set(22);
    mouseY.set(12);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`liquid-glass-web-approx rounded-[2rem] ${className}`}
    >
      {interactive && !prefersReduced && (
        <motion.div
          aria-hidden="true"
          style={{ background: specularBg }}
          className="pointer-events-none absolute inset-0 z-0 opacity-75 transition-opacity duration-500"
        />
      )}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
