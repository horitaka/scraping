import { call, put, takeEvery, fork } from 'redux-saga/effects'

function* doAction(action) {
	console.log('doAction')
}

function* handleSomeAction() {
  console.log('handleSomeAction')
  yield takeEvery('ACTION_NAME', doAction)
}

export default function* saga() {
  console.log('pagesaga')
  yield fork(handleSomeAction);
}
