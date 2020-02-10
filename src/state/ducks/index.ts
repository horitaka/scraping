import { fork } from 'redux-saga/effects'

import { pageReducer, pageSaga } from './page'
import { scrapingReducer, scrapingSaga } from './scraping'

function* rootSaga() {
  yield fork(pageSaga)
  yield fork(scrapingSaga)
}

export {
  pageReducer,
  scrapingReducer,
  rootSaga,
}
