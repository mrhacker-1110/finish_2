import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk 2: POST trip note to JSONPlaceholder
export const saveTripNote = createAsyncThunk('trip/saveNote', async (noteData, { rejectWithValue }) => {
  try {
    const res = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      title: noteData.title,
      body: noteData.note,
      userId: 1,
    });
    return { ...noteData, serverId: res.data.id };
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// Async thunk 3: DELETE trip item (simulated)
export const deleteTripItem = createAsyncThunk('trip/deleteItem', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const tripSlice = createSlice({
  name: 'trip',
  initialState: {
    items: [],
    saving: false,
    deleting: false,
    saveError: null,
    deleteError: null,
    successMsg: null,
  },
  reducers: {
    addToTrip(state, action) {
      const exists = state.items.find(i => i.id === action.payload.id);
      if (!exists) {
        state.items.push({ ...action.payload, note: '', days: 1, localId: Date.now() });
      }
    },
    removeFromTrip(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    updateNote(state, action) {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) item.note = action.payload.note;
    },
    updateDays(state, action) {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) item.days = action.payload.days;
    },
    clearSuccess(state) {
      state.successMsg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // saveTripNote
      .addCase(saveTripNote.pending, (state) => { state.saving = true; state.saveError = null; })
      .addCase(saveTripNote.fulfilled, (state, action) => {
        state.saving = false;
        state.successMsg = `Заметка "${action.payload.title}" сохранена!`;
      })
      .addCase(saveTripNote.rejected, (state, action) => {
        state.saving = false;
        state.saveError = action.payload;
      })
      // deleteTripItem
      .addCase(deleteTripItem.pending, (state) => { state.deleting = true; state.deleteError = null; })
      .addCase(deleteTripItem.fulfilled, (state, action) => {
        state.deleting = false;
        state.items = state.items.filter(i => i.id !== action.payload);
      })
      .addCase(deleteTripItem.rejected, (state, action) => {
        state.deleting = false;
        state.deleteError = action.payload;
      });
  },
});

export const { addToTrip, removeFromTrip, updateNote, updateDays, clearSuccess } = tripSlice.actions;
export default tripSlice.reducer;
