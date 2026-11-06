"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import {
  CATEGORIES,
  CategoryId,
  BuildState,
  CartItem,
} from "@/lib/menu";
import { Bowl } from "./Bowl";
import { CategoryLid } from "@/art/objects";
import { AddInsTray, FinishersShelf } from "./Controls";
import {
  ReceiptPanel,
  HeroClosedPanel,
  DoneConfirmationPanel,
  CartDrawer,
} from "./Panels";
import { HandCursor } from "./HandCursor";
import { Undo2, Volume2, VolumeX, ShoppingBag } from "lucide-react";

export const Builder: React.FC = () => {
  // Food Category selector across all categories
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>("burger");

  // Phase state machine: closed -> building -> sealing -> done
  const [phase, setPhase] = useState<"closed" | "building" | "sealing" | "done">("closed");
  
  // Build state
  const [build, setBuild] = useState<BuildState>({
    ingredients: [],
    sauces: [],
    toppings: [],
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Undo history stack
  const [history, setHistory] = useState<BuildState[]>([]);
  
  // Drag state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [isDropActive, setIsDropActive] = useState(false);
  const [cursorState, setCursorState] = useState<"pointer" | "grab" | "ok">("pointer");
  
  // Hint pill state
  const [temporaryHint, setTemporaryHint] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Layout scale state for responsive stage scaling
  const [stageScale, setStageScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const bowlRef = useRef<SVGSVGElement | null>(null);

  const currentCategoryConfig = CATEGORIES[selectedCategory];

  // Switch category handler
  const handleCategorySwitch = (cat: CategoryId) => {
    if (cat === selectedCategory) return;
    setSelectedCategory(cat);
    setBuild({ ingredients: [], sauces: [], toppings: [] });
    setHistory([]);
    setPhase("closed");
    setTemporaryHint(null);
  };

  // 1440x900 fixed canvas scaling calculation (Step 4)
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mobileMode = w < 768 || (w / h < 0.85);
      setIsMobile(mobileMode);

      if (mobileMode) {
        const scale = Math.min(w / 430, h / 860);
        setStageScale(Math.min(scale, 1.1));
      } else {
        const scale = Math.min(w / 1440, h / 900);
        setStageScale(Math.min(scale, 1.15));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute Total centrally based on category configuration in INR (₹)
  const total = useMemo(() => {
    let sum = currentCategoryConfig.basePrice;
    build.ingredients.forEach((id) => {
      const item = currentCategoryConfig.ingredients.find((i) => i.id === id);
      if (item) sum += item.price;
    });
    build.sauces.forEach((id) => {
      const item = currentCategoryConfig.sauces.find((s) => s.id === id);
      if (item) sum += item.price;
    });
    build.toppings.forEach((id) => {
      const item = currentCategoryConfig.toppings.find((t) => t.id === id);
      if (item) sum += item.price;
    });
    return sum;
  }, [build, currentCategoryConfig]);

  // Audio effects synthesizer
  const playSound = useCallback((type: "tap" | "whoosh" | "plop" | "seal" | "success") => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "tap") {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === "plop") {
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === "whoosh") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === "seal") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.35);
        gain.gain.setValueAtTime(0.35, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === "success") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch {
      // Audio context disabled
    }
  }, [soundEnabled]);

  const triggerHint = (msg: string) => {
    setTemporaryHint(msg);
    setTimeout(() => {
      setTemporaryHint(null);
    }, 1900);
  };

  const updateBuild = (updater: (prev: BuildState) => BuildState, hintText?: string) => {
    setHistory((prevHistory) => [...prevHistory, build]);
    setBuild(updater);
    if (hintText) triggerHint(hintText);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setHistory((prev) => prev.slice(0, prev.length - 1));
    setBuild(previous);
    playSound("tap");
    triggerHint("Step undone.");
  };

  // Keyboard shortcut: Cmd/Ctrl + Z to undo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        e.preventDefault();
        handleUndo();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [history, build]);

  // Toggle Ingredient
  const handleToggleIngredient = (id: string) => {
    const item = currentCategoryConfig.ingredients.find((i) => i.id === id);
    if (!item) return;

    if (build.ingredients.includes(id)) {
      updateBuild(
        (prev) => ({
          ...prev,
          ingredients: prev.ingredients.filter((i) => i !== id),
        }),
        `${item.name} removed.`
      );
      playSound("whoosh");
    } else {
      if (build.ingredients.length >= currentCategoryConfig.maxItems) return;
      updateBuild(
        (prev) => ({
          ...prev,
          ingredients: [...prev.ingredients, id],
        }),
        `${item.name} added.`
      );
      playSound("plop");
    }
  };

  // Toggle Sauce
  const handleToggleSauce = (id: string) => {
    const sauce = currentCategoryConfig.sauces.find((s) => s.id === id);
    if (!sauce) return;

    if (build.sauces.includes(id)) {
      updateBuild((prev) => ({
        ...prev,
        sauces: prev.sauces.filter((s) => s !== id),
      }));
    } else {
      updateBuild(
        (prev) => ({
          ...prev,
          sauces: [...prev.sauces, id],
        }),
        `${sauce.name} drizzled.`
      );
      playSound("whoosh");
    }
  };

  // Toggle Topping
  const handleToggleTopping = (id: string) => {
    const top = currentCategoryConfig.toppings.find((t) => t.id === id);
    if (!top) return;

    if (build.toppings.includes(id)) {
      updateBuild((prev) => ({
        ...prev,
        toppings: prev.toppings.filter((t) => t !== id),
      }));
    } else {
      updateBuild(
        (prev) => ({
          ...prev,
          toppings: [...prev.toppings, id],
        }),
        `${top.name} sprinkled.`
      );
      playSound("plop");
    }
  };

  // Drag start handler for pointer
  const handleDragStartItem = (id: string, e: React.PointerEvent) => {
    setDraggedItem(id);
    setCursorState("grab");
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  // Global Pointer Events for Drag & Drop onto Bowl
  useEffect(() => {
    if (!draggedItem) return;

    const onPointerMove = (e: PointerEvent) => {
      if (!bowlRef.current) return;
      const rect = bowlRef.current.getBoundingClientRect();
      const dist = Math.hypot(
        e.clientX - (rect.left + rect.width / 2),
        e.clientY - (rect.top + rect.height / 2)
      );
      setIsDropActive(dist < rect.width * 0.45);
    };

    const onPointerUp = () => {
      if (isDropActive && draggedItem) {
        handleToggleIngredient(draggedItem);
      }
      setDraggedItem(null);
      setIsDropActive(false);
      setCursorState("pointer");
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [draggedItem, isDropActive]);

  // Phase Transitions
  const handleStartBuild = () => {
    playSound("whoosh");
    setPhase("building");
  };

  const handlePlaceOrder = () => {
    playSound("seal");
    setPhase("sealing");
    setCursorState("ok");

    setTimeout(() => {
      playSound("success");
      setPhase("done");
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#14b8a6", "#f97316", "#f43f5e", "#84cc16"],
      });
    }, 1100);
  };

  // Add to cart handler
  const handleAddToCart = () => {
    const ingredientNames = build.ingredients.map(
      (id) => currentCategoryConfig.ingredients.find((i) => i.id === id)?.name || id
    );

    const newItem: CartItem = {
      id: `${selectedCategory}-${Date.now()}`,
      categoryId: selectedCategory,
      categoryName: currentCategoryConfig.name,
      baseItemName: currentCategoryConfig.baseItemName,
      ingredients: ingredientNames,
      sauces: build.sauces,
      toppings: build.toppings,
      totalPrice: total,
      quantity: 1,
    };

    setCart((prev) => [...prev, newItem]);
    playSound("plop");
    triggerHint(`Added ${currentCategoryConfig.name} to Cart!`);
  };

  const handleUpdateCartQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleReset = () => {
    setBuild({ ingredients: [], sauces: [], toppings: [] });
    setHistory([]);
    setPhase("closed");
    setCursorState("pointer");
  };

  // Dynamic coaching copy derived from current build state & category
  const coachingCopy = useMemo(() => {
    if (temporaryHint) return temporaryHint;
    const hints = currentCategoryConfig.coachingHints;
    if (build.ingredients.length === 0) return hints.empty;
    const hasProtein = build.ingredients.some((id) =>
      currentCategoryConfig.ingredients.find((i) => i.id === id)?.group === "protein"
    );
    if (!hasProtein && hints.missingProtein) return hints.missingProtein;
    if (build.ingredients.length <= 2) return hints.fewItems;
    if (build.sauces.length === 0) return hints.missingSauce;
    if (build.toppings.length === 0) return hints.missingTopping;
    return hints.complete;
  }, [build, temporaryHint, currentCategoryConfig]);

  const totalCartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#f7f5f0] text-stone-900 flex items-center justify-center select-none font-sans">
      <HandCursor cursorState={cursorState} />

      {/* Countertop Props Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute -bottom-24 -left-20 w-[450px] h-[350px] -rotate-12 bg-stone-200/50 rounded-3xl pointer-events-none border border-stone-300/40 shadow-sm" />

      {/* Top Header Navigation: Category Switcher Scrollable Bar */}
      <header className="absolute top-4 left-1/2 -translate-x-1/2 z-40 max-w-[94vw] lg:max-w-4xl overflow-x-auto no-scrollbar flex items-center gap-1.5 bg-white/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-200/90 shadow-md">
        {(Object.keys(CATEGORIES) as CategoryId[]).map((catId) => {
          const cat = CATEGORIES[catId];
          const isCurrent = catId === selectedCategory;
          return (
            <button
              key={catId}
              onClick={() => handleCategorySwitch(catId)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                isCurrent
                  ? "bg-stone-900 text-white shadow-sm"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              }`}
            >
              <span>{cat.name}</span>
              {cat.badge && (
                <span className={`text-[8px] font-bold px-1.5 py-0.2 rounded-full uppercase ${
                  isCurrent ? 'bg-amber-400 text-stone-900' : 'bg-stone-200 text-stone-700'
                }`}>
                  {cat.badge}
                </span>
              )}
            </button>
          );
        })}
      </header>

      {/* Floating Cart Button & Sound Toggle */}
      <div className="absolute top-4 right-6 flex items-center gap-2.5 z-40">
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 border border-stone-200 text-stone-800 hover:bg-white shadow-sm transition-all cursor-pointer"
          aria-label="View Cart"
        >
          <ShoppingBag className="w-4 h-4 text-stone-800" />
          <span className="text-xs font-bold hidden sm:inline">Cart</span>
          {totalCartCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-orange-600 text-white text-[10px] font-black flex items-center justify-center">
              {totalCartCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-2 rounded-full bg-white/90 border border-stone-200 text-stone-700 hover:bg-white shadow-sm transition-all cursor-pointer"
          aria-label="Toggle Sound"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          handlePlaceOrder();
        }}
      />

      {/* Fixed Scaled Stage Canvas (1440 x 900 on Desktop) */}
      <div
        style={{
          transform: `scale(${stageScale})`,
          transformOrigin: "center center",
          width: isMobile ? "430px" : "1440px",
          height: isMobile ? "900px" : "900px",
        }}
        className="relative shrink-0 flex items-center justify-center transition-transform duration-150"
      >
        {/* Top Shelf (Finishers) */}
        <AnimatePresence>
          {phase === "building" && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`absolute z-30 ${
                isMobile ? "top-14 left-1/2 -translate-x-1/2 scale-90" : "top-14 left-1/2 -translate-x-1/2"
              }`}
            >
              <FinishersShelf
                category={selectedCategory}
                selectedIngredients={build.ingredients}
                selectedSauces={build.sauces}
                selectedToppings={build.toppings}
                onToggleIngredient={handleToggleIngredient}
                onToggleSauce={handleToggleSauce}
                onToggleTopping={handleToggleTopping}
                onDragStartItem={handleDragStartItem}
                isFull={build.ingredients.length >= currentCategoryConfig.maxItems}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Left Side: Hero Closed / Add-Ins Tray */}
        <div className={`absolute z-30 ${isMobile ? "bottom-6 left-1/2 -translate-x-1/2" : "left-12 top-1/2 -translate-y-1/2"}`}>
          <AnimatePresence mode="wait">
            {phase === "closed" && (
              <motion.div
                key={`hero-${selectedCategory}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                {!isMobile && (
                  <HeroClosedPanel
                    category={selectedCategory}
                    onStartBuild={handleStartBuild}
                  />
                )}
              </motion.div>
            )}

            {phase === "building" && (
              <motion.div
                key={`tray-${selectedCategory}`}
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.5, delay: 0.14 }}
              >
                <AddInsTray
                  category={selectedCategory}
                  selectedIngredients={build.ingredients}
                  selectedSauces={build.sauces}
                  selectedToppings={build.toppings}
                  onToggleIngredient={handleToggleIngredient}
                  onToggleSauce={handleToggleSauce}
                  onToggleTopping={handleToggleTopping}
                  onDragStartItem={handleDragStartItem}
                  isFull={build.ingredients.length >= currentCategoryConfig.maxItems}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Center: Hero Vessel */}
        <div className="relative z-20 flex flex-col items-center justify-center">
          <div className="relative">
            <Bowl
              category={selectedCategory}
              ingredients={build.ingredients}
              sauces={build.sauces}
              toppings={build.toppings}
              isDropActive={isDropActive}
              onBowlRef={(el) => {
                bowlRef.current = el;
              }}
            />

            {/* The Lid (Transforms: Closed, Lifts & Tilts, Re-seals, Stamps) */}
            <AnimatePresence>
              {(phase === "closed" || phase === "sealing" || phase === "done") && (
                <motion.div
                  key={`lid-${selectedCategory}-${phase}`}
                  initial={
                    phase === "closed"
                      ? { scale: 1, x: 0, y: 0, rotate: 0, opacity: 1 }
                      : { scale: 1.07, x: 120, y: -140, rotate: 26, opacity: 0 }
                  }
                  animate={
                    phase === "closed"
                      ? { scale: 1, x: 0, y: 0, rotate: 0, opacity: 1 }
                      : { scale: [1.07, 0.95, 1], x: 0, y: 0, rotate: 0, opacity: 1 }
                  }
                  exit={{
                    y: [-30, -180],
                    x: [0, 160],
                    scale: [1.07, 1.1],
                    rotate: [0, 26],
                    opacity: [1, 0],
                    transition: { duration: 1.05, times: [0, 1], ease: "easeInOut" },
                  }}
                  transition={{
                    duration: 0.9,
                    ease: "easeOut",
                  }}
                  onClick={() => {
                    if (phase === "closed") handleStartBuild();
                  }}
                  className={`absolute inset-0 cursor-pointer ${
                    phase === "closed" ? "hover:scale-[1.015] active:scale-[0.99] transition-transform" : ""
                  }`}
                >
                  <CategoryLid
                    category={selectedCategory}
                    stamped={phase === "done"}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dynamic Coaching Pill & Undo Action */}
          <div className="mt-8 flex items-center gap-3">
            <motion.div
              key={coachingCopy}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-5 py-2.5 rounded-full bg-stone-900 text-white font-medium text-xs shadow-md tracking-wide"
            >
              {coachingCopy}
            </motion.div>

            {phase === "building" && history.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUndo}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-stone-200 text-stone-700 text-xs font-semibold shadow-sm hover:bg-stone-50 cursor-pointer"
                title="Undo (Ctrl+Z)"
              >
                <Undo2 className="w-3.5 h-3.5" />
                <span>Undo</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Right Side: Scoreboard Receipt / Confirmation Card */}
        <div className={`absolute z-30 ${isMobile ? "top-14 right-4 scale-75 origin-top-right" : "right-12 top-1/2 -translate-y-1/2"}`}>
          <AnimatePresence mode="wait">
            {phase === "building" && (
              <motion.div
                key={`receipt-${selectedCategory}`}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 60 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <ReceiptPanel
                  category={selectedCategory}
                  ingredients={build.ingredients}
                  sauces={build.sauces}
                  toppings={build.toppings}
                  total={total}
                  onPlaceOrder={handlePlaceOrder}
                  onAddToCart={handleAddToCart}
                  onReset={handleReset}
                  onStartBuild={handleStartBuild}
                  phase={phase}
                  cart={cart}
                  cartCount={totalCartCount}
                  onOpenCart={() => setIsCartOpen(true)}
                />
              </motion.div>
            )}

            {phase === "done" && (
              <motion.div
                key={`done-${selectedCategory}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <DoneConfirmationPanel
                  category={selectedCategory}
                  onReset={handleReset}
                  total={total}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
