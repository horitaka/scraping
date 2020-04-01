import { createSelector } from 'reselect'

import AmazonPageHandler from '../../utils/AmazonPageHandler'
import TestPage from '../../utils/TestPage'
import { appSelectors } from '../app'

export const getResultListByScraping = state => state.page.resultListByScraping
export const getListPageUrls = state => state.page.listPageUrls
export const getDetailPageUrls = state => state.page.detailPageUrls

export const getDataByScraping = createSelector(
  [getResultListByScraping],
  resultListByScraping => {
    const dataByScraping = resultListByScraping.map(item => item.data)
    return dataByScraping
  }
)

export const getTableHeader = createSelector(
  [appSelectors.getPageHandler],
  pageHandler => {
    return pageHandler.getTableHeader()
  }
)
