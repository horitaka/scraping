import { call, put, select, takeEvery, fork } from 'redux-saga/effects'

import { RUN_SCRAPING } from './types'
import {
	runScrapingFinished,
	setListPageUrls,
	resetListPageProgress,
	updateListPageProgress,
	setDetailPageUrls,
	resetDetailPageProgress,
	updateDetailPageProgress,
} from './operations'
import { getListPageUrls } from './selectors'

import AmazonPageHandler from '../../utils/AmazonPageHandler'
import AliExpressPageHandler from '../../utils/AliExpressPageHandler'
// import PatentScopePageHandler from '../../utils/PatentScopePageHandler'

function* runScraping(action) {
	// Amazon書籍情報
	// const amazon = new AmazonPageHandler()
	// yield call(amazon.launch.bind(amazon));
	// for (let url of urlList) {
	// 	const resultByScraping = yield call(amazon.getBookInfo.bind(amazon), url)
	// 	yield put(updateProgress(resultByScraping));
	// }
	// yield call(amazon.close.bind(amazon));

	// Amazon一覧ページからの書籍情報取得
	yield runScrapingAmazonBooksBulk()


	// PatentScope
	// const patent = new PatentScopePageHandler()
	// yield call(patent.launch.bind(patent))
	// const productPageUrlList = yield call(patent.getProductPageUrlList.bind(patent), '')
	// console.log(productPageUrlList)
	// for (let productPageUrl of productPageUrlList) {
	// 	const resultByScraping = yield call(patent.getBookInfo.bind(patent), productPageUrl)
	// 	yield put(updateProgress(resultByScraping));
	//
	// }
	// yield call(patent.close.bind(patent));

	// AliExpress商品情報
	yield runScrapingAliExpress()


	yield put(runScrapingFinished(true)); // Todo: 失敗時はエラーにする
}

function* handleRunScraping() {
  yield takeEvery(RUN_SCRAPING, runScraping)
}

export default function* saga() {
  yield fork(handleRunScraping);
}

function* runScrapingAliExpress() {
	const aliExpress = new AliExpressPageHandler()
	yield call(aliExpress.launch.bind(aliExpress));

	const listPageUrls = yield select(getListPageUrls)

	// const listPageUrls = yield call(aliExpress.getListPageUrls.bind(aliExpress))
	// yield put(setListPageUrls(listPageUrls))

	yield put(resetListPageProgress())
	for (let listPageUrl of listPageUrls) {
		const detailPageUrls = yield call(aliExpress.getProductUrlList.bind(aliExpress), listPageUrl);
		yield put(setDetailPageUrls(listPageUrl, detailPageUrls))

		yield put(resetDetailPageProgress())
		for (let productPageUrl of detailPageUrls) {
			const resultByScraping = yield call(aliExpress.getProductInfo.bind(aliExpress), productPageUrl)
			yield put(updateDetailPageProgress(resultByScraping));
		}
		yield put(updateListPageProgress())

	}

	// const detailPageUrls = yield call(aliExpress.getProductUrlList.bind(aliExpress), listPageUrls[0]);
	// yield put(setDetailPageUrls(listPageUrls[0], detailPageUrls))
	//
	// yield put(resetDetailPageProgress())
	// for (let i=1; i<=5; i++) {
	// 	let resultByScraping = yield call(aliExpress.getProductInfo.bind(aliExpress), detailPageUrls[i])
	// 	yield put(updateDetailPageProgress(resultByScraping));
	// }
	// yield put(updateListPageProgress())


	yield call(aliExpress.close.bind(aliExpress));
}

function* runScrapingAmazonBooksBulk() {
	const amazon = new AmazonPageHandler()
	yield call(amazon.launch.bind(amazon))

	const listPageUrls = yield select(getListPageUrls)

	yield put(resetListPageProgress())
	for (let listPageUrl of listPageUrls) {
		const detailPageUrls = yield call(amazon.getProductPageUrlList.bind(amazon), listPageUrl)
		yield put(setDetailPageUrls(listPageUrl, detailPageUrls))

		yield put(resetDetailPageProgress())
		for (let productPageUrl of detailPageUrls) {
			const resultByScraping = yield call(amazon.getBookInfo.bind(amazon), productPageUrl)
			yield put(updateDetailPageProgress(resultByScraping));
		}
		yield put(updateListPageProgress())

	}

	yield call(amazon.close.bind(amazon));
}
