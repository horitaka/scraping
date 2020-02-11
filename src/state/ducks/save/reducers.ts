import * as types from './types'
/*
State shape

scraping: {
  data: [] // スクレイピングをして取得したデータの配列
}
*/

const initialState = {
  data: [],
}

const scrapingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RUN_SCRAPING:
      return state;
    case types.SAVE_TO_CSV_FILE_REQUEST:
      return state;
    case types.SAVE_TO_CSV_FILE_FINISHED:
      return state;
    default:
      return state;
  }
}

export default scrapingReducer
