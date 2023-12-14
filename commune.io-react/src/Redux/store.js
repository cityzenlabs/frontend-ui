// store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import webSocketMiddleware from "./middleware/webSocketMiddleware";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(webSocketMiddleware),
});

export default store;
