// Views for NusaStat: one function per page, each returning the page's HTML.
// All figures come from data.js; every control on a page is wired up in main.js.

import { AGE_BANDS, COUNTRY, EXPORT_PARTNERS, EXPORT_PRODUCTS, HEADLINE, ISLAND_SHARES, POPULATION_MILESTONES, PROVINCES, RELEASES, SECTORS, SOCIETY, SOURCES, TRADE_EXPORTS, TRADE_IMPORTS, YEARS } from './data.js';
import { barChart, donutChart, hbarChart, lineChart, pyramidChart } from './charts.js';
import { GDP_GROWTH, INFLATION, UNEMPLOYMENT } from './data.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
const TOTAL_POP = 283.5;

export function kpiCards() {
  return HEADLINE.map(
    (h) => `<article class="kpi"><p class="kpi-label">${esc(h.label)}</p><p class="kpi-value">${esc(h.value)}</p><p class="kpi-detail">${esc(h.detail)}</p><p class="kpi-source">Source: ${esc(h.source)}</p></article>`,
  ).join('');
}

export function overviewPage() {
  const growth = lineChart({ labels: YEARS.map(String), values: GDP_GROWTH, unit: '%', title: 'Real GDP growth, Indonesia, 2015–2024' });
  return `
<section class="hero">
  <p class="eyebrow">National statistics of ${esc(COUNTRY.name)}</p>
  <h1>${esc(COUNTRY.name)} in numbers</h1>
  <p class="lede">The country's economy, people and trade, from the official releases — population ${TOTAL_POP} million, GDP US$1.40 trillion, growth 5.03% in 2024. Every figure on this site names its source and year.</p>
  <p class="hero-facts"><span>Capital: ${esc(COUNTRY.capital)}</span><span>Currency: ${esc(COUNTRY.currency)}</span><span>${esc(COUNTRY.populationNote)}</span></p>
</section>
<section aria-label="Key indicators"><div class="kpi-grid">${kpiCards()}</div></section>
<section class="two-col">
  <article class="card">
    <h2><a href="#/economy">Growth, year by year</a></h2>
    <p class="card-sub">Real GDP growth, 2015–2024. The 2020 dip is the pandemic contraction; growth has held near 5% since 2022.</p>
    ${growth}
    <p class="source-note">Source: Statistics Indonesia (BPS), constant prices.</p>
  </article>
  <article class="card">
    <h2><a href="#/economy">What the economy makes</a></h2>
    <p class="card-sub">Share of GDP by sector, 2024. Manufacturing is the largest single sector, at 18.7%.</p>
    ${donutChart({ items: SECTORS, centerLabel: 'GDP', centerValue: 'US$1.40tn' })}
    <p class="source-note">Source: Statistics Indonesia (BPS), 2024.</p>
  </article>
</section>
<section>
  <h2>Explore the statistics</h2>
  <div class="explore-grid">
    <a class="explore-card" href="#/economy"><strong>Economy</strong><span>Growth, inflation, unemployment and sectors, 2015–2024.</span></a>
    <a class="explore-card" href="#/population"><strong>Population</strong><span>Age pyramid, milestones and where people live.</span></a>
    <a class="explore-card" href="#/trade"><strong>Trade</strong><span>Exports, imports, products and partners.</span></a>
    <a class="explore-card" href="#/regions"><strong>Regions</strong><span>Provinces ranked by population, searchable.</span></a>
  </div>
</section>
<section class="two-col">
  <article class="card">
    <h2>Latest releases</h2>
    <ul class="releases">${RELEASES.map((r) => `<li><time>${esc(r.date)}</time><strong>${esc(r.title)}</strong><span>${esc(r.detail)}</span></li>`).join('')}</ul>
  </article>
  <article class="card">
    <h2>People and society</h2>
    <dl class="facts">${SOCIETY.slice(0, 5).map((s) => `<div><dt>${esc(s.label)}</dt><dd>${esc(s.value)} <span>(${esc(s.source)})</span></dd></div>`).join('')}</dl>
    <p><a href="#/population">See all population statistics &rarr;</a></p>
  </article>
</section>`;
}

