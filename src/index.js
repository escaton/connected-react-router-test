import React from "react";
import { render } from "react-dom";
import { routerMiddleware, ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import Router from "./routes";
import { createReducer } from "./reducers";
import { Head } from "./components/Head";
import { unstable_batchedUpdates } from "react-dom";
import {tap, mergeMap, filter, mapTo} from 'rxjs/operators'
import { batchedSubscribe } from 'redux-batched-subscribe';


const history = createBrowserHistory();

let listeners = [];

function appendListener(fn) {
  let isActive = true;

  function listener(...args) {
    if (isActive) fn(...args);
  }

  listeners.push(listener);

  return () => {
    isActive = false;
    listeners = listeners.filter(item => item !== listener);
  };
}

function notifyListeners(...args) {
  listeners.forEach(listener => listener(...args));
}

history.listen((...args) => {
  unstable_batchedUpdates(() => {
    notifyListeners(...args)
  })
})

history.listen = (fn) => {
  return appendListener(fn);
}

const epicMiddleware = createEpicMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [
  routerMiddleware(history),
  epicMiddleware,
]

let queue = [];
let promise = null
const batch = notify => {
  queue.push(notify);
  if (!promise) {
    promise = Promise.resolve().then(() => {
      promise = null;
      const processQueue = [...queue];
      queue = [];
      unstable_batchedUpdates(() => {
        processQueue.forEach(notify => notify())
      });
    })
  }
}

const store = createStore(
  createReducer(history), // root reducer with router state
  composeEnhancers(
    applyMiddleware(
      ...middlewares
    ),
    batchedSubscribe(batch)
  )
);

const rootEpic = combineEpics(
  action$ => action$.pipe(
    tap(action => console.log('action', action)),
    filter(action => action.type === 'trigger'),
    mergeMap(() => [{type: 'duplicate'}, {type: 'duplicate2'}, {type: 'duplicate3'}])
  )
);

epicMiddleware.run(rootEpic);

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
