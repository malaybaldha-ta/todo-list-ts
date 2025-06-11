import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

// These types remain the same and are still very useful
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;