export function economyPage() {
  return `
<section class="page-head">
  <p class="eyebrow"><a href="#/">Indonesia in numbers</a> / Economy</p>
  <h1>The economy</h1>
  <p class="lede">Growth, prices and jobs over the last ten years, and what the economy is made of.</p>
</section>
<section class="card">
  <h2>One year at a time</h2>
  <p class="card-sub">Pick a year to see its three headline rates together.</p>
  <div class="controls">
    <label for="year-select">Year</label>
    <select id="year-select" data-action="year-select">${YEARS.map((y) => `<option value="${y}"${y === 2024 ? ' selected' : ''}>${y}</option>`).join('')}</select>
  </div>
  <div id="year-detail" class="year-detail" aria-live="polite"></div>
</section>
<section class="card">
  <h2>Growth and inflation, 2015–2024</h2>
  <div class="controls" role="group" aria-label="Choose the chart">
    <button type="button" class="toggle-btn active" data-action="chart-toggle" data-chart="growth-line">Growth — line</button>
    <button type="button" class="toggle-btn" data-action="chart-toggle" data-chart="growth-bar">Growth — bars</button>
    <button type="button" class="toggle-btn" data-action="chart-toggle" data-chart="inflation-line">Inflation — line</button>
  </div>
  <div id="economy-chart"></div>
  <p class="source-note">Growth: real GDP, constant prices (BPS). Inflation: consumer prices, December year on year (BPS).</p>
</section>
<section class="two-col">
  <article class="card">
    <h2>Sectors of the economy</h2>
    ${donutChart({ items: SECTORS, centerLabel: 'GDP', centerValue: 'US$1.40tn' })}
    <p class="source-note">Share of GDP, 2024. Source: Statistics Indonesia (BPS).</p>
  </article>
  <article class="card">
    <h2>Money and public finance</h2>
    <dl class="facts">
      <div><dt>Foreign exchange reserves</dt><dd>US$155.7bn <span>(Bank Indonesia, Dec 2024)</span></dd></div>
      <div><dt>Government debt</dt><dd>37.7% of GDP <span>(IMF, 2024)</span></dd></div>
      <div><dt>Current account balance</dt><dd>−US$8.5bn <span>(IMF, 2024)</span></dd></div>
      <div><dt>Average exchange rate</dt><dd>Rp 15,855 per US$ <span>(2024)</span></dd></div>
      <div><dt>GDP in PPP terms</dt><dd>US$4.66tn <span>(IMF, 2024)</span></dd></div>
      <div><dt>GDP per capita, PPP</dt><dd>US$16,558 <span>(IMF, 2024)</span></dd></div>
    </dl>
  </article>
</section>`;
}

