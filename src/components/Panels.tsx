"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { CATEGORIES, CategoryId, CartItem } from "@/lib/menu";
import { ArrowRight, RotateCcw, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";

interface PanelsProps {
  category: CategoryId;
  ingredients: string[];
  sauces: string[];
  toppings: string[];
  total: number;
  onPlaceOrder: () => void;
  onAddToCart: () => void;
  onReset: () => void;
  onStartBuild: () => void;
  phase: "closed" | "building" | "sealing" | "done";
  cart: CartItem[];
  cartCount: number;
  onOpenCart: () => void;
}

export const ReceiptPanel: React.FC<PanelsProps> = ({
  category,
  ingredients,
  sauces,
  toppings,
  total,
  onPlaceOrder,
  onAddToCart,
}) => {
  const catConfig = CATEGORIES[category];

  return (
    <div className="w-[300px] bg-white/95 rounded-2xl p-5 shadow-[0_15px_30px_rgba(0,0,0,0.06)] border border-stone-200/90 font-mono select-none flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="border-b border-dashed border-stone-300 pb-3 mb-3 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-0.5">
            <h2 className="text-sm font-black tracking-widest text-stone-900 uppercase">
              little tide
            </h2>
            {catConfig.badge && (
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-800 tracking-normal font-sans">
                {catConfig.badge}
              </span>
            )}
          </div>
          <p className="text-[10px] text-stone-500 tracking-wider">
            {catConfig.tagline}
          </p>
        </div>

        {/* Line Items */}
        <div className="space-y-1.5 text-xs text-stone-700 min-h-[140px] max-h-[220px] overflow-y-auto pr-1">
          <div className="flex justify-between font-semibold">
            <span>{catConfig.baseItemName}</span>
            <span>₹{catConfig.basePrice}</span>
          </div>

          <AnimatePresence>
            {ingredients.map((id) => {
              const item = catConfig.ingredients.find((i) => i.id === id);
              if (!item) return null;
              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, x: 10, backgroundColor: "rgba(254, 240, 138, 0.8)" }}
                  animate={{ opacity: 1, x: 0, backgroundColor: "transparent" }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-between items-center py-0.5 rounded px-1"
                >
                  <span className="truncate pr-2 flex items-center gap-1.5">
                    {item.isVeg !== undefined && (
                      <span className={`w-2 h-2 rounded-full inline-block shrink-0 ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                    )}
                    <span>{item.name}</span>
                  </span>
                  <span className="shrink-0 font-medium">₹{item.price}</span>
                </motion.div>
              );
            })}

            {sauces.map((id) => {
              const sauce = catConfig.sauces.find((s) => s.id === id);
              if (!sauce) return null;
              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex justify-between items-center py-0.5 px-1 text-stone-600"
                >
                  <span className="truncate pr-2">{sauce.name}</span>
                  <span className="shrink-0 font-medium">
                    {sauce.price > 0 ? `₹${sauce.price}` : "Free"}
                  </span>
                </motion.div>
              );
            })}

            {toppings.map((id) => {
              const top = catConfig.toppings.find((t) => t.id === id);
              if (!top) return null;
              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex justify-between items-center py-0.5 px-1 text-stone-600"
                >
                  <span className="truncate pr-2">{top.name}</span>
                  <span className="shrink-0 font-medium">₹{top.price}</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Total Divider */}
        <div className="border-t border-dashed border-stone-300 pt-3 mt-3">
          <div className="flex justify-between items-center text-sm font-bold text-stone-900">
            <span>TOTAL</span>
            <motion.span
              key={total}
              initial={{ scale: 1.15, color: "#0d9488" }}
              animate={{ scale: 1, color: "#1c1917" }}
              transition={{ type: "spring", stiffness: 150, damping: 22 }}
              className="text-lg font-black"
            >
              ₹{total}
            </motion.span>
          </div>
        </div>
      </div>

      {/* Action Buttons: Add to Cart & Place Order */}
      <div className="mt-4 pt-2 flex flex-col gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAddToCart}
          className="w-full py-2.5 px-4 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 font-sans font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-stone-700" />
          <span>Add to Cart</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onPlaceOrder}
          className="w-full py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-sans font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md shadow-orange-600/20 transition-all cursor-pointer"
        >
          <span>Order Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
        <p className="text-[10px] text-center text-stone-500 mt-1">
          Ready for pickup/delivery in ~15 min
        </p>
      </div>
    </div>
  );
};

export const HeroClosedPanel: React.FC<{
  category: CategoryId;
  onStartBuild: () => void;
}> = ({ category, onStartBuild }) => {
  const catConfig = CATEGORIES[category];

  return (
    <div className="flex flex-col items-start max-w-sm select-none">
      <div className="inline-block px-3 py-1 bg-teal-100/80 text-teal-800 rounded-full text-xs font-semibold tracking-wider uppercase mb-3">
        {catConfig.badge ? `${catConfig.badge} · ` : ""}little tide kitchen
      </div>
      <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-stone-900 leading-[1.08] mb-3">
        Make it <br />
        <span className="italic font-serif text-teal-600 font-normal">yours.</span>
      </h1>
      <p className="text-stone-600 text-sm leading-relaxed mb-6">
        An interactive, build-your-own {catConfig.name.toLowerCase()} configurator. Choose real ingredients, watch realistic layers build, and taste the freshness.
      </p>
      <button
        onClick={onStartBuild}
        className="px-6 py-3 rounded-full bg-stone-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-all flex items-center gap-2 shadow-lg cursor-pointer"
      >
        <span>Open Lid & Build</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export const DoneConfirmationPanel: React.FC<{
  category: CategoryId;
  onReset: () => void;
  total: number;
}> = ({ category, onReset, total }) => {
  const [orderNumber, setOrderNumber] = React.useState("4829");
  const catConfig = CATEGORIES[category];

  React.useEffect(() => {
    setOrderNumber(String(Math.floor(1000 + Math.random() * 9000)));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-[300px] bg-white/95 rounded-2xl p-6 shadow-xl border border-stone-200 text-center select-none"
    >
      <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-3 font-black text-xl">
        ✓
      </div>
      <h3 className="text-lg font-bold text-stone-900 mb-1">Order Confirmed!</h3>
      <p className="text-xs text-stone-600 mb-4 leading-relaxed">
        Your {catConfig.name.toLowerCase()} is freshly prepared and boxed. Order #LT-{orderNumber}.
      </p>

      <div className="bg-stone-50 rounded-xl p-3 mb-5 border border-stone-200/70 text-xs text-stone-700 flex justify-between font-mono">
        <span>Paid</span>
        <span className="font-bold text-stone-900">₹{total}</span>
      </div>

      <button
        onClick={onReset}
        className="w-full py-2.5 px-4 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Build Another {catConfig.name}</span>
      </button>
    </motion.div>
  );
};

// Cart Drawer Component
export const CartDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}> = ({ isOpen, onClose, cart, onUpdateQty, onRemoveItem, onCheckout }) => {
  if (!isOpen) return null;

  const grandTotal = cart.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/40 backdrop-blur-xs select-none">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-6 overflow-hidden">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-800" />
              <h2 className="text-base font-bold text-stone-900">Your Food Cart</h2>
              <span className="text-xs font-semibold bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                {cart.reduce((count, item) => count + item.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-700 text-lg font-bold p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="mt-4 space-y-3 max-h-[calc(100vh-240px)] overflow-y-auto pr-1">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-stone-500 text-sm">
                Your cart is empty. Custom-build an item and add it here!
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-stone-200/80 bg-stone-50/70 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="flex-1">
                    <div className="font-bold text-stone-900 text-sm">{item.categoryName}</div>
                    <div className="text-stone-500 text-[11px] mt-0.5">{item.baseItemName}</div>
                    {item.ingredients.length > 0 && (
                      <div className="text-stone-600 text-[11px] mt-1 line-clamp-1">
                        + {item.ingredients.join(", ")}
                      </div>
                    )}
                    <div className="text-stone-900 font-bold mt-2 text-xs">
                      ₹{item.totalPrice} × {item.quantity} = ₹{item.totalPrice * item.quantity}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-stone-400 hover:text-red-600 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-lg px-2 py-1">
                      <button
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="text-stone-600 hover:text-stone-900 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold text-xs">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="text-stone-600 hover:text-stone-900 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {cart.length > 0 && (
          <div className="border-t border-stone-200 pt-4">
            <div className="flex justify-between items-center text-sm font-bold text-stone-900 mb-4">
              <span>Grand Total</span>
              <span className="text-lg font-black text-orange-600">₹{grandTotal}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20 cursor-pointer"
            >
              <span>Proceed to Checkout (₹{grandTotal})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
