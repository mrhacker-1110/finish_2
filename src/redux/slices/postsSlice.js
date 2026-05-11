import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk 4: GET community posts
export const fetchPosts = createAsyncThunk('posts/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=12');
    const users = await axios.get('https://jsonplaceholder.typicode.com/users?_limit=10');
    return res.data.map(post => ({
      ...post,
      author: users.data[post.userId - 1]?.name || 'Путешественник',
      avatar: `https://i.pravatar.cc/60?img=${post.userId}`,
      likes: Math.floor(Math.random() * 120) + 5,
      image: `https://picsum.photos/seed/${post.id + 50}/600/300`,
    }));
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// Async thunk 5: POST new community post
export const createPost = createAsyncThunk('posts/create', async (postData, { rejectWithValue }) => {
  try {
    const res = await axios.post('https://jsonplaceholder.typicode.com/posts', postData);
    return {
      ...res.data,
      author: 'Вы',
      avatar: 'https://i.pravatar.cc/60?img=15',
      likes: 0,
      image: `https://picsum.photos/seed/999/600/300`,
      isNew: true,
    };
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    loading: false,
    creating: false,
    error: null,
    createError: null,
  },
  reducers: {
    likePost(state, action) {
      const post = state.items.find(p => p.id === action.payload);
      if (post) post.likes += 1;
    },
    deletePost(state, action) {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPost.pending, (state) => { state.creating = true; state.createError = null; })
      .addCase(createPost.fulfilled, (state, action) => {
        state.creating = false;
        state.items.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload;
      });
  },
});

export const { likePost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