export function populationPage() {
  const milestones = barChart({
    labels: POPULATION_MILESTONES.map((m) => String(m.year)),
    values: POPULATION_MILESTONES.map((m) => m.value),
    unit: 'm',
    title: 'Population of Indonesia, 2010–2024, millions',
    format: (v) => `${v}m`,
  });
  return `
<section class="page-head">
  <p class="eyebrow"><a href="#/">Indonesia in numbers</a> / Population</p>
  <h1>The population</h1>
  <p class="lede">283.5 million people in 2024 — a young country: the median age is 30.5 years and more than two in three people are of working age.</p>
</section>
<section class="card">
  <h2>Age pyramid, 2024</h2>
  <p class="card-sub">Share of the total population in each five-year age band. Switch between shares and millions of people.</p>
  <div class="controls" role="group" aria-label="Pyramid units">
    <button type="button" class="toggle-btn active" data-action="pyramid-toggle" data-units="share">Share of population</button>
    <button type="button" class="toggle-btn" data-action="pyramid-toggle" data-units="millions">Millions of people</button>
  </div>
  <div id="pyramid"></div>
  <p class="source-note">Source: UN World Population Prospects 2024, medium variant. Bands split by the national sex ratio (about 50.4% men).</p>
</section>
<section class="two-col">
  <article class="card">
    <h2>How the population grew</h2>
    <p class="card-sub">Millions of people at each census and estimate.</p>
    ${milestones}
    <p class="source-note">Sources: BPS population censuses 2010 and 2020; intercensal survey 2015; UN estimate 2024.</p>
  </article>
  <article class="card">
    <h2>People and society</h2>
    <dl class="facts">${SOCIETY.map((s) => `<div><dt>${esc(s.label)}</dt><dd>${esc(s.value)} <span>(${esc(s.source)})</span></dd></div>`).join('')}</dl>
  </article>
</section>
<section class="card">
  <h2>Where people live</h2>
  <p class="card-sub">Share of the national population by island group, 2024. Java alone holds more than half the country.</p>
  ${hbarChart({ items: ISLAND_SHARES.map((s) => ({ name: s.name, value: s.share })), unit: '%', title: 'Share of population by island group, 2024' })}
  <p class="source-note">Source: Statistics Indonesia (BPS), 2024. <a href="#/regions">See provinces ranked by population &rarr;</a></p>
</section>`;
}

export function tradePage() {
  const balance = TRADE_EXPORTS.map((e, i) => Math.round((e - TRADE_IMPORTS[i]) * 10) / 10);
  return `
<section class="page-head">
  <p class="eyebrow"><a href="#/">Indonesia in numbers</a> / Trade</p>
  <h1>Trade with the world</h1>
  <p class="lede">Indonesia sold US$264.7 billion of goods abroad in 2024 and bought US$233.7 billion — a surplus of US$31.0 billion, the fifth straight year in surplus.</p>
</section>
<section class="card">
  <h2>Exports, imports and the balance</h2>
  <p class="card-sub">Goods trade, US$ billion, 2015–2024. Switch the chart between the balance, exports and imports.</p>
  <div class="controls" role="group" aria-label="Choose the trade chart">
    <button type="button" class="toggle-btn active" data-action="trade-toggle" data-series="balance">Trade balance</button>
    <button type="button" class="toggle-btn" data-action="trade-toggle" data-series="exports">Exports</button>
    <button type="button" class="toggle-btn" data-action="trade-toggle" data-series="imports">Imports</button>
  </div>
  <div id="trade-chart"></div>
  <p class="source-note">Source: Statistics Indonesia (BPS), customs basis, current US dollars.</p>
  <div class="table-wrap"><table class="data-table">
    <thead><tr><th>Year</th><th>Exports (US$bn)</th><th>Imports (US$bn)</th><th>Balance (US$bn)</th></tr></thead>
    <tbody>${YEARS.map((y, i) => `<tr><td>${y}</td><td>${TRADE_EXPORTS[i].toFixed(1)}</td><td>${TRADE_IMPORTS[i].toFixed(1)}</td><td>${balance[i].toFixed(1)}</td></tr>`).join('')}</tbody>
  </table></div>
</section>
<section class="two-col">
  <article class="card">
    <h2>What Indonesia sells</h2>
    <p class="card-sub">Top export product groups, share of goods exports, 2024.</p>
    ${hbarChart({ items: EXPORT_PRODUCTS.map((p) => ({ name: p.name, value: p.share })), unit: '%', title: 'Top export products, 2024' })}
    <p class="source-note">Source: UN Comtrade / CEPII BACI, reconciled bilateral trade, 2024.</p>
  </article>
  <article class="card">
    <h2>Who buys it</h2>
    <p class="card-sub">Top export destinations, 2024. China takes more than a fifth of all goods exports.</p>
    <table class="data-table">
      <thead><tr><th>Destination</th><th>Share</th><th>Value</th></tr></thead>
      <tbody>${EXPORT_PARTNERS.map((p) => `<tr><td>${esc(p.name)}</td><td>${p.share}%</td><td>${esc(p.value)}</td></tr>`).join('')}</tbody>
    </table>
    <p class="source-note">Source: UN Comtrade / CEPII BACI, 2024.</p>
  </article>
</section>`;
}

