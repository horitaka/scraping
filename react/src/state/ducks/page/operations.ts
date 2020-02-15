import { runScraping, updateProgress, runScrapingSuccess, runScrapingPageFail, setScrapedData } from './actions'

const runScrapingFinished = (isSuccess) => {
  if (isSuccess) {
    return runScrapingSuccess()
  } else {
    return runScrapingPageFail()
  }
}

export {
  runScraping,
  updateProgress,
  runScrapingFinished,
  setScrapedData
}
