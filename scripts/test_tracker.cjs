const assert = require('node:assert/strict');
const D = require('../assets/js/tracker-data.js');
const raw = {
  '58': {'2026-08-01': 0, '2026-08-03': 100, '2026-02-30': 20, '2026-08-04': null},
  zl: {'2026-08-02': 40, '2026-08-03': 50},
  qcwy: {'2026-08-03': 25}, liepin: {'2026-08-03': 200},
  hiddenPlatform: {'2099-12-31': 999}
};
const data = D.normalise(raw);
assert.deepEqual(D.dates(data), ['2026-08-01', '2026-08-02', '2026-08-03']);
const view = D.view(data, '2026-08-01', '2026-08-03');
assert.deepEqual(view.counts['58'], [0, null, 100]);
assert.equal(view.baseline, '2026-08-03');
assert.equal(D.view(data, '2026-08-01', '2026-08-02').baseline, undefined);
assert.equal(D.view(data, '2026-07-01', '2026-07-02').hasData, false);
assert.deepEqual(D.latest(data, '58', '2026-08-01', '2026-08-01'), {date:'2026-08-01',value:0});
assert.equal(D.latest(data, 'qcwy', '2026-08-01', '2026-08-02'), null);
assert.deepEqual(D.last30(data), {start:'2026-08-01',end:'2026-08-03'});
assert.equal(D.range('2026-01-01', '2026-03-31').length, 90);
assert.throws(() => D.range('2026-01-01', '2026-04-01'), /90 days/);
assert.throws(() => D.range('2026-08-03', '2026-08-01'), /on or before/);
assert.throws(() => D.range('2026-02-30', '2026-03-01'), /valid/);
assert.deepEqual(D.dates(D.normalise(null)), []);
assert.equal(D.last30(D.normalise({})), null);
console.log('Tracker checks passed: missing vs zero, shared baseline, empty ranges, coverage dates, date validation and 90-day limit.');
