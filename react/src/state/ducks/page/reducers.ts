import * as types from './types'

/*
State shape

page: {
  url: string, // ←　不要?
  isFetching: boolean,
  obtainedDataByScraping: {
    data: [],
    success: boolean,
    message: string, (ステータスコード+メッセージ)
  }
  progress: {
    total: number,
    finished: number,
  }
}
*/

const initialState = {
  url: '',
  isFetching : false,
  data: [],
  progress: {
    total: 0,
    finished: 0,
  }
}

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RUN_SCRAPING:
      const validUrls = action.payload.url.filter(url => url !== '').length
      return {
        ...state,
        isFetching: true,
        data: [],
        progress: {
          total: validUrls,
          finished: 0,
        }
      };
    case types.UPDATE_PROGRESS:
      return {
        ...state,
        progress: {
          ...state.progress,
          finished: state.progress.finished + 1,
        },
        data: [...state.data, action.payload.data]
      }
    case types.RUN_SCRAPING_FINISHED:
      return {
        ...state,
        isFetching: false,
      };
    case types.SET_SCRAPED_DATA:
      return {
        ...state,
        data: action.payload.data,
      }
    default:
      return state

  }
}

export default pageReducer
