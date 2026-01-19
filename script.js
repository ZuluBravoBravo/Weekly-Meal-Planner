<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Planner</title>

<style>
  body { font-family: Arial, sans-serif; margin: 20px; }
  h1, h2, h3 { text-align: center; }

  .day-selector, #standalone-section, #generate-btn, #print-btn {
    margin-bottom: 15px;
    text-align: center;
  }

  label { font-weight: bold; margin-right: 10px; }
  select { padding: 5px; }

  #generate-btn, #print-btn {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    margin: 10px auto;
    display: block;
  }

  #output { margin-top: 40px; }

  .shopping-list, .recipe {
    margin-bottom: 40px;
  }

  .print-page {
    page-break-before: always;
  }

  ul { list-style-type: disc; margin-left: 20px; }

  /* ---------- PRINT RULES ---------- */
  @media print {
    body * {
      visibility: hidden;
    }

    #output, #output * {
      visibility: visible;
    }

    #output {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }

    #print-btn {
      display: none;
    }
  }
</style>
</head>
<body>

<h1>Weekly Meal Planner</h1>

<div id="selectors">
  <div class="day-selector"><label>Monday:</label><select id="monday"></select></div>
  <div class="day-selector"><label>Tuesday:</label><select id="tuesday"></select></div>
  <div class="day-selector"><label>Wednesday:</label><select id="wednesday"></select></div>
  <div class="day-selector"><label>Thursday:</label><select id="thursday"></select></div>
  <div class="day-selector"><label>Friday:</label><select id="friday"></select></div>
  <div class="day-selector"><label>Saturday:</label><select id="saturday"></select></div>
  <div class="day-selector"><label>Sunday:</label><select id="sunday"></select></div>
</div>

<hr>

<div id="standalone-section">
  <h3>Add Individual Items</h3>
  <div id="standalone-checkboxes"></div>
</div>

<button id="generate-btn">Generate Recipes & Shopping List</button>
<button id="print-btn" onclick="window.print()">Print / Save PDF</button>

<div id="output">
  <div id="shopping-list" class="shopping-list"></div>
  <div id="recipes"></div>
</div>

<script>
// -----------------------------
// Recipes
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
      { name: "swiss chard", amount: 1.5 , unit: "bunch", category: "Produce" },
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
peel and cut potatos into 1 inch cubes
thinly slice the swiss chard
finely chop garlic
Open cannelli beans

Heat oil in a large stock pot over medium high heat
add onion celery fennel potatoes and garlic
cook stirring occasionally about 5 minutes
add tomatoes and their juices stock and Kennelly beans
season with two teaspoons salt and half a teaspoon pepper
increase heat to high and bring to a boil
reduce heat to a simmer and cook until potatoes are tender about 10 minutes
stir in vinegar and swiss chard season with salt and pepper
prepare the pasta to Al Dente by following the directions included with the pasta
divide pasta evenly between bowls
little soup over the pasta and garnish with cheese`
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

add
lentils, tomatoes, broth, coriander, cumin, grains of paradise
stir to combine

increase the heat to high and bring just to a boil

cover, reduce the heat to low, simmer for 35 to 40 minutes 
until the lentils are tender
serve immediately.`
  },
  {
    name: "Left Overs",
    ingredients: [
      { name: "leftovers", amount: 0, unit: "each", category: "Pantry" }
    ],
    instructions: `PREP
Get out of fridge
microwave
eat`
  }
];

// -----------------------------
// Standalone checkbox items
// -----------------------------
const standaloneItems = [
  { name: "milk", amount: 1, unit: "cup", category: "Dairy" },
  { name: "butter", amount: 1, unit: "lb", category: "Dairy" },
  { name: "chicken breast", amount: 1, unit: "lb", category: "Meat" },
  { name: "eggs", amount: 12, unit: "each", category: "Dairy" },
  { name: "bread", amount: 1, unit: "loaf", category: "Bakery" },
  { name: "cereal", amount: 1, unit: "box", category: "Pantry" }
];

// -----------------------------
// Unit conversion
// -----------------------------
const volumeToTsp = { tsp:1, tbsp:3, cup:48, pint:96, quart:192 };
const weightToOz = { oz:1, lb:16 };

// -----------------------------
// Fraction helpers
// -----------------------------
function gcd(a,b){return b===0?a:gcd(b,a%b);}
function toMixedFraction(value){
  const whole=Math.floor(value),frac=value-whole;
  if(frac===0) return `${whole}`;
  const denominators=[2,3,4,6,8,12,16];
  let bestNumerator=1,bestDenominator=2,minError=Infinity;
  for(let d of denominators){
    let n=Math.round(frac*d),error=Math.abs(frac-n/d);
    if(error<minError && n>0){bestNumerator=n;bestDenominator=d;minError=error;}
  }
  const divisor=gcd(bestNumerator,bestDenominator);
  const numerator=bestNumerator/divisor;
  const denominator=bestDenominator/divisor;
  if(whole===0) return `${numerator}/${denominator}`;
  return `${whole} ${numerator}/${denominator}`;
}

