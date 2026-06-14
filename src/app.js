/* ============================================================
 * PayPoint Kasse – Anwendungslogik
 * Alles läuft lokal im Browser. Daten werden im "localStorage"
 * des Browsers gespeichert (bleiben also nach dem Neuladen erhalten).
 * ============================================================ */

"use strict";

/* ---------- Hilfsfunktionen ---------- */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));
const euro = (n) => n.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
const todayKey = () => new Date().toISOString().slice(0, 10); // z.B. "2026-06-14"

/* ---------- Datenspeicher (localStorage) ---------- */
const STORE = {
  load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

const KEY_PRODUCTS = "pp_products";
const KEY_CATEGORIES = "pp_categories";
const KEY_SALES = "pp_sales"; // { "2026-06-14": [ {..}, .. ] }

let categories = STORE.load(KEY_CATEGORIES, DEFAULT_CATEGORIES);
let products = STORE.load(KEY_PRODUCTS, DEFAULT_PRODUCTS);
let sales = STORE.load(KEY_SALES, {});

/* ---------- Aktueller Bestell-Zustand ---------- */
let currentTable = null;
let activeCategory = categories[0] ? categories[0].id : null;
let order = []; // [{ id, name, price, taxRate, qty }]
let payMethod = "bar";

/* ============================================================
 *  RENDERING – KASSE
 * ============================================================ */
function renderTables() {
  const row = $("#table-row");
  row.innerHTML = "";
  DEFAULT_TABLES.forEach((t) => {
    const chip = document.createElement("button");
    chip.className = "table-chip" + (currentTable === t ? " active" : "");
    chip.textContent = t === "Theke" ? "Theke / To-Go" : "Tisch " + t;
    chip.onclick = () => {
      currentTable = t;
      renderTables();
      updateOrderHeader();
    };
    row.appendChild(chip);
  });
}

function renderCategories() {
  const row = $("#category-row");
  row.innerHTML = "";
  categories.forEach((c) => {
    const b = document.createElement("button");
    b.className = "cat-btn" + (activeCategory === c.id ? " active" : "");
    b.textContent = (c.icon ? c.icon + " " : "") + c.name;
    b.onclick = () => {
      activeCategory = c.id;
      renderCategories();
      renderProducts();
    };
    row.appendChild(b);
  });
}

function renderProducts() {
  const grid = $("#product-grid");
  grid.innerHTML = "";
  products
    .filter((p) => p.category === activeCategory)
    .forEach((p) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `<div class="p-name">${escapeHtml(p.name)}</div>
                        <div class="p-price">${euro(p.price)}</div>`;
      card.onclick = () => addToOrder(p);
      grid.appendChild(card);
    });
  if (!grid.children.length) {
    grid.innerHTML = `<p class="empty-hint">Keine Produkte in dieser Kategorie.</p>`;
  }
}

function updateOrderHeader() {
  const label = currentTable
    ? currentTable === "Theke" ? "Theke / To-Go" : "Tisch " + currentTable
    : "Kein Tisch";
  $("#order-table-label").textContent = label;
}

function renderOrder() {
  const box = $("#order-items");
  box.innerHTML = "";
  if (!order.length) {
    box.innerHTML = `<p class="empty-hint">Tippe links auf Produkte, um sie hinzuzufügen.</p>`;
  } else {
    order.forEach((item) => {
      const row = document.createElement("div");
      row.className = "order-item";
      row.innerHTML = `
        <div class="oi-name">${escapeHtml(item.name)}<small>${euro(item.price)} · ${item.taxRate}% MwSt.</small></div>
        <div class="qty-ctrl">
          <button class="qty-btn" data-act="minus">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" data-act="plus">+</button>
        </div>
        <div class="oi-total">${euro(item.price * item.qty)}</div>`;
      row.querySelector('[data-act="minus"]').onclick = () => changeQty(item.id, -1);
      row.querySelector('[data-act="plus"]').onclick = () => changeQty(item.id, +1);
      box.appendChild(row);
    });
  }
  renderSummary();
}

function renderSummary() {
  const { net, tax, total } = computeTotals(order);
  $("#sum-net").textContent = euro(net);
  $("#sum-tax").textContent = euro(tax);
  $("#sum-total").textContent = euro(total);
  $("#btn-pay").disabled = order.length === 0;
}

