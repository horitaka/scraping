import * as types from './types'

export const fetchPageRequest = url => ({
  type: types.FETCH_PAGE_REQUEST,
  payload: {
    url: url,
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
