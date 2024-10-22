import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage";

import { reducer as user } from "../redux/user";
import { reducer as channel } from "../redux/channel";

const persistConfig = {
  key: "test-chat-app",
  storage,
};

const rootReducer = combineReducers({
  user,
  channel,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const getStore = () => {
  let store = createStore(persistedReducer, composeWithDevTools());
  let persistor = persistStore(store);

  return { store, persistor };
};
