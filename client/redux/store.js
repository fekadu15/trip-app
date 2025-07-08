
import storage from "redux-persist/lib/storage"; // Local storage

import { persistStore, persistReducer } from "redux-persist";
import { combineReducers, createStore } from "redux";
import { travelInfo } from "./reducer/travelInfo";
import { loginDialog } from "./reducer/loginDialog";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["travelInfo"],
};

const rootReducer = combineReducers({
  travelInfo,
  loginDialog
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer);

export const persistor = persistStore(store);
