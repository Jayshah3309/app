"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

export const HandCursor: React.FC<{
  cursorState: "pointer" | "grab" | "ok";
}> = ({ cursorState }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on desktop pointers
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 select-none"
      animate={{ x: pos.x - 12, y: pos.y - 12 }}
      transition={{ type: "spring", damping: 30, stiffness: 450, mass: 0.1 }}
    >
      {cursorState === "ok" ? (
        <span className="text-2xl filter drop-shadow">👌</span>
      ) : cursorState === "grab" ? (
        <span className="text-2xl filter drop-shadow">✊</span>
      ) : (
        <span className="text-2xl filter drop-shadow">👆</span>
      )}
    </motion.div>
  );
};
