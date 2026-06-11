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

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80";

// Per-item imagery: every menu item gets its own relevant, hand-checked photo.
const itemImages: Record<string, string> = {
  // Easy Shareables
  "Bessie se Braaibroodjie Bord": "https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=900&q=80",
  "Brakke Platter": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80",
  "Hennie se Platter": "https://images.unsplash.com/photo-1452251889946-8ff5ea7b27ab?auto=format&fit=crop&w=900&q=80",
  "Jopie se Platter": "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?auto=format&fit=crop&w=900&q=80",
  "Barry se Platter": "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80",
  "Jorrie se Platter": "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=900&q=80",
  // Brakke Brêkkies
  "Budget Brêkkie": "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=900&q=80",
  "Reune Brêkkie": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=80",
  "2 Egg Omelette": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
  "The Cheesy Brêkkie": "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=900&q=80",
  "Boerie Breakfast Roll": "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=900&q=80",
  // Top 10
  "Creamy Chicken Livers": "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=80",
  "Crumbed Mushrooms": "https://images.unsplash.com/photo-1504545102780-26774c1bb073?auto=format&fit=crop&w=900&q=80",
  "Crumbed Mozzarella Balls": "https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&w=900&q=80",
  "Barry se Balle": "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=900&q=80",
  "Halloumi Fingers": "https://images.unsplash.com/photo-1633896949673-1eb9d131a9b4?auto=format&fit=crop&w=900&q=80",
  "Varkhondjie": "https://images.unsplash.com/photo-1612392062631-94dd858cba88?auto=format&fit=crop&w=900&q=80",
  "Buffalo Wings": "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=900&q=80",
  "Jalapeño Poppers": "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=900&q=80",
  // Lazy Focaccia
  "Garlic & Herb Focaccia": "https://images.unsplash.com/photo-1620921568790-c1cf8984624c?auto=format&fit=crop&w=900&q=80",
  "Cheesy Bacon Focaccia": "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=900&q=80",
  "Biltong & Feta Focaccia": "https://images.unsplash.com/photo-1568471173242-461f0a730452?auto=format&fit=crop&w=900&q=80",
  "Chilli Cheese Focaccia": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
  // Starters
  "Crispy Calamari Strips": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=80",
  "Loaded Potato Skins": "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=900&q=80",
  "Nacho Cheese Poppers": "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=900&q=80",
  "Sticky Rib Bites": "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=80",
  "Chicken Strippies": "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=900&q=80",
  // Vleis Vreters
  "Rump 200g": "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=80",
  "Rump 300g": "https://images.unsplash.com/photo-1607116667981-ff148a14e975?auto=format&fit=crop&w=900&q=80",
  "T-Bone 500g": "https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=900&q=80",
  "Stevie Steak 500g": "https://images.unsplash.com/photo-1615937691194-97dbd3f3dc29?auto=format&fit=crop&w=900&q=80",
  "Chicken Schnitzel": "https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?auto=format&fit=crop&w=900&q=80",
  "Chicken Stack": "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=80",
  "Groot Vark Eisbein": "https://images.unsplash.com/photo-1432139509613-5c4255815697?auto=format&fit=crop&w=900&q=80",
  // Kant Happies
  "Slap Chips": "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=900&q=80",
  "Onion Rings": "https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=900&q=80",
  "Cheesy Garlic Roll": "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=900&q=80",
  "Creamy Mushroom Sauce": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=900&q=80",
  // Salads
  "Greek Salad": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80",
  "Chicken Salad": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
  "Avo & Halloumi Salad": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
  "Biltong Blue Cheese Salad": "https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=900&q=80",
  // Brakkie Bakkies
  "Kippie Bakkie": "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=900&q=80",
  "Varkhond Bakkie": "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=900&q=80",
  "Strippies & Ribbetjies": "https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&w=900&q=80",
  "Brandsiek Bakkie": "https://images.unsplash.com/photo-1623855244183-52fd8d3ce2f7?auto=format&fit=crop&w=900&q=80",
  // Wings & Ribbetjies
  "330g Buffalo Wings": "https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=900&q=80",
  "400g Ribbetjies": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
  "Wings & Chips": "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=900&q=80",
  "Ribs & Wings Combo": "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=900&q=80",
  // Burgers & Horrogs
  "Hennie’s Basic Burgertjie": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
  "Pulled Pork Burgertjie": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=900&q=80",
  "Classic Hennies Burger": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
  "Crumbed Chicken Burger": "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=900&q=80",
  "Double Cheese Biltong Burger": "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=80",
  "Cheese Louise": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
  "Slidertjies": "https://images.unsplash.com/photo-1547584370-2cc98b8b8dc8?auto=format&fit=crop&w=900&q=80",
  "Hennie’s Horrog": "https://images.unsplash.com/photo-1610440042657-612c34d95e9f?auto=format&fit=crop&w=900&q=80",
  // Loaded Meals
  "Loaded Fries": "https://images.unsplash.com/photo-1582169296194-e4d644c48063?auto=format&fit=crop&w=900&q=80",
  "Nachos Plain": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80",
  "Chicken Loaded Nachos": "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=900&q=80",
  "Pulled Pork Loaded Fries": "https://images.unsplash.com/photo-1630431341973-02e1b662ec35?auto=format&fit=crop&w=900&q=80",
  // Sweet Treats
  "Cookies & Cream": "https://images.unsplash.com/photo-1551404973-761c83cd8339?auto=format&fit=crop&w=900&q=80",
  "Dom Pedro": "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=900&q=80",
  "Malva Pudding": "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=900&q=80",
  "Chocolate Brownie": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80",
  // Pizzas
  "Margareets Pizza": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80",
  "Hawaiian Pizza": "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=900&q=80",
  "Regina Pizza": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=900&q=80",
  "Sweet Chilli Chicken Pizza": "https://images.unsplash.com/photo-1571066811602-716837d681de?auto=format&fit=crop&w=900&q=80",
  "Pepperoni Pizza": "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&w=900&q=80",
  "Jalapeño Popper Pizza": "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=80",
  "Varkhond Pizza": "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=900&q=80",
  "Inge’s Pizza": "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?auto=format&fit=crop&w=900&q=80",
  "Horrog Heaven Pizza": "https://images.unsplash.com/photo-1548369937-47519962c11a?auto=format&fit=crop&w=900&q=80",
  // Hot Drinks
  "Americano": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
  "Cappuccino": "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=900&q=80",
  "Café Latte": "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=900&q=80",
  "Mochaccino": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
  "Five Roses Tea": "https://images.unsplash.com/photo-1547825407-2d060104b7f8?auto=format&fit=crop&w=900&q=80",
  "Rooibos Tea": "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=900&q=80",
  // Cold Drinks
  "Various Sodas": "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=900&q=80",
  "Sir Fruit": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=80",
  "Ice Tea": "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=900&q=80",
  "Tomato Juice": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=900&q=80",
  "Appletiser / Grapetiser": "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=900&q=80",
  "Red Bull": "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=900&q=80",
  "Still or Sparkling Water": "https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=900&q=80",
  // Milkshakes
  "Chocolate Milkshake": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80",
  "Strawberry Milkshake": "https://images.unsplash.com/photo-1586985289906-406988974504?auto=format&fit=crop&w=900&q=80",
  "Vanilla Milkshake": "https://images.unsplash.com/photo-1568901839119-631418a3910d?auto=format&fit=crop&w=900&q=80",
  "Bubblegum Milkshake": "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=900&q=80",
  "Salted Caramel Milkshake": "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=900&q=80",
  "Nutella Specialty Milkshake": "https://images.unsplash.com/photo-1612197527762-8cfb55b618d1?auto=format&fit=crop&w=900&q=80",
  // Beers & Ciders
  "Castle Lite": "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=900&q=80",
  "Castle Lager": "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=900&q=80",
  "Black Label": "https://images.unsplash.com/photo-1518176258769-f227c798150e?auto=format&fit=crop&w=900&q=80",
  "Stella Artois": "https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=900&q=80",
  "Hunter’s Gold": "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=900&q=80",
  "Savanna Dry": "https://images.unsplash.com/photo-1600788886242-5c96aabe3757?auto=format&fit=crop&w=900&q=80",
  // Cocktails
  "Bloody Mary": "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=900&q=80",
  "Mojito": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=900&q=80",
  "Strawberry Daiquiri": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80",
  "Hennie’s Sunset": "https://images.unsplash.com/photo-1551751299-1b51cab2694c?auto=format&fit=crop&w=900&q=80",
  "Frozen Inge / Shaken Inge": "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=900&q=80",
  "Hennie’s Iced Tea": "https://images.unsplash.com/photo-1587223962930-cb7f31384c19?auto=format&fit=crop&w=900&q=80",
  "Inge on the Beach": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
  "Ginger Ninja": "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80",
  "Christa Colada": "https://images.unsplash.com/photo-1609951651556-5334e2706168?auto=format&fit=crop&w=900&q=80",
  "Strawberry Margarita": "https://images.unsplash.com/photo-1556855810-ac404aa91e85?auto=format&fit=crop&w=900&q=80",
  // Non-Alcoholic
  "Virgin Hennie": "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80",
  "Virgin Daiquiri": "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=900&q=80",
  "Non-Alcoholic Lager": "https://images.unsplash.com/photo-1437418747212-8d9709afab22?auto=format&fit=crop&w=900&q=80",
  "Rock Shandy": "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=900&q=80",
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
      image_url: imageFor(name),
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
    image_url: itemImages["Brakke Platter"],
    is_global: true,
    is_active: true,
    display_order: 1,
  },
  {
    id: "special-2",
    title: "Burger & Shake Combo",
    description:
      "A branch favourite pairing a loaded burger with a creamy shake.",
    image_url: itemImages["Classic Hennies Burger"],
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
function imageFor(name: string) {
  return itemImages[name] ?? FALLBACK_IMAGE;
}
export function getBranchBySlug(slug: string): Branch | undefined {
  return PUBLIC_BRANCHES.find((branch) => branch.slug === slug);
}
export function menuForBranch(branchSlug?: string) {
  const items = menuItems.map((item) =>
    applyDemoBranchOverride(item, branchSlug),
  );
  const branchSpecials = specials.map((special) => ({
    ...special,
    is_global: special.is_global || branchSlug !== "hennies-nelspruit",
  }));
  return { categories, items, specials: branchSpecials };
}

function applyDemoBranchOverride(
  item: MenuItem,
  branchSlug?: string,
): MenuItem {
  if (branchSlug === "hennies-boksburg" && item.name === "Rump 300g") {
    return { ...item, base_price: item.base_price + 15, is_sold_out: true };
  }
  if (
    branchSlug === "hennies-randburg" &&
    item.name === "Classic Hennies Burger"
  ) {
    return { ...item, base_price: item.base_price + 10, is_popular: true };
  }
  if (
    branchSlug === "hennies-nelspruit" &&
    item.name === "330g Buffalo Wings"
  ) {
    return { ...item, is_sold_out: true };
  }
  return item;
}
