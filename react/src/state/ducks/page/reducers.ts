import * as types from './types'

/*
State shape

page: {
  url: string, // ←　不要?
  listPageUrls: [],
  detailPageUrls: {
    listPageUrlA: [],
    listPageUrlB: [],
    ...
  },
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
    listPageFinished: number,
    detailPageFinished: number,
  }
}
*/

const initialState = {
  listPageUrls: [],
  detailPageUrls: {},
  isFetching : false,
  resultListByScraping: [],
  progress: {
    listPageFinished: 0,
    detailPageFinished: 0,
  }
}

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RUN_SCRAPING:
      // const validUrls = action.payload.url.filter(url => url !== '').length
      return {
        ...state,
        isFetching: true,
        resultListByScraping: [],
        progress: {
          listPageFinished: 0,
          detailPageFinished: 0,
        }
      };
    case types.RESET_LIST_PAGE_PROGRESS:
      return {
        ...state,
        progress: {
          ...state.progress,
          listPageFinished: 0,
        }
      }
    case types.UPDATE_LIST_PAGE_PROGRESS:
      return {
        ...state,
        progress: {
          ...state.progress,
          listPageFinished: state.progress.listPageFinished + 1,
        },
      }
    case types.RESET_DETAIL_PAGE_PROGRESS:
      return {
        ...state,
        progress: {
          ...state.progress,
          detailPageFinished: 0,
        }
      }
    case types.UPDATE_DETAIL_PAGE_PROGRESS:
      return {
        ...state,
        progress: {
          ...state.progress,
          detailPageFinished: state.progress.detailPageFinished + 1,
        },
        resultListByScraping: [...state.resultListByScraping, action.payload.resultByScraping]
      }
    case types.RUN_SCRAPING_FINISHED:
      return {
        ...state,
        isFetching: false,
      };
    case types.SET_LIST_PAGE_URLS:
      return {
        ...state,
        listPageUrls: action.payload.listPageUrls.slice()
      }
    case types.SET_DETAIL_PAGE_URLS:
      return {
        ...state,
        detailPageUrls: {
          ...state.detailPageUrls,
          [action.payload.listPageUrl]: action.payload.detailPageUrls.slice()
        }
      }
    default:
      return state

  }
}

export default pageReducer
