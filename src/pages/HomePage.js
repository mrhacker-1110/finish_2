import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaces } from '../redux/slices/placesSlice';
import PlaceCard from '../components/PlaceCard';
import { Loader, ErrorMsg } from '../components/States';

export default function HomePage() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(s => s.places);

  useEffect(() => {
    if (items.length === 0) dispatch(fetchPlaces());
  }, [dispatch, items.length]);

  const featured = items.slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <section style={heroStyle}>
        <div style={heroBg} />
        <div style={heroContent}>
          <span style={monoTag}>// AI-POWERED TRAVEL GUIDE</span>
          <h1 style={heroTitle}>
            Открой<br />
            <span style={{ color: 'var(--accent)' }}>Кыргызстан</span>
          </h1>
          <p style={heroSub}>
            Умный гид по 7 регионам, горным озёрам, ущельям и кочевой культуре
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/explore">
              <button style={btnPrimary}>Исследовать места →</button>
            </Link>
            <Link to="/my-trip">
              <button style={btnSecondary}>Мой маршрут</button>
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 2rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {[['30+', 'Мест'], ['7', 'Регионов'], ['8', 'Категорий'], ['∞', 'Впечатлений']].map(([n, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--accent)', fontWeight: 900 }}>{n}</div>
              <div style={{ color: 'var(--muted)', fontSize: 13 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 2rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, marginBottom: 8 }}>Топ направления</h2>
        <p style={{ color: 'var(--muted)', marginBottom: 32 }}>Самые популярные места среди путешественников</p>
        {loading && <Loader />}
        {error && <ErrorMsg message={error} />}
        {!loading && !error && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {featured.map(p => <PlaceCard key={p.id} place={p} />)}
          </div>
        )}
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <Link to="/explore">
            <button style={btnPrimary}>Смотреть все места</button>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: '60px 2rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 12 }}>
          Планируй путешествие умно
        </h2>
        <p style={{ color: 'var(--muted)', maxWidth: 500, margin: '0 auto 24px' }}>
          Добавляй места в маршрут, пиши заметки и делись впечатлениями в сообществе
        </p>
        <Link to="/community"><button style={btnSecondary}>Сообщество путешественников</button></Link>
      </section>
    </div>
  );
}

const heroStyle = { position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'center', overflow: 'hidden' };
const heroBg = {
  position: 'absolute', inset: 0,
  background: 'radial-gradient(ellipse at 70% 50%, rgba(93,255,143,0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(255,204,68,0.05) 0%, transparent 50%)',
};
const heroContent = { position: 'relative', maxWidth: 1100, margin: '0 auto', padding: '0 2rem', width: '100%' };
const monoTag = { fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', letterSpacing: 2, display: 'block', marginBottom: 16 };
const heroTitle = { fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 90px)', lineHeight: 1.05, marginBottom: 20, fontWeight: 900 };
const heroSub = { color: 'var(--muted)', fontSize: 18, maxWidth: 460, marginBottom: 32, lineHeight: 1.6 };
const btnPrimary = { background: 'var(--accent)', color: '#0a0f0d', padding: '12px 28px', borderRadius: 10, fontWeight: 700, fontSize: 15, border: 'none', transition: 'opacity 0.2s', cursor: 'pointer' };
const btnSecondary = { background: 'transparent', color: 'var(--text)', padding: '12px 28px', borderRadius: 10, fontWeight: 600, fontSize: 15, border: '1px solid var(--border)', transition: 'border-color 0.2s', cursor: 'pointer' };
