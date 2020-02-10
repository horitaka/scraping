import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger';

import {
  pageReducer,
  scrapingReducer,
  rootSaga
} from "./ducks";
// import rootSaga from './saga'

export default function configuStore() {
  const rootReducers = combineReducers( [pageReducer, scrapingReducer] );
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

  /*
  const store = createStore(
    rootReducers,
    applyMiddleware(loggerMiddleware)
  )
  */

  return store;
}
