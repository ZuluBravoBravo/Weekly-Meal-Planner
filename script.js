// -----------------------------
// Sample Recipes
// -----------------------------
const recipes = [
  {
    name: "Lentil Soup",
    ingredients: [
      { name: "olive oil", amount: 2, unit: "tbsp" },
      { name: "onion", amount: 1, unit: "cup" },
      { name: "carrots", amount: 0.5, unit: "cup" },
      { name: "celery", amount: 0.5, unit: "cup" },
      { name: "kosher salt", amount: 2, unit: "tsp" },
      { name: "lentils", amount: 1, unit: "lb" },
      { name: "tomatoes", amount: 1, unit: "cup" },
      { name: "vegetable broth", amount: 2, unit: "quart" },
      { name: "ground coriander", amount: 0.5, unit: "tsp" },
      { name: "cumin", amount: 0.5, unit: "tsp" },
      { name: "grains of paradise", amount: 0.5, unit: "tsp" }
    ],
    instructions:
      "Get out a 6 quart dutch oven, finely chop the onion, finely chop the carrot, finely chop the celery, peel and chop the tomatoes, place the olive oil into a large 6 quart dutch oven, sit over medium heat, once hot add the finely chopped onion, finely chopped carrot, finely chopped celery, salt, sweat for 6 to 7 minutes until the onions are translucent, add the lentils, tomatoes, broth, coriander, cumin, grains of paradise, stir to combine, increase the heat to high, bring just to a boil, reduce the heat to low, cover and simmer for 35 to 40 minutes until the lentils are tender, serve immediately."
  },
  {
    name: "Pancakes",
    ingredients: [
      { name: "all-purpose flour", amount: 1.5, unit: "cup" },
      { name: "milk", amount: 1, unit: "cup" },
      { name: "egg", amount: 2, unit: "each" },
      { name: "sugar", amount: 2, unit: "tbsp" }
    ],
    instructions:
      "Mix all ingredients, heat a skillet over medium heat, pour batter, cook until golden on both sides."
  },
  {
    name: "Omelette",
    ingredients: [
      { name: "egg", amount: 3, unit: "each" },
      { name: "milk", amount: 0.25, unit: "cup" },
      { name: "cheddar cheese", amount: 2, unit: "oz" },
      { name: "salt", amount: 1, unit: "tsp" }
    ],
    instructions:
      "Beat eggs and milk, heat pan, pour eggs, add cheese, fold and serve."
  },
  {
    name: "Chocolate Chip Cookies",
    ingredients: [
      { name: "all-purpose flour", amount: 2, unit: "cup" },
      { name: "brown sugar", amount: 1, unit: "cup" },
      { name: "butter", amount: 0.5, unit: "lb" },
      { name: "chocolate chips", amount: 1, unit: "cup" },
      { name: "egg", amount: 1, unit: "each" }
    ],
    instructions:
      "Cream butter and sugar, add egg, mix in dry ingredients, fold in chips, bake until golden."
  }
];

// -----------------------------
// Unit Conversion Tables
// -----------------------------
const volumeToTsp = {
  tsp: 1,
  tbsp: 3,
  cup: 48,
  pint: 96,
  quart: 192
};

const weightToOz = {
  oz: 1,
  lb: 16
};

// -----------------------------
// Helper: Convert Decimal to Mixed Fraction
// -----------------------------
function toMixedFraction(value) {
  const whole = Math.floor(value);
  const frac = value - whole;
  const denominator = 16;
  const numerator = Math.round(frac * denominator);

  if (numerator === 0) return `${whole}`;
  if (whole === 0) return `${numerator}/${denominator}`;
  return `${whole} ${numerator}/${denominator}`;
}

// -----------------------------
// Generate Shopping List
// -----------------------------
function generateShoppingList(selectedRecipes) {
  const totals = {};

  selectedRecipes.forEach(recipe => {
    recipe.ingredients.forEach(ing => {
      const key = ing.name;
      let amount = ing.amount;
      let unit = ing.unit;

      if (volumeToTsp[unit]) {
        amount *= volumeToTsp[unit];
        unit = "tsp";
      } else if (weightToOz[unit]) {
        amount *= weightToOz[unit];
        unit = "oz";
      }

      if (!totals[key]) {
        totals[key] = { amount: 0, unit };
      }

      totals[key].amount
