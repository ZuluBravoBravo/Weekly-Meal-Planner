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
// Convert decimal to mixed fraction
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
      r.instructions.split(",").forEach(step=>{
        html+=`<p>${step.trim()}</p>`;
      });

      div.innerHTML = html;
      recipesDiv.appendChild(div);
    });
  });

  // Print
  document.getElementById("print-btn").addEventListener("click",()=>window.print());
});
