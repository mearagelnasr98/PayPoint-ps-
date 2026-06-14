/*
 * Standard-Speisekarte für ein Café / eine Gastronomie.
 * Diese Daten werden nur beim allerersten Start verwendet.
 * Danach werden Änderungen aus der "Verwaltung" automatisch gespeichert.
 *
 * taxRate: MwSt.-Satz in Prozent (19 = Standard, 7 = ermäßigt).
 */
const DEFAULT_CATEGORIES = [
  { id: "heiss",    name: "Heißgetränke", icon: "☕" },
  { id: "kalt",     name: "Kaltgetränke", icon: "🥤" },
  { id: "speisen",  name: "Speisen",      icon: "🥪" },
  { id: "kuchen",   name: "Kuchen & Dessert", icon: "🍰" },
];

const DEFAULT_PRODUCTS = [
  // Heißgetränke
  { id: "p1",  name: "Espresso",        price: 2.20, category: "heiss",   taxRate: 19 },
  { id: "p2",  name: "Cappuccino",      price: 3.40, category: "heiss",   taxRate: 19 },
  { id: "p3",  name: "Latte Macchiato", price: 3.80, category: "heiss",   taxRate: 19 },
  { id: "p4",  name: "Café Crème",      price: 2.80, category: "heiss",   taxRate: 19 },
  { id: "p5",  name: "Heiße Schokolade",price: 3.60, category: "heiss",   taxRate: 19 },
  { id: "p6",  name: "Tee",             price: 2.90, category: "heiss",   taxRate: 19 },

  // Kaltgetränke
  { id: "p7",  name: "Mineralwasser",   price: 2.50, category: "kalt",    taxRate: 19 },
  { id: "p8",  name: "Apfelschorle",    price: 3.20, category: "kalt",    taxRate: 19 },
  { id: "p9",  name: "Cola",            price: 3.20, category: "kalt",    taxRate: 19 },
  { id: "p10", name: "Orangensaft",     price: 3.50, category: "kalt",    taxRate: 19 },
  { id: "p11", name: "Eiskaffee",       price: 4.50, category: "kalt",    taxRate: 19 },

  // Speisen
  { id: "p12", name: "Croissant",       price: 2.20, category: "speisen", taxRate: 7 },
  { id: "p13", name: "Käsebrötchen",    price: 3.50, category: "speisen", taxRate: 7 },
  { id: "p14", name: "Sandwich",        price: 5.90, category: "speisen", taxRate: 7 },
  { id: "p15", name: "Quiche",          price: 4.80, category: "speisen", taxRate: 7 },
  { id: "p16", name: "Suppe des Tages", price: 5.50, category: "speisen", taxRate: 7 },

  // Kuchen & Dessert
  { id: "p17", name: "Käsekuchen",      price: 3.90, category: "kuchen",  taxRate: 7 },
  { id: "p18", name: "Apfelstrudel",    price: 4.20, category: "kuchen",  taxRate: 7 },
  { id: "p19", name: "Brownie",         price: 3.50, category: "kuchen",  taxRate: 7 },
  { id: "p20", name: "Muffin",          price: 2.80, category: "kuchen",  taxRate: 7 },
];

// Anzahl der Tische plus Theke / To-Go.
const DEFAULT_TABLES = ["Theke", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
