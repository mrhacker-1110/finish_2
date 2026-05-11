import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaces, setSearch, setRegionFilter, setCategoryFilter } from '../redux/slices/placesSlice';
import PlaceCard from '../components/PlaceCard';
import { Loader, ErrorMsg, EmptyState } from '../components/States';

const REGIONS = ['', 'Иссык-Кульская', 'Чуйская', 'Ошская', 'Нарынская', 'Джалал-Абадская', 'Таласская', 'Баткенская'];
const CATEGORIES = ['', 'Природа', 'История', 'Горы', 'Озёра', 'Культура', 'Юрты', 'Треккинг', 'Города'];

export default function ExplorePage() {
  const dispatch = useDispatch();
  const { filtered, loading, error, search, regionFilter, categoryFilter } = useSelector(s => s.places);

  useEffect(() => {
    dispatch(fetchPlaces());
  }, [dispatch]);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 42, marginBottom: 8 }}>Исследовать</h1>
      <p style={{ color: 'var(--muted)', marginBottom: 32 }}>Найди своё идеальное место в Кыргызстане</p>

      {/* FILTERS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px 200px', gap: 12, marginBottom: 32 }}>
        <input
          type="text"
          placeholder="🔍 Поиск по названию или региону..."
          value={search}
          onChange={e => dispatch(setSearch(e.target.value))}
        />
        <select value={regionFilter} onChange={e => dispatch(setRegionFilter(e.target.value))}>
          {REGIONS.map(r => <option key={r} value={r}>{r || 'Все регионы'}</option>)}
        </select>
        <select value={categoryFilter} onChange={e => dispatch(setCategoryFilter(e.target.value))}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c || 'Все категории'}</option>)}
        </select>
      </div>

      {/* RESULTS COUNT */}
      {!loading && !error && (
        <p style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 12, marginBottom: 20 }}>
          // найдено: {filtered.length} мест
        </p>
      )}

      {/* STATES */}
      {loading && <Loader text="Загружаем места..." />}
      {error && <ErrorMsg message={error} />}
      {!loading && !error && filtered.length === 0 && (
        <EmptyState icon="🔍" title="Ничего не найдено" subtitle="Попробуйте другой запрос или сбросьте фильтры" />
      )}

      {/* GRID */}
      {!loading && !error && filtered.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {filtered.map(p => <PlaceCard key={p.id} place={p} />)}
        </div>
      )}
    </div>
  );
}
