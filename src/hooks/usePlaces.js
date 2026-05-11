import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';
import {
  fetchPlaces,
  setSearch,
  setRegionFilter,
  setCategoryFilter,
} from '../redux/slices/placesSlice';

/**
 * usePlaces — кастомный хук для работы с каталогом мест.
 * Автоматически загружает данные при первом вызове.
 *
 * Использование:
 *   const { filtered, loading, search, onSearch } = usePlaces();
 */
export function usePlaces(autoFetch = true) {
  const dispatch = useDispatch();
  const { items, filtered, loading, error, search, regionFilter, categoryFilter } =
    useSelector((s) => s.places);

  // Загрузить места если ещё не загружены
  useEffect(() => {
    if (autoFetch && items.length === 0 && !loading) {
      dispatch(fetchPlaces());
    }
  }, [autoFetch, items.length, loading, dispatch]);

  const onSearch = useCallback(
    (value) => dispatch(setSearch(value)),
    [dispatch]
  );

  const onRegionFilter = useCallback(
    (value) => dispatch(setRegionFilter(value)),
    [dispatch]
  );

  const onCategoryFilter = useCallback(
    (value) => dispatch(setCategoryFilter(value)),
    [dispatch]
  );

  const reload = useCallback(
    () => dispatch(fetchPlaces()),
    [dispatch]
  );

  // Получить конкретное место по id
  const getById = useCallback(
    (id) => items.find((p) => p.id === Number(id)),
    [items]
  );

  return {
    items,
    filtered,
    loading,
    error,
    search,
    regionFilter,
    categoryFilter,
    onSearch,
    onRegionFilter,
    onCategoryFilter,
    reload,
    getById,
  };
}
