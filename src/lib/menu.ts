export type CategoryId =
  | "burger"
  | "pizza"
  | "noodle"
  | "taco"
  | "sandwich"
  | "ricebowl"
  | "fries"
  | "icecream"
  | "pasta"
  | "shake"
  | "waffle"
  | "poke";

export interface Ingredient {
  id: string;
  name: string;
  price: number; // in INR (₹)
  group: "base" | "protein" | "fresh" | "topping" | "filling" | "scoop";
  art: string;
  color: string;
  isVeg?: boolean;
  spicyLevel?: 0 | 1 | 2 | 3;
  allergens?: string[];
}

export interface Sauce {
  id: string;
  name: string;
  price: number;
  color: string;
  lineY: number;
  loops: number;
  spicyLevel?: 0 | 1 | 2 | 3;
  allergens?: string[];
}

export interface Topping {
  id: string;
  name: string;
  price: number;
  color: string;
  spicyLevel?: 0 | 1 | 2 | 3;
  allergens?: string[];
}

export interface CategoryConfig {
  id: CategoryId;
  name: string;
  tagline: string;
  badge?: "Popular" | "Best Seller" | "Chef's Pick" | "Trending";
  basePrice: number;
  baseItemName: string;
  vesselName: string;
  maxItems: number;
  arrangement:
    | "stack"
    | "scatter"
    | "fill"
    | "fold"
    | "compartments"
    | "scoop"
    | "waffle";
  lidTitle: string;
  lidSub: string;
  endingStamp: string;
  ingredients: Ingredient[];
  sauces: Sauce[];
  toppings: Topping[];
  coachingHints: {
    empty: string;
    missingProtein?: string;
    fewItems: string;
    missingSauce: string;
    missingTopping: string;
    complete: string;
  };
}

export interface BuildState {
  ingredients: string[];
  sauces: string[];
  toppings: string[];
}

export interface CartItem {
  id: string;
  categoryId: CategoryId;
  categoryName: string;
  baseItemName: string;
  ingredients: string[];
  sauces: string[];
  toppings: string[];
  totalPrice: number;
  quantity: number;
}

