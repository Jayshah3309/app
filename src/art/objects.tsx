import React from "react";
import { CategoryId } from "@/lib/menu";

export const StaticVesselBase: React.FC<{ category: CategoryId }> = React.memo(
  function StaticVesselBase({ category }) {
    // 1. BURGER BOX
    if (category === "burger") {
      return (
        <svg width="100%" height="100%" viewBox="0 0 600 600" className="pointer-events-none select-none">
          <defs>
            <radialGradient id="boxGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fdfbf7" />
              <stop offset="100%" stopColor="#e5e1d8" />
            </radialGradient>
            <radialGradient id="bottomBun" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="70%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#b45309" />
            </radialGradient>
          </defs>
          <rect x="70" y="70" width="460" height="460" rx="36" fill="url(#boxGrad)" stroke="#d6d1c4" strokeWidth="4" />
          <rect x="100" y="100" width="400" height="400" rx="24" fill="#faf8f5" stroke="#e8e2d5" strokeWidth="2" strokeDasharray="6 6" />
          <circle cx="300" cy="300" r="170" fill="url(#bottomBun)" stroke="#92400e" strokeWidth="3" />
          <circle cx="300" cy="300" r="150" fill="#fbbf24" opacity="0.4" />
        </svg>
      );
    }

    // 2. PIZZA BOX
    if (category === "pizza") {
      return (
        <svg width="100%" height="100%" viewBox="0 0 600 600" className="pointer-events-none select-none">
          <defs>
            <radialGradient id="crustGrad" cx="45%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="75%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </radialGradient>
            <radialGradient id="pizzaSauceBed" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="80%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#991b1b" />
            </radialGradient>
          </defs>
          <rect x="60" y="60" width="480" height="480" rx="28" fill="#f5f0e6" stroke="#ded5c4" strokeWidth="3" />
          <circle cx="300" cy="300" r="215" fill="url(#crustGrad)" stroke="#78350f" strokeWidth="3" />
          <circle cx="300" cy="300" r="185" fill="url(#pizzaSauceBed)" />
          <circle cx="280" cy="290" r="150" fill="#fef08a" opacity="0.45" />
        </svg>
      );
    }

    // 3. NOODLES / PASTA / RICE BOWL
    if (category === "noodle" || category === "pasta" || category === "ricebowl") {
      return (
        <svg width="100%" height="100%" viewBox="0 0 600 600" className="pointer-events-none select-none">
          <defs>
            <radialGradient id="ceramicBowl" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="80%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>
            <radialGradient id="brothBed" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="65%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#78350f" />
            </radialGradient>
          </defs>
          <circle cx="300" cy="300" r="275" fill="url(#ceramicBowl)" stroke="#475569" strokeWidth="6" />
          <circle cx="300" cy="300" r="255" fill="none" stroke="#0ea5e9" strokeWidth="2" opacity="0.4" />
          <circle cx="300" cy="300" r="250" fill="#182234" />
          <circle cx="300" cy="300" r="235" fill="url(#brothBed)" />
        </svg>
      );
    }

    // 4. TACOS & BURRITOS (Warm pressed flour tortilla base)
    if (category === "taco") {
      return (
        <svg width="100%" height="100%" viewBox="0 0 600 600" className="pointer-events-none select-none">
          <defs>
            <radialGradient id="tortillaGrad" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="70%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#fde68a" />
            </radialGradient>
          </defs>
          {/* Wooden basket */}
          <circle cx="300" cy="300" r="280" fill="#e2d8c3" stroke="#b3a58e" strokeWidth="4" />
          {/* Tortilla flat disc */}
          <circle cx="300" cy="300" r="240" fill="url(#tortillaGrad)" stroke="#ca8a04" strokeWidth="2" />
          {/* Toast marks */}
          <circle cx="230" cy="220" r="14" fill="#ca8a04" opacity="0.3" />
          <circle cx="360" cy="260" r="18" fill="#ca8a04" opacity="0.25" />
          <circle cx="280" cy="370" r="15" fill="#ca8a04" opacity="0.3" />
        </svg>
      );
    }

    // 5. SANDWICHES & SUBS (Wooden cutting board & deli parchment paper)
    if (category === "sandwich") {
      return (
        <svg width="100%" height="100%" viewBox="0 0 600 600" className="pointer-events-none select-none">
          <rect x="70" y="70" width="460" height="460" rx="30" fill="#eed8b7" stroke="#b59062" strokeWidth="5" />
          <rect x="95" y="95" width="410" height="410" rx="20" fill="#faf6f0" stroke="#d5c8b5" strokeWidth="2" strokeDasharray="8 8" />
          {/* Bottom bread slice base */}
          <rect x="160" y="180" width="280" height="240" rx="30" fill="#fef3c7" stroke="#b45309" strokeWidth="4" />
        </svg>
      );
    }

    // 6. LOADED FRIES & NACHOS (Kraft serving tray)
    if (category === "fries") {
      return (
        <svg width="100%" height="100%" viewBox="0 0 600 600" className="pointer-events-none select-none">
          <rect x="60" y="60" width="480" height="480" rx="32" fill="#d8bc97" stroke="#966e44" strokeWidth="4" />
          <rect x="90" y="90" width="420" height="420" rx="20" fill="#fdfbf7" stroke="#c0a583" strokeWidth="2" strokeDasharray="6 6" />
          {/* Bed of crispy golden french fries */}
          <g opacity="0.95">
            {Array.from({ length: 30 }).map((_, i) => {
              const rot = (i * 47) % 180;
              const x = 200 + ((i * 31) % 200);
              const y = 200 + ((i * 43) % 200);
              return (
                <rect
                  key={i}
                  x={x - 45}
                  y={y - 7}
                  width="90"
                  height="14"
                  rx="4"
                  transform={`rotate(${rot} ${x} ${y})`}
                  fill="#facc15"
                  stroke="#d97706"
                  strokeWidth="1.5"
                />
              );
            })}
          </g>
        </svg>
      );
    }

    // 7. ICE CREAM / SUNDAES / SHAKES (Glass crystal sundae goblet / plate)
    if (category === "icecream" || category === "shake") {
      return (
        <svg width="100%" height="100%" viewBox="0 0 600 600" className="pointer-events-none select-none">
          <defs>
            <radialGradient id="glassRim" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#f0f9ff" />
              <stop offset="70%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#bae6fd" />
            </radialGradient>
          </defs>
          <circle cx="300" cy="300" r="270" fill="url(#glassRim)" stroke="#38bdf8" strokeWidth="4" opacity="0.8" />
          <circle cx="300" cy="300" r="250" fill="#ffffff" opacity="0.9" />
          <circle cx="300" cy="300" r="235" fill="#f8fafc" />
        </svg>
      );
    }

    // 8. WAFFLES & PANCAKES (Ceramic brunch platter with golden waffle grid)
    if (category === "waffle") {
      return (
        <svg width="100%" height="100%" viewBox="0 0 600 600" className="pointer-events-none select-none">
          <circle cx="300" cy="300" r="280" fill="#ffffff" stroke="#e2e8f0" strokeWidth="5" />
          <circle cx="300" cy="300" r="260" fill="#f8fafc" />
          {/* Belgian Waffle square */}
          <rect x="170" y="170" width="260" height="260" rx="20" fill="#f59e0b" stroke="#b45309" strokeWidth="4" />
          {/* Waffle deep pockets grid */}
          <g fill="#d97706" stroke="#92400e" strokeWidth="2">
            {[195, 250, 305, 360].map((x) =>
              [195, 250, 305, 360].map((y) => (
                <rect key={`${x}-${y}`} x={x} y={y} width="42" height="42" rx="4" />
              ))
            )}
          </g>
        </svg>
      );
    }

    // Default: Poke Bowl Base
    return (
      <svg width="100%" height="100%" viewBox="0 0 600 600" className="pointer-events-none select-none">
        <circle cx="300" cy="300" r="280" fill="#b98858" stroke="#966a3d" strokeWidth="4" />
        <circle cx="300" cy="300" r="260" fill="#f8f4ee" />
        <circle cx="300" cy="300" r="248" fill="#ffffff" />
      </svg>
    );
  }
);

