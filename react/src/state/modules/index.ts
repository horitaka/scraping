import { fork } from 'redux-saga/effects'

import appReducer from './app'
import pageReducer, { pageSaga } from './page'
import saveReducer, { saveSaga } from './save'

function* rootSaga() {
  yield fork(pageSaga)
  yield fork(saveSaga)
}

export {
  appReducer,
  pageReducer,
  saveReducer,
  rootSaga,
}
