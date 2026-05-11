/**
 * helpers.js — вспомогательные утилиты для AI Nomad KG
 */

/**
 * Форматирует количество дней в читаемую строку.
 * formatDays(1) → "1 день"
 * formatDays(3) → "3 дня"
 * formatDays(7) → "7 дней"
 */
export function formatDays(n) {
  const abs = Math.abs(n);
  if (abs % 10 === 1 && abs % 100 !== 11) return `${n} день`;
  if ([2, 3, 4].includes(abs % 10) && ![12, 13, 14].includes(abs % 100)) return `${n} дня`;
  return `${n} дней`;
}

/**
 * Форматирует количество мест в читаемую строку.
 * formatPlaces(1) → "1 место"
 * formatPlaces(3) → "3 места"
 * formatPlaces(11) → "11 мест"
 */
export function formatPlaces(n) {
  const abs = Math.abs(n);
  if (abs % 10 === 1 && abs % 100 !== 11) return `${n} место`;
  if ([2, 3, 4].includes(abs % 10) && ![12, 13, 14].includes(abs % 100)) return `${n} места`;
  return `${n} мест`;
}

/**
 * Обрезает текст до maxLength символов и добавляет "..."
 * truncate("Очень длинный текст о горах Кыргызстана", 20) → "Очень длинный текст..."
 */
export function truncate(text, maxLength = 80) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}

/**
 * Генерирует уникальный ID на основе timestamp + random.
 * Используется для временных ID новых элементов.
 */
export function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

/**
 * Получает уникальные значения поля из массива объектов.
 * getUniqueValues(places, 'region') → ['Иссык-Кульская', 'Чуйская', ...]
 */
export function getUniqueValues(arr, field) {
  return [...new Set(arr.map((item) => item[field]).filter(Boolean))];
}

/**
 * Считает суммарное значение поля из массива.
 * sumField(tripItems, 'days') → 14
 */
export function sumField(arr, field) {
  return arr.reduce((sum, item) => sum + (item[field] || 0), 0);
}

/**
 * Проверяет, содержит ли строка подстроку (без учёта регистра).
 * includesIgnoreCase("Иссык-Куль", "куль") → true
 */
export function includesIgnoreCase(str, search) {
  if (!str || !search) return false;
  return str.toLowerCase().includes(search.toLowerCase());
}
