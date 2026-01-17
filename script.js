
// -----------------------------
// Sample Recipes
// -----------------------------
const recipes = [
  {
    name: "Pancakes",
    ingredients: [
      { name: "all-purpose flour", amount: 1.5, unit: "cup" },
      { name: "milk", amount: 1, unit: "cup" },
      { name: "egg", amount: 2, unit: "each" },
      { name: "sugar", amount: 2, unit: "tbsp" }
    ]
  },
  {
    name: "Omelette",
    ingredients: [
      { name: "egg", amount: 3, unit: "each" },
      { name: "milk", amount: 0.25, unit: "cup" },
      { name: "cheddar cheese", amount: 2, unit: "oz" },
      { name: "salt", amount: 1, unit: "tsp" }
    ]
  },
  {
    name: "Chocolate Chip Cookies",
    ingredients: [
      { name: "all-purpose flour", amount: 2, unit: "cup" },
      { name: "brown sugar", amount: 1, unit: "cup" },
      { name: "butter", amount: 0.5, unit: "lb" },
      { name: "chocolate chips", amount: 1, unit: "cup" },
      { name: "egg", amount: 1, unit: "each" }
    ]
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
  // approximate fraction to nearest 1/16
  const denominator = 16;
  const numerator = Math.round(frac * denominator);
  if (numerator === 0) return `${whole}`;
  return whole > 0 ? `${whole} ${numerator}/${denominator}` : `${numerator}/${denominator}`;
}

// -----------------------------
// Sum Ingredients Across Recipes
// -----------------------------
function generateShoppingList(selectedRecipes) {
  const totals = {};

  selectedRecipes.forEach(recipe => {
    recipe.ingredients.forEach(ing => {
      const key = ing.name;
      let amount = ing.amount;
      let unit = ing.unit;

      // Convert to base unit
      if (volumeToTsp[unit]) {
        amount = amount * volumeToTsp[unit];
        unit = "tsp";
      } else if (weightToOz[unit]) {
        amount = amount * weightToOz[unit];
        unit = "oz";
      } // else unit remains "each"

      if (!totals[key]) {
        totals[key] = { amount: 0, unit: unit };
      }
      totals[key].amount += amount;
    });
  });

  // Convert back to readable units
  const shoppingList = [];
  for (let ing in totals) {
    let { amount, unit } = totals[ing];

    // Volume
    if (unit === "tsp") {
      let cups = Math.floor(amount / volumeToTsp["cup"]);
      amount -= cups * volumeToTsp["cup"];
      let tbsp = Math.floor(amount / volumeToTsp["tbsp"]);
      amount -= tbsp * volumeToTsp["tbsp"];
      let tsp = amount;

      let parts = [];
      if (cups > 0) parts.push(toMixedFraction(cups));
      if (tbsp > 0) parts.push(toMixedFraction(tbsp));
      if (tsp > 0) parts.push(toMixedFraction(tsp));

      shoppingList.push(`${ing}: ${parts.join(" + ")}`);
    }

    // Weight
    else if (unit === "oz") {
      let lbs = Math.floor(amount / weightToOz["lb"]);
      amount -= lbs * weightToOz["lb"];
      let oz = amount;

      let parts = [];
      if (lbs > 0) parts.push(`${lbs} lb`);
      if (oz > 0) parts.push(`${toMixedFraction(oz)} oz`);

      shoppingList.push(`${ing}: ${parts.join(" + ")}`);
    }

    // Each
    else {
      shoppingList.push(`${ing}: ${toMixedFraction(amount)} ${unit}`);
    }
  }

  return shoppingList;
}
