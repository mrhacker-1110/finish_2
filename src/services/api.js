import axios from 'axios';

// Централизованный axios instance для JSONPlaceholder API
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — логируем каждый запрос
api.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — централизованная обработка ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Неизвестная ошибка';
    console.error(`[API Error] ${message}`);
    return Promise.reject(new Error(message));
  }
);

// ─── Places (photos endpoint) ────────────────────────────────────────────────
export const placesAPI = {
  getAll: (limit = 30) => api.get(`/photos?_limit=${limit}`),
};

// ─── Trip notes ───────────────────────────────────────────────────────────────
export const tripAPI = {
  saveNote: (data) => api.post('/posts', data),
  deleteItem: (id) => api.delete(`/posts/${id}`),
};

// ─── Community posts ──────────────────────────────────────────────────────────
export const postsAPI = {
  getAll: (limit = 12) => api.get(`/posts?_limit=${limit}`),
  getUsers: (limit = 10) => api.get(`/users?_limit=${limit}`),
  create: (data) => api.post('/posts', data),
};

export default api;
