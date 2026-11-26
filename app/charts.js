// Charts for NusaStat: small, dependency-free SVG builders.
// Every chart is drawn from the data passed in, labelled on its axes, and readable without
// JavaScript beyond the page render itself (the SVG is written into the page as markup).

const INK = '#1c2b2a';
const MUTED = '#5d6f6c';
const TEAL = '#0e6b62';
const TEAL_LIGHT = '#7fc4bb';
const AMBER = '#d9930d';
const GRID = '#dfe6e2';
const NEGATIVE = '#b3402e';

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
}

function niceTicks(min, max, count) {
  const span = max - min || 1;
  const step = span / count;
  const mag = 10 ** Math.floor(Math.log10(step));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const stepNice = nice * mag;
  const start = Math.floor(min / stepNice) * stepNice;
  const ticks = [];
  for (let v = start; v <= max + stepNice / 2; v += stepNice) ticks.push(Math.round(v * 100) / 100);
  return ticks;
}

// A line chart with points, value labels and a soft area fill.
export function lineChart({ labels, values, width = 640, height = 300, unit = '%', color = TEAL, title = '' }) {
  const padL = 44;
  const padR = 14;
  const padT = 18;
  const padB = 30;
  const w = width - padL - padR;
  const h = height - padT - padB;
  const min = Math.min(0, ...values);
  const max = Math.max(...values);
  const top = max + (max - min) * 0.12;
  const bottom = min - (max - min) * 0.12;
  const x = (i) => padL + (i / (values.length - 1)) * w;
  const y = (v) => padT + (1 - (v - bottom) / (top - bottom)) * h;
  const ticks = niceTicks(bottom, top, 4).filter((t) => t >= bottom - 1e-9 && t <= top + 1e-9);
  const grid = ticks
    .map(
      (t) =>
        `<line x1="${padL}" y1="${y(t)}" x2="${width - padR}" y2="${y(t)}" stroke="${GRID}" stroke-width="1"/><text x="${padL - 6}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${t}${unit}</text>`,
    )
    .join('');
  const points = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const area = `${padL},${y(bottom).toFixed(1)} ${points} ${x(values.length - 1).toFixed(1)},${y(bottom).toFixed(1)}`;
  const dots = values
    .map(
      (v, i) =>
        `<circle cx="${x(i)}" cy="${y(v)}" r="3.5" fill="#fff" stroke="${color}" stroke-width="2"><title>${esc(labels[i])}: ${v}${unit}</title></circle>`,
    )
    .join('');
  const valueLabels = values
    .map((v, i) => `<text x="${x(i)}" y="${y(v) - 9}" text-anchor="middle" font-size="11" font-weight="600" fill="${INK}">${v}${unit}</text>`)
    .join('');
  const xLabels = labels
    .map((l, i) => `<text x="${x(i)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(l)}</text>`)
    .join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(title)}" class="chart">${grid}<polygon points="${area}" fill="${color}" opacity="0.12"/><polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${dots}${valueLabels}${xLabels}</svg>`;
}

// A vertical bar chart with value labels. Negative bars hang below the zero line.
export function barChart({ labels, values, width = 640, height = 300, unit = '', color = TEAL, title = '', format = null }) {
  const padL = 44;
  const padR = 14;
  const padT = 22;
  const padB = 30;
  const w = width - padL - padR;
  const h = height - padT - padB;
  const min = Math.min(0, ...values);
  const max = Math.max(...values);
  const top = max + (max - min) * 0.15;
  const bottom = min - (max - min) * 0.1;
  const y = (v) => padT + (1 - (v - bottom) / (top - bottom)) * h;
  const zeroY = y(0);
  const ticks = niceTicks(bottom, top, 4).filter((t) => t >= bottom - 1e-9 && t <= top + 1e-9);
  const grid = ticks
    .map(
      (t) =>
        `<line x1="${padL}" y1="${y(t)}" x2="${width - padR}" y2="${y(t)}" stroke="${GRID}" stroke-width="1"/><text x="${padL - 6}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${t}${unit}</text>`,
    )
    .join('');
  const slot = w / values.length;
  const barW = Math.min(44, slot * 0.62);
  const fmt = (v) => (format ? format(v) : `${v}${unit}`);
  const bars = values
    .map((v, i) => {
      const bx = padL + i * slot + (slot - barW) / 2;
      const by = v >= 0 ? y(v) : zeroY;
      const bh = Math.abs(y(v) - zeroY);
      const fill = v < 0 ? NEGATIVE : color;
      const ly = v >= 0 ? by - 6 : by + bh + 14;
      return `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${barW.toFixed(1)}" height="${Math.max(bh, 1).toFixed(1)}" rx="3" fill="${fill}"><title>${esc(labels[i])}: ${fmt(v)}</title></rect><text x="${(bx + barW / 2).toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${INK}">${fmt(v)}</text>`;
    })
    .join('');
  const xLabels = labels
    .map((l, i) => `<text x="${(padL + i * slot + slot / 2).toFixed(1)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(l)}</text>`)
    .join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(title)}" class="chart">${grid}<line x1="${padL}" y1="${zeroY}" x2="${width - padR}" y2="${zeroY}" stroke="${INK}" stroke-width="1" opacity="0.35"/>${bars}${xLabels}</svg>`;
}

