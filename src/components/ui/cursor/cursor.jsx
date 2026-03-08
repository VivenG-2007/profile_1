import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./cursor.scss";
import React from 'react'

const Cursor = () => {
  const dotRef = useRef(null);
  const glowRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!dotRef.current || !glowRef.current) return;

    // Hide cursor initially
    gsap.set([dotRef.current, glowRef.current], {
      opacity: 0,
      xPercent: -50,
      yPercent: -50,
    });

    // Faster for dot
    const moveDotX = gsap.quickTo(dotRef.current, "x", { duration: 0.1, ease: "power3.out" });
    const moveDotY = gsap.quickTo(dotRef.current, "y", { duration: 0.1, ease: "power3.out" });

    // Slower for glow (trailing effect)
    const moveGlowX = gsap.quickTo(glowRef.current, "x", { duration: 0.4, ease: "power3.out" });
    const moveGlowY = gsap.quickTo(glowRef.current, "y", { duration: 0.4, ease: "power3.out" });

    const handleMove = (e) => {
      const { clientX, clientY } = e;

      if (!initialized.current) {
        // Set initial position immediately on first move
        gsap.set([dotRef.current, glowRef.current], { x: clientX, y: clientY, opacity: 1 });
        initialized.current = true;
      }

      moveDotX(clientX);
      moveDotY(clientY);
      moveGlowX(clientX);
      moveGlowY(clientY);
    };

    const handleMouseEnter = () => {
      gsap.to([dotRef.current, glowRef.current], { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to([dotRef.current, glowRef.current], { opacity: 0, duration: 0.3 });
    };

    const handleMouseDown = () => {
      gsap.to(dotRef.current, { scale: 0.7, duration: 0.2 });
      gsap.to(glowRef.current, { scale: 0.8, duration: 0.2 });
    };

    const handleMouseUp = () => {
      gsap.to(dotRef.current, { scale: 1, duration: 0.2 });
      gsap.to(glowRef.current, { scale: 1, duration: 0.2 });
    };

    // Hover effect for interactive elements
    const handleOver = (e) => {
      if (e.target.closest('button, a, .clickable')) {
        gsap.to(dotRef.current, { scale: 2, backgroundColor: '#f1811f', duration: 0.3 });
        gsap.to(glowRef.current, { scale: 1.5, opacity: 1, duration: 0.3 });
      }
    };

    const handleOut = (e) => {
      if (e.target.closest('button, a, .clickable')) {
        gsap.to(dotRef.current, { scale: 1, backgroundColor: '#f5f1eb', duration: 0.3 });
        gsap.to(glowRef.current, { scale: 1, opacity: 0.9, duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
};

export default Cursor;
