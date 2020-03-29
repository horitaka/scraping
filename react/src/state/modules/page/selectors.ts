import { createSelector } from 'reselect'

import AmazonPageHandler from '../../utils/AmazonPageHandler'

export const getResultListByScraping = state => state.page.resultListByScraping
export const getListPageUrls = state => state.page.listPageUrls
export const getDetailPageUrls = state => state.page.detailPageUrls
export const getPageType = state => state.page.pageType

export const getDataByScraping = createSelector(
  [getResultListByScraping],
  resultListByScraping => {
    const dataByScraping = resultListByScraping.map(item => item.data)
    return dataByScraping
  }
)

export const getTableHeader = createSelector(
  [getPageType],
  pageType => {
    if (pageType === 'amazonbooks') {
      return AmazonPageHandler.getTableHeader()
    }
  }
)


// export const getResultMessage = createSelector(
//   [getScrapedData],
//   (scrapedData) => {
//     const resultMessage = scrapedData.map(data => {
//       return data.url + '\n' + data.title + '\n' + data.author
//     })
//
//     return resultMessage;
//   }
// )
