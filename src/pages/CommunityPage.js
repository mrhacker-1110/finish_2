import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, createPost, likePost, deletePost } from '../redux/slices/postsSlice';
import { Loader, ErrorMsg, EmptyState } from '../components/States';

export default function CommunityPage() {
  const dispatch = useDispatch();
  const { items, loading, creating, error } = useSelector(s => s.posts);
  const [form, setForm] = useState({ title: '', body: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (items.length === 0) dispatch(fetchPosts());
  }, [dispatch, items.length]);

  const handleSubmit = () => {
    if (!form.title.trim() || !form.body.trim()) return;
    dispatch(createPost({ title: form.title, body: form.body, userId: 1 }));
    setForm({ title: '', body: '' });
    setShowForm(false);
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, marginBottom: 4 }}>Сообщество</h1>
          <p style={{ color: 'var(--muted)' }}>Истории путешественников по Кыргызстану</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={btnPrimary}>
          {showForm ? '✕ Закрыть' : '+ Новый пост'}
        </button>
      </div>

      {/* CREATE FORM */}
      {showForm && (
        <div style={{ background: 'var(--card)', border: '1px solid var(--accent)', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 16 }}>Поделись историей</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              placeholder="Заголовок поста"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
            <textarea
              rows={4}
              placeholder="Расскажи о своём путешествии..."
              value={form.body}
              onChange={e => setForm({ ...form, body: e.target.value })}
            />
            <button onClick={handleSubmit} style={{ ...btnPrimary, opacity: creating ? 0.6 : 1 }} disabled={creating}>
              {creating ? 'Публикация...' : 'Опубликовать'}
            </button>
          </div>
        </div>
      )}

      {loading && <Loader text="Загружаем посты..." />}
      {error && <ErrorMsg message={error} />}
      {!loading && !error && items.length === 0 && <EmptyState icon="✍️" title="Постов нет" subtitle="Будь первым!" />}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {items.map(post => (
          <div key={post.id} style={postCard}>
            {post.image && (
              <img src={post.image} alt={post.title}
                style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: '10px 10px 0 0', display: 'block' }} />
            )}
            <div style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <img src={post.avatar} alt={post.author} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{post.author}</div>
                    {post.isNew && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)' }}>NEW</span>}
                  </div>
                </div>
                <button onClick={() => dispatch(deletePost(post.id))}
                  style={{ background: 'transparent', border: 'none', color: 'var(--muted)', fontSize: 16 }}>✕</button>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 8, textTransform: 'capitalize' }}>{post.title}</h3>
              <p style={{ color: '#b0c4b5', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{post.body}</p>
              <button onClick={() => dispatch(likePost(post.id))}
                style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--muted)', borderRadius: 20, padding: '5px 14px', fontSize: 13 }}>
                ♥ {post.likes}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const postCard = { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' };
const btnPrimary = { background: 'var(--accent)', color: '#0a0f0d', padding: '10px 22px', borderRadius: 10, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' };
