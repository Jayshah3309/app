"use client";

import React from "react";
import { motion } from "motion/react";
import { CATEGORIES, CategoryId } from "@/lib/menu";
import { PieceArt } from "@/art/pieces";
import { Check } from "lucide-react";

interface ControlsProps {
  category: CategoryId;
  selectedIngredients: string[];
  selectedSauces: string[];
  selectedToppings: string[];
  onToggleIngredient: (id: string) => void;
  onToggleSauce: (id: string) => void;
  onToggleTopping: (id: string) => void;
  onDragStartItem: (id: string, e: React.PointerEvent) => void;
  isFull: boolean;
}

export const AddInsTray: React.FC<ControlsProps> = ({
  category,
  selectedIngredients,
  onToggleIngredient,
  onDragStartItem,
  isFull,
}) => {
  const catConfig = CATEGORIES[category];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs tracking-wider uppercase font-semibold text-stone-500 mb-1 px-1">
        <span>{category === "burger" ? "Layers & Fillings" : category === "pizza" ? "Toppings" : "Add-ins"}</span>
        <span>{selectedIngredients.length}/{catConfig.maxItems}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 w-[260px] touch-none">
        {catConfig.ingredients.map((item) => {
          const isSelected = selectedIngredients.includes(item.id);
          const isDisabled = !isSelected && isFull;

          return (
            <motion.div
              key={item.id}
              whileHover={!isDisabled ? { scale: 1.03 } : {}}
              whileTap={!isDisabled ? { scale: 0.96 } : {}}
              animate={isDisabled ? { opacity: 0.5 } : { opacity: 1 }}
              onPointerDown={(e) => {
                if (!isDisabled) onDragStartItem(item.id, e);
              }}
              onClick={() => {
                if (!isDisabled) onToggleIngredient(item.id);
              }}
              className={`relative cursor-pointer select-none rounded-2xl p-2.5 border transition-all flex flex-col items-center justify-between shadow-sm backdrop-blur-md ${
                isSelected
                  ? "bg-teal-50/90 border-teal-500 shadow-teal-500/10"
                  : "bg-white/85 border-stone-200/80 hover:border-stone-300 hover:shadow-md"
              }`}
            >
              {/* Dish Presentation with Photographic Food Asset */}
              <div className="w-16 h-16 rounded-full bg-stone-100/90 border border-stone-200/80 flex items-center justify-center mb-1.5 shadow-inner overflow-hidden p-1">
                <PieceArt art={item.art} size={46} />
              </div>

              {/* Title & Price Pill */}
              <div className="w-full flex flex-col items-center text-center">
                <span className="text-xs font-bold text-stone-800 leading-tight">
                  {item.name}
                </span>
                <span className="text-[11px] font-medium text-stone-500 mt-0.5">
                  +${item.price.toFixed(2)}
                </span>
              </div>

              {/* Selected Check Tag */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-sm">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export const FinishersShelf: React.FC<ControlsProps> = ({
  category,
  selectedSauces,
  selectedToppings,
  onToggleSauce,
  onToggleTopping,
}) => {
  const catConfig = CATEGORIES[category];

  return (
    <div className="flex items-center gap-6 bg-white/80 backdrop-blur-md px-6 py-2.5 rounded-full border border-stone-200/80 shadow-md select-none">
      {/* Sauces Shelf */}
      <div className="flex items-center gap-3">
        {catConfig.sauces.map((sauce) => {
          const isSelected = selectedSauces.includes(sauce.id);
          return (
            <button
              key={sauce.id}
              onClick={() => onToggleSauce(sauce.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                isSelected
                  ? "bg-stone-900 text-white shadow-sm scale-105"
                  : "bg-stone-100/90 text-stone-700 hover:bg-stone-200/80"
              }`}
            >
              <span
                className="w-3.5 h-3.5 rounded-full border border-white/60 shadow-xs"
                style={{ backgroundColor: sauce.color }}
              />
              <span>{sauce.name}</span>
            </button>
          );
        })}
      </div>

      <div className="w-px h-5 bg-stone-300" />

      {/* Toppings / Seasoning Shelf */}
      <div className="flex items-center gap-3">
        {catConfig.toppings.map((top) => {
          const isSelected = selectedToppings.includes(top.id);
          return (
            <button
              key={top.id}
              onClick={() => onToggleTopping(top.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                isSelected
                  ? "bg-teal-700 text-white shadow-sm scale-105"
                  : "bg-stone-100/90 text-stone-700 hover:bg-stone-200/80"
              }`}
            >
              <span>{top.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
