import { configureStore } from "@reduxjs/toolkit";
//import { steamApi } from "./api/steamApi";
import { koboApi } from "./api/koboApi";
import sessionReducer from "./slice/sessionSlice";
import { bookApi } from "./api/bookApi";

export const store = configureStore({
  reducer: {
    //[steamApi.reducerPath]: steamApi.reducer,
    [koboApi.reducerPath]: koboApi.reducer,
    session: sessionReducer,
    [bookApi.reducerPath]: bookApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bookApi.middleware)
      //.concat(steamApi.middleware)
      .concat(koboApi.middleware),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

//? 同時兩個?
