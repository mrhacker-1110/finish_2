import { configureStore } from '@reduxjs/toolkit';
import placesReducer from './slices/placesSlice';
import tripReducer from './slices/tripSlice';
import postsReducer from './slices/postsSlice';

export const store = configureStore({
  reducer: {
    places: placesReducer,
    trip: tripReducer,
    posts: postsReducer,
  },
});