// -----------------------------
// Shopping list builder
// -----------------------------
function generateShoppingList(allIngredients){
  const totals={};

  allIngredients.forEach(ing=>{
    let amount=ing.amount,unit=ing.unit;
    if(volumeToTsp[unit]){amount*=volumeToTsp[unit];unit="tsp";}
    else if(weightToOz[unit]){amount*=weightToOz[unit];unit="oz";}
    if(!totals[ing.name]) totals[ing.name]={amount:0,unit,category:ing.category||"Other"};
    totals[ing.name].amount+=amount;
  });

  const categories={};
  for(let name in totals){
    const {amount,unit,category}=totals[name];
    if(!categories[category]) categories[category]=[];
    categories[category].push({name,amount,unit});
  }

  const html=[];
  Object.keys(categories).sort().forEach(cat=>{
    html.push(`<h3>${cat}</h3><ul>`);
    categories[cat]
      .sort((a,b)=>a.name.localeCompare(b.name))
      .forEach(i=>{
        if(i.unit==="tsp"){
          let cups=Math.floor(i.amount/volumeToTsp.cup);i.amount-=cups*volumeToTsp.cup;
          let tbsp=Math.floor(i.amount/volumeToTsp.tbsp);i.amount-=tbsp*volumeToTsp.tbsp;
          let tsp=i.amount;
          let parts=[];
          if(cups) parts.push(`${cups} cup`);
          if(tbsp) parts.push(`${tbsp} tbsp`);
          if(tsp) parts.push(`${toMixedFraction(tsp)} tsp`);
          html.push(`<li>${i.name}: ${parts.join(" + ")}</li>`);
        } else if(i.unit==="oz"){
          let lbs=Math.floor(i.amount/weightToOz.lb);i.amount-=lbs*weightToOz.lb;
          let oz=i.amount;
          let parts=[];
          if(lbs) parts.push(`${lbs} lb`);
          if(oz) parts.push(`${toMixedFraction(oz)} oz`);
          html.push(`<li>${i.name}: ${parts.join(" + ")}</li>`);
        } else {
          html.push(`<li>${i.name}: ${toMixedFraction(i.amount)} ${i.unit}</li>`);
        }
      });
    html.push(`</ul>`);
  });

  return html.join("");
}

// -----------------------------
// UI Setup
// -----------------------------
document.addEventListener("DOMContentLoaded",()=>{
  const days=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

  // Populate recipe dropdowns
  days.forEach(day=>{
    const select=document.getElementById(day);
    recipes.forEach(r=>{
      const option=document.createElement("option");
      option.value=r.name;
      option.textContent=r.name;
      select.appendChild(option);
    });
  });

  // Populate standalone checkboxes
  const boxContainer=document.getElementById("standalone-checkboxes");
  standaloneItems.forEach((item,i)=>{
    const label=document.createElement("label");
    label.style.display="block";
    const cb=document.createElement("input");
    cb.type="checkbox";
    cb.value=i;
    label.appendChild(cb);
    label.appendChild(document.createTextNode(` ${item.name} (${item.unit})`));
    boxContainer.appendChild(label);
  });

  // Generate button
  document.getElementById("generate-btn").addEventListener("click",()=>{
    const selectedRecipes=[];
    days.forEach(day=>{
      const recipe=recipes.find(r=>r.name===document.getElementById(day).value);
      if(recipe) selectedRecipes.push(recipe);
    });

    // Checked standalone items
    const checkedStandalone=Array.from(
      document.querySelectorAll("#standalone-checkboxes input:checked")
    ).map(cb=>standaloneItems[cb.value]);

    const allIngredients=[
      ...selectedRecipes.flatMap(r=>r.ingredients),
      ...checkedStandalone
    ];

    // Shopping list
    document.getElementById("shopping-list").innerHTML=
      `<div class="print-page"><h2>Shopping List</h2>${generateShoppingList(allIngredients)}</div>`;

    // Recipes
    const recipesDiv=document.getElementById("recipes");
    recipesDiv.innerHTML="";
    selectedRecipes.forEach(r=>{
      const div=document.createElement("div");
      div.className="recipe print-page";
      let html=`<h2>${r.name}</h2><h3>Ingredients</h3><ul>`;
      r.ingredients.forEach(ing=>{
        html+=`<li>${toMixedFraction(ing.amount)} ${ing.unit} ${ing.name}</li>`;
      });
      html+="</ul><h3>Instructions</h3>";
      r.instructions.split("\n").forEach(line=>{
        if(line.trim()==="") html+="<br>";
        else html+=`<p>${line}</p>`;
      });
      div.innerHTML=html;
      recipesDiv.appendChild(div);
    });
  });
});
</script>
</body>
</html>

