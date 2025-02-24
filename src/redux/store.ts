import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './game/gameSlice';
import adminReducer from './admin/adminSlice';
import authReducer from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
