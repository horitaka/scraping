import { call, put, takeEvery, fork } from 'redux-saga/effects'

import { FETCH_PAGE_REQUEST } from './types'
import { fetchPageReceived, setScrapedData } from './operations'
import AmazonPageHandler from '../../utils/AmazonPageHandler'

function* fetchPageRequest(action) {
	const urlList = action.payload.url;

	const amazon = new AmazonPageHandler()
	const data = yield call(amazon.getBookInfo.bind(amazon), urlList)

	yield put(fetchPageReceived(true)); // Todo: 失敗時はエラーにする
	yield put(setScrapedData(data));
}

function* handleFetchPageRequest() {
  yield takeEvery(FETCH_PAGE_REQUEST, fetchPageRequest)
}

export default function* saga() {
  yield fork(handleFetchPageRequest);
}