/* ============================================================
 *  BESTELL-AKTIONEN
 * ============================================================ */
function addToOrder(product) {
  if (!currentTable) currentTable = "Theke"; // Standard, falls kein Tisch gewählt
  updateOrderHeader();
  renderTables();
  const existing = order.find((i) => i.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    order.push({ id: product.id, name: product.name, price: product.price, taxRate: product.taxRate, qty: 1 });
  }
  renderOrder();
}

function changeQty(id, delta) {
  const item = order.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) order = order.filter((i) => i.id !== id);
  renderOrder();
}

function clearOrder() {
  order = [];
  renderOrder();
}

/* MwSt. wird aus den Brutto-Preisen herausgerechnet (in DE sind Preise inkl. MwSt.). */
function computeTotals(items) {
  let total = 0;
  let tax = 0;
  items.forEach((i) => {
    const lineGross = i.price * i.qty;
    total += lineGross;
    tax += lineGross - lineGross / (1 + i.taxRate / 100);
  });
  return { net: total - tax, tax, total };
}

/* ============================================================
 *  BEZAHLEN
 * ============================================================ */
function openPayModal() {
  if (!order.length) return;
  const { total } = computeTotals(order);
  $("#pay-total-amount").textContent = euro(total);
  payMethod = "bar";
  $$(".paymethod").forEach((b) => b.classList.toggle("active", b.dataset.method === "bar"));
  $("#cash-area").style.display = "block";
  $("#cash-given").value = "";
  $("#cash-change").textContent = euro(0);
  renderQuickCash(total);
  $("#pay-modal").classList.add("show");
}

function renderQuickCash(total) {
  const box = $("#quick-cash");
  box.innerHTML = "";
  const suggestions = quickCashValues(total);
  suggestions.forEach((v) => {
    const b = document.createElement("button");
    b.textContent = v === total ? "Passend" : euro(v);
    b.onclick = () => {
      $("#cash-given").value = v.toFixed(2);
      updateChange();
    };
    box.appendChild(b);
  });
}

function quickCashValues(total) {
  const set = new Set([total]);
  [5, 10, 20, 50].forEach((note) => {
    if (note >= total) set.add(note);
  });
  // nächster runder 10er
  set.add(Math.ceil(total / 10) * 10);
  return Array.from(set).sort((a, b) => a - b).slice(0, 4);
}

function updateChange() {
  const { total } = computeTotals(order);
  const given = parseFloat($("#cash-given").value) || 0;
  const change = Math.max(0, given - total);
  $("#cash-change").textContent = euro(change);
}

function confirmPayment() {
  const { net, tax, total } = computeTotals(order);
  const given = payMethod === "bar" ? parseFloat($("#cash-given").value) || 0 : total;
  if (payMethod === "bar" && given < total) {
    alert("Der gegebene Betrag ist kleiner als der zu zahlende Betrag.");
    return;
  }
  const sale = {
    time: new Date().toISOString(),
    table: currentTable || "Theke",
    method: payMethod,
    items: order.map((i) => ({ name: i.name, price: i.price, qty: i.qty, taxRate: i.taxRate })),
    net, tax, total,
    given: payMethod === "bar" ? given : total,
    change: payMethod === "bar" ? Math.max(0, given - total) : 0,
  };
  // Speichern
  const day = todayKey();
  if (!sales[day]) sales[day] = [];
  sales[day].push(sale);
  STORE.save(KEY_SALES, sales);

  $("#pay-modal").classList.remove("show");
  showReceipt(sale);

  // Bestellung zurücksetzen
  order = [];
  currentTable = null;
  renderTables();
  updateOrderHeader();
  renderOrder();
}

/* ============================================================
 *  BON / QUITTUNG
 * ============================================================ */
