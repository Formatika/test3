/**
 * Чистые функции, извлечённые из index.html для тестирования.
 */

/** Возвращает true, если navbar должен показывать тень. */
function isScrolled(scrollY) {
  return scrollY > 20;
}

/**
 * Возвращает id текущей активной секции.
 * @param {Array<{id: string, offsetTop: number}>} sections
 * @param {number} scrollY
 * @returns {string}
 */
function getCurrentSection(sections, scrollY) {
  let current = '';
  sections.forEach(section => {
    if (scrollY >= section.offsetTop - 90) {
      current = section.id;
    }
  });
  return current;
}

/**
 * Переключает мобильное меню.
 * Возвращает новое состояние isOpen.
 * @param {DOMTokenList} navMenuClasses
 * @param {DOMTokenList} burgerClasses
 * @param {Element} burgerEl
 * @returns {boolean}
 */
function toggleMenu(navMenuClasses, burgerClasses, burgerEl) {
  const isOpen = navMenuClasses.toggle('open');
  burgerClasses.toggle('open', isOpen);
  burgerEl.setAttribute('aria-expanded', String(isOpen));
  return isOpen;
}

/**
 * Закрывает мобильное меню.
 * @param {DOMTokenList} navMenuClasses
 * @param {DOMTokenList} burgerClasses
 * @param {Element} burgerEl
 */
function closeMenu(navMenuClasses, burgerClasses, burgerEl) {
  navMenuClasses.remove('open');
  burgerClasses.remove('open');
  burgerEl.setAttribute('aria-expanded', 'false');
}
