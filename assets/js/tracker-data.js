/* Shared pure data operations: missing values remain distinct from zero. */
(function (root) {
  'use strict';
  const platforms = ['58', 'zl', 'qcwy', 'liepin'];
  const day = 86400000;
  function validDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const parsed = new Date(value + 'T00:00:00Z');
    return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
  }
  function normalise(input) {
    const data = {};
    platforms.forEach(key => {
      data[key] = {};
      const series = input && input[key];
      if (!series || typeof series !== 'object' || Array.isArray(series)) return;
      Object.entries(series).forEach(([date, value]) => {
        if (validDate(date) && typeof value === 'number' && Number.isFinite(value) && value >= 0) data[key][date] = value;
      });
    });
    return data;
  }
  function dates(data) { return [...new Set(platforms.flatMap(key => Object.keys(data[key] || {})))].sort(); }
  function range(start, end) {
    if (!validDate(start) || !validDate(end)) throw new Error('Choose a valid start and end date.');
    const from = Date.parse(start + 'T00:00:00Z');
    const to = Date.parse(end + 'T00:00:00Z');
    if (from > to) throw new Error('The start date must be on or before the end date.');
    if ((to - from) / day + 1 > 90) throw new Error('Choose a range of 90 days or fewer.');
    return Array.from({length: (to - from) / day + 1}, (_, i) => new Date(from + i * day).toISOString().slice(0, 10));
  }
  function view(data, start, end) {
    const labels = range(start, end);
    const baseline = labels.find(date => platforms.every(key => (data[key]?.[date] ?? 0) > 0));
    const counts = Object.fromEntries(platforms.map(key => [key, labels.map(date => data[key]?.[date] ?? null)]));
    return {labels, baseline, counts, hasData: platforms.some(key => counts[key].some(value => value !== null))};
  }
  function last30(data) {
    const available = dates(data);
    if (!available.length) return null;
    const end = available.at(-1);
    const start = new Date(Date.parse(end + 'T00:00:00Z') - 29 * day).toISOString().slice(0,10);
    return {start: start > available[0] ? start : available[0], end};
  }
  function latest(data, key, start, end) {
    const date = Object.keys(data[key] || {}).filter(date => date >= start && date <= end).sort().at(-1);
    return date ? {date, value: data[key][date]} : null;
  }
  const api = {platforms, validDate, normalise, dates, range, view, last30, latest};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.JobTrackerData = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
