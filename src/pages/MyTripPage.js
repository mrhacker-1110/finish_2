import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromTrip, updateNote, updateDays, saveTripNote, deleteTripItem, clearSuccess } from '../redux/slices/tripSlice';
import { Loader, ErrorMsg, EmptyState } from '../components/States';
import { Link } from 'react-router-dom';

export default function MyTripPage() {
  const dispatch = useDispatch();
  const { items, saving, deleting, saveError, deleteError, successMsg } = useSelector(s => s.trip);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (successMsg) setTimeout(() => dispatch(clearSuccess()), 3000);
  }, [successMsg, dispatch]);

  const totalDays = items.reduce((sum, i) => sum + (i.days || 1), 0);

  if (items.length === 0) return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, marginBottom: 8 }}>Мой маршрут</h1>
      <EmptyState icon="🗺" title="Маршрут пуст" subtitle="Добавьте места на странице исследования" />
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <Link to="/explore"><button style={btnPrimary}>Исследовать места</button></Link>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, marginBottom: 4 }}>Мой маршрут</h1>
          <p style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
            // {items.length} мест · {totalDays} дней
          </p>
        </div>
      </div>

      {successMsg && (
        <div style={{ background: 'rgba(93,255,143,0.12)', border: '1px solid var(--accent)', borderRadius: 10, padding: '12px 20px', color: 'var(--accent)', marginBottom: 20, fontFamily: 'var(--font-mono)', fontSize: 13 }}>
          ✓ {successMsg}
        </div>
      )}
      {(saveError || deleteError) && <ErrorMsg message={saveError || deleteError} />}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {items.map((item, idx) => (
          <div key={item.id} style={cardStyle}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              {/* Step number */}
              <div style={stepBadge}>{idx + 1}</div>

              {/* Image */}
              <img src={item.image} alt={item.title}
                style={{ width: 100, height: 80, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <Link to={`/place/${item.id}`}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 4 }}>{item.title}</h3>
                </Link>
                <p style={{ color: 'var(--muted)', fontSize: 12, marginBottom: 10 }}>📍 {item.region} · {item.category}</p>

                {/* Days editor */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 13, color: 'var(--muted)' }}>Дней:</span>
                  <button onClick={() => dispatch(updateDays({ id: item.id, days: Math.max(1, item.days - 1) }))} style={dayBtn}>−</button>
                  <span style={{ fontFamily: 'var(--font-mono)', minWidth: 24, textAlign: 'center' }}>{item.days}</span>
                  <button onClick={() => dispatch(updateDays({ id: item.id, days: item.days + 1 }))} style={dayBtn}>+</button>
                </div>

                {/* Note */}
                {editingId === item.id ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <textarea
                      rows={3}
                      value={item.note}
                      onChange={e => dispatch(updateNote({ id: item.id, note: e.target.value }))}
                      placeholder="Твои заметки о месте..."
                      style={{ fontSize: 13 }}
                    />
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => { dispatch(saveTripNote({ id: item.id, title: item.title, note: item.note })); setEditingId(null); }}
                        style={{ ...btnPrimary, padding: '7px 16px', fontSize: 12 }}
                        disabled={saving}>
                        {saving ? 'Сохранение...' : '💾 Сохранить'}
                      </button>
                      <button onClick={() => setEditingId(null)} style={{ ...btnOutline, padding: '7px 16px', fontSize: 12 }}>Отмена</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {item.note && <p style={{ fontSize: 13, color: '#b0c4b5', fontStyle: 'italic', marginBottom: 6 }}>"{item.note}"</p>}
                    <button onClick={() => setEditingId(item.id)} style={{ ...btnOutline, padding: '5px 12px', fontSize: 12 }}>
                      {item.note ? '✏ Изменить' : '+ Заметка'}
                    </button>
                  </div>
                )}
              </div>

              {/* Delete */}
              <button
                onClick={() => dispatch(deleteTripItem(item.id))}
                disabled={deleting}
                style={{ background: 'transparent', border: '1px solid var(--danger)', color: 'var(--danger)', borderRadius: 8, padding: '6px 10px', fontSize: 14, flexShrink: 0 }}>
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div style={{ marginTop: 32, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 16 }}>Итог поездки</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <Stat label="Мест" value={items.length} />
          <Stat label="Дней" value={totalDays} />
          <Stat label="Регионов" value={new Set(items.map(i => i.region)).size} />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--accent)' }}>{value}</div>
      <div style={{ color: 'var(--muted)', fontSize: 13 }}>{label}</div>
    </div>
  );
}

const cardStyle = { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 20 };
const stepBadge = {
  width: 32, height: 32, borderRadius: '50%',
  background: 'rgba(93,255,143,0.15)', color: 'var(--accent)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, flexShrink: 0,
};
const dayBtn = {
  background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--text)',
  width: 26, height: 26, borderRadius: 6, fontSize: 14,
};
const btnPrimary = { background: 'var(--accent)', color: '#0a0f0d', borderRadius: 8, fontWeight: 700, border: 'none', cursor: 'pointer' };
const btnOutline = { background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 8, cursor: 'pointer' };