function showReceipt(sale) {
  const d = new Date(sale.time);
  const tableLabel = sale.table === "Theke" ? "Theke / To-Go" : "Tisch " + sale.table;
  let lines = "";
  sale.items.forEach((i) => {
    lines += `<div class="r-row"><span>${i.qty}× ${escapeHtml(i.name)}</span><span>${euro(i.price * i.qty)}</span></div>`;
  });
  const methodLabel = sale.method === "bar" ? "Bar" : "Karte";
  let cashLines = "";
  if (sale.method === "bar") {
    cashLines = `<div class="r-row"><span>Gegeben</span><span>${euro(sale.given)}</span></div>
                 <div class="r-row"><span>Rückgeld</span><span>${euro(sale.change)}</span></div>`;
  }
  $("#receipt").innerHTML = `
    <h3>PayPoint Café</h3>
    <div class="r-center">Vielen Dank für Ihren Besuch!</div>
    <div class="r-line"></div>
    <div class="r-row"><span>${d.toLocaleDateString("de-DE")}</span><span>${d.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}</span></div>
    <div class="r-row"><span>${tableLabel}</span><span></span></div>
    <div class="r-line"></div>
    ${lines}
    <div class="r-line"></div>
    <div class="r-row"><span>Netto</span><span>${euro(sale.net)}</span></div>
    <div class="r-row"><span>MwSt.</span><span>${euro(sale.tax)}</span></div>
    <div class="r-row r-total"><span>SUMME</span><span>${euro(sale.total)}</span></div>
    <div class="r-line"></div>
    <div class="r-row"><span>Zahlart</span><span>${methodLabel}</span></div>
    ${cashLines}
    <div class="r-line"></div>
    <div class="r-center">Dies ist kein steuerlicher Beleg.</div>`;
  $("#receipt-modal").classList.add("show");
}

/* ============================================================
 *  TAGESUMSATZ
 * ============================================================ */
