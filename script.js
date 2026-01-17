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
    ],
    instructions: "Mix all ingredients, heat a skillet over medium heat, pour batter, cook until golden on both sides."
  },
 





  
  {
    name: "Lentil Soup",
    ingredients: [
      { name: "olive oil", amount: 2, unit: "tbsp" },
      { name: "onion", amount: 1, unit: "cup" },
      { name: "carrots", amount: 0.5, unit: "cup" },
      { name: "celery", amount: 0.5, unit: "cup" },
      { name: "kosher salt", amount: 2, unit: "tsp" },
      { name: "lentils", amount: 1, unit: "lb" },
      { name: "peeled and chopped tomatoes", amount: 1, unit: "can" },
      { name: "vegetable broth", amount: 2, unit: "quart" },
      { name: "ground coriander", amount: 0.5, unit: "tsp" },
      { name: "cumin", amount: 0.5, unit: "tsp" },
      { name: "grains of paradise", amount: 0.5, unit: "tsp" }
    ],
    instructions:
      "Get out a 6 quart dutch oven, finely chop the onion, finely chop the carrot, finely chop the celery, peel and chop the tomatoes, place the olive oil into a large 6 quart dutch oven, sit over medium heat, once hot add the finely chopped onion, finely chopped carrot, finely chopped celery, salt, sweat for 6 to 7 minutes until the onions are translucent, add the lentils, tomatoes, broth, coriander, cumin, grains of paradise, stir to combine, increase the heat to high, bring just to a boil, reduce the heat to low, cover and simmer for 35 to 40 minutes until the lentils are tender, serve immediately."
  },

  
  
  {
    name: "Omelette",
    ingredients: [
      { name: "egg", amount: 3, unit: "each" },
      { name: "milk", amount: 0.25, unit: "cup" },
      { name: "cheddar cheese", amount: 2, unit: "oz" },
      { name: "salt", amount: 1, unit: "tsp" }
    ],
    instructions: "Beat eggs and milk, heat pan, pour eggs, add cheese, fold and serve."
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
    instructions: "Cream butter and sugar, add egg, mix in dry ingredients, fold in chips, bake until golden."
  }
];

// -----------------------------
// Unit Conversion Tables
// -----------------------------
const volumeToTsp = { tsp:1, tbsp:3, cup:48, pint:96, quart:192 };
const weightToOz = { oz:1, lb:16 };

// -----------------------------
// Convert decimal to simple fraction (1/2, 1/3, 1/4, etc.)
// -----------------------------
function toMixedFraction(value) {
  const whole = Math.floor(value);
  const frac = value - whole;

  if (frac === 0) return `${whole}`;

  // common denominators to support: 2, 3, 4, 6, 8, 12, 16
  const denominators = [2, 3, 4, 6, 8, 12, 16];
  let bestNumerator = 1;
  let bestDenominator = 2;
  let minError = Infinity;

  for (let d of denominators) {
    let n = Math.round(frac * d);
    let error = Math.abs(frac - n / d);
    if (error < minError && n > 0) {
      minError = error;
      bestNumerator = n;
      bestDenominator = d;
    }
  }

  // reduce fraction
  const divisor = gcd(bestNumerator, bestDenominator);
  const numerator = bestNumerator / divisor;
  const denominator = bestDenominator / divisor;

  if (whole === 0) return `${numerator}/${denominator}`;
  return `${whole} ${numerator}/${denominator}`;
}

// greatest common divisor helper
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
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

      if (!totals[key]) totals[key] = { amount:0, unit };
      totals[key].amount += amount;
    });
  });

  const shoppingList = [];
  for (let ing in totals) {
    let {amount, unit} = totals[ing];

    if (unit==="tsp") {
      const cups = Math.floor(amount/volumeToTsp.cup);
      amount -= cups*volumeToTsp.cup;
      const tbsp = Math.floor(amount/volumeToTsp.tbsp);
      amount -= tbsp*volumeToTsp.tbsp;
      const tsp = amount;
      const parts = [];
      if(cups) parts.push(`${cups} cup`);
      if(tbsp) parts.push(`${tbsp} tbsp`);
      if(tsp) parts.push(`${toMixedFraction(tsp)} tsp`);
      shoppingList.push(`${ing}: ${parts.join(" + ")}`);
    } else if(unit==="oz") {
      const lbs = Math.floor(amount/weightToOz.lb);
      amount -= lbs*weightToOz.lb;
      const oz = amount;
      const parts = [];
      if(lbs) parts.push(`${lbs} lb`);
      if(oz) parts.push(`${toMixedFraction(oz)} oz`);
      shoppingList.push(`${ing}: ${parts.join(" + ")}`);
    } else {
      shoppingList.push(`${ing}: ${toMixedFraction(amount)} ${unit}`);
    }
  }
  return shoppingList;
}

// -----------------------------
// UI Logic
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const days = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

  // Populate dropdowns
  days.forEach(day => {
    const select = document.getElementById(day);
    recipes.forEach(r=>{
      const option = document.createElement("option");
      option.value = r.name;
      option.textContent = r.name;
      select.appendChild(option);
    });
  });

  // Generate
  document.getElementById("generate-btn").addEventListener("click", () => {
    const selectedRecipes = [];
    days.forEach(day=>{
      const select = document.getElementById(day);
      const recipe = recipes.find(r=>r.name===select.value);
      if(recipe) selectedRecipes.push(recipe);
    });

    // Shopping list
    const shopping = generateShoppingList(selectedRecipes);
    const shoppingDiv = document.getElementById("shopping-list");
    shoppingDiv.innerHTML = "<h2>Shopping List</h2><ul>"+shopping.map(i=>`<li>${i}</li>`).join("")+"</ul>";

    // Recipes
    const recipesDiv = document.getElementById("recipes");
    recipesDiv.innerHTML = "<h2>Recipes</h2>";

    selectedRecipes.forEach(r=>{
      const div = document.createElement("div");
      div.className="recipe";
      let html = `<h3>${r.name}</h3>`;

      html+="<h4>Ingredients</h4><ul>";
      r.ingredients.forEach(ing=>{
        html+=`<li>${toMixedFraction(ing.amount)} ${ing.unit} ${ing.name}</li>`;
      });
      html+="</ul>";

      html+="<h4>Instructions</h4>";
      r.instructions.split("\n").forEach(step => {
        html += `<p>${step.trim()}</p>`;
      });

      div.innerHTML = html;
      recipesDiv.appendChild(div);
    });
  });

  // Print
  document.getElementById("print-btn").addEventListener("click",()=>window.print());
});
