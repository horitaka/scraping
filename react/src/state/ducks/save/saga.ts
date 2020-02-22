import { takeEvery, fork, select } from 'redux-saga/effects'

import { SAVE_TO_CSV_FILE_REQUEST } from './types'
import { pageSelectors } from '../page'

// import AmazonPageHandler from '../../utils/AmazonPageHandler';
import AliExpressPageHandler from '../../utils/AliExpressPageHandler'


function* saveToCsvFile(action) {
	const stringify = window.electron.remote.require('csv-stringify/lib/sync');

	const columns = AliExpressPageHandler.getCsvHeader();

	const scrapedData = yield select(pageSelectors.getDataByScraping)
	const csvData = stringify(scrapedData, {header: true, columns: columns})

	// const a = document.createElement('a');
	// a.href = 'data:text/plain,' + encodeURIComponent(csvData);
	// a.download = 'result.csv';
	// a.click();

	let bom  = new Uint8Array([0xEF, 0xBB, 0xBF]);
	let blob = new Blob([bom, csvData], {type: 'text/csv'});
	let url = (window.URL || window.webkitURL).createObjectURL(blob);
	let link = document.createElement('a');
	link.download = 'result.csv';
	link.href = url;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);

}

function* handleSaveToCsvFileRequest() {
  yield takeEvery(SAVE_TO_CSV_FILE_REQUEST, saveToCsvFile)
}

export default function* rootSaga() {
  yield fork(handleSaveToCsvFileRequest);
}
