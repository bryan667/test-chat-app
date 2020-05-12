import React, { useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import { get, isEmpty } from "lodash";
import App from "./components/App";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import firebase from "./firebase";
import Spinner from "./Spinner";

import "semantic-ui-css/semantic.min.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";

import { Provider, connect } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { getStore } from "./config/rootReducer";
import * as userActions from "./redux/user/actions";

const { store, persistor } = getStore();

let Root = (props) => {
  const { history, setUser, clearUser, isLoading } = props;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        history.push("/");
      } else if (isEmpty(user) && window.location.pathname === "/") {
        history.push("/login");
        clearUser();
      } else {
        clearUser();
      }
    });
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      )}
    </Fragment>
  );
};

Root = withRouter(Root);
Root = connect(
  (state) => ({
    isLoading: get(state, "user.isLoading"),
  }),
  userActions
)(Root);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Root />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
