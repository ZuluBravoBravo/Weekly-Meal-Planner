// -----------------------------
// Sample Recipes
// -----------------------------
const recipes = [
  {
    name: "Winter Minestrone Soup",
    ingredients: [
      { name: "onion", amount: 1, unit: "each", category: "Produce" },
      { name: "celery", amount: 1, unit: "stalk", category: "Produce" },
      { name: "fennel", amount: 1, unit: "bulb", category: "Produce" },
      { name: "yukon gold potatoes", amount: 2, unit: "each", category: "Produce" },
      { name: "garlic", amount: 2, unit: "cloves", category: "Produce" },
      { name: "olive oil", amount: 1, unit: "tbsp", category: "Pantry" },
      { name: "crushed whole tomatoes", amount: 1, unit: "can", category: "Pantry" },
      { name: "vegetable broth", amount: 8, unit: "cups", category: "Pantry" },
      { name: "cannellini beans", amount: 1, unit: "can", category: "Pantry" },
      { name: "red wine vinegar", amount: 2, unit: "tsp", category: "Pantry" },
      { name: "swiss chard", amount: 1.5, unit: "bunch", category: "Produce" },
      { name: "short pasta", amount: 2, unit: "cups", category: "Grains" },
      { name: "grated parmesan cheese", amount: 1, unit: "cup", category: "Dairy" },
      { name: "salt", amount: 1, unit: "pinch", category: "Pantry" },
      { name: "pepper", amount: 1, unit: "pinch", category: "Pantry" }
    ],
    instructions: `PREP
get out a large stock pot
cut half an onion into 1/2 inch pieces
slice celery crossways into 1/2 inch pieces
cut half a bulb of fennel into 1 inch pieces
peel and cut potatoes into 1 inch cubes
thinly slice the swiss chard
finely chop garlic
Open cannellini beans

Heat oil in a large stock pot over medium high heat
add onion celery fennel potatoes and garlic
cook stirring occasionally about 5 minutes
add tomatoes and their juices, stock and beans
season with two teaspoons salt and half a teaspoon pepper
increase heat to high and bring to a boil
reduce heat to a simmer and cook until potatoes are tender about 10 minutes
stir in vinegar and swiss chard, season with salt and pepper
prepare the pasta to Al Dente by following the directions included with the pasta
divide pasta evenly between bowls
ladle soup over the pasta and garnish with cheese`
  },

  {
    name: "Lentil Soup",
    ingredients: [
      { name: "olive oil", amount: 2, unit: "tbsp", category: "Pantry" },
      { name: "onion", amount: 1, unit: "each", category: "Produce" },
      { name: "carrots", amount: 1, unit: "each", category: "Produce" },
      { name: "celery", amount: 1, unit: "stalk", category: "Produce" },
      { name: "kosher salt", amount: 2, unit: "tsp", category: "Pantry" },
      { name: "lentils", amount: 1, unit: "lb", category: "Pantry" },
      { name: "peeled and chopped tomatoes", amount: 1, unit: "can", category: "Pantry" },
      { name: "vegetable broth", amount: 2, unit: "quart", category: "Pantry" },
      { name: "ground coriander", amount: 0.5, unit: "tsp", category: "Pantry" },
      { name: "cumin", amount: 0.5, unit: "tsp", category: "Pantry" },
      { name: "grains of paradise", amount: 0.5, unit: "tsp", category: "Pantry" }
    ],
    instructions: `PREP
Get out a 6 quart dutch oven
finely chop 1/2 a cup of onion
finely chop 1/2 a cup of carrot
finely chop 1/2 a cup of celery
open the can of tomatoes

place the olive oil into the dutch oven
sit over medium heat
once hot add the onion, carrot, and celery
add salt

sweat for 6 to 7 minutes 
until the onions are translucent

add lentils, tomatoes, broth, coriander, cumin, grains of paradise
stir to combine

increase the heat to high and bring just to a boil

cover, reduce the heat to low, simmer for 35 to 40 minutes 
until the lentils are tender
serve immediately.`
  },

  {
    name: "Omelette",
    ingredients: [
      { name: "egg", amount: 3, unit: "each", category: "Dairy" },
      { name: "milk", amount: 0.25, unit: "cup", category: "Dairy" },
      { name: "cheddar cheese", amount: 2, unit: "oz", category: "Dairy" },
      { name: "salt", amount: 1, unit: "tsp", category: "Pantry" }
    ],
    instructions: "Beat eggs and milk, heat pan, pour eggs, add cheese, fold and serve."
  },

  {
    name: "Chocolate Chip Cookies",
    ingredients: [
      { name: "all-purpose flour", amount: 2, unit: "cup", category: "Grains" },
      { name: "brown sugar", amount: 1, unit: "cup", category: "Pantry" },
      { name: "butter", amount: 0.5, unit: "lb", category: "Dairy" },
      { name: "chocolate chips", amount: 1, unit: "cup", category: "Pantry" },
      { name: "egg", amount: 1, unit: "each", category: "Dairy" }
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
function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

function toMixedFraction(value) {
  const whole = Math.floor(value);
  const frac = value - whole;
  if (frac === 0) return `${whole}`;

  const denominators = [2,3,4,6,8,12,16];
  let bestNumerator=1, bestDenominator=2, minError=Infinity;
  for(let d of denominators){
    let n = Math.round(frac*d);
    let error = Math.abs(frac-n/d);
    if(error<minError && n>0){ minError=error; bestNumerator=n; bestDenominator=d; }
  }
  const divisor=gcd(bestNumerator,bestDenominator);
  const numerator = bestNumerator/divisor;
  const denominator = bestDenominator/divisor;
  if(whole===0) return `${numerator}/${denominator}`;
  return `${whole} ${numerator}/${denominator}`;
}

// -----------------------------
// Generate Shopping List (sorted by category and alphabetically)
// -----------------------------
function generateShoppingList(selectedRecipes) {
  const totals = {};

  selectedRecipes.forEach(recipe => {
    recipe.ingredients.forEach(ing => {
      const key = ing.name;
      let amount = ing.amount;
      let unit = ing.unit;
      const category = ing.category || "Other";

      if(volumeToTsp[unit]) { amount *= volumeToTsp[unit]; unit="tsp"; }
      else if(weightToOz[unit]) { amount *= weightToOz[unit]; unit="oz"; }

      if(!totals[key]) totals[key]={amount:0, unit, category};
      totals[key].amount += amount;
    });
  });

  const shoppingItems = [];
  for(let ing in totals){
    let {amount, unit, category} = totals[ing];
    let formattedAmount="";

    if(unit==="tsp"){
      const cups=Math.floor(amount/volumeToTsp.cup); amount-=cups*volumeToTsp.cup;
      const tbsp=Math.floor(amount/volumeToTsp.tbsp); amount-=tbsp*volumeToTsp.tbsp;
      const tsp=amount;
      const parts=[];
      if(cups) parts.push(`${toMixedFraction(cups)} cup`);
      if(tbsp) parts.push(`${toMixedFraction(tbsp)} tbsp`);
      if(tsp) parts.push(`${toMixedFraction(tsp)} tsp`);
      formattedAmount = parts.join(" + ");
    } else if(unit==="oz"){
      const lbs=Math.floor(amount/weightToOz.lb); amount-=lbs*weightToOz.lb;
      const oz=amount;
      const parts=[];
      if(lbs) parts.push(`${lbs} lb`);
      if(oz) parts.push(`${toMixedFraction(oz)} oz`);
      formattedAmount=parts.join(" + ");
    } else {
      formattedAmount = `${toMixedFraction(amount)} ${unit}`;
    }

    shoppingItems.push({name:ing, amount:formattedAmount, category});
  }

  const categoryOrder=["Produce","Meat","Dairy","Grains","Pantry","Other"];
  shoppingItems.sort((a,b)=>{
    const catDiff = categoryOrder.indexOf(a.category)-categoryOrder.indexOf(b.category);
    return catDiff!==0?catDiff:a.name.localeCompare(b.name);
  });

  return shoppingItems.map(item=>`${item.name}: ${item.amount}`);
}

// -----------------------------
// UI Logic
// -----------------------------
document.addEventListener("DOMContentLoaded",()=>{
  const days=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

  // Populate dropdowns
  days.forEach(day=>{
    const select=document.getElementById(day);
    recipes.forEach(r=>{
      const option=document.createElement("option");
      option.value=r.name;
      option.textContent=r.name;
      select.appendChild(option);
    });
  });

  // Generate
  document.getElementById("generate-btn").addEventListener("click",()=>{
    const selectedRecipes=[];
    days.forEach(day=>{
      const select=document.getElementById(day);
      const recipe=recipes.find(r=>r.name===select.value);
      if(recipe) selectedRecipes.push(recipe);
    });

    // Shopping list
    const shopping = generateShoppingList(selectedRecipes);
    const shoppingDiv=document.getElementById("shopping-list");
    shoppingDiv.innerHTML="<h2>Shopping List</h2><ul>"+shopping.map(i=>`<li>${i}</li>`).join("")+"</ul>";

    // Recipes
    const recipesDiv=document.getElementById("recipes");
    recipesDiv.innerHTML="<h2>Recipes</h2>";
    selectedRecipes.forEach(r=>{
      const div=document.createElement("div");
      div.className="recipe";
      let html=`<h3>${r.name}</h3>`;
      html+="<h4>Ingredients</h4><ul>";
      r.ingredients.forEach(ing=>{
        html+=`<li>${toMixedFraction(ing.amount)} ${ing.unit} ${ing.name}</li>`;
      });
      html+="</ul>";

      html+="<h4>Instructions</h4>";
      r.instructions.split("\n").forEach(step=>{
        if(step.trim()==="") html+="<br>";
        else html+=`<p>${step.trim()}</p>`;
      });

      div.innerHTML=html;
      recipesDiv.appendChild(div);
    });
  });

  // Print
  document.getElementById("print-btn").addEventListener("click",()=>window.print());
});
