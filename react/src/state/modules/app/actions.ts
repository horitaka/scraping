import * as types from './types'

export const changePageType = (pageType) => ({
  type: types.CHANGE_PAGE_TYPE,
  payload: {
    pageType: pageType
  }
})
