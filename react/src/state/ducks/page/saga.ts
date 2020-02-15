import { call, put, takeEvery, fork } from 'redux-saga/effects'

import { RUN_SCRAPING } from './types'
import { runScrapingFinished, setScrapedData } from './operations'
import AmazonPageHandler from '../../utils/AmazonPageHandler'

function* runScraping(action) {
	const urlList = action.payload.url;

	const amazon = new AmazonPageHandler()
	const data = yield call(amazon.getBookInfo.bind(amazon), urlList)

	yield put(runScrapingFinished(true)); // Todo: 失敗時はエラーにする
	yield put(setScrapedData(data));
}

function* handleRunScraping() {
  yield takeEvery(RUN_SCRAPING, runScraping)
}

export default function* saga() {
  yield fork(handleRunScraping);
}
