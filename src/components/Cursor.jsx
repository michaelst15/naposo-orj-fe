import React, { useEffect, useRef } from "react";

function Cursor() {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    const canUseCursor =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!canUseCursor) return;

    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline) return;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    let raf = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animate = () => {
      const distX = mouseX - outlineX;
      const distY = mouseY - outlineY;
      outlineX += distX * 0.15;
      outlineY += distY * 0.15;
      outline.style.left = `${outlineX}px`;
      outline.style.top = `${outlineY}px`;
      raf = window.requestAnimationFrame(animate);
    };

    const isHoverTrigger = (el) => {
      if (!el) return false;
      if (el.classList?.contains("hover-trigger")) return true;
      const tag = el.tagName?.toLowerCase();
      if (tag === "a" || tag === "button") return true;
      if (tag === "input" || tag === "select" || tag === "textarea") return true;
      if (el.getAttribute?.("role") === "button") return true;
      return false;
    };

    const onPointerOver = (e) => {
      const target = e.target;
      const trigger = target?.closest?.(".hover-trigger, a, button, input, select, textarea, [role='button']");
      document.body.classList.toggle("hovering", isHoverTrigger(trigger));
    };

    const onPointerOut = (e) => {
      const to = e.relatedTarget;
      const trigger = to?.closest?.(".hover-trigger, a, button, input, select, textarea, [role='button']");
      document.body.classList.toggle("hovering", isHoverTrigger(trigger));
    };

    const onMouseDown = () => document.body.classList.add("clicking");
    const onMouseUp = () => document.body.classList.remove("clicking");

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });

    raf = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      window.cancelAnimationFrame(raf);
      document.body.classList.remove("hovering");
      document.body.classList.remove("clicking");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" data-cursor-dot />
      <div ref={outlineRef} className="cursor-outline" data-cursor-outline />
    </>
  );
}

export default Cursor;
