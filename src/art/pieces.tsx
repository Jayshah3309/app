import React from "react";

// Mapping from art key to photographic cutout path
export const FOOD_IMAGE_MAP: Record<string, string> = {
  // Poke
  salmon: "/images/food/poke/salmon.png",
  tuna: "/images/food/poke/tuna.png",
  tofu: "/images/food/poke/tofu.png",
  avocado: "/images/food/poke/avocado.png",
  edamame: "/images/food/poke/edamame.png",
  cucumber: "/images/food/poke/cucumber.png",
  mango: "/images/food/poke/mango.png",
  cabbage: "/images/food/poke/cabbage.png",

  // Burger
  veg_patty: "/images/food/burger/veg_patty.png",
  chicken_patty: "/images/food/burger/chicken_patty.png",
  burger_cheese: "/images/food/burger/burger_cheese.png",
  lettuce: "/images/food/burger/lettuce.png",
  tomato: "/images/food/burger/tomato.png",
  onion: "/images/food/burger/onion.png",
  pickles: "/images/food/burger/pickles.png",
  top_bun: "/images/food/burger/top_bun.png",

  // Pizza
  mozzarella: "/images/food/pizza/mozzarella.png",
  paneer: "/images/food/pizza/paneer.png",
  mushroom: "/images/food/pizza/mushroom.png",
  capsicum: "/images/food/pizza/capsicum.png",
  pizza_onion: "/images/food/pizza/pizza_onion.png",
  pizza_tomato: "/images/food/pizza/pizza_tomato.png",
  olives: "/images/food/pizza/olives.png",
  corn: "/images/food/pizza/corn.png",

  // Noodle
  hakka_noodles: "/images/food/noodle/hakka_noodles.png",
  ramen_noodles: "/images/food/noodle/ramen_noodles.png",
  chicken_wok: "/images/food/noodle/chicken_wok.png",
  egg: "/images/food/noodle/egg.png",
  noodle_paneer: "/images/food/noodle/noodle_paneer.png",
  noodle_veggies: "/images/food/noodle/noodle_veggies.png",
  noodle_mushroom: "/images/food/noodle/noodle_mushroom.png",
  spring_onion: "/images/food/noodle/spring_onion.png",

  // Tacos & Burritos
  crispy_taco_shell: "/images/food/taco/crispy_taco_shell.png",
  taco_paneer: "/images/food/pizza/paneer.png",
  taco_chicken: "/images/food/noodle/chicken_wok.png",
  black_beans: "/images/food/taco/black_beans.png",
  mexican_rice: "/images/food/taco/mexican_rice.png",

  // Sandwiches & Subs
  sub_roll: "/images/food/sandwich/sub_roll.png",

  // Rice & Protein Bowls
  brown_rice: "/images/food/ricebowl/brown_rice.png",
  chickpeas: "/images/food/ricebowl/chickpeas.png",
  broccoli: "/images/food/ricebowl/broccoli.png",
  carrot: "/images/food/ricebowl/carrot.png",

  // Loaded Fries & Nachos
  nacho_chips: "/images/food/fries/nacho_chips.png",
  potato_wedges: "/images/food/fries/potato_wedges.png",
  jalapenos: "/images/food/burger/pickles.png",

  // Ice Cream & Sundaes
  chocolate_icecream: "/images/food/icecream/chocolate_icecream.png",
  strawberry_icecream: "/images/food/icecream/strawberry_icecream.png",
  mango_icecream: "/images/food/icecream/mango_icecream.png",
  brownie: "/images/food/icecream/brownie.png",
  cookie_pieces: "/images/food/icecream/cookie_pieces.png",
  chocochips: "/images/food/icecream/chocochips.png",
  wafers: "/images/food/icecream/wafers.png",
  nuts: "/images/food/icecream/nuts.png",

  // Pasta
  fusilli: "/images/food/pasta/fusilli.png",
  spaghetti: "/images/food/pasta/spaghetti.png",

  // Shakes & Smoothies
  whipped_cream: "/images/food/shake/whipped_cream.png",

  // Waffles & Pancakes
  classic_pancake: "/images/food/waffle/classic_pancake.png",
  fresh_strawberries: "/images/food/waffle/fresh_strawberries.png",
  banana_slices: "/images/food/waffle/banana_slices.png",
  blueberries: "/images/food/waffle/blueberries.png",
  butter_pat: "/images/food/waffle/butter_pat.png",
};

export const PieceArt: React.FC<{ art: string; size?: number }> = ({ art, size = 48 }) => {
  const imageSrc = FOOD_IMAGE_MAP[art];

  if (imageSrc) {
    return (
      <div
        style={{ width: size, height: size }}
        className="relative flex items-center justify-center select-none pointer-events-none"
      >
        <div
          style={{ width: size * 0.85, height: size * 0.85 }}
          className="absolute rounded-full bg-stone-900/15 blur-[4px] translate-y-1 translate-x-0.5"
        />
        <img
          src={imageSrc}
          alt={art}
          width={size}
          height={size}
          className="relative w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.12)] transition-transform duration-200"
          loading="eager"
        />
      </div>
    );
  }

  return <div style={{ width: size, height: size }} className="rounded-full bg-amber-500" />;
};
