import {
  runScraping,
  runScrapingSuccess,
  runScrapingPageFail,

  setListPageUrls,
  resetListPageProgress,
  updateListPageProgress,

  setDetailPageUrls,
  resetDetailPageProgress,
  updateDetailPageProgress,
  // setScrapedData,
} from './actions'

// import * as actions from './actions'

const runScrapingFinished = (isSuccess) => {
  if (isSuccess) {
    return runScrapingSuccess()
  } else {
    return runScrapingPageFail()
  }
}

export {
  runScraping,
  runScrapingFinished,

  setListPageUrls,
  resetListPageProgress,
  updateListPageProgress,

  setDetailPageUrls,
  resetDetailPageProgress,
  updateDetailPageProgress,
  // setScrapedData,
}

// export * from './actions'
