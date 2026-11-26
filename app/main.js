// NusaStat router and interactions.
// Hash routes: #/ overview, #/economy, #/population, #/trade, #/regions, #/sources.
// window.__shotReady is false while a page renders and true once it is on screen,
// so a screenshot script knows when to capture.

import { PROVINCES } from './data.js';
import { economyChart, economyPage, notFoundPage, overviewPage, populationPage, provinceRows, pyramid, regionsPage, sourcesPage, tradeChart, tradePage, yearDetail } from './views.js';

const app = document.getElementById('app');
const TOTAL_POP = 283.5;

const ROUTES = {
  '/': overviewPage,
  '/economy': economyPage,
  '/population': populationPage,
  '/trade': tradePage,
  '/regions': regionsPage,
  '/sources': sourcesPage,
};

function setActiveNav(path) {
  document.querySelectorAll('.site-nav a').forEach((a) => {
    a.classList.toggle('active', a.getAttribute('href') === `#${path}`);
  });
}

function renderEconomy() {
  const detail = document.getElementById('year-detail');
  const select = document.getElementById('year-select');
  if (detail && select) detail.innerHTML = yearDetail(Number(select.value));
  const chart = document.getElementById('economy-chart');
  if (chart) chart.innerHTML = economyChart('growth-line');
}

function renderPopulation() {
  const box = document.getElementById('pyramid');
  if (box) box.innerHTML = pyramid('share');
}

function renderTrade() {
  const chart = document.getElementById('trade-chart');
  if (chart) chart.innerHTML = tradeChart('balance');
}

function filterProvinces() {
  const search = document.getElementById('province-search');
  const sort = document.getElementById('province-sort');
  const rows = document.getElementById('province-rows');
  const count = document.getElementById('province-count');
  if (!rows) return;
  const q = (search ? search.value : '').trim().toLowerCase();
  let list = PROVINCES.filter((p) => !q || p.name.toLowerCase().includes(q) || p.island.toLowerCase().includes(q));
  const mode = sort ? sort.value : 'population-desc';
  if (mode === 'population-asc') list = [...list].sort((a, b) => a.population - b.population);
  else if (mode === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  else if (mode === 'share-desc') list = [...list].sort((a, b) => a.population - b.population);
  else list = [...list].sort((a, b) => b.population - a.population);
  rows.innerHTML = list.length ? provinceRows(list) : '<tr><td colspan="4">No province matches that search.</td></tr>';
  if (count) {
    const shown = list.length;
    const total = PROVINCES.length;
    const sum = list.reduce((s, p) => s + p.population, 0);
    const share = Math.round((sum / TOTAL_POP) * 1000) / 10;
    count.textContent = `Showing ${shown} of ${total} provinces — ${sum.toFixed(2)} million people, ${share}% of Indonesia.`;
  }
}

function renderRegions() {
  filterProvinces();
}

function render() {
  window.__shotReady = false;
  const hash = location.hash || '#/';
  const path = hash.replace(/^#/, '') || '/';
  const page = ROUTES[path] || notFoundPage;
  const titles = {
    '/': 'NusaStat — National Statistics of Indonesia',
    '/economy': 'Economy | NusaStat',
    '/population': 'Population | NusaStat',
    '/trade': 'Trade | NusaStat',
    '/regions': 'Regions | NusaStat',
    '/sources': 'Sources and methods | NusaStat',
  };
  document.title = titles[path] || 'NusaStat — National Statistics of Indonesia';
  app.innerHTML = page();
  setActiveNav(path);
  if (path === '/economy') renderEconomy();
  if (path === '/population') renderPopulation();
  if (path === '/trade') renderTrade();
  if (path === '/regions') renderRegions();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

// One delegated listener for every control on every page.
document.addEventListener('click', (event) => {
  const btn = event.target.closest('[data-action]');
  if (!btn) return;
  const action = btn.getAttribute('data-action');
  if (action === 'chart-toggle') {
    document.querySelectorAll('[data-action="chart-toggle"]').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const chart = document.getElementById('economy-chart');
    if (chart) chart.innerHTML = economyChart(btn.getAttribute('data-chart'));
  }
  if (action === 'trade-toggle') {
    document.querySelectorAll('[data-action="trade-toggle"]').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const chart = document.getElementById('trade-chart');
    if (chart) chart.innerHTML = tradeChart(btn.getAttribute('data-series'));
  }
  if (action === 'pyramid-toggle') {
    document.querySelectorAll('[data-action="pyramid-toggle"]').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const box = document.getElementById('pyramid');
    if (box) box.innerHTML = pyramid(btn.getAttribute('data-units'));
  }
});

document.addEventListener('change', (event) => {
  const el = event.target.closest('[data-action]');
  if (!el) return;
  const action = el.getAttribute('data-action');
  if (action === 'year-select') {
    const detail = document.getElementById('year-detail');
    if (detail) detail.innerHTML = yearDetail(Number(el.value));
  }
  if (action === 'province-sort') filterProvinces();
});

document.addEventListener('input', (event) => {
  const el = event.target.closest('[data-action="province-search"]');
  if (el) filterProvinces();
});

window.addEventListener('hashchange', render);
render();
