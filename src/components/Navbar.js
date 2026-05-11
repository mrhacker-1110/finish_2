import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from './Navbar.module.css';

const NAV = [
  { to: '/', label: 'Главная' },
  { to: '/explore', label: 'Исследовать' },
  { to: '/my-trip', label: 'Мой маршрут' },
  { to: '/community', label: 'Сообщество' },
  { to: '/about', label: 'О проекте' },
];

export default function Navbar() {
  const tripCount = useSelector(s => s.trip.items.length);
  const [open, setOpen] = useState(false);

  return (
    <nav style={navStyle}>
      <div style={brandStyle}>
        <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: 2 }}>AI//</span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700 }}>NOMAD.KG</span>
      </div>
      <div style={linksStyle}>
        {NAV.map(n => (
          <NavLink key={n.to} to={n.to} end={n.to === '/'} style={({ isActive }) => ({
            ...linkStyle,
            color: isActive ? 'var(--accent)' : 'var(--muted)',
            borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
          })}>
            {n.label}
            {n.to === '/my-trip' && tripCount > 0 && (
              <span style={badgeStyle}>{tripCount}</span>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

const navStyle = {
  position: 'sticky', top: 0, zIndex: 100,
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  padding: '0 2rem', height: 60,
  background: 'rgba(10,15,13,0.95)',
  backdropFilter: 'blur(12px)',
  borderBottom: '1px solid var(--border)',
};
const brandStyle = { display: 'flex', alignItems: 'center', gap: 6 };
const linksStyle = { display: 'flex', gap: 8 };
const linkStyle = {
  padding: '4px 12px', fontSize: 14, fontWeight: 500,
  borderRadius: 6, transition: 'all 0.2s',
  position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 6,
};
const badgeStyle = {
  background: 'var(--accent)', color: '#0a0f0d',
  borderRadius: 10, padding: '1px 6px',
  fontSize: 11, fontWeight: 700,
};
