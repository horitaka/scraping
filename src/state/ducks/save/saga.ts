import { call, put, takeEvery, fork, select } from 'redux-saga/effects'

import { SAVE_TO_CSV_FILE_REQUEST } from './types'
import { pageSelectors } from '../page'

function* saveToCsvFile(action) {
	const stringify = window.electron.remote.require('csv-stringify/lib/sync');

	const scrapedData = yield select(pageSelectors.getScrapedData)
	const csvData = stringify(scrapedData, {header: true})

	const a = document.createElement('a');
	a.href = 'data:text/plain,' + encodeURIComponent(csvData);
	a.download = 'result.csv';
	a.click();
}

function* handleSaveToCsvFileRequest() {
  yield takeEvery(SAVE_TO_CSV_FILE_REQUEST, saveToCsvFile)
}

export default function* rootSaga() {
  yield fork(handleSaveToCsvFileRequest);
}
