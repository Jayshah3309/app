import React from "react";
import { motion } from "motion/react";
import { FOOD_IMAGE_MAP } from "./pieces";
import { CATEGORIES, CategoryId } from "@/lib/menu";

export const getArrangementPieces = (
  id: string,
  slotIndex: number,
  category: CategoryId
) => {
  const catConfig = CATEGORIES[category];
  const ing = catConfig.ingredients.find((i) => i.id === id);
  if (!ing) return [];

  let seed = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 100) + slotIndex * 89;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const pieces: {
    id: string;
    px: number;
    py: number;
    rot: number;
    art: string;
    size: number;
  }[] = [];

  // 1. BURGER & SANDWICH: STACK ARRANGEMENT
  if (catConfig.arrangement === "stack") {
    if (id === "top_bun") {
      pieces.push({ id: `${id}-top`, px: 0, py: -6, rot: 0, art: "top_bun", size: 290 });
      return pieces;
    }
    if (id === "sub_roll") {
      pieces.push({ id: `${id}-sub`, px: 0, py: 0, rot: 0, art: "sub_roll", size: 300 });
      return pieces;
    }
    if (id === "veg_patty" || id === "chicken_patty" || id === "sandwich_patty" || id === "sandwich_chicken") {
      pieces.push({ id: `${id}-main`, px: 0, py: 0, rot: (slotIndex * 15) % 360, art: ing.art, size: 280 });
      return pieces;
    }
    if (id === "burger_cheese" || id === "sandwich_cheese") {
      pieces.push({ id: `${id}-cheese`, px: 0, py: 0, rot: 18, art: ing.art, size: 260 });
      return pieces;
    }
    if (id === "lettuce") {
      pieces.push({ id: `${id}-lettuce`, px: 0, py: 0, rot: slotIndex * 40, art: ing.art, size: 295 });
      return pieces;
    }

    const count = id.includes("tomato") ? 2 : id.includes("pickle") ? 3 : 2;
    for (let i = 0; i < count; i++) {
      const angle = (i * (360 / count) + slotIndex * 45) * (Math.PI / 180);
      const dist = 42 + rand() * 25;
      pieces.push({
        id: `${id}-${i}`,
        px: Number((Math.cos(angle) * dist).toFixed(1)),
        py: Number((Math.sin(angle) * dist).toFixed(1)),
        rot: Number((rand() * 180).toFixed(1)),
        art: ing.art,
        size: id.includes("tomato") ? 140 : id.includes("pickle") ? 100 : 125,
      });
    }
    return pieces;
  }

  // 2. TACO: FOLD ARRANGEMENT (Tucked inside tortilla/shell)
  if (catConfig.arrangement === "fold") {
    if (id === "crispy_taco_shell") {
      pieces.push({ id: `${id}-shell`, px: 0, py: 0, rot: 0, art: "crispy_taco_shell", size: 290 });
      return pieces;
    }
    const count = id.includes("bean") || id.includes("rice") ? 6 : 4;
    for (let i = 0; i < count; i++) {
      const angle = (i * 45 + slotIndex * 30) * (Math.PI / 180);
      const dist = 35 + rand() * 40;
      pieces.push({
        id: `${id}-${i}`,
        px: Number((Math.cos(angle) * dist).toFixed(1)),
        py: Number((Math.sin(angle) * dist).toFixed(1)),
        rot: Number((rand() * 180).toFixed(1)),
        art: ing.art,
        size: id.includes("bean") ? 55 : 75,
      });
    }
    return pieces;
  }

  // 3. RICE BOWL: COMPARTMENTS ARRANGEMENT (Organized around bowl sectors)
  if (catConfig.arrangement === "compartments") {
    const angle = (slotIndex * 50) * (Math.PI / 180);
    const dist = 85;
    const cx = Math.cos(angle) * dist;
    const cy = Math.sin(angle) * dist;
    const count = 4;
    for (let i = 0; i < count; i++) {
      const a = rand() * Math.PI * 2;
      const d = rand() * 35;
      pieces.push({
        id: `${id}-${i}`,
        px: Number((cx + Math.cos(a) * d).toFixed(1)),
        py: Number((cy + Math.sin(a) * d).toFixed(1)),
        rot: Number((rand() * 360).toFixed(1)),
        art: ing.art,
        size: 70,
      });
    }
    return pieces;
  }

  // 4. ICE CREAM & SHAKES: SCOOP ARRANGEMENT
  if (catConfig.arrangement === "scoop") {
    if (id.includes("icecream") || id.includes("scoop")) {
      const offset = (slotIndex - 1) * 35;
      pieces.push({ id: `${id}-scoop`, px: offset, py: offset * 0.5, rot: 0, art: ing.art, size: 220 });
      return pieces;
    }
    if (id.includes("whipped_cream")) {
      pieces.push({ id: `${id}-cream`, px: 0, py: -20, rot: 0, art: "whipped_cream", size: 230 });
      return pieces;
    }
    const count = id === "brownie" ? 3 : id === "wafers" ? 2 : 5;
    for (let i = 0; i < count; i++) {
      const a = (i * (360 / count) + slotIndex * 25) * (Math.PI / 180);
      const d = 50 + rand() * 35;
      pieces.push({
        id: `${id}-${i}`,
        px: Number((Math.cos(a) * d).toFixed(1)),
        py: Number((Math.sin(a) * d).toFixed(1)),
        rot: Number((rand() * 360).toFixed(1)),
        art: ing.art,
        size: id === "wafers" ? 120 : id === "brownie" ? 85 : 55,
      });
    }
    return pieces;
  }

  // 5. WAFFLES & PANCAKES
  if (catConfig.arrangement === "waffle") {
    if (id === "classic_pancake") {
      pieces.push({ id: `${id}-pancake`, px: 0, py: 0, rot: 0, art: "classic_pancake", size: 280 });
      return pieces;
    }
    if (id === "butter_pat") {
      pieces.push({ id: `${id}-butter`, px: 0, py: -10, rot: 15, art: "butter_pat", size: 90 });
      return pieces;
    }
    const count = id.includes("strawberry") ? 4 : id.includes("banana") ? 5 : 6;
    for (let i = 0; i < count; i++) {
      const a = (i * (360 / count) + slotIndex * 35) * (Math.PI / 180);
      const d = 55 + rand() * 30;
      pieces.push({
        id: `${id}-${i}`,
        px: Number((Math.cos(a) * d).toFixed(1)),
        py: Number((Math.sin(a) * d).toFixed(1)),
        rot: Number((rand() * 360).toFixed(1)),
        art: ing.art,
        size: id.includes("blueberry") ? 45 : 75,
      });
    }
    return pieces;
  }

  // 6. SCATTER & FILL (Pizza, Loaded Fries, Noodles, Pasta, Poke)
  const isBaseNoodleOrNacho = id.includes("noodle") || id === "nacho_chips" || id === "potato_wedges" || id === "fusilli" || id === "spaghetti";
  if (isBaseNoodleOrNacho) {
    pieces.push({ id: `${id}-base`, px: 0, py: 0, rot: slotIndex * 25, art: ing.art, size: 300 });
    return pieces;
  }

  const count = ing.id === "mozzarella" ? 5 : ing.id === "corn" ? 7 : 5;
  for (let i = 0; i < count; i++) {
    const angle = rand() * Math.PI * 2;
    const dist = Math.sqrt(rand()) * 130;
    pieces.push({
      id: `${id}-${i}`,
      px: Number((Math.cos(angle) * dist).toFixed(1)),
      py: Number((Math.sin(angle) * dist).toFixed(1)),
      rot: Number((rand() * 360).toFixed(1)),
      art: ing.art,
      size: ing.id === "mozzarella" ? 130 : 70,
    });
  }
  return pieces;
};