export const CategoryLid: React.FC<{
  category: CategoryId;
  stamped?: boolean;
}> = ({ category, stamped }) => {
  const isRectBox =
    category === "burger" ||
    category === "pizza" ||
    category === "sandwich" ||
    category === "fries";

  let stampText = "SEALED FRESH";
  if (category === "burger") stampText = "HOT & JUICY";
  else if (category === "pizza") stampText = "STONE BAKED";
  else if (category === "noodle") stampText = "WOK TOSSED";
  else if (category === "taco") stampText = "FRESH & SPICY";
  else if (category === "sandwich") stampText = "TOASTED CRISP";
  else if (category === "ricebowl") stampText = "100% HEALTHY";
  else if (category === "fries") stampText = "CRUNCH & CHEESE";
  else if (category === "icecream") stampText = "SWEET TREAT";
  else if (category === "pasta") stampText = "BON APPETITO";
  else if (category === "shake") stampText = "ICE COLD";
  else if (category === "waffle") stampText = "WARM & CRISP";

  return (
    <div className="relative w-full h-full rounded-full drop-shadow-[0_25px_35px_rgba(25,20,15,0.35)] select-none">
      <svg viewBox="0 0 600 600" className="w-full h-full">
        <defs>
          <radialGradient id="lidGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#e5bf92" />
            <stop offset="60%" stopColor="#ca9865" />
            <stop offset="100%" stopColor="#a77341" />
          </radialGradient>
        </defs>

        {isRectBox ? (
          <g>
            <rect x="70" y="70" width="460" height="460" rx="36" fill="url(#lidGrad)" stroke="#8e5e32" strokeWidth="4" />
            <rect x="100" y="100" width="400" height="400" rx="20" fill="none" stroke="#f6deb8" strokeWidth="3" opacity="0.6" />
          </g>
        ) : (
          <g>
            <circle cx="300" cy="300" r="285" fill="url(#lidGrad)" stroke="#8e5e32" strokeWidth="4" />
            <circle cx="300" cy="300" r="275" fill="none" stroke="#f6deb8" strokeWidth="3" opacity="0.6" />
          </g>
        )}

        {/* Center Kraft Label / Sticker */}
        <circle cx="300" cy="300" r="96" fill="#1e293b" stroke="#334155" strokeWidth="3" />
        <text x="300" y="290" textAnchor="middle" fill="#f8fafc" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="24">
          little tide
        </text>
        <text x="300" y="315" textAnchor="middle" fill="#38bdf8" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="13" letterSpacing="2px">
          {category.toUpperCase()}
        </text>
        <text x="300" y="335" textAnchor="middle" fill="#94a3b8" fontFamily="system-ui, sans-serif" fontWeight="500" fontSize="10">
          PRESS TO BUILD
        </text>

        {stamped && (
          <g transform="rotate(-15 300 300)">
            <rect x="160" y="240" width="280" height="75" rx="8" fill="none" stroke="#dc2626" strokeWidth="5" strokeDasharray="2 1" />
            <text x="300" y="288" textAnchor="middle" fill="#dc2626" fontFamily="impact, sans-serif" fontWeight="900" fontSize="28" letterSpacing="2px">
              {stampText}
            </text>
            <text x="300" y="306" textAnchor="middle" fill="#dc2626" fontFamily="sans-serif" fontWeight="700" fontSize="11">
              ORDER READY IN 15 MIN
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
