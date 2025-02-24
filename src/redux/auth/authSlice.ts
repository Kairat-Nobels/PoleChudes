import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showToast } from "../../ui/toast";
import { adminApi } from "@api/api";

interface LoginPayload {
  login: string;
  password: string;
}

interface AuthState {
  isAuth: boolean;
}

export const login = createAsyncThunk<boolean, LoginPayload, { rejectValue: string }>(
  "auth/login",
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(adminApi);
      const users: { login: string; password: string }[] = await response.json();
      const user = users.find((u) => u.login === login && u.password.toString() === password);

      if (!user) {
        showToast.error("Неверный логин или пароль");
        return rejectWithValue("Invalid credentials");
      }

      showToast.success("Успешный вход!");
      localStorage.setItem("isAuth", "true");
      return true;
    } catch (error) {
      console.log(error);
      showToast.error("Ошибка сервера");
      return rejectWithValue("Ошибка сервера");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("isAuth");
  showToast.success("Вы вышли из системы");
  return false;
});

const initialState: AuthState = {
  isAuth: localStorage.getItem("isAuth") === "true",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state) => {
        state.isAuth = true;
      })
      .addCase(login.rejected, (state) => {
        state.isAuth = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false;
      });
  },
});

export default authSlice.reducer;
