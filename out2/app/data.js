// NusaStat data: real, published statistics for Indonesia.
// Every figure carries its source and year; the Sources page lists them all.
// Figures are the latest available at the time of writing (mostly 2024, published by BPS,
// the World Bank, the IMF, the UN and Bank Indonesia). Nothing here is fetched at run time.

export const COUNTRY = {
  name: 'Indonesia',
  shortName: 'Indonesia',
  capital: 'Jakarta',
  currency: 'Indonesian rupiah (IDR)',
  populationNote: 'Fourth most populous country in the world',
};

// Headline indicators shown on the Overview page.
export const HEADLINE = [
  { key: 'population', label: 'Population', value: '283.5m', detail: '2024, UN World Population Prospects', source: 'UN / World Bank' },
  { key: 'gdp', label: 'GDP (nominal)', value: 'US$1.40tn', detail: '2024, ranked 16th in the world', source: 'IMF WEO, Apr 2025' },
  { key: 'gdpPerCapita', label: 'GDP per capita', value: 'US$4,958', detail: '2024, nominal; US$16,558 in PPP terms', source: 'IMF WEO, Apr 2025' },
  { key: 'growth', label: 'GDP growth', value: '5.03%', detail: '2024, year on year, constant prices', source: 'Statistics Indonesia (BPS)' },
  { key: 'inflation', label: 'Inflation (CPI)', value: '1.57%', detail: 'December 2024, year on year', source: 'Statistics Indonesia (BPS)' },
  { key: 'unemployment', label: 'Unemployment rate', value: '4.91%', detail: 'August 2024, open unemployment', source: 'Statistics Indonesia (BPS)' },
  { key: 'poverty', label: 'Poverty rate', value: '8.57%', detail: 'September 2024, 24.06 million people', source: 'Statistics Indonesia (BPS)' },
  { key: 'exports', label: 'Goods exports', value: 'US$264.7bn', detail: '2024, trade surplus US$31.0bn', source: 'Statistics Indonesia (BPS)' },
];

// Yearly series, 2015-2024. Sources: BPS (growth, inflation, unemployment), UN/BPS (population).
export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

export const GDP_GROWTH = [4.88, 5.03, 5.07, 5.17, 5.02, -2.07, 3.7, 5.31, 5.05, 5.03];
export const INFLATION = [3.35, 3.02, 3.61, 3.13, 2.72, 1.68, 1.87, 5.51, 2.61, 1.57];
export const UNEMPLOYMENT = [6.18, 5.61, 5.5, 5.34, 5.28, 7.07, 6.49, 5.86, 5.45, 4.91];

// GDP by sector, share of GDP in 2024 (BPS). "All other sectors" is the remainder.
export const SECTORS = [
  { name: 'Manufacturing', share: 18.67 },
  { name: 'Wholesale and retail trade', share: 12.93 },
  { name: 'Agriculture, forestry and fishing', share: 12.48 },
  { name: 'Construction', share: 9.77 },
  { name: 'Mining and quarrying', share: 7.75 },
  { name: 'Transportation and storage', share: 5.85 },
  { name: 'Information and communication', share: 5.03 },
  { name: 'Financial and insurance services', share: 4.2 },
  { name: 'All other sectors', share: 23.32 },
];

// Population milestones: censuses and estimates (millions). Sources: BPS censuses, UN WPP 2024.
export const POPULATION_MILESTONES = [
  { year: 2010, value: 237.6, note: 'Population census' },
  { year: 2015, value: 255.5, note: 'Intercensal survey' },
  { year: 2020, value: 270.2, note: 'Population census' },
  { year: 2024, value: 283.5, note: 'UN estimate' },
];

// Age structure, 2024: share of total population in each five-year band (UN WPP 2024, medium variant).
// Each band is split between women and men at the national sex ratio (about 50.4% men).
export const AGE_BANDS = [
  { band: '0–4', share: 8.0 },
  { band: '5–9', share: 8.4 },
  { band: '10–14', share: 8.5 },
  { band: '15–19', share: 8.5 },
  { band: '20–24', share: 8.4 },
  { band: '25–29', share: 8.2 },
  { band: '30–34', share: 7.9 },
  { band: '35–39', share: 7.5 },
  { band: '40–44', share: 7.0 },
  { band: '45–49', share: 6.3 },
  { band: '50–54', share: 5.5 },
  { band: '55–59', share: 4.7 },
  { band: '60–64', share: 3.8 },
  { band: '65–69', share: 2.9 },
  { band: '70–74', share: 2.0 },
  { band: '75–79', share: 1.2 },
  { band: '80+', share: 1.2 },
];

// People and society, 2024 (BPS unless noted).
export const SOCIETY = [
  { label: 'Life expectancy at birth', value: '74.2 years', source: 'BPS, 2024' },
  { label: 'Median age', value: '30.5 years', source: 'UN WPP, 2024' },
  { label: 'Human Development Index', value: '75.02', source: 'BPS, 2024 (0–100 scale)' },
  { label: 'Mean years of schooling', value: '9.02 years', source: 'BPS, 2024' },
  { label: 'Literacy rate (age 15+)', value: '96.0%', source: 'BPS, 2023' },
  { label: 'Labour force', value: '147.1 million', source: 'CIA World Factbook, 2024 est.' },
  { label: 'Urban population', value: '59.3%', source: 'World Bank, 2024' },
  { label: 'Government debt', value: '37.7% of GDP', source: 'IMF, 2024' },
];