export function regionsPage() {
  return `
<section class="page-head">
  <p class="eyebrow"><a href="#/">Indonesia in numbers</a> / Regions</p>
  <h1>Provinces and regions</h1>
  <p class="lede">Indonesia has 38 provinces. The fifteen largest hold about 82% of the population — and three of them, all on Java, hold almost half.</p>
</section>
<section class="card">
  <h2>Largest provinces</h2>
  <p class="card-sub">Population, mid-2024 estimates. Search by name or island, or sort the table.</p>
  ${hbarChart({ items: PROVINCES.slice(0, 10).map((p) => ({ name: p.name, value: p.population })), unit: 'm', title: 'Ten largest provinces by population, 2024' })}
  <div class="controls">
    <label for="province-search">Search provinces</label>
    <input id="province-search" type="search" placeholder="Type a name or island, e.g. Java" data-action="province-search" aria-label="Search provinces">
    <label for="province-sort">Sort by</label>
    <select id="province-sort" data-action="province-sort">
      <option value="population-desc" selected>Population, largest first</option>
      <option value="population-asc">Population, smallest first</option>
      <option value="name">Name, A to Z</option>
      <option value="share-desc">Share of Indonesia, largest first</option>
    </select>
  </div>
  <div class="table-wrap"><table class="data-table" id="province-table">
    <thead><tr><th>Province</th><th>Island</th><th>Population (millions)</th><th>Share of Indonesia</th></tr></thead>
    <tbody id="province-rows"></tbody>
  </table></div>
  <p class="source-note" id="province-count"></p>
  <p class="source-note">Source: Statistics Indonesia (BPS), mid-2024 population estimates. Shares are of the 2024 national total of 283.5 million.</p>
</section>
<section class="card">
  <h2>Where people live</h2>
  <p class="card-sub">Share of the national population by island group, 2024.</p>
  ${hbarChart({ items: ISLAND_SHARES.map((s) => ({ name: s.name, value: s.share })), unit: '%', title: 'Share of population by island group, 2024' })}
  <p class="source-note">Source: Statistics Indonesia (BPS), 2024.</p>
</section>`;
}

export function sourcesPage() {
  return `
<section class="page-head">
  <p class="eyebrow"><a href="#/">Indonesia in numbers</a> / Sources</p>
  <h1>Sources and methods</h1>
  <p class="lede">Every figure on this site comes from a published official source. This page lists them, so any number can be checked.</p>
</section>
<section class="card">
  <h2>Where the figures come from</h2>
  <table class="data-table">
    <thead><tr><th>Publisher</th><th>What it supplied</th><th>Year</th></tr></thead>
    <tbody>${SOURCES.map((s) => `<tr><td>${esc(s.publisher)}</td><td>${esc(s.what)}</td><td>${esc(s.year)}</td></tr>`).join('')}</tbody>
  </table>
</section>
<section class="two-col">
  <article class="card">
    <h2>How to read the figures</h2>
    <ul class="notes">
      <li>GDP growth is in constant prices; inflation is the consumer price index in December, year on year.</li>
      <li>Unemployment is the open unemployment rate from the August National Labour Force Survey.</li>
      <li>Trade figures are merchandise (goods) on a customs basis, in current US dollars.</li>
      <li>Export product and partner shares come from reconciled bilateral trade data, so they differ slightly from customs totals.</li>
      <li>Population for 2024 is the UN estimate; provincial populations are BPS mid-year estimates.</li>
    </ul>
  </article>
  <article class="card">
    <h2>About this site</h2>
    <p>NusaStat is an independent, original statistics site built for make.fun's "Make the best national statistics site" bounty. It is a static site: all figures are in its own files, it makes no network requests, and it works offline on a desktop and on a phone.</p>
    <p>Figures are the latest published at the time of writing (mostly 2024). Official statistics are revised; check the publisher for the newest release.</p>
    <p><a href="#/">Back to the overview &rarr;</a></p>
  </article>
</section>`;
}

