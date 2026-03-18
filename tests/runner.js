const _results = { passed: 0, failed: 0, total: 0 };

function describe(name, fn) {
  const group = document.createElement('div');
  group.className = 'suite';
  group.innerHTML = `<h2>${name}</h2>`;
  document.getElementById('output').appendChild(group);
  _currentSuite = group;
  fn();
  _currentSuite = null;
}

let _currentSuite = null;

function it(name, fn) {
  _results.total++;
  const row = document.createElement('div');
  try {
    fn();
    _results.passed++;
    row.className = 'test pass';
    row.textContent = `✓ ${name}`;
  } catch (e) {
    _results.failed++;
    row.className = 'test fail';
    row.textContent = `✗ ${name} — ${e.message}`;
  }
  (_currentSuite || document.getElementById('output')).appendChild(row);
}

function expect(value) {
  return {
    toBe(expected) {
      if (value !== expected)
        throw new Error(`ожидалось ${JSON.stringify(expected)}, получено ${JSON.stringify(value)}`);
    },
    toEqual(expected) {
      if (JSON.stringify(value) !== JSON.stringify(expected))
        throw new Error(`ожидалось ${JSON.stringify(expected)}, получено ${JSON.stringify(value)}`);
    },
    toBeTruthy() {
      if (!value) throw new Error(`ожидалось truthy, получено ${JSON.stringify(value)}`);
    },
    toBeFalsy() {
      if (value) throw new Error(`ожидалось falsy, получено ${JSON.stringify(value)}`);
    },
    toContain(expected) {
      if (!value.includes(expected))
        throw new Error(`ожидалось что "${value}" содержит "${expected}"`);
    },
  };
}

function makeSummary() {
  const el = document.createElement('div');
  el.className = `summary ${_results.failed > 0 ? 'has-failures' : 'all-pass'}`;
  el.textContent =
    `Итого: ${_results.total} | ✓ ${_results.passed} | ✗ ${_results.failed}`;
  document.getElementById('output').prepend(el);
}

window.addEventListener('load', () => setTimeout(makeSummary, 0));
