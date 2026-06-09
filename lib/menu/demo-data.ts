import { PUBLIC_BRANCHES } from "@/lib/constants";

export type MenuCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  display_order: number;
  color_theme: string;
  icon_name: string;
  is_active: boolean;
};
export type MenuItem = {
  id: string;
  category_slug: string;
  name: string;
  description: string;
  base_price: number;
  image_url: string;
  video_url?: string | null;
  media_type: "image" | "video" | "none";
  tags: string[];
  allergens: string[];
  spice_level?: number | null;
  is_popular: boolean;
  is_new: boolean;
  is_special: boolean;
  is_available_global: boolean;
  display_order: number;
  is_sold_out?: boolean;
};
export type Special = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  is_global: boolean;
  is_active: boolean;
  display_order: number;
};
export type Branch = (typeof PUBLIC_BRANCHES)[number];

export const categories: MenuCategory[] = [
  ["Easy Shareables", "Platters and pub favourites made for the whole table."],
  [
    "Brakke Brêkkies",
    "Big-hearted breakfasts with proper sports-bar attitude.",
  ],
  ["Top 10", "Fan favourites and house legends."],
  ["Lazy Focaccia", "Warm, cheesy focaccia boards for easy grazing."],
  ["Starters", "Crunchy, saucy openers before the main event."],
  ["Vleis Vreters", "Steaks, schnitzels and big meat plates."],
  ["Kant Happies", "Sides and extras for the hungry crowd."],
  ["Salads", "Fresh, colourful plates with pub-style personality."],
  ["Brakkie Bakkies", "Loaded bowls and baskets for serious cravings."],
  ["Wings & Ribbetjies", "Sticky wings and saucy ribs."],
  ["Burgers & Horrogs", "Burgers, sliders and Hennie’s-style hot dogs."],
  ["Loaded Meals", "Fries, nachos and indulgent comfort food."],
  ["Sweet Treats", "Desserts, puds and after-game treats."],
  ["Pizzas", "Crispy pub pizzas for sharing."],
  ["Hot Drinks", "Coffee, tea and warm comfort."],
  ["Cold Drinks", "Sodas, juices and refreshers."],
  ["Milkshakes", "Classic and specialty shakes."],
  ["Beers & Ciders", "Ice-cold pub favourites."],
  ["Cocktails", "Colourful drinks for social sipping."],
  ["Non-Alcoholic", "Zero-proof favourites and family-friendly refreshers."],
].map(([name, description], index) => ({
  id: `cat-${index + 1}`,
  name,
  slug: slugify(name),
  description,
  display_order: index + 1,
  icon_name: index < 14 ? "utensils" : "glass",
  color_theme: index % 2 ? "aqua" : "orange",
  is_active: true,
}));

const imageMap: Record<string, string> = {
  share:
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
  breakfast:
    "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=80",
  starter:
    "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=900&q=80",
  steak:
    "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=80",
  salad:
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80",
  wings:
    "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=900&q=80",
  burger:
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
  pizza:
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
  dessert:
    "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=900&q=80",
  coffee:
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
  drink:
    "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80",
  beer: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=900&q=80",
  cocktail:
    "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80",
  fries:
    "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=900&q=80",
  nachos:
    "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=900&q=80",
  hotdog:
    "https://images.unsplash.com/photo-1612392062631-94dd858cba88?auto=format&fit=crop&w=900&q=80",
  ribs: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
  calamari:
    "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=80",
  mushrooms:
    "https://images.unsplash.com/photo-1504545102780-26774c1bb073?auto=format&fit=crop&w=900&q=80",
  mozzarella:
    "https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&w=900&q=80",
  omelette:
    "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
  tea: "https://images.unsplash.com/photo-1547825407-2d060104b7f8?auto=format&fit=crop&w=900&q=80",
  soda: "https://images.unsplash.com/photo-1580391947416-62d0d0a2cf5d?auto=format&fit=crop&w=900&q=80",
  milkshake:
    "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80",
  water:
    "https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=900&q=80",
  cider:
    "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=900&q=80",
  dessertDrink:
    "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=900&q=80",
};

