import { fetchPageRequest, fetchPageSuccess, fetchPageFail, setScrapedData } from './actions'

const fetchPageReceived = (isSuccess) => {
  if (isSuccess) {
    return fetchPageSuccess()
  } else {
    return fetchPageFail()
  }
}

export {
  fetchPageRequest,
  fetchPageReceived,
  setScrapedData
}
