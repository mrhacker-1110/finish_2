import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToTrip, removeFromTrip } from '../redux/slices/tripSlice';
import { EmptyState } from '../components/States';

export default function PlaceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const places = useSelector(s => s.places.items);
  const tripItems = useSelector(s => s.trip.items);

  const place = places.find(p => p.id === Number(id));
  const inTrip = tripItems.some(i => i.id === Number(id));

  if (!place) return <EmptyState icon="🗺" title="Место не найдено" subtitle="Вернитесь на страницу исследования" />;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 2rem' }}>
      <button onClick={() => navigate(-1)} style={backBtn}>← Назад</button>

      <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 32, position: 'relative' }}>
        <img src={place.image} alt={place.title} style={{ width: '100%', height: 380, objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,15,13,0.8) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', bottom: 24, left: 28 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 900, marginBottom: 8 }}>{place.title}</h1>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Tag>{place.region}</Tag>
            <Tag>{place.category}</Tag>
            <Tag style={{ color: 'var(--accent2)' }}>★ {place.rating}</Tag>
            <Tag>⏱ {place.duration}</Tag>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32 }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginBottom: 16 }}>Описание</h2>
          <p style={{ color: '#b0c4b5', lineHeight: 1.8, marginBottom: 24 }}>{place.description}</p>
          <p style={{ color: '#b0c4b5', lineHeight: 1.8 }}>
            Кыргызстан — страна Манаса и вечных гор. Это место, где природа величественна,
            люди гостеприимны, а горизонт всегда зовёт за собой. Здесь каждый путешественник
            находит то, что искал: покой, приключение или себя самого.
          </p>
        </div>

        <div>
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 20 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 16 }}>Информация</h3>
            <InfoRow label="Регион" value={place.region} />
            <InfoRow label="Категория" value={place.category} />
            <InfoRow label="Рейтинг" value={`★ ${place.rating}`} />
            <InfoRow label="Длительность" value={place.duration} />
            <button
              onClick={() => inTrip ? dispatch(removeFromTrip(Number(id))) : dispatch(addToTrip(place))}
              style={{
                marginTop: 16, width: '100%', padding: '12px 0', borderRadius: 10,
                background: inTrip ? 'transparent' : 'var(--accent)',
                color: inTrip ? 'var(--accent)' : '#0a0f0d',
                border: '1px solid var(--accent)', fontWeight: 700, fontSize: 14,
              }}>
              {inTrip ? '✓ Убрать из маршрута' : '+ Добавить в маршрут'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span style={{
      background: 'rgba(93,255,143,0.12)', color: 'var(--accent)',
      borderRadius: 20, padding: '3px 12px', fontSize: 12, fontFamily: 'var(--font-mono)',
    }}>{children}</span>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 14 }}>
      <span style={{ color: 'var(--muted)' }}>{label}</span>
      <span style={{ fontWeight: 500 }}>{value}</span>
    </div>
  );
}

const backBtn = {
  background: 'transparent', border: '1px solid var(--border)',
  color: 'var(--muted)', padding: '8px 16px', borderRadius: 8, marginBottom: 24,
  fontSize: 14, transition: 'all 0.2s',
};
