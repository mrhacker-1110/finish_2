import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  addToTrip,
  removeFromTrip,
  updateNote,
  updateDays,
  saveTripNote,
  deleteTripItem,
  clearSuccess,
} from '../redux/slices/tripSlice';

/**
 * useTrip — кастомный хук для управления личным маршрутом.
 * Инкапсулирует всю Redux-логику: чтение состояния и dispatch действий.
 *
 * Использование:
 *   const { items, isInTrip, add, remove } = useTrip();
 */
export function useTrip() {
  const dispatch = useDispatch();
  const { items, saving, deleting, saveError, deleteError, successMsg } = useSelector(
    (s) => s.trip
  );

  // Проверить, добавлено ли место в маршрут
  const isInTrip = useCallback(
    (placeId) => items.some((i) => i.id === placeId),
    [items]
  );

  // Добавить место
  const add = useCallback(
    (place) => dispatch(addToTrip(place)),
    [dispatch]
  );

  // Удалить синхронно (без API)
  const remove = useCallback(
    (placeId) => dispatch(removeFromTrip(placeId)),
    [dispatch]
  );

  // Удалить через API (async)
  const deleteAsync = useCallback(
    (placeId) => dispatch(deleteTripItem(placeId)),
    [dispatch]
  );

  // Изменить заметку
  const setNote = useCallback(
    (id, note) => dispatch(updateNote({ id, note })),
    [dispatch]
  );

  // Сохранить заметку на сервер (async)
  const saveNote = useCallback(
    (id, title, note) => dispatch(saveTripNote({ id, title, note })),
    [dispatch]
  );

  // Изменить количество дней
  const setDays = useCallback(
    (id, days) => dispatch(updateDays({ id, days: Math.max(1, days) })),
    [dispatch]
  );

  // Сбросить сообщение об успехе
  const dismissSuccess = useCallback(
    () => dispatch(clearSuccess()),
    [dispatch]
  );

  // Вычисляемые данные
  const totalDays = items.reduce((sum, i) => sum + (i.days || 1), 0);
  const totalRegions = new Set(items.map((i) => i.region)).size;

  return {
    // Состояние
    items,
    saving,
    deleting,
    saveError,
    deleteError,
    successMsg,
    // Вычисляемое
    totalDays,
    totalRegions,
    itemCount: items.length,
    // Методы
    isInTrip,
    add,
    remove,
    deleteAsync,
    setNote,
    saveNote,
    setDays,
    dismissSuccess,
  };
}
