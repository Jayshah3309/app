"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { StaticVesselBase } from "@/art/objects";
import { FlyingPiece, getArrangementPieces } from "@/art/flights";
import { CATEGORIES, CategoryId } from "@/lib/menu";

interface BowlProps {
  category: CategoryId;
  ingredients: string[];
  sauces: string[];
  toppings: string[];
  isDropActive: boolean;
  onBowlRef?: (el: SVGSVGElement | null) => void;
}

export const Bowl: React.FC<BowlProps> = ({
  category,
  ingredients,
  sauces,
  toppings,
  isDropActive,
  onBowlRef,
}) => {
  const catConfig = CATEGORIES[category];

  return (
    <div className="relative w-[470px] h-[470px] flex items-center justify-center select-none">
      {/* Category-specific Static Base (isolated layer, never repaints during animations) */}
      <div className="absolute inset-0">
        <StaticVesselBase category={category} />
      </div>

      {/* Target Ring Highlight during Drag-over */}
      {isDropActive && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, rotate: 360 }}
          transition={{ rotate: { repeat: Infinity, duration: 8, ease: "linear" }, duration: 0.2 }}
          className="absolute inset-[30px] rounded-full border-2 border-dashed border-teal-500 pointer-events-none z-10"
        />
      )}

      {/* Dynamic Interactive SVG Canvas for Flying and Placed Pieces */}
      <svg
        ref={onBowlRef}
        viewBox="0 0 600 600"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-20"
      >
        <g transform="translate(300, 300)">
          {/* Animated Ingredients */}
          <AnimatePresence>
            {ingredients.map((ingId, slotIdx) => {
              const pieces = getArrangementPieces(ingId, slotIdx, category);
              const originX = -420;
              const originY = -120 + slotIdx * 45;

              return pieces.map((piece, pieceIdx) => (
                <FlyingPiece
                  key={piece.id}
                  id={piece.id}
                  art={piece.art}
                  targetX={piece.px}
                  targetY={piece.py}
                  rotation={piece.rot}
                  originX={originX}
                  originY={originY}
                  delayIndex={pieceIdx}
                  size={piece.size}
                />
              ));
            })}
          </AnimatePresence>

          {/* Sauces Drizzle Paths */}
          {sauces.map((sauceId) => {
            const sauceDef = catConfig.sauces.find((s) => s.id === sauceId);
            if (!sauceDef) return null;

            // Tailored drizzle pattern per food archetype
            let pathD = "M -160 -40 Q -100 -120 0 -50 T 140 -20 T -80 60 T 110 80 T -50 140 T 80 150";
            if (category === "burger") {
              // Concentric zig-zag spread across burger patty
              pathD = "M -100 -40 Q 0 -80 100 -40 Q 0 0 -100 20 Q 0 60 100 40 Q 0 90 -80 90";
            } else if (category === "pizza") {
              // Spiral drizzle across pizza wheel
              pathD = "M -40 -30 Q 80 -120 120 0 Q 140 120 0 130 Q -120 120 -130 0 Q -120 -130 0 -140 Q 150 -130 160 40";
            }

            return (
              <motion.path
                key={sauceId}
                d={pathD}
                fill="none"
                stroke={sauceDef.color}
                strokeWidth={category === "burger" ? "10" : "8"}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.92 }}
                transition={{ duration: 1.05, ease: "easeInOut" }}
              />
            );
          })}

          {/* Toppings (Sesame, Oregano, Nori, Chilli Flakes, etc.) */}
          {toppings.map((topId) => {
            const topDef = catConfig.toppings.find((t) => t.id === topId);
            if (!topDef) return null;

            const count = topId.includes("flake") || topId.includes("oregano") ? 55 : 40;
            const bits = Array.from({ length: count }).map((_, idx) => {
              const angle = (idx * 37) % 360;
              const dist = 25 + ((idx * 29) % 160);
              const rad = (angle * Math.PI) / 180;
              return {
                x: Number((Math.cos(rad) * dist).toFixed(1)),
                y: Number((Math.sin(rad) * dist).toFixed(1)),
                r: (idx * 43) % 180,
                scale: 0.6 + ((idx % 5) * 0.1),
              };
            });

            return (
              <motion.g
                key={topId}
                initial={{ opacity: 0, scale: 1.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {bits.map((b, bIdx) => (
                  <rect
                    key={bIdx}
                    x={b.x}
                    y={b.y}
                    width={topId === "nori" ? "8" : topId === "chilli_flakes" ? "5" : "3.5"}
                    height={topId === "nori" ? "3" : topId === "chilli_flakes" ? "3" : "2"}
                    rx={topId === "sesame" ? "1" : "0.5"}
                    transform={`rotate(${b.r} ${b.x} ${b.y})`}
                    fill={topDef.color}
                    opacity="0.9"
                    className="filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
                  />
                ))}
              </motion.g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};
