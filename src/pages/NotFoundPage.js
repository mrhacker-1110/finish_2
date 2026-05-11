import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 80, color: 'var(--accent)', marginBottom: 16 }}>404</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 12 }}>Страница не найдена</h2>
      <p style={{ color: 'var(--muted)', marginBottom: 24 }}>Может, она за горами Ала-Тоо?</p>
      <Link to="/"><button style={{ background: 'var(--accent)', color: '#0a0f0d', padding: '12px 28px', borderRadius: 10, fontWeight: 700, border: 'none', cursor: 'pointer' }}>← На главную</button></Link>
    </div>
  );
}
