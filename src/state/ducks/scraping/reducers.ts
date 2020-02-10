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
  return state;
}

export default scrapingReducer
