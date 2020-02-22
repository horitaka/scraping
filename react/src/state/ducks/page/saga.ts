import { call, put, takeEvery, fork } from 'redux-saga/effects'

import { RUN_SCRAPING } from './types'
import { updateProgress, runScrapingFinished } from './operations'

// import AmazonPageHandler from '../../utils/AmazonPageHandler'
import AliExpressPageHandler from '../../utils/AliExpressPageHandler'

function* runScraping(action) {
	// let data = [];
	const urlList = action.payload.url.filter(url => url !== '');

	// Amazon書籍情報
	// const amazon = new AmazonPageHandler()
	// yield call(amazon.launch.bind(amazon));
	// for (let url of urlList) {
	// 	const resultByScraping = yield call(amazon.getBookInfo.bind(amazon), url)
	// 	yield put(updateProgress(resultByScraping));
	// }
	// yield call(amazon.close.bind(amazon));

	// AliExpress商品情報
	const aliExpress = new AliExpressPageHandler()
	yield call(aliExpress.launch.bind(aliExpress));
	for (let url of urlList) {
		const resultByScraping = yield call(aliExpress.getProductInfo.bind(aliExpress), url)
		yield put(updateProgress(resultByScraping));
	}
	yield call(aliExpress.close.bind(aliExpress));

	yield put(runScrapingFinished(true)); // Todo: 失敗時はエラーにする
}

function* handleRunScraping() {
  yield takeEvery(RUN_SCRAPING, runScraping)
}

export default function* saga() {
  yield fork(handleRunScraping);
}
