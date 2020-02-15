import { call, put, takeEvery, fork } from 'redux-saga/effects'

import { RUN_SCRAPING } from './types'
import { updateProgress, runScrapingFinished, setScrapedData } from './operations'
import AmazonPageHandler from '../../utils/AmazonPageHandler'

function* runScraping(action) {
	let data = [];
	const urlList = action.payload.url.filter(url => url !== '');

	const amazon = new AmazonPageHandler()
	yield call(amazon.launch.bind(amazon));
	// const data = yield call(amazon.getBookInfo.bind(amazon), urlList)

	for (let url of urlList) {
		const tmpData = yield call(amazon.getBookInfo.bind(amazon), url)
		data.push(tmpData)
		yield put(updateProgress(tmpData));
	}

	yield call(amazon.close.bind(amazon));

	yield put(runScrapingFinished(true)); // Todo: 失敗時はエラーにする
	yield put(setScrapedData(data));
}

function* handleRunScraping() {
  yield takeEvery(RUN_SCRAPING, runScraping)
}

export default function* saga() {
  yield fork(handleRunScraping);
}
