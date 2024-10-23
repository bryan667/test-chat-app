import { useEffect, Fragment } from "react";
import { get } from "lodash";
import App from "./components/App";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import {auth} from './firebase'
import { onAuthStateChanged, signOut } from "firebase/auth";
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
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user && user.displayName) {
        dispatch(setUser(user));
        navigate("/");
      } else if (user && !user.displayName) {
        const redirect = Math.floor(100 + Math.random() * 900);
        dispatch(clearUser());
        signOut(auth)
        navigate(`/login/${redirect}`);        
      } else {        
        dispatch(clearUser());
        signOut(auth)
        navigate("/login");
      }
    });
    return () => unsubscribe();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login/:redirected?" element={<Login />} />
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