import * as types from './types'

export const runScraping = url => ({
  type: types.RUN_SCRAPING,
  payload: {
    url: url,
  }
})

export const updateProgress = data => ({
  type: types.UPDATE_PROGRESS,
  payload: {
    data: data,
  }
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

export const setScrapedData = (data) => ({
  type: types.SET_SCRAPED_DATA,
  payload: {
    data: data
  }
})


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