const raw: Array<[string, string, number, string, string[], string[]?]> = [
  [
    "Easy Shareables",
    "Bessie se Braaibroodjie Bord",
    89,
    "Toasted braaibroodjie wedges with tomato, onion, cheese and cheeky relish.",
    ["shareable", "vegetarian"],
    ["gluten", "dairy"],
  ],
  [
    "Easy Shareables",
    "Brakke Platter",
    249,
    "A brakkie-sized feast of wings, ribs, chips, poppers and dips.",
    ["popular", "shareable"],
    ["gluten", "dairy"],
  ],
  [
    "Easy Shareables",
    "Hennie se Platter",
    299,
    "A big social platter packed with crunchy pub bites and saucy favourites.",
    ["shareable"],
    ["gluten", "dairy"],
  ],
  [
    "Easy Shareables",
    "Jopie se Platter",
    329,
    "Loaded table platter with ribbetjies, strippies, chips and snacky sides.",
    ["shareable", "meaty"],
    ["gluten"],
  ],
  [
    "Easy Shareables",
    "Barry se Platter",
    359,
    "Premium pub platter with wings, mozzarella balls, mushrooms and steak bites.",
    ["popular", "shareable"],
    ["gluten", "dairy"],
  ],
  [
    "Easy Shareables",
    "Jorrie se Platter",
    389,
    "The big match-day share: ribs, wings, poppers, fries and dipping sauces.",
    ["shareable", "spicy"],
    ["gluten", "dairy"],
  ],
  [
    "Brakke Brêkkies",
    "Budget Brêkkie",
    59,
    "Two eggs, toast, chips and a simple morning smile.",
    ["breakfast"],
    ["egg", "gluten"],
  ],
  [
    "Brakke Brêkkies",
    "Reune Brêkkie",
    109,
    "Eggs, bacon, wors, tomato, mushrooms, chips and toast.",
    ["breakfast", "popular"],
    ["egg", "gluten"],
  ],
  [
    "Brakke Brêkkies",
    "2 Egg Omelette",
    82,
    "Fluffy omelette with cheese and your favourite pub-style filling.",
    ["breakfast"],
    ["egg", "dairy"],
  ],
  [
    "Brakke Brêkkies",
    "The Cheesy Brêkkie",
    94,
    "Cheesy eggs, bacon, toast and crispy chips.",
    ["breakfast"],
    ["egg", "dairy", "gluten"],
  ],
  [
    "Top 10",
    "Creamy Chicken Livers",
    78,
    "Pan-fried chicken livers in creamy peri-style sauce with toast.",
    ["top10", "spicy"],
    ["dairy", "gluten"],
  ],
  [
    "Top 10",
    "Crumbed Mushrooms",
    72,
    "Golden crumbed mushrooms with tangy dipping sauce.",
    ["vegetarian", "top10"],
    ["gluten"],
  ],
  [
    "Top 10",
    "Crumbed Mozzarella Balls",
    79,
    "Crispy mozzarella bites with marinara-style dipping sauce.",
    ["vegetarian", "top10"],
    ["dairy", "gluten"],
  ],
  [
    "Top 10",
    "Barry se Balle",
    86,
    "Saucy meatballs with pub relish and melty cheese.",
    ["top10"],
    ["dairy", "gluten"],
  ],
  [
    "Top 10",
    "Halloumi Fingers",
    84,
    "Salty halloumi sticks, fried crisp and served with sweet chilli.",
    ["vegetarian"],
    ["dairy"],
  ],
  [
    "Top 10",
    "Varkhondjie",
    89,
    "Mini porky hot dog with crunchy onions and smoky sauce.",
    ["top10"],
    ["gluten"],
  ],
  [
    "Top 10",
    "Buffalo Wings",
    99,
    "Buffalo-style wings with ranchy dip and celery crunch.",
    ["popular", "spicy"],
    ["dairy"],
  ],
  [
    "Top 10",
    "Jalapeño Poppers",
    82,
    "Jalapeños stuffed with cheese, crumbed and fried.",
    ["spicy", "vegetarian"],
    ["dairy", "gluten"],
  ],
  [
    "Lazy Focaccia",
    "Garlic & Herb Focaccia",
    64,
    "Wood-fired style focaccia with garlic butter and herbs.",
    ["vegetarian"],
    ["gluten", "dairy"],
  ],
  [
    "Lazy Focaccia",
    "Cheesy Bacon Focaccia",
    89,
    "Focaccia with cheese, bacon bits and a smoky sauce drizzle.",
    ["shareable"],
    ["gluten", "dairy"],
  ],
  [
    "Lazy Focaccia",
    "Biltong & Feta Focaccia",
    98,
    "Crispy base topped with biltong dust, feta and rocket.",
    ["shareable"],
    ["gluten", "dairy"],
  ],
  [
    "Lazy Focaccia",
    "Chilli Cheese Focaccia",
    84,
    "Cheesy focaccia with jalapeños and chilli oil.",
    ["spicy", "vegetarian"],
    ["gluten", "dairy"],
  ],
  [
    "Starters",
    "Crispy Calamari Strips",
    92,
    "Lightly crumbed calamari strips with tartar-style dip.",
    ["seafood"],
    ["gluten", "shellfish"],
  ],
  [
    "Starters",
    "Loaded Potato Skins",
    78,
    "Crispy skins with cheese, bacon and spring onion.",
    ["shareable"],
    ["dairy"],
  ],
  [
    "Starters",
    "Nacho Cheese Poppers",
    78,
    "Crunchy poppers with molten cheese and salsa.",
    ["spicy", "vegetarian"],
    ["dairy", "gluten"],
  ],
  [
    "Starters",
    "Sticky Rib Bites",
    105,
    "Saucy rib bites finished with sesame and spring onion.",
    ["popular"],
    ["sesame"],
  ],
  [
    "Vleis Vreters",
    "Rump 200g",
    159,
    "Flame-grilled rump with chips or salad and sauce on request.",
    ["steak"],
    [],
  ],
  [
    "Vleis Vreters",
    "Rump 300g",
    199,
    "Bigger flame-grilled rump for the hungry sports fan.",
    ["steak", "popular"],
    [],
  ],
  [
    "Vleis Vreters",
    "T-Bone 500g",
    249,
    "A proper pub T-bone with chips and onion rings.",
    ["steak"],
    ["gluten"],
  ],
  [
    "Vleis Vreters",
    "Stevie Steak 500g",
    279,
    "Big, bold steak plate with mushroom sauce and crispy sides.",
    ["steak", "popular"],
    ["dairy"],
  ],
  [
    "Vleis Vreters",
    "Chicken Schnitzel",
    139,
    "Golden crumbed chicken schnitzel with chips and sauce.",
    ["chicken"],
    ["gluten", "egg"],
  ],
  [
    "Vleis Vreters",
    "Chicken Stack",
    169,
    "Stacked chicken fillets with cheese, bacon and creamy sauce.",
    ["chicken"],
    ["dairy"],
  ],
  [
    "Vleis Vreters",
    "Groot Vark Eisbein",
    245,
    "Crispy pork eisbein with mustard, chips and slaw.",
    ["pork"],
    [],
  ],
  [
    "Kant Happies",
    "Slap Chips",
    39,
    "A basket of proper pub chips.",
    ["side", "vegetarian"],
    [],
  ],
  [
    "Kant Happies",
    "Onion Rings",
    42,
    "Crunchy beer-batter style onion rings.",
    ["side", "vegetarian"],
    ["gluten"],
  ],
  [
    "Kant Happies",
    "Cheesy Garlic Roll",
    48,
    "Warm roll loaded with garlic butter and cheese.",
    ["side"],
    ["gluten", "dairy"],
  ],
  [
    "Kant Happies",
    "Creamy Mushroom Sauce",
    32,
    "Classic creamy mushroom sauce.",
    ["side"],
    ["dairy"],
  ],
  [
    "Salads",
    "Greek Salad",
    89,
    "Crisp greens, feta, olives, cucumber and tomato.",
    ["fresh", "vegetarian"],
    ["dairy"],
  ],
  [
    "Salads",
    "Chicken Salad",
    119,
    "Grilled chicken on fresh greens with avo-style dressing.",
    ["fresh", "chicken"],
    [],
  ],
  [
    "Salads",
    "Avo & Halloumi Salad",
    128,
    "Halloumi, avocado, greens and zesty dressing.",
    ["fresh", "vegetarian"],
    ["dairy"],
  ],
  [
    "Salads",
    "Biltong Blue Cheese Salad",
    139,
    "Rocket, biltong, blue cheese and crunchy seeds.",
    ["fresh"],
    ["dairy"],
  ],
  [
    "Brakkie Bakkies",
    "Kippie Bakkie",
    119,
    "Loaded chicken strips, chips, cheese and sauce in a basket.",
    ["loaded", "chicken"],
    ["dairy"],
  ],
  [
    "Brakkie Bakkies",
    "Varkhond Bakkie",
    129,
    "Porky strips over chips with smoky sauce and crunch.",
    ["loaded", "pork"],
    [],
  ],
  [
    "Brakkie Bakkies",
    "Strippies & Ribbetjies",
    149,
    "Chicken strips and rib bites over crispy chips.",
    ["popular", "loaded"],
    ["gluten"],
  ],
  [
    "Brakkie Bakkies",
    "Brandsiek Bakkie",
    139,
    "Spicy loaded basket with jalapeños, cheese and hot sauce.",
    ["spicy", "loaded"],
    ["dairy"],
  ],
  [
    "Wings & Ribbetjies",
    "330g Buffalo Wings",
    129,
    "Buffalo wings tossed in spicy sauce with creamy dip.",
    ["popular", "spicy"],
    ["dairy"],
  ],
  [
    "Wings & Ribbetjies",
    "400g Ribbetjies",
    169,
    "Sticky pork ribs with chips and slaw.",
    ["popular", "pork"],
    [],
  ],
  [
    "Wings & Ribbetjies",
    "Wings & Chips",
    115,
    "Crispy wings with golden chips.",
    ["chicken"],
    [],
  ],
  [
    "Wings & Ribbetjies",
    "Ribs & Wings Combo",
    219,
    "Sticky ribs and buffalo wings for the undecided legend.",
    ["combo", "popular"],
    ["dairy"],
  ],
  [
    "Burgers & Horrogs",
    "Hennie’s Basic Burgertjie",
    99,
    "Beef patty, lettuce, tomato, onion and Hennie’s-style sauce.",
    ["burger"],
    ["gluten"],
  ],
  [
    "Burgers & Horrogs",
    "Pulled Pork Burgertjie",
    125,
    "Pulled pork, slaw and smoky sauce on a toasted bun.",
    ["burger", "pork"],
    ["gluten"],
  ],
  [
    "Burgers & Horrogs",
    "Classic Hennies Burger",
    119,
    "Classic beef burger with cheese, chips and pub sauce.",
    ["popular", "burger"],
    ["gluten", "dairy"],
  ],
  [
    "Burgers & Horrogs",
    "Crumbed Chicken Burger",
    115,
    "Crunchy chicken fillet, mayo, lettuce and chips.",
    ["burger", "chicken"],
    ["gluten", "egg"],
  ],
  [
    "Burgers & Horrogs",
    "Double Cheese Biltong Burger",
    169,
    "Double patty, cheese, biltong dust and creamy sauce.",
    ["popular", "burger"],
    ["gluten", "dairy"],
  ],
  [
    "Burgers & Horrogs",
    "Cheese Louise",
    129,
    "Cheesy beef burger with extra melt and cheeky sauce.",
    ["burger"],
    ["gluten", "dairy"],
  ],
  [
    "Burgers & Horrogs",
    "Slidertjies",
    139,
    "Three mini sliders made for sharing during the game.",
    ["shareable", "burger"],
    ["gluten"],
  ],
  [
    "Burgers & Horrogs",
    "Hennie’s Horrog",
    105,
    "Loaded hot dog with relish, onion crunch and chips.",
    ["horrog"],
    ["gluten"],
  ],
  [
    "Loaded Meals",
    "Loaded Fries",
    89,
    "Fries loaded with cheese sauce, bacon bits and spring onion.",
    ["loaded"],
    ["dairy"],
  ],
  [
    "Loaded Meals",
    "Nachos Plain",
    92,
    "Corn chips, salsa, cheese sauce, guacamole-style topping and sour cream.",
    ["vegetarian", "loaded"],
    ["dairy"],
  ],
  [
    "Loaded Meals",
    "Chicken Loaded Nachos",
    129,
    "Nachos topped with spicy chicken, cheese and fresh salsa.",
    ["loaded", "spicy"],
    ["dairy"],
  ],
  [
    "Loaded Meals",
    "Pulled Pork Loaded Fries",
    129,
    "Fries topped with pulled pork, smoky sauce and slaw.",
    ["loaded", "pork"],
    [],
  ],
  [
    "Sweet Treats",
    "Cookies & Cream",
    69,
    "Creamy cookie dessert cup with chocolate crumble.",
    ["sweet"],
    ["dairy", "gluten"],
  ],
  [
    "Sweet Treats",
    "Dom Pedro",
    79,
    "Classic grown-up dessert drink, rich and creamy.",
    ["sweet"],
    ["dairy"],
  ],
  [
    "Sweet Treats",
    "Malva Pudding",
    72,
    "Warm malva pudding with custard-style cream.",
    ["popular", "sweet"],
    ["gluten", "dairy", "egg"],
  ],
  [
    "Sweet Treats",
    "Chocolate Brownie",
    76,
    "Warm brownie with ice cream and chocolate sauce.",
    ["sweet"],
    ["gluten", "dairy", "egg"],
  ],
  [
    "Pizzas",
    "Margareets Pizza",
    99,
    "Tomato base, mozzarella and herbs.",
    ["pizza", "vegetarian"],
    ["gluten", "dairy"],
  ],
  [
    "Pizzas",
    "Hawaiian Pizza",
    119,
    "Ham, pineapple and mozzarella.",
    ["pizza"],
    ["gluten", "dairy"],
  ],
  [
    "Pizzas",
    "Regina Pizza",
    125,
    "Ham, mushroom and mozzarella.",
    ["pizza"],
    ["gluten", "dairy"],
  ],
  [
    "Pizzas",
    "Sweet Chilli Chicken Pizza",
    139,
    "Chicken, sweet chilli, peppers and mozzarella.",
    ["pizza", "chicken"],
    ["gluten", "dairy"],
  ],
  [
    "Pizzas",
    "Pepperoni Pizza",
    139,
    "Pepperoni, mozzarella and tomato base.",
    ["pizza"],
    ["gluten", "dairy"],
  ],
  [
    "Pizzas",
    "Jalapeño Popper Pizza",
    145,
    "Jalapeños, cream cheese, mozzarella and crispy crumbs.",
    ["pizza", "spicy"],
    ["gluten", "dairy"],
  ],
  [
    "Pizzas",
    "Varkhond Pizza",
    149,
    "Porky toppings, smoky sauce and mozzarella.",
    ["pizza", "pork"],
    ["gluten", "dairy"],
  ],
  [
    "Pizzas",
    "Inge’s Pizza",
    149,
    "Chicken, feta, avo-style topping and sweet chilli.",
    ["pizza"],
    ["gluten", "dairy"],
  ],
  [
    "Pizzas",
    "Horrog Heaven Pizza",
    155,
    "Hot dog slices, onion, relish and mozzarella.",
    ["pizza"],
    ["gluten", "dairy"],
  ],
  [
    "Hot Drinks",
    "Americano",
    32,
    "Bold black coffee served hot.",
    ["coffee"],
    [],
  ],
  [
    "Hot Drinks",
    "Cappuccino",
    39,
    "Espresso with steamed milk and foam.",
    ["coffee"],
    ["dairy"],
  ],
  [
    "Hot Drinks",
    "Café Latte",
    42,
    "Smooth espresso with silky milk.",
    ["coffee"],
    ["dairy"],
  ],
  [
    "Hot Drinks",
    "Mochaccino",
    45,
    "Coffee, chocolate and foamed milk.",
    ["coffee"],
    ["dairy"],
  ],
  ["Hot Drinks", "Five Roses Tea", 25, "Classic black tea.", ["tea"], []],
  ["Hot Drinks", "Rooibos Tea", 25, "South African rooibos tea.", ["tea"], []],
  [
    "Cold Drinks",
    "Various Sodas",
    28,
    "Assorted canned soft drinks.",
    ["cold"],
    [],
  ],
  [
    "Cold Drinks",
    "Sir Fruit",
    39,
    "Premium fruit juice selection.",
    ["juice"],
    [],
  ],
  ["Cold Drinks", "Ice Tea", 34, "Refreshing bottled iced tea.", ["cold"], []],
  [
    "Cold Drinks",
    "Tomato Juice",
    36,
    "Classic tomato juice, chilled.",
    ["juice"],
    [],
  ],
  [
    "Cold Drinks",
    "Appletiser / Grapetiser",
    42,
    "Sparkling apple or grape drink.",
    ["sparkling"],
    [],
  ],
  [
    "Cold Drinks",
    "Red Bull",
    49,
    "Energy drink served chilled.",
    ["energy"],
    [],
  ],
  [
    "Cold Drinks",
    "Still or Sparkling Water",
    25,
    "Bottled water, still or sparkling.",
    ["water"],
    [],
  ],
  [
    "Milkshakes",
    "Chocolate Milkshake",
    52,
    "Classic thick chocolate shake.",
    ["shake"],
    ["dairy"],
  ],
  [
    "Milkshakes",
    "Strawberry Milkshake",
    52,
    "Classic strawberry shake.",
    ["shake"],
    ["dairy"],
  ],
  [
    "Milkshakes",
    "Vanilla Milkshake",
    52,
    "Classic vanilla shake.",
    ["shake"],
    ["dairy"],
  ],
  [
    "Milkshakes",
    "Bubblegum Milkshake",
    55,
    "Bright bubblegum shake with playful pub energy.",
    ["shake"],
    ["dairy"],
  ],
  [
    "Milkshakes",
    "Salted Caramel Milkshake",
    59,
    "Rich salted caramel shake.",
    ["shake"],
    ["dairy"],
  ],
  [
    "Milkshakes",
    "Nutella Specialty Milkshake",
    69,
    "Indulgent hazelnut-chocolate specialty shake.",
    ["shake", "popular"],
    ["dairy", "nuts"],
  ],
  ["Beers & Ciders", "Castle Lite", 39, "Ice-cold lager.", ["beer"], []],
  [
    "Beers & Ciders",
    "Castle Lager",
    38,
    "Classic South African lager.",
    ["beer"],
    [],
  ],
  [
    "Beers & Ciders",
    "Black Label",
    38,
    "Full-flavoured local beer.",
    ["beer"],
    [],
  ],
  [
    "Beers & Ciders",
    "Stella Artois",
    49,
    "Premium Belgian-style lager.",
    ["beer"],
    [],
  ],
  ["Beers & Ciders", "Hunter’s Gold", 42, "Refreshing cider.", ["cider"], []],
  [
    "Beers & Ciders",
    "Savanna Dry",
    45,
    "Dry cider served cold.",
    ["cider"],
    [],
  ],
  [
    "Cocktails",
    "Bloody Mary",
    79,
    "Vodka, tomato juice and savoury spice.",
    ["cocktail", "spicy"],
    [],
  ],
  ["Cocktails", "Mojito", 82, "Mint, lime and rum over ice.", ["cocktail"], []],
  [
    "Cocktails",
    "Strawberry Daiquiri",
    86,
    "Frozen strawberry cocktail with a sweet-tart finish.",
    ["cocktail"],
    [],
  ],
  [
    "Cocktails",
    "Hennie’s Sunset",
    89,
    "Bright orange tropical cocktail with a social kick.",
    ["cocktail", "popular"],
    [],
  ],
  [
    "Cocktails",
    "Frozen Inge / Shaken Inge",
    92,
    "House-style cocktail served frozen or shaken.",
    ["cocktail"],
    [],
  ],
  [
    "Cocktails",
    "Hennie’s Iced Tea",
    95,
    "Long iced tea-style cocktail with pub attitude.",
    ["cocktail"],
    [],
  ],
  [
    "Cocktails",
    "Inge on the Beach",
    89,
    "Fruity beach-style cocktail.",
    ["cocktail"],
    [],
  ],
  [
    "Cocktails",
    "Ginger Ninja",
    86,
    "Ginger-forward cocktail with citrus bite.",
    ["cocktail"],
    [],
  ],
  [
    "Cocktails",
    "Christa Colada",
    89,
    "Creamy pineapple-coconut cocktail.",
    ["cocktail"],
    ["dairy"],
  ],
  [
    "Cocktails",
    "Strawberry Margarita",
    89,
    "Strawberry tequila cocktail with a salted rim.",
    ["cocktail"],
    [],
  ],
  [
    "Non-Alcoholic",
    "Virgin Hennie",
    55,
    "Zero-proof house refresher with citrus and fizz.",
    ["mocktail"],
    [],
  ],
  [
    "Non-Alcoholic",
    "Virgin Daiquiri",
    59,
    "Frozen fruit mocktail.",
    ["mocktail"],
    [],
  ],
  [
    "Non-Alcoholic",
    "Non-Alcoholic Lager",
    42,
    "Cold zero-alcohol beer option.",
    ["zero"],
    [],
  ],
  [
    "Non-Alcoholic",
    "Rock Shandy",
    45,
    "Lemonade, soda and bitters-style refreshment.",
    ["mocktail"],
    [],
  ],
];

