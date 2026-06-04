import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import ticketReducer from "./ticketSlice";
import userReducer from "./userSlice";
import dashboardReducer from "./dashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
    users: userReducer,
    dashboard: dashboardReducer,
  },
});
