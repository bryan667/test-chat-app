import { useEffect, Fragment } from "react";
import { get, isEmpty } from "lodash";
import App from "./components/App";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import firebase from "./firebase";
import Spinner from "./Spinner";

import "semantic-ui-css/semantic.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { getStore } from "./config/rootReducer";
import { setUser, clearUser } from "./redux/user/actions";

const { store, persistor } = getStore();

let Root = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => get(state, "user.isLoading"));

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user));
        navigate("/");
      } else if (isEmpty(user) && window.location.pathname === "/") {
        navigate("/login");
        dispatch(clearUser());
      } else {
        dispatch(clearUser());
      }
    });
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </Fragment>
  );
};

let Main = ()=> {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Root />
      </Router>
    </PersistGate>
  </Provider>
  )
}

export default Main