import { runScraping, runScrapingSuccess, runScrapingPageFail, setScrapedData } from './actions'

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
  setScrapedData
}
