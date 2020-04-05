import * as types from './types'

export const setSearchKeyword = (searchKeyword) => ({
  type: types.SET_SEARCH_KEYWORD,
  payload: {
    searchKeyword: searchKeyword,
  }
})

export const runScraping = () => ({
  type: types.RUN_SCRAPING,
})

export const runScrapingSuccess = () => ({
  type: types.RUN_SCRAPING_FINISHED,
  error: false
})

export const runScrapingPageFail = () => ({
  type: types.RUN_SCRAPING_FINISHED,
  payload: new Error(),
  error: true
})


export const setListPageUrls = (listPageUrls) => ({
  type: types.SET_LIST_PAGE_URLS,
  payload: {
    listPageUrls: listPageUrls
  }
})

export const resetListPageProgress = () => ({
  type: types.RESET_LIST_PAGE_PROGRESS,
})

export const updateListPageProgress = () => ({
  type: types.UPDATE_LIST_PAGE_PROGRESS,
})


export const setDetailPageUrls = (listPageUrl, detailPageUrls) => ({
  type: types.SET_DETAIL_PAGE_URLS,
  payload: {
    listPageUrl: listPageUrl,
    detailPageUrls: detailPageUrls
  }
})

export const resetDetailPageProgress = () => ({
  type: types.RESET_DETAIL_PAGE_PROGRESS,
})

export const updateDetailPageProgress = resultByScraping => ({
  type: types.UPDATE_DETAIL_PAGE_PROGRESS,
  payload: {
    resultByScraping: resultByScraping,
  }
})


// export const setScrapedData = (data) => ({
//   type: types.SET_SCRAPED_DATA,
//   payload: {
//     data: data
//   }
// })


// export const fetchPageReceived = (data, error) => {
//   if (!error) {
//     return {
//       type: types.FETCH_PAGE_RECEIVED,
//       payload: {
//         data: data,
//       },
//       error: error
//     }
//   } else {
//     return {
//       type: types.FETCH_PAGE_RECEIVED,
//       payload: new Error(),
//       error: error
//     }
//   }
// }
