import * as types from './types'

/*
State shape

page: {
  url: string, // ←　不要?
  isFetching: boolean,
  resultByScraping: [
    {
      data: {
        url: string,
        title: string,
        author: string,
        description: string,
        category: string,
        page: number,
        imgLink: string,
      }
      success: boolean,
      message: string, (ステータスコード+メッセージ)
    }, {
      ...
    }
  ]
  progress: {
    total: number,
    finished: number,
  }
}
*/

const initialState = {
  url: '',
  isFetching : false,
  resultListByScraping: [],
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
        resultListByScraping: [],
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
        resultListByScraping: [...state.resultListByScraping, action.payload.resultByScraping]
      }
    case types.RUN_SCRAPING_FINISHED:
      return {
        ...state,
        isFetching: false,
      };
    // case types.SET_SCRAPED_DATA:
    //   return {
    //     ...state,
    //     data: action.payload.data,
    //   }
    default:
      return state

  }
}

export default pageReducer