function renderReport() {
  const day = todayKey();
  const list = sales[day] || [];
  $("#report-date").textContent = new Date().toLocaleDateString("de-DE", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  let total = 0, cash = 0, card = 0;
  list.forEach((s) => {
    total += s.total;
    if (s.method === "bar") cash += s.total; else card += s.total;
  });
  $("#kpi-total").textContent = euro(total);
  $("#kpi-count").textContent = String(list.length);
  $("#kpi-cash").textContent = euro(cash);
  $("#kpi-card").textContent = euro(card);

  const body = $("#sales-body");
  body.innerHTML = "";
  if (!list.length) {
    body.innerHTML = `<tr><td colspan="5" style="color:var(--muted)">Heute noch keine Bezahlungen.</td></tr>`;
    return;
  }
  [...list].reverse().forEach((s) => {
    const tr = document.createElement("tr");
    const t = new Date(s.time).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
    const itemsTxt = s.items.map((i) => `${i.qty}× ${i.name}`).join(", ");
    const tableLabel = s.table === "Theke" ? "Theke" : "Tisch " + s.table;
    tr.innerHTML = `<td>${t}</td><td>${tableLabel}</td><td>${escapeHtml(itemsTxt)}</td>
                    <td>${s.method === "bar" ? "Bar" : "Karte"}</td><td class="right">${euro(s.total)}</td>`;
    body.appendChild(tr);
  });
}

function exportCsv() {
  const day = todayKey();
  const list = sales[day] || [];
  if (!list.length) {
    alert("Heute gibt es noch keine Bezahlungen zum Exportieren.");
    return;
  }
  const rows = [["Zeit", "Tisch", "Artikel", "Zahlart", "Netto", "MwSt", "Gesamt"]];
  list.forEach((s) => {
    rows.push([
      new Date(s.time).toLocaleString("de-DE"),
      s.table,
      s.items.map((i) => `${i.qty}x ${i.name}`).join(" | "),
      s.method === "bar" ? "Bar" : "Karte",
      s.net.toFixed(2),
      s.tax.toFixed(2),
      s.total.toFixed(2),
    ]);
  });
  const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(";")).join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `tagesumsatz_${day}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function resetDay() {
  const day = todayKey();
  if (!sales[day] || !sales[day].length) {
    alert("Heute gibt es keine Daten zum Zurücksetzen.");
    return;
  }
  if (!confirm("Tag wirklich abschließen? Die heutigen Bezahlungen werden aus der Übersicht entfernt.\n\nTipp: Exportiere vorher als CSV, falls du die Daten behalten möchtest.")) return;
  delete sales[day];
  STORE.save(KEY_SALES, sales);
  renderReport();
}

/* ============================================================
 *  VERWALTUNG (Speisekarte)
 * ============================================================ */
function renderAdmin() {
  // Kategorie-Auswahl im Formular füllen
  const sel = $("#f-category");
  sel.innerHTML = "";
  categories.forEach((c) => {
    const o = document.createElement("option");
    o.value = c.id;
    o.textContent = c.name;
    sel.appendChild(o);
  });

  const listBox = $("#admin-list");
  listBox.innerHTML = "";
  categories.forEach((cat) => {
    const catItems = products.filter((p) => p.category === cat.id);
    if (!catItems.length) return;
    const header = document.createElement("div");
    header.className = "ai-meta";
    header.style.margin = "10px 0 4px";
    header.textContent = (cat.icon ? cat.icon + " " : "") + cat.name;
    listBox.appendChild(header);
    catItems.forEach((p) => {
      const row = document.createElement("div");
      row.className = "admin-item";
      row.innerHTML = `<span class="ai-name">${escapeHtml(p.name)}</span>
                       <span class="ai-meta">${euro(p.price)} · ${p.taxRate}% MwSt.</span>
                       <button class="ai-del">Löschen</button>`;
      row.querySelector(".ai-del").onclick = () => {
        products = products.filter((x) => x.id !== p.id);
        STORE.save(KEY_PRODUCTS, products);
        renderAdmin();
        renderProducts();
      };
      listBox.appendChild(row);
    });
  });
}

function addProduct(e) {
  e.preventDefault();
  const name = $("#f-name").value.trim();
  const price = parseFloat($("#f-price").value);
  const category = $("#f-category").value;
  const taxRate = parseInt($("#f-tax").value, 10);
  if (!name || isNaN(price) || price < 0) return;
  products.push({ id: "u" + Date.now(), name, price, category, taxRate });
  STORE.save(KEY_PRODUCTS, products);
  $("#admin-form").reset();
  renderAdmin();
  renderProducts();
}

function resetMenu() {
  if (!confirm("Speisekarte wirklich auf die Standard-Produkte zurücksetzen? Deine eigenen Produkte gehen dabei verloren.")) return;
  products = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
  categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
  STORE.save(KEY_PRODUCTS, products);
  STORE.save(KEY_CATEGORIES, categories);
  activeCategory = categories[0].id;
  renderAdmin();
  renderCategories();
  renderProducts();
}

/* ============================================================
 *  NAVIGATION & EVENTS
 * ============================================================ */
function switchView(view) {
  $$(".tab-btn").forEach((b) => b.classList.toggle("active", b.dataset.view === view));
  $$(".view").forEach((v) => v.classList.remove("active"));
  $("#view-" + view).classList.add("active");
  if (view === "umsatz") renderReport();
  if (view === "verwaltung") renderAdmin();
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function tickClock() {
  $("#clock").textContent = new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
}

function init() {
  // Navigation
  $$(".tab-btn").forEach((b) => (b.onclick = () => switchView(b.dataset.view)));

  // Kasse
  renderTables();
  renderCategories();
  renderProducts();
  renderOrder();
  updateOrderHeader();

  // Buttons
  $("#btn-clear").onclick = clearOrder;
  $("#btn-pay").onclick = openPayModal;

  // Zahl-Dialog
  $$(".paymethod").forEach((b) => {
    b.onclick = () => {
      payMethod = b.dataset.method;
      $$(".paymethod").forEach((x) => x.classList.toggle("active", x === b));
      $("#cash-area").style.display = payMethod === "bar" ? "block" : "none";
    };
  });
  $("#cash-given").oninput = updateChange;
  $("#btn-pay-cancel").onclick = () => $("#pay-modal").classList.remove("show");
  $("#btn-pay-confirm").onclick = confirmPayment;

  // Bon
  $("#btn-receipt-print").onclick = () => window.print();
  $("#btn-receipt-close").onclick = () => $("#receipt-modal").classList.remove("show");

  // Tagesumsatz
  $("#btn-export").onclick = exportCsv;
  $("#btn-reset-day").onclick = resetDay;

  // Verwaltung
  $("#admin-form").onsubmit = addProduct;
  $("#btn-reset-menu").onclick = resetMenu;

  // Uhr
  tickClock();
  setInterval(tickClock, 1000 * 20);
}

document.addEventListener("DOMContentLoaded", init);
