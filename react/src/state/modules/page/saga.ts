import { call, put, select, takeEvery } from 'redux-saga/effects'

import { RUN_SCRAPING } from './types'
import {
	runScrapingFinished,
	// setListPageUrls,
	resetListPageProgress,
	updateListPageProgress,
	setDetailPageUrls,
	resetDetailPageProgress,
	updateDetailPageProgress,
} from './operations'
import { getListPageUrls } from './selectors'
import { appSelectors } from '../app'

export default function* saga() {
	yield takeEvery(RUN_SCRAPING, runScraping)
}

function* runScraping(action) {
	yield runScrapingMain()
	yield put(runScrapingFinished(true)); // Todo: 失敗時のエラー処理を追加する
}

// amazon https://www.amazon.co.jp/s?k=%E6%9D%B1%E9%87%8E%E5%9C%AD%E5%90%BE&i=stripbooks&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&ref=nb_sb_noss

function* runScrapingMain() {
	const pageHandler = yield select(appSelectors.getPageHandler)

	// 初期化
	// const amazon = new AmazonPageHandler()
	yield call(pageHandler.launch.bind(pageHandler))

	// ログイン
	yield call(pageHandler.login.bind(pageHandler))

	// 検索
	yield call(pageHandler.search.bind(pageHandler))

	// 一覧ページのURLのリストを取得
	const listPageUrls = yield select(getListPageUrls)

	// 詳細ページのURLのリストと詳細情報の取得
	yield put(resetListPageProgress())
	for (const listPageUrl of listPageUrls) {
		// 詳細ページのURLのリストの取得
		const detailPageUrls = yield call(pageHandler.getDetailPageUrlList.bind(pageHandler), listPageUrl)
		yield put(setDetailPageUrls(listPageUrl, detailPageUrls))

		// 詳細情報の取得
		yield put(resetDetailPageProgress())
		for (const [index, detailPageUrl] of detailPageUrls.entries()) {
			const resultByScraping = yield call(pageHandler.getBookInfo.bind(pageHandler), detailPageUrl)
			yield put(updateDetailPageProgress(resultByScraping));

			// 開発用
			if (index === 3) break

		}
		yield put(updateListPageProgress())
	}

	yield call(pageHandler.close.bind(pageHandler));

}


// ----- 各サービスのスクレイピング -----

/*
function* runScrapingTest() {
	// 初期化
	const testPage = new TestPage()
	yield call(testPage.launch.bind(testPage))

	// ログイン
	// https://www.acsearch.info/login.html
	const loginUrl = 'https://www.acsearch.info/login.html'
	const userName = 'horita'
	const password = 'noritake'
	yield call(testPage.login.bind(testPage, loginUrl, userName, password))


	// 検索
	const searchKeyword = 'coin'
	yield call(testPage.search.bind(testPage, searchKeyword))

	// スクレイピング
	yield call(testPage.getInfo.bind(testPage))
	yield put(resetDetailPageProgress())
	const resultByScrapingList = [
		{
      success: true,
      data: {
				title: 'Jean Elsen & ses Fils S.A., Auction 116, Lot 2062',
				description: "PAYS-BAS MERIDIONAUX, Bruges, Etain méreau, 1661, Décès de Jean de Conincq, époux de Catherine van Woestwynckele. Droit : Ecu heaumé de de Coninck. Revers : Ecu ovale, parti de Coninck et van Woestwynckele, suspendu à une cordelière. Ref.: Béthune, 32. 40,75g. Dim: 58 mm. Troué.",
				date: '16.03.2013',
				imgLink: 'https://www.acsearch.info/media/images/archive/57/1646/1533845.s.jpg',
			}
		},
		{
			success: true,
			data: {
				title: 'NOMOS, AUCTION 12, LOT 302',
				description: 'NETHERLANDS, The Dutch Republic.  Breda .  Plaquettepenning, or Hollow medal (Silver, 73mm, 63.66 g 12), on the Peace of Breda between Great Britain and the Dutch Republic, by Pieter van Abeele (but unsigned), 1667.  Anno 1667 / Door Order van haer E. Hoogh / Mog onder ‘theleyt van d. Heer R. Mich. / A.d. Ruyter LAd.generael syn besprongen / op ...',
				date: '22.05.2016',
				imgLink: 'https://www.acsearch.info/media/images/archive/79/3003/3105546.s.jpg',
			}
		},
		{
			success: true,
			data: {
				title: 'Nomos, Auction 12, Lot 303',
				description: 'NETHERLANDS, The Dutch Republic.  Breda .  Plaquettepenning, or Hollow medal (Silver, 72mm, 82.02 g 12), on the Peace of Breda between Great Britain and the Dutch Republic, by Pieter van Abeele (but unsigned), 1667.  Anno 1667 / Door Order van haer E. Hoogh / Mog onder ‘theleyt van d. Heer R. Mich. / A.d. Ruyter LAd.generael syn besprongen / op ...',
				date: '22.05.2016',
				imgLink: 'https://www.acsearch.info/media/images/archive/79/3003/3105547.s.jpg',
			}
		},
	]
	for(let i=0; i<resultByScrapingList.length; i++) {
		yield put(updateDetailPageProgress(resultByScrapingList[i]));
	}

	yield call(testPage.close.bind(testPage));
}
*/
