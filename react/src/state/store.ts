import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger';

import {
  appReducer,
  pageReducer,
  saveReducer,
  rootSaga
} from "./modules";
// import rootSaga from './saga'

export default function configuStore() {
  const rootReducers = combineReducers({
    app: appReducer,
    page: pageReducer,
    save: saveReducer
  });
  const sagaMiddleware = createSagaMiddleware();

  const loggerMiddleware = createLogger({
    collapsed: true,
    diff: true,
  });

  const store = createStore(
    rootReducers,
    applyMiddleware(sagaMiddleware, loggerMiddleware)
  )

  sagaMiddleware.run(rootSaga);

  return store;
}