export const CATEGORIES: Record<CategoryId, CategoryConfig> = {
  // 1. BURGER
  burger: {
    id: "burger",
    name: "Burger",
    tagline: "STACKED · JUICY & TALL",
    badge: "Popular",
    basePrice: 199,
    baseItemName: "Toasted Brioche Bun Base",
    vesselName: "Burger box",
    maxItems: 7,
    arrangement: "stack",
    lidTitle: "little tide",
    lidSub: "GOURMET BURGER",
    endingStamp: "HOT & JUICY",
    ingredients: [
      { id: "veg_patty", name: "Crispy Veg Patty", price: 69, group: "protein", art: "veg_patty", color: "#b45309", isVeg: true },
      { id: "chicken_patty", name: "Grilled Chicken Patty", price: 89, group: "protein", art: "chicken_patty", color: "#d97706", isVeg: false },
      { id: "burger_cheese", name: "Cheddar Melt Cheese", price: 39, group: "fresh", art: "burger_cheese", color: "#fbbf24", isVeg: true, allergens: ["Dairy"] },
      { id: "lettuce", name: "Crisp Iceberg Lettuce", price: 25, group: "fresh", art: "lettuce", color: "#4ade80", isVeg: true },
      { id: "tomato", name: "Juicy Sliced Tomato", price: 25, group: "fresh", art: "tomato", color: "#ef4444", isVeg: true },
      { id: "onion", name: "Crisp Red Onion Rings", price: 20, group: "fresh", art: "onion", color: "#c084fc", isVeg: true },
      { id: "pickles", name: "Dill Pickle Coins", price: 29, group: "fresh", art: "pickles", color: "#65a30d", isVeg: true },
      { id: "top_bun", name: "Glazed Sesame Crown Bun", price: 35, group: "fresh", art: "top_bun", color: "#d97706", isVeg: true, allergens: ["Gluten", "Sesame"] },
    ],
    sauces: [
      { id: "mayo", name: "Classic Mayo", price: 20, color: "#fef3c7", lineY: 15, loops: 5 },
      { id: "ketchup", name: "Tomato Ketchup", price: 15, color: "#dc2626", lineY: 18, loops: 6 },
      { id: "mustard", name: "Dijon Mustard", price: 20, color: "#eab308", lineY: 20, loops: 5, spicyLevel: 1 },
    ],
    toppings: [
      { id: "sesame_seeds", name: "Toasted Sesame", price: 15, color: "#fafaf9" },
      { id: "crispy_bacon_bits", name: "Crispy Bits", price: 35, color: "#78350f" },
      { id: "jalapenos", name: "Pickled Jalapeños", price: 25, color: "#15803d" },
    ],
    coachingHints: {
      empty: "Stack your patty first. Drag it in, or tap to add.",
      missingProtein: "Add a veg or grilled chicken patty for the body.",
      fewItems: "Stack cheese, lettuce, pickles or tomato next.",
      missingSauce: "Slather on some mayo, ketchup or mustard.",
      missingTopping: "Add crunchy toppings or crown with a top bun.",
      complete: "One towering masterpiece. Ready when you are.",
    },
  },

  // 2. PIZZA
  pizza: {
    id: "pizza",
    name: "Pizza",
    tagline: "ARTISAN · STONE FIRED",
    badge: "Best Seller",
    basePrice: 299,
    baseItemName: "Hand-Stretched Sourdough Base",
    vesselName: "Pizza box",
    maxItems: 8,
    arrangement: "scatter",
    lidTitle: "little tide",
    lidSub: "ARTISAN PIZZA",
    endingStamp: "STONE BAKED",
    ingredients: [
      { id: "mozzarella", name: "Fior Di Latte Mozzarella", price: 69, group: "fresh", art: "mozzarella", color: "#fef08a", isVeg: true, allergens: ["Dairy"] },
      { id: "paneer", name: "Tandoori Paneer Cubes", price: 59, group: "protein", art: "paneer", color: "#f8fafc", isVeg: true, allergens: ["Dairy"] },
      { id: "mushroom", name: "Button Mushroom Slices", price: 49, group: "fresh", art: "mushroom", color: "#a8a29e", isVeg: true },
      { id: "capsicum", name: "Crisp Green Capsicum", price: 35, group: "fresh", art: "capsicum", color: "#16a34a", isVeg: true },
      { id: "pizza_onion", name: "Red Onion Rings", price: 25, group: "fresh", art: "pizza_onion", color: "#d8b4fe", isVeg: true },
      { id: "pizza_tomato", name: "San Marzano Plum Tomato", price: 35, group: "fresh", art: "pizza_tomato", color: "#f43f5e", isVeg: true },
      { id: "olives", name: "Sliced Black Olives", price: 45, group: "fresh", art: "olives", color: "#1c1917", isVeg: true },
      { id: "corn", name: "Golden Sweet Corn", price: 35, group: "fresh", art: "corn", color: "#facc15", isVeg: true },
    ],
    sauces: [
      { id: "tomato_sauce", name: "Rich Tomato Herb Sauce", price: 0, color: "#b91c1c", lineY: 15, loops: 8 },
      { id: "pesto_drizzle", name: "Basil Pesto Drizzle", price: 30, color: "#15803d", lineY: 18, loops: 6 },
      { id: "hot_garlic_oil", name: "Garlic Infused Chilli Oil", price: 20, color: "#ca8a04", lineY: 20, loops: 5, spicyLevel: 2 },
    ],
    toppings: [
      { id: "oregano", name: "Mediterranean Oregano", price: 10, color: "#4d7c0f" },
      { id: "chilli_flakes", name: "Crushed Red Chilli", price: 10, color: "#dc2626" },
      { id: "parmesan_dust", name: "Grated Parmesan", price: 35, color: "#fef9c3", allergens: ["Dairy"] },
    ],
    coachingHints: {
      empty: "Spread sauce & mozzarella, or scatter fresh toppings.",
      missingProtein: "Try adding paneer or mushrooms.",
      fewItems: "Scatter sweet corn, olives, or capsicum.",
      missingSauce: "Swirl on rich tomato sauce or infused oil.",
      missingTopping: "Shake on oregano & red chilli flakes.",
      complete: "Ready for the stone oven! Box it up.",
    },
  },

  // 3. NOODLES
  noodle: {
    id: "noodle",
    name: "Noodles",
    tagline: "WOK TOSSED · STEAMING BOWL",
    badge: "Trending",
    basePrice: 229,
    baseItemName: "Wok-Seared Noodle Bowl Base",
    vesselName: "Noodle bowl",
    maxItems: 7,
    arrangement: "fill",
    lidTitle: "little tide",
    lidSub: "WOK NOODLES",
    endingStamp: "WOK TOSSED",
    ingredients: [
      { id: "hakka_noodles", name: "Classic Hakka Noodles", price: 49, group: "base", art: "hakka_noodles", color: "#fef08a", isVeg: true, allergens: ["Gluten"] },
      { id: "ramen_noodles", name: "Curly Ramen Noodles", price: 59, group: "base", art: "ramen_noodles", color: "#fde047", isVeg: true, allergens: ["Gluten"] },
      { id: "chicken_wok", name: "Shredded Pepper Chicken", price: 79, group: "protein", art: "chicken_wok", color: "#b45309", isVeg: false },
      { id: "egg", name: "Ajitsuke Tamago (Egg)", price: 35, group: "protein", art: "egg", color: "#f59e0b", isVeg: false, allergens: ["Egg"] },
      { id: "noodle_paneer", name: "Wok Tossed Paneer", price: 55, group: "protein", art: "noodle_paneer", color: "#f8fafc", isVeg: true, allergens: ["Dairy"] },
      { id: "noodle_veggies", name: "Asian Greens & Bok Choy", price: 39, group: "fresh", art: "noodle_veggies", color: "#22c55e", isVeg: true },
      { id: "noodle_mushroom", name: "Shiitake Mushrooms", price: 49, group: "fresh", art: "noodle_mushroom", color: "#78350f", isVeg: true },
      { id: "spring_onion", name: "Fresh Spring Scallions", price: 20, group: "fresh", art: "spring_onion", color: "#10b981", isVeg: true },
    ],
    sauces: [
      { id: "schezwan", name: "Spicy Schezwan Sauce", price: 20, color: "#991b1b", lineY: 15, loops: 7, spicyLevel: 2 },
      { id: "soy_sauce", name: "Dark Umami Soy Sauce", price: 0, color: "#311808", lineY: 18, loops: 8, allergens: ["Soy"] },
      { id: "chilli_sauce", name: "Fiery Chilli Garlic Sauce", price: 20, color: "#ef4444", lineY: 20, loops: 6, spicyLevel: 3 },
    ],
    toppings: [
      { id: "sesame_seeds", name: "Toasted White Sesame", price: 15, color: "#f5f5f4", allergens: ["Sesame"] },
      { id: "fried_garlic", name: "Crispy Fried Garlic", price: 20, color: "#d97706" },
      { id: "crushed_peanuts", name: "Roasted Peanuts", price: 25, color: "#b45309", allergens: ["Nuts"] },
    ],
    coachingHints: {
      empty: "Pick your noodles base or toss in proteins.",
      missingProtein: "Add chicken, egg, or paneer to fuel the bowl.",
      fewItems: "Toss in shiitake, crunchy greens, or spring onions.",
      missingSauce: "Splash some soy, fiery chilli, or schezwan sauce.",
      missingTopping: "Sprinkle sesame seeds or golden garlic.",
      complete: "Hot, fragrant, and ready to feast!",
    },
  },

  // 4. TACOS & BURRITOS
  taco: {
    id: "taco",
    name: "Tacos & Burritos",
    tagline: "FIESTA · FOLDED & LOADED",
    badge: "Popular",
    basePrice: 189,
    baseItemName: "Warm Pressed Flour Tortilla",
    vesselName: "Taco basket",
    maxItems: 7,
    arrangement: "fold",
    lidTitle: "little tide",
    lidSub: "TACO & BURRITO",
    endingStamp: "FRESH & SPICY",
    ingredients: [
      { id: "crispy_taco_shell", name: "Crispy Taco Shell", price: 35, group: "base", art: "crispy_taco_shell", color: "#f59e0b", isVeg: true },
      { id: "taco_paneer", name: "Chipotle Grilled Paneer", price: 59, group: "protein", art: "taco_paneer", color: "#f8fafc", isVeg: true, allergens: ["Dairy"] },
      { id: "taco_chicken", name: "Fajita Spiced Chicken", price: 79, group: "protein", art: "taco_chicken", color: "#b45309", isVeg: false },
      { id: "black_beans", name: "Seasoned Black Beans", price: 35, group: "filling", art: "black_beans", color: "#1c1917", isVeg: true },
      { id: "mexican_rice", name: "Cilantro Lime Rice", price: 35, group: "filling", art: "mexican_rice", color: "#fef08a", isVeg: true },
      { id: "taco_lettuce", name: "Shredded Romaine Lettuce", price: 20, group: "fresh", art: "lettuce", color: "#4ade80", isVeg: true },
      { id: "taco_cheese", name: "Monterey Jack & Cheddar", price: 39, group: "filling", art: "burger_cheese", color: "#fbbf24", isVeg: true, allergens: ["Dairy"] },
      { id: "taco_corn", name: "Roasted Sweet Corn", price: 25, group: "fresh", art: "corn", color: "#facc15", isVeg: true },
    ],
    sauces: [
      { id: "salsa", name: "Fresh Pico Salsa", price: 25, color: "#b91c1c", lineY: 15, loops: 6, spicyLevel: 1 },
      { id: "guacamole", name: "Creamy Hass Guacamole", price: 49, color: "#65a30d", lineY: 18, loops: 5 },
      { id: "sour_cream", name: "Cool Sour Cream", price: 25, color: "#f8fafc", lineY: 20, loops: 5, allergens: ["Dairy"] },
      { id: "chipotle", name: "Smoky Chipotle Crema", price: 25, color: "#d97706", lineY: 22, loops: 6, spicyLevel: 2 },
    ],
    toppings: [
      { id: "jalapenos", name: "Sliced Jalapeños", price: 20, color: "#15803d", spicyLevel: 2 },
      { id: "cilantro", name: "Fresh Cilantro Bits", price: 15, color: "#16a34a" },
    ],
    coachingHints: {
      empty: "Pick your tortilla or taco shell, then pile in the filling.",
      missingProtein: "Add chipotle paneer, fajita chicken or black beans.",
      fewItems: "Layer cheese, lime rice, or crunchy greens.",
      missingSauce: "Spoon on chunky salsa, guac, or sour cream.",
      missingTopping: "Garnish with fresh cilantro or fiery jalapeños.",
      complete: "Packed with bold Mexican flavors! Wrap it up.",
    },
  },

  // 5. SANDWICHES & SUBS
  sandwich: {
    id: "sandwich",
    name: "Sandwiches & Subs",
    tagline: "FRESH CRUST · LAYERED TO PERFECTION",
    badge: "Chef's Pick",
    basePrice: 169,
    baseItemName: "Artisan Sourdough / Sub Roll Base",
    vesselName: "Sandwich wrapper",
    maxItems: 7,
    arrangement: "stack",
    lidTitle: "little tide",
    lidSub: "DELI SANDWICH",
    endingStamp: "TOASTED CRISP",
    ingredients: [
      { id: "sub_roll", name: "Footlong Sub Roll", price: 45, group: "base", art: "sub_roll", color: "#d97706", isVeg: true, allergens: ["Gluten"] },
      { id: "sandwich_patty", name: "Golden Veg Cutlet", price: 55, group: "protein", art: "veg_patty", color: "#b45309", isVeg: true },
      { id: "sandwich_chicken", name: "Herbed Roast Chicken", price: 79, group: "protein", art: "chicken_patty", color: "#d97706", isVeg: false },
      { id: "sandwich_paneer", name: "Grilled Herb Paneer", price: 59, group: "protein", art: "paneer", color: "#f8fafc", isVeg: true, allergens: ["Dairy"] },
      { id: "sandwich_cheese", name: "Swiss Cheese Slice", price: 35, group: "filling", art: "burger_cheese", color: "#fbbf24", isVeg: true, allergens: ["Dairy"] },
      { id: "sandwich_cucumber", name: "Crisp Cucumber Slices", price: 20, group: "fresh", art: "cucumber", color: "#10b981", isVeg: true },
      { id: "sandwich_tomato", name: "Fresh Sliced Tomatoes", price: 25, group: "fresh", art: "tomato", color: "#ef4444", isVeg: true },
      { id: "sandwich_pickles", name: "Dill Gherkins & Olives", price: 30, group: "fresh", art: "pickles", color: "#65a30d", isVeg: true },
    ],
    sauces: [
      { id: "sandwich_mayo", name: "Herb Garlic Mayo", price: 20, color: "#fef3c7", lineY: 15, loops: 5 },
      { id: "sandwich_mustard", name: "Honey Mustard", price: 25, color: "#eab308", lineY: 18, loops: 5 },
      { id: "sandwich_pesto", name: "Genovese Basil Pesto", price: 35, color: "#15803d", lineY: 20, loops: 6, allergens: ["Dairy"] },
    ],
    toppings: [
      { id: "oregano", name: "Italian Herbs", price: 10, color: "#4d7c0f" },
      { id: "chilli_flakes", name: "Chilli Flakes", price: 10, color: "#dc2626" },
    ],
    coachingHints: {
      empty: "Select your sub or artisan bread, then load fillings.",
      missingProtein: "Add roast chicken, herb paneer, or crisp cutlet.",
      fewItems: "Stack crunchy cucumber, tomatoes, and Swiss cheese.",
      missingSauce: "Drizzle honey mustard, garlic mayo, or pesto.",
      missingTopping: "Sprinkle Italian herbs and press to toast.",
      complete: "Toasted, warm, and crunchy! Ready to serve.",
    },
  },

  // 6. RICE & PROTEIN BOWLS
  ricebowl: {
    id: "ricebowl",
    name: "Rice & Protein Bowls",
    tagline: "POWER BOWL · CLEAN & NOURISHING",
    badge: "Popular",
    basePrice: 249,
    baseItemName: "Steamed Jasmine Rice Base",
    vesselName: "Nourish bowl",
    maxItems: 7,
    arrangement: "compartments",
    lidTitle: "little tide",
    lidSub: "POWER BOWL",
    endingStamp: "100% HEALTHY",
    ingredients: [
      { id: "brown_rice", name: "Whole Grain Brown Rice", price: 40, group: "base", art: "brown_rice", color: "#ca8a04", isVeg: true },
      { id: "bowl_chicken", name: "Teriyaki Glazed Chicken", price: 85, group: "protein", art: "chicken_wok", color: "#b45309", isVeg: false },
      { id: "bowl_paneer", name: "Pan-Seared Paneer", price: 65, group: "protein", art: "paneer", color: "#f8fafc", isVeg: true, allergens: ["Dairy"] },
      { id: "bowl_tofu", name: "Crispy Sesame Tofu", price: 55, group: "protein", art: "tofu", color: "#fef08a", isVeg: true, allergens: ["Soy"] },
      { id: "chickpeas", name: "Spiced Roasted Chickpeas", price: 40, group: "protein", art: "chickpeas", color: "#d97706", isVeg: true },
      { id: "broccoli", name: "Steamed Tender Broccoli", price: 45, group: "fresh", art: "broccoli", color: "#15803d", isVeg: true },
      { id: "bowl_corn", name: "Steamed Sweet Corn", price: 30, group: "fresh", art: "corn", color: "#facc15", isVeg: true },
      { id: "carrot", name: "Shredded Sweet Carrots", price: 25, group: "fresh", art: "carrot", color: "#ea580c", isVeg: true },
    ],
    sauces: [
      { id: "teriyaki", name: "Japanese Teriyaki Glaze", price: 25, color: "#451a03", lineY: 15, loops: 7, allergens: ["Soy"] },
      { id: "schezwan", name: "Spicy Schezwan Sauce", price: 20, color: "#991b1b", lineY: 18, loops: 6, spicyLevel: 2 },
      { id: "soy_sauce", name: "Light Soy & Ginger", price: 0, color: "#1c1917", lineY: 20, loops: 7 },
    ],
    toppings: [
      { id: "sesame_seeds", name: "Toasted Sesame", price: 15, color: "#f5f5f4" },
      { id: "spring_onion", name: "Scallions", price: 15, color: "#10b981" },
    ],
    coachingHints: {
      empty: "Choose your rice base, then add high-protein fuel.",
      missingProtein: "Add glazed chicken, paneer, tofu, or chickpeas.",
      fewItems: "Balance with steamed broccoli, carrots, and sweet corn.",
      missingSauce: "Coat with sweet teriyaki or zesty chilli sauce.",
      missingTopping: "Top with toasted sesame and fresh scallions.",
      complete: "A nutrient-packed powerhouse meal!",
    },
  },

  // 7. LOADED FRIES & NACHOS
  fries: {
    id: "fries",
    name: "Loaded Fries & Nachos",
    tagline: "CRISPY · SMOTHERED IN CHEESE",
    badge: "Trending",
    basePrice: 179,
    baseItemName: "Golden Crispy French Fries Bed",
    vesselName: "Loaded tray",
    maxItems: 7,
    arrangement: "scatter",
    lidTitle: "little tide",
    lidSub: "LOADED FRIES",
    endingStamp: "CRUNCH & CHEESE",
    ingredients: [
      { id: "nacho_chips", name: "Crispy Tortilla Nachos", price: 40, group: "base", art: "nacho_chips", color: "#f59e0b", isVeg: true },
      { id: "potato_wedges", name: "Spiced Potato Wedges", price: 45, group: "base", art: "potato_wedges", color: "#b45309", isVeg: true },
      { id: "fries_chicken", name: "Crispy Popcorn Chicken", price: 79, group: "protein", art: "chicken_patty", color: "#d97706", isVeg: false },
      { id: "fries_paneer", name: "Cajun Spiced Paneer Bites", price: 59, group: "protein", art: "paneer", color: "#f8fafc", isVeg: true, allergens: ["Dairy"] },
      { id: "fries_cheese", name: "Grated Yellow Cheddar", price: 39, group: "topping", art: "burger_cheese", color: "#fbbf24", isVeg: true, allergens: ["Dairy"] },
      { id: "jalapenos", name: "Pickled Jalapeño Slices", price: 25, group: "fresh", art: "jalapenos", color: "#15803d", isVeg: true, spicyLevel: 2 },
      { id: "fries_olives", name: "Sliced Black Olives", price: 35, group: "fresh", art: "olives", color: "#1c1917", isVeg: true },
      { id: "fries_onion", name: "Diced Red Onions & Tomatoes", price: 25, group: "fresh", art: "onion", color: "#c084fc", isVeg: true },
    ],
    sauces: [
      { id: "cheese_sauce", name: "Warm Melted Cheese Sauce", price: 35, color: "#f59e0b", lineY: 15, loops: 8, allergens: ["Dairy"] },
      { id: "salsa", name: "Zesty Mexican Salsa", price: 20, color: "#dc2626", lineY: 18, loops: 6, spicyLevel: 1 },
      { id: "spicy_mayo", name: "Chipotle Mayo", price: 25, color: "#f97316", lineY: 20, loops: 6 },
    ],
    toppings: [
      { id: "chilli_flakes", name: "Chilli Seasoning", price: 10, color: "#dc2626" },
      { id: "oregano", name: "Herb Sprinkle", price: 10, color: "#4d7c0f" },
    ],
    coachingHints: {
      empty: "Crispy fries or nachos bed ready. Add toppings!",
      missingProtein: "Toss on popcorn chicken or cajun paneer.",
      fewItems: "Scatter diced tomatoes, black olives, or jalapeños.",
      missingSauce: "Smother with warm velvety cheese sauce.",
      missingTopping: "Dust with spicy seasoning and herbs.",
      complete: "Crispy, cheesy, messy perfection!",
    },
  },

  // 8. ICE CREAM & SUNDAES
  icecream: {
    id: "icecream",
    name: "Ice Cream & Sundaes",
    tagline: "SWEET · DECADENT SCOOPS",
    badge: "Best Seller",
    basePrice: 149,
    baseItemName: "Waffle Bowl & Rich Vanilla Scoop",
    vesselName: "Sundae glass",
    maxItems: 7,
    arrangement: "scoop",
    lidTitle: "little tide",
    lidSub: "ARTISAN SUNDAE",
    endingStamp: "SWEET TREAT",
    ingredients: [
      { id: "chocolate_icecream", name: "Dark Dutch Chocolate Scoop", price: 50, group: "scoop", art: "chocolate_icecream", color: "#451a03", isVeg: true, allergens: ["Dairy"] },
      { id: "strawberry_icecream", name: "Real Strawberry Cream Scoop", price: 50, group: "scoop", art: "strawberry_icecream", color: "#f43f5e", isVeg: true, allergens: ["Dairy"] },
      { id: "mango_icecream", name: "Alphonso Mango Scoop", price: 55, group: "scoop", art: "mango_icecream", color: "#f59e0b", isVeg: true, allergens: ["Dairy"] },
      { id: "brownie", name: "Warm Fudgy Brownie Bits", price: 45, group: "topping", art: "brownie", color: "#291408", isVeg: true, allergens: ["Gluten", "Dairy"] },
      { id: "cookie_pieces", name: "Crushed Oreo Cookie", price: 30, group: "topping", art: "cookie_pieces", color: "#1c1917", isVeg: true, allergens: ["Gluten"] },
      { id: "chocochips", name: "Belgian Chocolate Chips", price: 25, group: "topping", art: "chocochips", color: "#451a03", isVeg: true },
      { id: "wafers", name: "Crispy Vanilla Wafer Stick", price: 20, group: "topping", art: "wafers", color: "#ca8a04", isVeg: true, allergens: ["Gluten"] },
      { id: "nuts", name: "Roasted Almonds & Cashews", price: 35, group: "topping", art: "nuts", color: "#b45309", isVeg: true, allergens: ["Nuts"] },
    ],
    sauces: [
      { id: "choc_syrup", name: "Hot Fudge Chocolate", price: 25, color: "#230e03", lineY: 15, loops: 8 },
      { id: "caramel_syrup", name: "Golden Salted Caramel", price: 25, color: "#d97706", lineY: 18, loops: 6 },
      { id: "strawberry_syrup", name: "Wild Strawberry Coulis", price: 25, color: "#e11d48", lineY: 20, loops: 6 },
    ],
    toppings: [
      { id: "rainbow_sprinkles", name: "Rainbow Sprinkles", price: 15, color: "#38bdf8" },
      { id: "cherry", name: "Glace Cherries", price: 20, color: "#be123c" },
    ],
    coachingHints: {
      empty: "Stack your scoops of ice cream into the sundae bowl.",
      missingProtein: "Add warm brownie pieces or crushed cookies.",
      fewItems: "Toss in chocolate chips, crunchy nuts, or wafer rolls.",
      missingSauce: "Drizzle rich hot fudge or salted caramel syrup.",
      missingTopping: "Crown with rainbow sprinkles and a sweet cherry.",
      complete: "A heavenly sweet sundae creation!",
    },
  },

  // 9. PASTA
  pasta: {
    id: "pasta",
    name: "Pasta",
    tagline: "AL DENTE · RICH ITALIAN SAUCES",
    badge: "Popular",
    basePrice: 249,
    baseItemName: "Artisan Penne Rigate Base",
    vesselName: "Pasta bowl",
    maxItems: 7,
    arrangement: "fill",
    lidTitle: "little tide",
    lidSub: "ITALIAN PASTA",
    endingStamp: "BON APPETITO",
    ingredients: [
      { id: "fusilli", name: "Spiral Fusilli Pasta", price: 40, group: "base", art: "fusilli", color: "#fef08a", isVeg: true, allergens: ["Gluten"] },
      { id: "spaghetti", name: "Long Spaghetti Strands", price: 45, group: "base", art: "spaghetti", color: "#fde047", isVeg: true, allergens: ["Gluten"] },
      { id: "pasta_chicken", name: "Herb Roasted Chicken", price: 85, group: "protein", art: "chicken_patty", color: "#b45309", isVeg: false },
      { id: "pasta_paneer", name: "Sautéed Paneer Cubes", price: 59, group: "protein", art: "paneer", color: "#f8fafc", isVeg: true, allergens: ["Dairy"] },
      { id: "pasta_mushroom", name: "Sautéed Button Mushrooms", price: 45, group: "fresh", art: "mushroom", color: "#a8a29e", isVeg: true },
      { id: "pasta_broccoli", name: "Tender Broccoli Florets", price: 45, group: "fresh", art: "broccoli", color: "#15803d", isVeg: true },
      { id: "pasta_capsicum", name: "Tri-Color Bell Peppers", price: 35, group: "fresh", art: "capsicum", color: "#16a34a", isVeg: true },
      { id: "pasta_olives", name: "Sliced Kalamata Olives", price: 40, group: "fresh", art: "olives", color: "#1c1917", isVeg: true },
    ],
    sauces: [
      { id: "white_sauce", name: "Creamy Alfredo White Sauce", price: 35, color: "#fef3c7", lineY: 15, loops: 7, allergens: ["Dairy"] },
      { id: "red_sauce", name: "Classic Arrabbiata Red Sauce", price: 0, color: "#b91c1c", lineY: 18, loops: 7, spicyLevel: 2 },
      { id: "pink_sauce", name: "Rosa Mixed Pink Sauce", price: 35, color: "#f87171", lineY: 20, loops: 7, allergens: ["Dairy"] },
      { id: "pasta_pesto", name: "Genovese Basil Pesto", price: 45, color: "#15803d", lineY: 22, loops: 6, allergens: ["Dairy"] },
    ],
    toppings: [
      { id: "parmesan_dust", name: "Grated Parmesan", price: 35, color: "#fef9c3", allergens: ["Dairy"] },
      { id: "chilli_flakes", name: "Crushed Red Pepper", price: 10, color: "#dc2626" },
      { id: "oregano", name: "Dried Tuscan Oregano", price: 10, color: "#4d7c0f" },
    ],
    coachingHints: {
      empty: "Choose your penne, fusilli or spaghetti base.",
      missingProtein: "Mix in roasted chicken, sautéed paneer or mushrooms.",
      fewItems: "Toss in broccoli florets, bell peppers, or olives.",
      missingSauce: "Coat noodles with rich Alfredo, Arrabbiata or Pesto.",
      missingTopping: "Dust with aged parmesan cheese and oregano.",
      complete: "Silky, fragrant, and piping hot!",
    },
  },

  // 10. MILKSHAKES & SMOOTHIES
  shake: {
    id: "shake",
    name: "Milkshakes & Smoothies",
    tagline: "CREAMY · BLENDED THICK & CHILLED",
    badge: "Trending",
    basePrice: 159,
    baseItemName: "Chilled Whole Milk Shake Glass",
    vesselName: "Milkshake glass",
    maxItems: 6,
    arrangement: "scoop",
    lidTitle: "little tide",
    lidSub: "THICK SHAKE",
    endingStamp: "ICE COLD",
    ingredients: [
      { id: "chocolate_scoop", name: "Belgian Chocolate Shake Base", price: 45, group: "base", art: "chocolate_icecream", color: "#451a03", isVeg: true, allergens: ["Dairy"] },
      { id: "strawberry_scoop", name: "Fresh Strawberry Shake Base", price: 45, group: "base", art: "strawberry_icecream", color: "#f43f5e", isVeg: true, allergens: ["Dairy"] },
      { id: "mango_scoop", name: "Alphonso Mango Pulp Base", price: 50, group: "base", art: "mango_icecream", color: "#f59e0b", isVeg: true, allergens: ["Dairy"] },
      { id: "whipped_cream", name: "Swirled Dairy Whipped Cream", price: 35, group: "topping", art: "whipped_cream", color: "#ffffff", isVeg: true, allergens: ["Dairy"] },
      { id: "shake_brownie", name: "Crumbled Brownie Chunks", price: 40, group: "topping", art: "brownie", color: "#291408", isVeg: true, allergens: ["Gluten", "Dairy"] },
      { id: "shake_chocochips", name: "Crunchy Chocolate Chips", price: 25, group: "topping", art: "chocochips", color: "#451a03", isVeg: true },
      { id: "shake_nuts", name: "Crushed Pistachio & Cashew", price: 35, group: "topping", art: "nuts", color: "#b45309", isVeg: true, allergens: ["Nuts"] },
      { id: "shake_wafers", name: "Chocolate Rolled Wafer", price: 20, group: "topping", art: "wafers", color: "#ca8a04", isVeg: true, allergens: ["Gluten"] },
    ],
    sauces: [
      { id: "choc_syrup", name: "Chocolate Fudge Drizzle", price: 20, color: "#230e03", lineY: 15, loops: 7 },
      { id: "caramel_syrup", name: "Toffee Caramel Drizzle", price: 20, color: "#d97706", lineY: 18, loops: 6 },
      { id: "strawberry_syrup", name: "Berry Strawberry Syrup", price: 20, color: "#e11d48", lineY: 20, loops: 6 },
    ],
    toppings: [
      { id: "rainbow_sprinkles", name: "Colorful Sprinkles", price: 15, color: "#38bdf8" },
      { id: "cherry", name: "Cocktail Cherry", price: 15, color: "#be123c" },
    ],
    coachingHints: {
      empty: "Select your shake flavor foundation.",
      missingProtein: "Top with a mountain of whipped cream.",
      fewItems: "Drop in brownie chunks, choco chips, or wafer sticks.",
      missingSauce: "Spiral chocolate or caramel syrup over the top.",
      missingTopping: "Add sprinkles and drop the cherry on top.",
      complete: "Thick, frosty, and ready to sip!",
    },
  },

  // 11. WAFFLES & PANCAKES
  waffle: {
    id: "waffle",
    name: "Waffles & Pancakes",
    tagline: "GOLDEN & CRISP · FLUFFY STACKS",
    badge: "Chef's Pick",
    basePrice: 189,
    baseItemName: "Golden Crispy Belgian Waffle",
    vesselName: "Waffle platter",
    maxItems: 7,
    arrangement: "waffle",
    lidTitle: "little tide",
    lidSub: "BELGIAN WAFFLE",
    endingStamp: "WARM & CRISP",
    ingredients: [
      { id: "classic_pancake", name: "Fluffy Golden Buttermilk Pancake", price: 45, group: "base", art: "classic_pancake", color: "#f59e0b", isVeg: true, allergens: ["Gluten", "Dairy"] },
      { id: "fresh_strawberries", name: "Sliced Fresh Strawberries", price: 40, group: "topping", art: "fresh_strawberries", color: "#ef4444", isVeg: true },
      { id: "banana_slices", name: "Caramelized Banana Coins", price: 30, group: "topping", art: "banana_slices", color: "#fef08a", isVeg: true },
      { id: "blueberries", name: "Plump Wild Blueberries", price: 45, group: "topping", art: "blueberries", color: "#4338ca", isVeg: true },
      { id: "waffle_chocochips", name: "Melting Chocolate Morsels", price: 25, group: "topping", art: "chocochips", color: "#451a03", isVeg: true },
      { id: "waffle_whipped_cream", name: "Dollop of Whipped Cream", price: 30, group: "topping", art: "whipped_cream", color: "#ffffff", isVeg: true, allergens: ["Dairy"] },
      { id: "waffle_nuts", name: "Toasted Pecans & Walnuts", price: 35, group: "topping", art: "nuts", color: "#b45309", isVeg: true, allergens: ["Nuts"] },
      { id: "butter_pat", name: "Pure Salted Butter Rosette", price: 20, group: "topping", art: "butter_pat", color: "#fef3c7", isVeg: true, allergens: ["Dairy"] },
    ],
    sauces: [
      { id: "maple_syrup", name: "100% Pure Canadian Maple Syrup", price: 30, color: "#b45309", lineY: 15, loops: 7 },
      { id: "choc_syrup", name: "Warm Belgian Chocolate Sauce", price: 25, color: "#230e03", lineY: 18, loops: 7 },
      { id: "honey", name: "Raw Clover Honey", price: 25, color: "#ca8a04", lineY: 20, loops: 6 },
      { id: "caramel_syrup", name: "Salted Butter Caramel", price: 25, color: "#d97706", lineY: 22, loops: 6 },
    ],
    toppings: [
      { id: "icing_sugar", name: "Dusted Powdered Sugar", price: 10, color: "#f8fafc" },
      { id: "chocochips", name: "Mini Crispy Pearls", price: 15, color: "#451a03" },
    ],
    coachingHints: {
      empty: "Crispy waffle or fluffy pancake ready on the griddle.",
      missingProtein: "Crown with a dollop of whipped cream or butter.",
      fewItems: "Scatter fresh berries, banana slices, and toasted nuts.",
      missingSauce: "Generously pour maple syrup, chocolate or honey.",
      missingTopping: "Dust with sweet powdered sugar.",
      complete: "Warm, caramelized, and ready to savor!",
    },
  },

  // 12. POKE BOWL
  poke: {
    id: "poke",
    name: "Poke Bowl",
    tagline: "POKE · MADE YOUR WAY",
    badge: "Popular",
    basePrice: 289,
    baseItemName: "Seasoned Sushi Rice Base",
    vesselName: "Kraft bowl",
    maxItems: 7,
    arrangement: "scatter",
    lidTitle: "little tide",
    lidSub: "POKE BOWL",
    endingStamp: "SEALED FRESH",
    ingredients: [
      { id: "salmon", name: "Sashimi Salmon Cubes", price: 99, group: "protein", art: "salmon", color: "#f87171", isVeg: false },
      { id: "tuna", name: "Wild Yellowfin Tuna", price: 110, group: "protein", art: "tuna", color: "#e11d48", isVeg: false },
      { id: "tofu", name: "Sesame Baked Tofu", price: 59, group: "protein", art: "tofu", color: "#fef08a", isVeg: true, allergens: ["Soy"] },
      { id: "avocado", name: "Sliced Hass Avocado", price: 59, group: "fresh", art: "avocado", color: "#84cc16", isVeg: true },
      { id: "edamame", name: "Steamed Edamame Beans", price: 45, group: "fresh", art: "edamame", color: "#22c55e", isVeg: true, allergens: ["Soy"] },
      { id: "cucumber", name: "Japanese Cucumber Coins", price: 30, group: "fresh", art: "cucumber", color: "#10b981", isVeg: true },
      { id: "mango", name: "Sweet Ripe Mango Chunks", price: 45, group: "fresh", art: "mango", color: "#fbbf24", isVeg: true },
      { id: "cabbage", name: "Pickled Red Cabbage", price: 30, group: "fresh", art: "cabbage", color: "#a855f7", isVeg: true },
    ],
    sauces: [
      { id: "spicy_mayo", name: "Spicy Sriracha Mayo", price: 20, color: "#f97316", lineY: 15, loops: 6, spicyLevel: 2 },
      { id: "shoyu", name: "Traditional Shoyu Sauce", price: 0, color: "#55291a", lineY: 18, loops: 7, allergens: ["Soy"] },
      { id: "sesame_ginger", name: "Toasted Sesame Ginger", price: 20, color: "#ca8a04", lineY: 20, loops: 6, allergens: ["Sesame"] },
    ],
    toppings: [
      { id: "sesame", name: "Black & White Sesame", price: 15, color: "#374151", allergens: ["Sesame"] },
      { id: "nori", name: "Crispy Nori Seaweed", price: 20, color: "#1f2937" },
      { id: "crispy_onion", name: "Shallot Crisps", price: 20, color: "#b45309" },
    ],
    coachingHints: {
      empty: "Start with fresh protein. Drag it in, or tap to add.",
      missingProtein: "Don't forget salmon, tuna, or sesame tofu.",
      fewItems: "Add avocado, edamame, cucumber and mango.",
      missingSauce: "Sauce it up with shoyu or spicy mayo.",
      missingTopping: "Finish with crispy nori and sesame seeds.",
      complete: "One very good bowl. Ready when you are.",
    },
  },
};

// Legacy exports
export const INGREDIENTS = CATEGORIES.burger.ingredients;
export const SAUCES = CATEGORIES.burger.sauces;
export const TOPPINGS = CATEGORIES.burger.toppings;
export const BASE_PRICE = CATEGORIES.burger.basePrice;
export const MAX_ITEMS = CATEGORIES.burger.maxItems;
