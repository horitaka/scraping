import * as types from './types'

export const fetchPageRequest = url => ({
  type: types.FETCH_PAGE_REQUEST,
  payload: {
    url: url,
  }
})

export const fetchPageSuccess = () => ({
  type: types.FETCH_PAGE_RECEIVED,
  error: false
})

export const fetchPageFail = () => ({
  type: types.FETCH_PAGE_RECEIVED,
  payload: new Error(),
  error: true
})

export const setScrapedData = (data) => ({
  type: types.SET_SCRAPED_DATA,
  payload: {
    data: data
  }
})


export const fetchPageReceived = (data, error) => {
  if (!error) {
    return {
      type: types.FETCH_PAGE_RECEIVED,
      payload: {
        data: data,
      },
      error: error
    }
  } else {
    return {
      type: types.FETCH_PAGE_RECEIVED,
      payload: new Error(),
      error: error
    }
  }
}
