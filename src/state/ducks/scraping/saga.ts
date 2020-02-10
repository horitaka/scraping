import { call, put, takeEvery, fork } from 'redux-saga/effects'

function* doAction(action) {
	console.log('doAction')
}

function* handleSomeAction() {
  console.log('handleSomeAction')
  yield takeEvery('ACTION_NAME', doAction)
}

export default function* rootSaga() {
  console.log('scrapingSaga')
  yield fork(handleSomeAction);
}