export const menuItems: MenuItem[] = raw.map(
  ([category, name, base_price, description, tags, allergens], index) => {
    const slug = slugify(category);
    return {
      id: `item-${index + 1}`,
      category_slug: slug,
      name,
      description,
      base_price,
      image_url: imageFor(slug, tags, name),
      media_type: "image",
      tags,
      allergens: allergens || [],
      spice_level: tags.includes("spicy") ? 2 : null,
      is_popular: tags.includes("popular") || index % 13 === 0,
      is_new: index % 17 === 0,
      is_special: false,
      is_available_global: true,
      display_order: index + 1,
    };
  },
);

export const specials: Special[] = [
  {
    id: "special-1",
    title: "Game Day Platter Special",
    description:
      "Bring the gees: selected platters and ice-cold drinks made for match day browsing.",
    image_url: imageMap.share,
    is_global: true,
    is_active: true,
    display_order: 1,
  },
  {
    id: "special-2",
    title: "Burger & Shake Combo",
    description:
      "A branch favourite pairing a loaded burger with a creamy shake.",
    image_url: imageMap.burger,
    is_global: false,
    is_active: true,
    display_order: 2,
  },
];

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/&/g, "and")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
function imageFor(categorySlug: string, tags: string[], itemName: string) {
  const name = slugify(itemName);
  if (name.includes("chips") || name.includes("fries")) return imageMap.fries;
  if (name.includes("nachos")) return imageMap.nachos;
  if (name.includes("horrog") || name.includes("varkhond"))
    return imageMap.hotdog;
  if (name.includes("rib") || name.includes("ribbetjies")) return imageMap.ribs;
  if (name.includes("calamari")) return imageMap.calamari;
  if (name.includes("mushroom")) return imageMap.mushrooms;
  if (name.includes("mozzarella") || name.includes("halloumi"))
    return imageMap.mozzarella;
  if (name.includes("omelette") || name.includes("egg"))
    return imageMap.omelette;
  if (name.includes("tea") || name.includes("rooibos")) return imageMap.tea;
  if (
    name.includes("soda") ||
    name.includes("red-bull") ||
    name.includes("appletiser")
  )
    return imageMap.soda;
  if (name.includes("water")) return imageMap.water;
  if (name.includes("milkshake") || categorySlug.includes("milkshakes"))
    return imageMap.milkshake;
  if (name.includes("dom-pedro")) return imageMap.dessertDrink;
  if (name.includes("savanna") || name.includes("hunter"))
    return imageMap.cider;
  if (categorySlug.includes("pizza")) return imageMap.pizza;
  if (categorySlug.includes("burger")) return imageMap.burger;
  if (categorySlug.includes("wing")) return imageMap.wings;
  if (categorySlug.includes("vleis")) return imageMap.steak;
  if (categorySlug.includes("salad")) return imageMap.salad;
  if (categorySlug.includes("sweet")) return imageMap.dessert;
  if (categorySlug.includes("hot-drinks")) return imageMap.coffee;
  if (categorySlug.includes("cold")) return imageMap.drink;
  if (categorySlug.includes("beer")) return imageMap.beer;
  if (
    categorySlug.includes("cocktail") ||
    categorySlug.includes("non-alcoholic")
  )
    return imageMap.cocktail;
  if (categorySlug.includes("brekk")) return imageMap.breakfast;
  if (tags.includes("shareable")) return imageMap.share;
  return imageMap.starter;
}

export function getBranchBySlug(slug: string): Branch | undefined {
  return PUBLIC_BRANCHES.find((branch) => branch.slug === slug);
}
export function menuForBranch() {
  return { categories, items: menuItems, specials };
}
