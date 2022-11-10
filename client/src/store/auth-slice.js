import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  loginErrorMessage: "",
  logoutErrorMessage: "",
  sessionTimeoutMessage: "",
  signupErrorMessage: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    loginError(state) {
      state.loginErrorMessage = "Could not log you in, please try again later.";
    },
    logoutError(state) {
      state.logoutErrorMessage =
        "Could not log you out, please try again later.";
    },
    sessionTimeOut(state) {
      state.sessionTimeoutMessage =
        "Session Timeout exceeded, please log in again.";
    },
    signupError(state, action) {
      state.signupErrorMessage = action.payload.message;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
