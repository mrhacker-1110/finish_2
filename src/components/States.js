import React from 'react';

export function Loader({ text = 'Загрузка...' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: 16 }}>
      <div style={{ width: 48, height: 48, border: '3px solid var(--border)', borderTop: '3px solid var(--accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <p style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>{text}</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export function ErrorMsg({ message }) {
  return (
    <div style={{ margin: '20px auto', maxWidth: 500, background: 'rgba(255,92,92,0.1)', border: '1px solid var(--danger)', borderRadius: 10, padding: '16px 20px', color: 'var(--danger)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
      ⚠ Ошибка: {message}
    </div>
  );
}

export function EmptyState({ icon = '🏔', title = 'Ничего не найдено', subtitle = 'Попробуйте другой запрос' }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>{icon}</div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 8 }}>{title}</h3>
      <p style={{ color: 'var(--muted)' }}>{subtitle}</p>
    </div>
  );
}
