import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./features/cart.slice";
const persistConfig = {
  key: "cart",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);
const makeStore = () => {
  return configureStore({
    reducer: {
      cart: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

// const persistor = persistStore(makeStore);
export { makeStore };
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
