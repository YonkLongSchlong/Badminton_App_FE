import { configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  // middleware: getDefaultMiddleware({
  //   serializableCheck: {
  //     // Bỏ qua kiểm tra non-serializable cho các field trong action.payload
  //     ignoredActions: ['auth/login/rejected'],
  //     ignoredPaths: ['payload'],
  //   },
  // }),
});
