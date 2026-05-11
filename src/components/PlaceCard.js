import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToTrip, removeFromTrip } from '../redux/slices/tripSlice';

export default function PlaceCard({ place }) {
  const dispatch = useDispatch();
  const tripItems = useSelector(s => s.trip.items);
  const inTrip = tripItems.some(i => i.id === place.id);

  return (
    <div style={cardStyle}>
      <Link to={`/place/${place.id}`}>
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '10px 10px 0 0' }}>
          <img src={place.image} alt={place.title}
            style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.06)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          />
          <span style={categoryBadge}>{place.category}</span>
          <span style={ratingBadge}>★ {place.rating}</span>
        </div>
      </Link>
      <div style={{ padding: '14px 16px 16px' }}>
        <Link to={`/place/${place.id}`}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, marginBottom: 4 }}>{place.title}</h3>
        </Link>
        <p style={{ color: 'var(--muted)', fontSize: 12, marginBottom: 8 }}>
          📍 {place.region} · ⏱ {place.duration}
        </p>
        <p style={{ fontSize: 13, color: '#b0c4b5', lineHeight: 1.5, marginBottom: 12 }}>
          {place.description.slice(0, 80)}...
        </p>
        <button onClick={() => inTrip ? dispatch(removeFromTrip(place.id)) : dispatch(addToTrip(place))}
          style={{ ...btnStyle, background: inTrip ? 'transparent' : 'var(--accent)', color: inTrip ? 'var(--accent)' : '#0a0f0d', border: `1px solid var(--accent)` }}>
          {inTrip ? '✓ В маршруте' : '+ В маршрут'}
        </button>
      </div>
    </div>
  );
}

const cardStyle = {
  background: 'var(--card)', borderRadius: 12,
  border: '1px solid var(--border)', overflow: 'hidden',
  transition: 'transform 0.2s, box-shadow 0.2s',
};
const categoryBadge = {
  position: 'absolute', top: 10, left: 10,
  background: 'rgba(10,15,13,0.8)', backdropFilter: 'blur(6px)',
  color: 'var(--accent)', fontSize: 11, padding: '3px 8px', borderRadius: 20,
  fontFamily: 'var(--font-mono)',
};
const ratingBadge = {
  position: 'absolute', top: 10, right: 10,
  background: 'rgba(10,15,13,0.8)', backdropFilter: 'blur(6px)',
  color: 'var(--accent2)', fontSize: 12, padding: '3px 8px', borderRadius: 20,
  fontFamily: 'var(--font-mono)',
};
const btnStyle = {
  width: '100%', padding: '8px 0', borderRadius: 8,
  fontWeight: 600, fontSize: 13, transition: 'all 0.2s',
};
