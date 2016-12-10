import {createStore, compose, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import {routerMiddleware} from 'react-router-redux';
import {browserHistory} from 'react-router';
import createSagaMiddleware, {END} from 'redux-saga';
import sagas from '../sagas';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from '../reducers';
import _ from 'lodash';
import {loadState, saveState} from '../connectivity/localStorage';

const persistedState = loadState();

const routerMw = routerMiddleware(browserHistory);
const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

function configureStoreProd() {
  const middlewares = [
    // Add other middleware on this line...

    routerMw,
    sagaMiddleware
  ];

  const store = createStore(rootReducer, persistedState, compose(
    applyMiddleware(...middlewares)
    )
  );

  store.subscribe(_.throttle(() => {
    saveState({
      auth: store.getState().auth
    });
  }, 1000));

  sagaMiddleware.run(sagas);
  store.close = () => store.dispatch(END);

  return store;
}

function configureStoreDev() {
  const middlewares = [
    // Add other middleware on this line...

    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant(),

    routerMw,
    sagaMiddleware,
    loggerMiddleware
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(rootReducer, persistedState, composeEnhancers(
    applyMiddleware(...middlewares)
    )
  );

  store.subscribe(_.throttle(() => {
    saveState({
      auth: store.getState().auth
    });
  }, 1000));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  sagaMiddleware.run(sagas);
  store.close = () => store.dispatch(END);

  return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
