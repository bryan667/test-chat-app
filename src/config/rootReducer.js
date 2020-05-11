import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage";

import { reducer as user } from "../redux/user";

const persistConfig = {
  key: "test-chat-app",
  storage,
};

const rootReducer = combineReducers({
  user,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const getStore = () => {
  let store = createStore(persistedReducer, composeWithDevTools());
  let persistor = persistStore(store);

  return { store, persistor };
};