interface FlyingPieceProps {
  id: string;
  art: string;
  targetX: number;
  targetY: number;
  rotation: number;
  originX: number;
  originY: number;
  delayIndex: number;
  size: number;
}

export const FlyingPiece: React.FC<FlyingPieceProps> = ({
  art,
  targetX,
  targetY,
  rotation,
  originX,
  originY,
  delayIndex,
  size,
}) => {
  const dx = originX - targetX;
  const dy = originY - targetY;
  const imageSrc = FOOD_IMAGE_MAP[art];

  return (
    <motion.g
      initial={{ x: dx, y: dy, scale: 0.75, opacity: 0 }}
      animate={{
        x: [dx, dx * 0.42, 0, 0],
        y: [dy, dy * 0.42 - 36, 0, 0],
        scale: [0.75, 1.28, 0.94, 1.0],
        opacity: [0, 1, 1, 1],
      }}
      transition={{
        duration: 0.68,
        delay: delayIndex * 0.016,
        times: [0, 0.5, 0.8, 1],
        ease: "easeOut",
      }}
      exit={{
        x: dx,
        y: dy,
        scale: 0.5,
        opacity: 0,
        transition: { duration: 0.4, ease: "easeIn" },
      }}
    >
      <g transform={`translate(${targetX}, ${targetY}) rotate(${rotation})`}>
        {imageSrc ? (
          <image
            href={imageSrc}
            x={-size / 2}
            y={-size / 2}
            width={size}
            height={size}
            className="filter drop-shadow-[0_4px_8px_rgba(20,10,5,0.22)] select-none pointer-events-none"
          />
        ) : null}
      </g>
    </motion.g>
  );
};