// A donut chart with a centre label and a legend list beside it.
export function donutChart({ items, width = 300, height = 300, centerLabel = '', centerValue = '' }) {
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.min(width, height) / 2 - 14;
  const inner = r * 0.62;
  const palette = [TEAL, '#2a9d8f', '#e9c46a', AMBER, '#7a6ff0', '#4d8fd1', '#8ab17d', '#c96f4a', '#9aa5a1'];
  const total = items.reduce((s, it) => s + it.share, 0);
  let angle = -Math.PI / 2;
  const slices = items
    .map((it, i) => {
      const frac = it.share / total;
      const a0 = angle;
      const a1 = angle + frac * Math.PI * 2;
      angle = a1;
      const large = frac > 0.5 ? 1 : 0;
      const x0 = cx + r * Math.cos(a0);
      const y0 = cy + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1);
      const y1 = cy + r * Math.sin(a1);
      const xi1 = cx + inner * Math.cos(a1);
      const yi1 = cy + inner * Math.sin(a1);
      const xi0 = cx + inner * Math.cos(a0);
      const yi0 = cy + inner * Math.sin(a0);
      const d = `M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z`;
      return `<path d="${d}" fill="${palette[i % palette.length]}"><title>${esc(it.name)}: ${it.share}%</title></path>`;
    })
    .join('');
  const legend = items
    .map(
      (it, i) =>
        `<li><span class="swatch" style="background:${palette[i % palette.length]}"></span>${esc(it.name)}<strong>${it.share}%</strong></li>`,
    )
    .join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Share of GDP by sector" class="donut">${slices}<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="13" fill="${MUTED}">${esc(centerLabel)}</text><text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="20" font-weight="700" fill="${INK}">${esc(centerValue)}</text></svg><ul class="legend">${legend}</ul></div>`;
}

// A population pyramid: women to the left, men to the right, one row per age band.
export function pyramidChart({ bands, width = 640, rowHeight = 26, unit = '%' }) {
  const padL = 46;
  const padR = 46;
  const padT = 26;
  const height = padT + bands.length * rowHeight + 8;
  const mid = width / 2;
  const half = (width - padL - padR) / 2;
  const gap = 18;
  const maxShare = Math.max(...bands.map((b) => b.share)) / 2;
  const scale = (half - gap) / (maxShare * 1.1);
  const rows = bands
    .map((b, i) => {
      const y = padT + i * rowHeight;
      const women = (b.share * 0.496) * scale;
      const men = (b.share * 0.504) * scale;
      return `<rect x="${(mid - gap - women).toFixed(1)}" y="${y + 3}" width="${women.toFixed(1)}" height="${rowHeight - 8}" rx="2" fill="#2a9d8f"><title>Women ${b.band}: ${(b.share * 0.496).toFixed(1)}${unit} of population</title></rect><rect x="${(mid + gap).toFixed(1)}" y="${y + 3}" width="${men.toFixed(1)}" height="${rowHeight - 8}" rx="2" fill="${TEAL}"><title>Men ${b.band}: ${(b.share * 0.504).toFixed(1)}${unit} of population</title></rect><text x="${mid}" y="${y + 15}" text-anchor="middle" font-size="11" font-weight="600" fill="${INK}">${esc(b.band)}</text><text x="${(mid - gap - women - 5).toFixed(1)}" y="${y + 16}" text-anchor="end" font-size="10" fill="${MUTED}">${(b.share * 0.496).toFixed(1)}${unit}</text><text x="${(mid + gap + men + 5).toFixed(1)}" y="${y + 16}" font-size="10" fill="${MUTED}">${(b.share * 0.504).toFixed(1)}${unit}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Population pyramid, Indonesia 2024" class="chart"><text x="${mid - half / 2}" y="14" text-anchor="middle" font-size="12" font-weight="600" fill="${INK}">Women</text><text x="${mid + half / 2}" y="14" text-anchor="middle" font-size="12" font-weight="600" fill="${INK}">Men</text>${rows}</svg>`;
}

// Horizontal bars for ranked lists (provinces, products, partners).
export function hbarChart({ items, width = 640, barHeight = 30, unit = '%', color = TEAL, title = '' }) {
  const padL = 8;
  const labelW = 210;
  const valueW = 64;
  const height = items.length * barHeight + 14;
  const max = Math.max(...items.map((it) => it.value));
  const rows = items
    .map((it, i) => {
      const y = 8 + i * barHeight;
      const bw = ((width - padL - labelW - valueW) * it.value) / max;
      return `<text x="${padL}" y="${y + 17}" font-size="12" fill="${INK}">${esc(it.name)}</text><rect x="${padL + labelW}" y="${y + 4}" width="${Math.max(bw, 2).toFixed(1)}" height="18" rx="3" fill="${it.color || color}"><title>${esc(it.name)}: ${it.value}${unit}</title></rect><text x="${(padL + labelW + bw + 6).toFixed(1)}" y="${y + 18}" font-size="12" font-weight="600" fill="${INK}">${it.value}${unit}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(title)}" class="chart">${rows}</svg>`;
}
