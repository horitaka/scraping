import { call, put, takeEvery, fork } from 'redux-saga/effects'

import { FETCH_PAGE_REQUEST, FETCH_PAGE_RECEIVED } from './types'
import { fetchPageReceived, setScrapedData } from './operations'
import PuppeteerHandler from '../../utils/PuppeteerHandler';


function* fetchPageRequest(action) {
	const url = action.payload.url;

	const puppeteer = new PuppeteerHandler();
	yield call(puppeteer.launch.bind(puppeteer))
	yield call(puppeteer.getPage.bind(puppeteer), url)

	// Amazonの書籍情報
	const title = yield call(puppeteer.getText.bind(puppeteer), '#ebooksProductTitle')
	const author = yield call(puppeteer.getText.bind(puppeteer), '#bylineInfo > span > span.a-declarative > a.a-link-normal.contributorNameID')
	const description = yield call(puppeteer.getHtmlInFrame.bind(puppeteer), '#bookDesc_iframe', '#iframeContent')
	const descriptionWithLineBrake = puppeteer.replaceLineBrake(description)

	const data = [{
		title: title.trim(),
		author: author,
		description: descriptionWithLineBrake
	}]

	yield call(puppeteer.close.bind(puppeteer))

	yield put(fetchPageReceived(true)); // Todo: 失敗時はエラーにする
	yield put(setScrapedData(data));
}

function* handleFetchPageRequest() {
  console.log('handleFetchPageRequest')
  yield takeEvery(FETCH_PAGE_REQUEST, fetchPageRequest)
}

export default function* saga() {
  console.log('pagesaga')
  yield fork(handleFetchPageRequest);
}
