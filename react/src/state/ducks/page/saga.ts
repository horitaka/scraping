import { call, put, select, takeEvery, fork } from 'redux-saga/effects'

import { RUN_SCRAPING } from './types'
import {
	runScrapingFinished,
	resetListPageProgress,
	updateListPageProgress,
	setDetailPageUrls,
	resetDetailPageProgress,
	updateDetailPageProgress,
} from './operations'
import { getListPageUrls } from './selectors'

import AmazonPageHandler from '../../utils/AmazonPageHandler'
// import AliExpressPageHandler from '../../utils/AliExpressPageHandler'
import PatentScopePageHandler from '../../utils/PatentScopePageHandler'

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
	// const aliExpress = new AliExpressPageHandler()
	// yield call(aliExpress.launch.bind(aliExpress));
	// const productUrlList = yield call(aliExpress.getProductUrlList.bind(aliExpress));
	// console.log(productUrlList)
	// // const productUrlList = ['https://ja.aliexpress.com/item/32854844856.html?spm=a2g0o.productlist.0.0.513b6924gwZoUk&algo_pvid=158d7cd6-a31b-47c9-9372-835b11fabfc5&algo_expid=158d7cd6-a31b-47c9-9372-835b11fabfc5-0&btsid=0ab6f83a15824406628703470e5ba4&ws_ab_test=searchweb0_0,searchweb201602_,searchweb201603_']
	// for (let productUrl of productUrlList) {
	// 	const resultByScraping = yield call(aliExpress.getProductInfo.bind(aliExpress), productUrl)
	// 	yield put(updateProgress(resultByScraping));
	// }
	// yield call(aliExpress.close.bind(aliExpress));


	yield put(runScrapingFinished(true)); // Todo: 失敗時はエラーにする
}

function* handleRunScraping() {
  yield takeEvery(RUN_SCRAPING, runScraping)
}

export default function* saga() {
  yield fork(handleRunScraping);
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
