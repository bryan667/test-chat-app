import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import firebase from "./firebase";

import "semantic-ui-css/semantic.min.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { getStore } from "./config/rootReducer";

const { store, persistor } = getStore();

let Root = ({ history }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("user", user);
        history.push("/");
      }
    });
    //eslint-disable-next-line
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  );
};

Root = withRouter(Root);
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