export function notFoundPage() {
  return `
<section class="page-head">
  <h1>Page not found</h1>
  <p class="lede">There is no page at this address. Try one of the sections below.</p>
</section>
<section>
  <div class="explore-grid">
    <a class="explore-card" href="#/"><strong>Overview</strong><span>Key indicators and latest releases.</span></a>
    <a class="explore-card" href="#/economy"><strong>Economy</strong><span>Growth, inflation and sectors.</span></a>
    <a class="explore-card" href="#/population"><strong>Population</strong><span>Age pyramid and milestones.</span></a>
    <a class="explore-card" href="#/trade"><strong>Trade</strong><span>Exports, imports and partners.</span></a>
    <a class="explore-card" href="#/regions"><strong>Regions</strong><span>Provinces ranked by population.</span></a>
  </div>
</section>`;
}

// Re-usable fragments main.js renders into a page after it loads.
export function yearDetail(year) {
  const i = YEARS.indexOf(year);
  if (i === -1) return '<p>No data for that year.</p>';
  return `<div class="year-cards">
    <div><p class="kpi-label">GDP growth</p><p class="kpi-value">${GDP_GROWTH[i]}%</p><p class="kpi-detail">Real GDP, constant prices (BPS)</p></div>
    <div><p class="kpi-label">Inflation (CPI)</p><p class="kpi-value">${INFLATION[i]}%</p><p class="kpi-detail">December, year on year (BPS)</p></div>
    <div><p class="kpi-label">Unemployment</p><p class="kpi-value">${UNEMPLOYMENT[i]}%</p><p class="kpi-detail">August, open unemployment (BPS)</p></div>
  </div>`;
}

export function economyChart(kind) {
  if (kind === 'growth-bar') return barChart({ labels: YEARS.map(String), values: GDP_GROWTH, unit: '%', title: 'Real GDP growth, Indonesia, 2015–2024' });
  if (kind === 'inflation-line') return lineChart({ labels: YEARS.map(String), values: INFLATION, unit: '%', color: '#d9930d', title: 'Inflation (CPI), Indonesia, 2015–2024' });
  return lineChart({ labels: YEARS.map(String), values: GDP_GROWTH, unit: '%', title: 'Real GDP growth, Indonesia, 2015–2024' });
}

export function tradeChart(series) {
  if (series === 'exports') return barChart({ labels: YEARS.map(String), values: TRADE_EXPORTS, unit: '', title: 'Goods exports, Indonesia, 2015–2024, US$ billion', format: (v) => `$${v.toFixed(0)}bn` });
  if (series === 'imports') return barChart({ labels: YEARS.map(String), values: TRADE_IMPORTS, unit: '', color: '#4d8fd1', title: 'Goods imports, Indonesia, 2015–2024, US$ billion', format: (v) => `$${v.toFixed(0)}bn` });
  const balance = TRADE_EXPORTS.map((e, i) => Math.round((e - TRADE_IMPORTS[i]) * 10) / 10);
  return barChart({ labels: YEARS.map(String), values: balance, unit: '', title: 'Goods trade balance, Indonesia, 2015–2024, US$ billion', format: (v) => `$${v.toFixed(0)}bn` });
}

export function pyramid(units) {
  if (units === 'millions') {
    const bands = AGE_BANDS.map((b) => ({ band: b.band, share: Math.round(b.share * TOTAL_POP) / 100 }));
    return pyramidChart({ bands, unit: 'm' });
  }
  return pyramidChart({ bands: AGE_BANDS, unit: '%' });
}

export function provinceRows(list) {
  return list
    .map((p) => {
      const share = Math.round((p.population / TOTAL_POP) * 1000) / 10;
      return `<tr><td>${esc(p.name)}</td><td>${esc(p.island)}</td><td>${p.population.toFixed(2)}</td><td>${share}%</td></tr>`;
    })
    .join('');
}
