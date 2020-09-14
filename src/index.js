import React from "react";
import { render } from "react-dom";
import { routerMiddleware, ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import Router from "./routes";
import { createReducer } from "./reducers";
import { Head } from "./components/Head";

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  createReducer(history), // root reducer with router state
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history) // for dispatching history actions
      // ... other middlewares ...
    )
  )
);

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Head />
        <Router />
      </ConnectedRouter>
    </Provider>
  );
};

render(<App />, document.getElementById("root"));
