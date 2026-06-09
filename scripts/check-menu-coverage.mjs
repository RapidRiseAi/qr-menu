import { readFileSync } from "node:fs";

const expectedMenuNames = [
  "Bessie se Braaibroodjie Bord",
  "Brakke Platter",
  "Hennie se Platter",
  "Jopie se Platter",
  "Barry se Platter",
  "Jorrie se Platter",
  "Budget Brêkkie",
  "Reune Brêkkie",
  "2 Egg Omelette",
  "The Cheesy Brêkkie",
  "Focaccia - Plain with Garlic",
  "Feta and Garlic Focaccia",
  "Creamy Chicken Livers",
  "Crumbed Mushrooms",
  "Crumbed Mozzarella Balls",
  "Barry se Balle",
  "Halloumi Fingers",
  "Varkhondjie",
  "8 Buffalo Wings",
  "4 Jalapeño Poppers",
  "Rump 200g",
  "Rump 300g",
  "T-Bone 500g",
  "Stevie Steak 500g",
  "Chicken Schnitzel",
  "Chicken Stack",
  "Groot Vark Eisbein",
  "Pap & Sheba",
  "Tjippies",
  "Crispy Onion Rings",
  "Butternut",
  "Cream Spinach",
  "Groenslaai",
  "Braaibroodjie",
  "Griekse Braaislaai",
  "Chicken Salad",
  "Avo & Halloumi Salad",
  "Kippie Bakkie",
  "Varkhond Bakkie",
  "Strippies & Ribbetjies",
  "Brandsiek Bakkie",
  "330g Buffalo Wings",
  "400g Ribbetjies",
  "Hennie’s Basic Burgertjie",
  "Pulled Pork Burgertjie",
  "Classic Hennies Burger",
  "Crumbed Chicken Burger",
  "Double Cheese Biltong Burger",
  "Cheese Louise",
  "Slidertjies",
  "Hennie’s Horrog",
  "Loaded Fries - Lekka Portion",
  "Loaded Nachos",
  "Nachos Plain",
  "Margareets Pizza",
  "Hawaiian Pizza",
  "Regina Pizza",
  "Sweet Chilli Chicken Pizza",
  "Pepperoni Pizza",
  "Jalapeño Popper Pizza",
  "Varkhond Pizza",
  "Inge’s Pizza",
  "Horrog Heaven Pizza",
  "Make it Calzone",
  "Pizza Extras Selection",
  "Cookies & Cream",
  "Dom Pedro",
  "Malva Pudding",
  "Americano",
  "Cappuccino",
  "Café Latte",
  "Mochaccino",
  "Five Roses Tea",
  "Rooibos Tea",
  "Various Sodas",
  "Sir Fruit",
  "Ice Tea",
  "Tomato Juice",
  "Appletiser / Grapetiser",
  "Red Bull",
  "Still or Sparkling Water",
  "Chocolate Milkshake",
  "Strawberry Milkshake",
  "Vanilla Milkshake",
  "Bubblegum Milkshake",
  "Salted Caramel Milkshake",
  "Nutella Specialty Milkshake",
  "Castle Lite",
  "Castle Lager",
  "Black Label",
  "Stella Artois",
  "Hunter’s Gold",
  "Savanna Dry",
  "Virgin Hennie",
  "Virgin Daiquiri",
  "Bloody Mary",
  "Mojito",
  "Strawberry Daiquiri",
  "Hennie’s Sunset",
  "Frozen Inge / Shaken Inge",
  "Hennie’s Iced Tea",
  "Inge on the Beach",
  "Ginger Ninja",
  "Christa Colada",
  "Strawberry Margarita",
];

const normalize = (value) => value.toLowerCase().replaceAll("’", "'");
const demoData = normalize(readFileSync("lib/menu/demo-data.ts", "utf8"));
const seedSql = readFileSync("supabase/seed.sql", "utf8");
const missing = expectedMenuNames.filter(
  (name) => !demoData.includes(normalize(name)),
);

if (missing.length) {
  console.error(`Missing ${missing.length} expected menu names:`);
  missing.forEach((name) => console.error(`- ${name}`));
  process.exit(1);
}

const menuImageUrls = [
  ...seedSql.matchAll(/insert into menu_items[\s\S]*?'(https?:\/\/[^']+)'\s*, 'image'/g),
].map((match) => match[1]);
const uniqueImageUrls = new Set(menuImageUrls);

if (menuImageUrls.length !== uniqueImageUrls.size) {
  console.error(
    `Expected unique menu item images, got ${uniqueImageUrls.size} unique URLs for ${menuImageUrls.length} menu seed rows.`,
  );
  process.exit(1);
}

console.log(
  `All ${expectedMenuNames.length} checked Hennie’s food/drinks/menu names are present in lib/menu/demo-data.ts.`,
);
console.log(
  `All ${menuImageUrls.length} seeded menu item image URLs are unique.`,
);
