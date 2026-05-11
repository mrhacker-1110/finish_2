import React from 'react';

const REDUX_SLICES = [
  {
    name: 'placesSlice',
    asyncOps: ['fetchPlaces — GET /photos (JSONPlaceholder)'],
    syncOps: ['setSearch', 'setRegionFilter', 'setCategoryFilter', 'applyFilters'],
    states: ['loading', 'error', 'items[]', 'filtered[]', 'search', 'regionFilter', 'categoryFilter'],
  },
  {
    name: 'tripSlice',
    asyncOps: ['saveTripNote — POST /posts (JSONPlaceholder)', 'deleteTripItem — DELETE /posts/:id'],
    syncOps: ['addToTrip', 'removeFromTrip', 'updateNote', 'updateDays', 'clearSuccess'],
    states: ['items[]', 'saving', 'deleting', 'saveError', 'deleteError', 'successMsg'],
  },
  {
    name: 'postsSlice',
    asyncOps: ['fetchPosts — GET /posts + /users (JSONPlaceholder)', 'createPost — POST /posts'],
    syncOps: ['likePost', 'deletePost'],
    states: ['items[]', 'loading', 'creating', 'error', 'createError'],
  },
];

const ROUTES = [
  { path: '/', label: 'Главная', desc: 'Лендинг с топ-местами и статистикой' },
  { path: '/explore', label: 'Исследовать', desc: 'Каталог мест с поиском и тройной фильтрацией' },
  { path: '/place/:id', label: 'Детали места', desc: 'Полная информация + кнопка в маршрут' },
  { path: '/my-trip', label: 'Мой маршрут', desc: 'CRUD: добавить, редактировать дни/заметки, удалить' },
  { path: '/community', label: 'Сообщество', desc: 'GET посты, POST новый пост, DELETE, Like' },
  { path: '/about', label: 'О проекте', desc: 'Документация архитектуры (эта страница)' },
];

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 2rem 80px' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', letterSpacing: 2 }}>// ДОКУМЕНТАЦИЯ</span>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, marginBottom: 8, marginTop: 8 }}>AI Nomad KG</h1>
      <p style={{ color: 'var(--muted)', fontSize: 16, marginBottom: 48 }}>
        Интеллектуальный гид по Кыргызстану — React + Redux Toolkit проект
      </p>

      <Section title="Описание проекта">
        <p style={p}>
          AI Nomad KG — одностраничное React-приложение (SPA) для планирования путешествий по Кыргызстану.
          Пользователь может просматривать места по регионам и категориям, составлять персональный маршрут,
          добавлять заметки и общаться в сообществе путешественников.
        </p>
        <p style={{ ...p, marginTop: 12 }}>
          Данные загружаются через JSONPlaceholder REST API. Вся логика состояния управляется через Redux Toolkit.
        </p>
      </Section>

      <Section title="Технологии">
        <div style={grid2}>
          {[
            ['React 18', 'UI library, хуки, роутинг'],
            ['Redux Toolkit', 'State management, createSlice, createAsyncThunk'],
            ['React Router v6', 'BrowserRouter, Routes, NavLink, useParams'],
            ['Axios', 'HTTP-клиент для API запросов'],
            ['JSONPlaceholder', 'Публичный REST API для демо-данных'],
            ['React Redux', 'useSelector, useDispatch'],
          ].map(([tech, desc]) => (
            <div key={tech} style={techCard}>
              <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: 14, marginBottom: 4 }}>{tech}</div>
              <div style={{ color: 'var(--muted)', fontSize: 13 }}>{desc}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Маршруты (Routes)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ROUTES.map(r => (
            <div key={r.path} style={{ display: 'flex', gap: 16, padding: '12px 16px', background: 'var(--card)', borderRadius: 8, border: '1px solid var(--border)' }}>
              <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: 13, minWidth: 160 }}>{r.path}</code>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{r.label}</div>
                <div style={{ color: 'var(--muted)', fontSize: 13 }}>{r.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Redux Архитектура">
        <p style={p}>Store настроен через <code style={code}>configureStore</code> с тремя slice-редьюсерами:</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
          {REDUX_SLICES.map(s => (
            <div key={s.name} style={sliceCard}>
              <h4 style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', marginBottom: 12 }}>{s.name}</h4>
              <div style={grid3}>
                <div>
                  <Label>Async Thunks</Label>
                  {s.asyncOps.map(op => <Item key={op}>{op}</Item>)}
                </div>
                <div>
                  <Label>Sync Actions</Label>
                  {s.syncOps.map(op => <Item key={op}>{op}</Item>)}
                </div>
                <div>
                  <Label>State</Label>
                  {s.states.map(st => <Item key={st}>{st}</Item>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Async Flow">
        <p style={p}>
          Все API-вызовы реализованы через <code style={code}>createAsyncThunk</code>. Каждый thunk обрабатывает
          три состояния жизненного цикла:
        </p>
        <div style={codeBlock}>
          {`// Пример: fetchPlaces
export const fetchPlaces = createAsyncThunk(
  'places/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=30');
      return res.data.map(item => ({ ...mapped }));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// В extraReducers:
.addCase(fetchPlaces.pending,   state => { state.loading = true })
.addCase(fetchPlaces.fulfilled, (state, action) => { state.items = action.payload })
.addCase(fetchPlaces.rejected,  (state, action) => { state.error = action.payload })`}
        </div>
      </Section>

      <Section title="CRUD Функционал">
        <div style={grid2}>
          {[
            ['CREATE', 'Добавление места в маршрут (addToTrip), публикация поста (createPost → POST /posts)'],
            ['READ', 'Загрузка мест (fetchPlaces → GET), постов (fetchPosts → GET)'],
            ['UPDATE', 'Редактирование заметок и дней (updateNote/updateDays + saveTripNote → POST), лайк (likePost)'],
            ['DELETE', 'Удаление из маршрута (deleteTripItem → DELETE /posts/:id), удаление поста'],
          ].map(([op, desc]) => (
            <div key={op} style={techCard}>
              <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent2)', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{op}</div>
              <div style={{ color: 'var(--muted)', fontSize: 13 }}>{desc}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Состояния приложения (UI States)">
        <div style={grid3}>
          {[
            ['loading', 'Анимированный спиннер при загрузке данных'],
            ['error', 'Красный блок с сообщением ошибки'],
            ['empty', 'Иконка + текст когда данных нет'],
            ['success', 'Зелёный баннер после сохранения заметки'],
            ['saving/deleting', 'Блокировка кнопок во время async операций'],
          ].map(([state, desc]) => (
            <div key={state} style={techCard}>
              <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: 13, marginBottom: 4 }}>{state}</div>
              <div style={{ color: 'var(--muted)', fontSize: 12 }}>{desc}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Структура проекта">
        <div style={codeBlock}>
          {`ai-nomad-kg/
├── src/
│   ├── components/
│   │   ├── Navbar.js      — Навигация с badge маршрута
│   │   ├── PlaceCard.js   — Карточка места + add/remove
│   │   └── States.js      — Loader, ErrorMsg, EmptyState
│   ├── pages/
│   │   ├── HomePage.js        — Главная + featured места
│   │   ├── ExplorePage.js     — Каталог + поиск + фильтры
│   │   ├── PlaceDetailPage.js — Детали места
│   │   ├── MyTripPage.js      — Маршрут (полный CRUD)
│   │   ├── CommunityPage.js   — Посты сообщества
│   │   ├── AboutPage.js       — Документация (эта страница)
│   │   └── NotFoundPage.js    — 404
│   ├── redux/
│   │   ├── store.js           — configureStore
│   │   └── slices/
│   │       ├── placesSlice.js — fetchPlaces + фильтрация
│   │       ├── tripSlice.js   — CRUD маршрута
│   │       └── postsSlice.js  — сообщество
│   └── App.js                 — Router + Routes
├── public/index.html
└── package.json`}
        </div>
      </Section>

      <Section title="Автор">
        <p style={p}>
          Проект разработан как финальный экзамен по React + Redux.<br />
          Тема: <strong style={{ color: 'var(--accent)' }}>AI Nomad KG — Умный гид по Кыргызстану</strong>
        </p>
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, marginBottom: 20, paddingBottom: 10, borderBottom: '1px solid var(--border)' }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
function Label({ children }) { return <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase' }}>{children}</div>; }
function Item({ children }) { return <div style={{ fontSize: 12, color: '#b0c4b5', padding: '2px 0', borderLeft: '2px solid var(--border)', paddingLeft: 8, marginBottom: 4 }}>{children}</div>; }

const p = { color: '#b0c4b5', lineHeight: 1.7, fontSize: 15 };
const code = { fontFamily: 'var(--font-mono)', background: 'rgba(93,255,143,0.1)', color: 'var(--accent)', padding: '2px 6px', borderRadius: 4, fontSize: 13 };
const codeBlock = { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#b0c4b5', lineHeight: 1.8, whiteSpace: 'pre', overflowX: 'auto', marginTop: 12 };
const grid2 = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12, marginTop: 12 };
const grid3 = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 };
const techCard = { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: 16 };
const sliceCard = { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: 20 };