// Merchandise trade, 2015-2024, US$ billion (BPS, customs basis).
export const TRADE_EXPORTS = [150.4, 144.4, 168.8, 180.2, 167.7, 163.2, 231.6, 291.9, 258.8, 264.7];
export const TRADE_IMPORTS = [142.7, 135.7, 156.9, 188.7, 170.7, 141.6, 196.2, 237.4, 221.9, 233.7];

// Top export product groups, share of goods exports, 2024 (UN Comtrade / CEPII BACI).
export const EXPORT_PRODUCTS = [
  { name: 'Mineral fuels and oils', share: 20.8 },
  { name: 'Animal and vegetable fats and oils (palm oil)', share: 11.7 },
  { name: 'Iron and steel', share: 8.6 },
  { name: 'Electrical machinery and equipment', share: 4.7 },
  { name: 'Machinery and mechanical appliances', share: 4.4 },
  { name: 'All other goods', share: 49.8 },
];

// Top export destinations, share of goods exports, 2024 (UN Comtrade / CEPII BACI).
export const EXPORT_PARTNERS = [
  { name: 'China', share: 22.5, value: 'US$68.0bn' },
  { name: 'United States', share: 9.8, value: 'US$29.6bn' },
  { name: 'India', share: 8.1, value: 'US$24.5bn' },
  { name: 'Japan', share: 6.1, value: 'US$18.5bn' },
  { name: 'Singapore', share: 4.4, value: 'US$13.3bn' },
  { name: 'All other destinations', share: 49.1, value: '—' },
];

// Largest provinces by population, mid-2024 estimates (BPS), millions.
export const PROVINCES = [
  { name: 'West Java', population: 50.35, island: 'Java' },
  { name: 'East Java', population: 41.81, island: 'Java' },
  { name: 'Central Java', population: 38.44, island: 'Java' },
  { name: 'North Sumatra', population: 15.59, island: 'Sumatra' },
  { name: 'Banten', population: 12.43, island: 'Java' },
  { name: 'Jakarta', population: 10.56, island: 'Java' },
  { name: 'South Sulawesi', population: 9.46, island: 'Sulawesi' },
  { name: 'Lampung', population: 9.28, island: 'Sumatra' },
  { name: 'South Sumatra', population: 8.84, island: 'Sumatra' },
  { name: 'Riau', population: 6.91, island: 'Sumatra' },
  { name: 'West Sumatra', population: 5.88, island: 'Sumatra' },
  { name: 'West Kalimantan', population: 5.83, island: 'Kalimantan' },
  { name: 'East Nusa Tenggara', population: 5.66, island: 'Nusa Tenggara' },
  { name: 'West Nusa Tenggara', population: 5.6, island: 'Nusa Tenggara' },
  { name: 'Aceh', population: 5.55, island: 'Sumatra' },
];

// Share of the national population by island group, 2024 (BPS).
export const ISLAND_SHARES = [
  { name: 'Java', share: 55.9 },
  { name: 'Sumatra', share: 21.7 },
  { name: 'Sulawesi', share: 7.3 },
  { name: 'Kalimantan', share: 6.1 },
  { name: 'Bali and Nusa Tenggara', share: 5.4 },
  { name: 'Maluku and Papua', share: 3.6 },
];

// Latest statistical releases (BPS release calendar).
export const RELEASES = [
  { date: '5 Feb 2025', title: 'Economy grew 5.03% in 2024', detail: 'GDP at constant prices, full-year 2024' },
  { date: '2 Jan 2025', title: 'Inflation 1.57% in December 2024', detail: 'Consumer Price Index, year on year' },
  { date: '15 Jan 2025', title: 'Poverty rate 8.57% in September 2024', detail: '24.06 million people below the poverty line' },
  { date: '15 Jan 2025', title: 'Exports reached US$264.7 billion in 2024', detail: 'Goods trade surplus of US$31.0 billion' },
  { date: '5 Nov 2024', title: 'Unemployment 4.91% in August 2024', detail: 'National Labour Force Survey (Sakernas)' },
];

// Every source behind the figures on this site.
export const SOURCES = [
  { publisher: 'Statistics Indonesia (BPS)', what: 'GDP growth, inflation, unemployment, poverty, population by province, trade in goods, Human Development Index, life expectancy, schooling', year: '2024' },
  { publisher: 'International Monetary Fund', what: 'GDP and GDP per capita (nominal and PPP), government debt, World Economic Outlook', year: 'April 2025' },
  { publisher: 'World Bank', what: 'Population, urban share, World Development Indicators', year: '2024' },
  { publisher: 'United Nations', what: 'Population estimates and age structure, World Population Prospects 2024', year: '2024' },
  { publisher: 'UN Comtrade / CEPII BACI', what: 'Export products and destinations, reconciled bilateral trade', year: '2024' },
  { publisher: 'Bank Indonesia', what: 'Foreign exchange reserves, US$155.7 billion at end-2024', year: 'Dec 2024' },
  { publisher: 'CIA World Factbook', what: 'Labour force estimate', year: '2024 est.' },
];
