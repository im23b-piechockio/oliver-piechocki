"use client";

import { useEffect, useRef, useState } from "react";

// Smooth dot + trailing ring cursor. Desktop (fine pointer) only.
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  // Enable only on devices with a precise pointer (desktop).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: fine)").matches) setEnabled(true);
  }, []);

  // Set up movement + animation once the cursor elements are mounted.
  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let scale = 1;
    let targetScale = 1;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
    };
    const onOver = (e) => {
      const interactive = e.target.closest(
        "a, button, input, textarea, select, [role='button']"
      );
      targetScale = interactive ? 1.6 : 1;
      ring.style.borderColor = interactive
        ? "rgba(255,255,255,0.9)"
        : "rgba(255,255,255,0.45)";
      ring.style.background = interactive ? "rgba(255,255,255,0.06)" : "transparent";
    };
    const onDown = () => (targetScale = Math.max(0.8, targetScale * 0.7));
    const onUp = () => (targetScale = targetScale < 1 ? 1 : targetScale);

    let raf;
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      scale += (targetScale - scale) * 0.15;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.body.classList.add("has-custom-cursor");

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
