import { takeEvery, select } from 'redux-saga/effects'

import { SAVE_TO_CSV_FILE_REQUEST } from './types'
import { pageSelectors } from '../page'

import AmazonPageHandler from '../../utils/AmazonPageHandler';
// import AliExpressPageHandler from '../../utils/AliExpressPageHandler'
// import PatentScopePageHandler from '../../utils/PatentScopePageHandler'

export default function* rootSaga() {
	yield takeEvery(SAVE_TO_CSV_FILE_REQUEST, saveToCsvFile)
}

function* saveToCsvFile(action) {
	// CSV形式にデータを変換
	const stringify = window.electron.remote.require('csv-stringify/lib/sync');
	const pageType = yield select(pageSelectors.getPageType)
	const columns = getTableHeader(pageType)
	const scrapedData = yield select(pageSelectors.getDataByScraping)
	const csvData = stringify(scrapedData, {header: true, columns: columns})

	// aタグを生成してファイルを保存
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


function getTableHeader(pageType) {
	switch (pageType) {
		case 'amazonbooks':
			return AmazonPageHandler.getTableHeader();

		default:
			break;
	}

}
