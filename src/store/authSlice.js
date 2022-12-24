import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  loginEmail: "",
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      console.log(state.token);
      localStorage.setItem("token", action.payload);
      state.isAuthenticated = true;
    },
    setUserMail(state, action) {
      state.loginEmail = action.payload;
      localStorage.setItem("loginEmail", action.payload);
    },
    logout(state) {
      state.isAuthenticated = false;
      localStorage.clear();
    },
    isLoginAuthenticated(state) {
      if (localStorage.getItem("token")) {
        state.isLogin = true;
        state.token = localStorage.getItem("token");
        state.loginEmail = localStorage.getItem("loginEmail");
      }
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
