// ─── isScrolled ───────────────────────────────────────────────────────────────

describe('isScrolled', () => {
  it('возвращает false при scrollY = 0', () => {
    expect(isScrolled(0)).toBe(false);
  });

  it('возвращает false при scrollY = 20 (граница не включена)', () => {
    expect(isScrolled(20)).toBe(false);
  });

  it('возвращает true при scrollY = 21', () => {
    expect(isScrolled(21)).toBe(true);
  });

  it('возвращает true при большом scrollY', () => {
    expect(isScrolled(9999)).toBe(true);
  });
});

// ─── getCurrentSection ────────────────────────────────────────────────────────

describe('getCurrentSection', () => {
  const sections = [
    { id: 'hero',     offsetTop: 0   },
    { id: 'about',    offsetTop: 500 },
    { id: 'catalog',  offsetTop: 1000 },
    { id: 'delivery', offsetTop: 1500 },
  ];

  it('возвращает пустую строку, если ни одна секция не достигнута', () => {
    expect(getCurrentSection(sections, -1)).toBe('');
  });

  it('возвращает первую секцию при scrollY = 0', () => {
    expect(getCurrentSection(sections, 0)).toBe('hero');
  });

  it('возвращает hero, если до about ещё не долистали (учитывает offset 90px)', () => {
    expect(getCurrentSection(sections, 400)).toBe('hero');
  });

  it('переключается на about при достижении порога (500 - 90 = 410)', () => {
    expect(getCurrentSection(sections, 410)).toBe('about');
  });

  it('переключается на catalog при достижении порога (1000 - 90 = 910)', () => {
    expect(getCurrentSection(sections, 910)).toBe('catalog');
  });

  it('возвращает последнюю секцию при очень большом scrollY', () => {
    expect(getCurrentSection(sections, 99999)).toBe('delivery');
  });

  it('возвращает пустую строку для пустого списка секций', () => {
    expect(getCurrentSection([], 500)).toBe('');
  });
});

// ─── toggleMenu ───────────────────────────────────────────────────────────────

describe('toggleMenu', () => {
  function makeMenu(initialOpen = false) {
    const nav = document.createElement('ul');
    const btn = document.createElement('button');
    btn.setAttribute('aria-expanded', String(initialOpen));
    if (initialOpen) { nav.classList.add('open'); btn.classList.add('open'); }
    return { nav, btn };
  }

  it('открывает закрытое меню', () => {
    const { nav, btn } = makeMenu(false);
    const result = toggleMenu(nav.classList, btn.classList, btn);
    expect(result).toBe(true);
    expect(nav.classList.contains('open')).toBe(true);
    expect(btn.classList.contains('open')).toBe(true);
    expect(btn.getAttribute('aria-expanded')).toBe('true');
  });

  it('закрывает открытое меню', () => {
    const { nav, btn } = makeMenu(true);
    const result = toggleMenu(nav.classList, btn.classList, btn);
    expect(result).toBe(false);
    expect(nav.classList.contains('open')).toBe(false);
    expect(btn.classList.contains('open')).toBe(false);
    expect(btn.getAttribute('aria-expanded')).toBe('false');
  });

  it('двойной toggle возвращает исходное состояние', () => {
    const { nav, btn } = makeMenu(false);
    toggleMenu(nav.classList, btn.classList, btn);
    toggleMenu(nav.classList, btn.classList, btn);
    expect(nav.classList.contains('open')).toBe(false);
  });
});

// ─── closeMenu ────────────────────────────────────────────────────────────────

describe('closeMenu', () => {
  it('закрывает уже открытое меню', () => {
    const nav = document.createElement('ul');
    const btn = document.createElement('button');
    nav.classList.add('open');
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');

    closeMenu(nav.classList, btn.classList, btn);

    expect(nav.classList.contains('open')).toBe(false);
    expect(btn.classList.contains('open')).toBe(false);
    expect(btn.getAttribute('aria-expanded')).toBe('false');
  });

  it('не бросает ошибку при вызове на уже закрытом меню', () => {
    const nav = document.createElement('ul');
    const btn = document.createElement('button');
    btn.setAttribute('aria-expanded', 'false');

    closeMenu(nav.classList, btn.classList, btn);

    expect(nav.classList.contains('open')).toBe(false);
    expect(btn.getAttribute('aria-expanded')).toBe('false');
  });
});
