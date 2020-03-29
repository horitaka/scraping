import { call, put, select, takeEvery } from 'redux-saga/effects'

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
import { getListPageUrls, getDetailPageUrls } from './selectors'

import AmazonPageHandler from '../../utils/AmazonPageHandler'
import AliExpressPageHandler from '../../utils/AliExpressPageHandler'
import PatentScopePageHandler from '../../utils/PatentScopePageHandler'
import RoomClipHandler from '../../utils/RoomClipHandler'


export default function* saga() {
	yield takeEvery(RUN_SCRAPING, runScraping)
}

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

	// Amazonのホビーの売れ筋一覧ページからの情報取得
	// yield runScrapingAmazonHobbysBulk()

	yield put(runScrapingFinished(true)); // Todo: 失敗時はエラーにする
}

// ex https://www.amazon.co.jp/s?k=%E6%9D%B1%E9%87%8E%E5%9C%AD%E5%90%BE&i=stripbooks&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&ref=nb_sb_noss
function* runScrapingAmazonBooksBulk() {
	// 初期化
	const amazon = new AmazonPageHandler()
	yield call(amazon.launch.bind(amazon))

	// 一覧ページのURLのリストを取得
	const listPageUrls = yield select(getListPageUrls)

	// 詳細ページのURLのリストと詳細情報の取得
	yield put(resetListPageProgress())
	for (const listPageUrl of listPageUrls) {
		// 詳細ページのURLのリストの取得
		const detailPageUrls = yield call(amazon.getDetailPageUrlList.bind(amazon), listPageUrl)
		yield put(setDetailPageUrls(listPageUrl, detailPageUrls))

		// 詳細情報の取得
		yield put(resetDetailPageProgress())
		for (const [index, detailPageUrl] of detailPageUrls.entries()) {
			const resultByScraping = yield call(amazon.getBookInfo.bind(amazon), detailPageUrl)
			yield put(updateDetailPageProgress(resultByScraping));

			// 開発用
			if (index === 3) {
				break
			}
		}
		yield put(updateListPageProgress())
	}

	yield call(amazon.close.bind(amazon));
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

	yield call(aliExpress.close.bind(aliExpress));
}

function* runScrapingAmazonHobbysBulk() {
	const amazon = new AmazonPageHandler()
	yield call(amazon.launch.bind(amazon))

	// const listPageUrls = yield select(getListPageUrls)
	let detailPageUrls = yield select(getDetailPageUrls)
	detailPageUrls = detailPageUrls['test']

	yield put(resetDetailPageProgress())
	for (let detailPageUrl of detailPageUrls) {
		const shopListPageUrl = yield call(amazon.getShopListPageUrl.bind(amazon), detailPageUrl)

		const resultByScraping = yield call(amazon.getHobbyInfo.bind(amazon), detailPageUrl)
		yield put(updateDetailPageProgress(resultByScraping));


		// const detailPageUrls = yield call(amazon.getProductPageUrlList2.bind(amazon), listPageUrl)
		// yield put(setDetailPageUrls(listPageUrl, detailPageUrls))
		//
		// yield put(resetDetailPageProgress())
		// for (let productPageUrl of detailPageUrls) {
		// 	const resultByScraping = yield call(amazon.getHobbyInfo.bind(amazon), productPageUrl)
		// 	yield put(updateDetailPageProgress(resultByScraping));
		// }
		// yield put(updateListPageProgress())

	}

	yield call(amazon.close.bind(amazon));
}

function* runScrapingPatentScope() {
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
}
