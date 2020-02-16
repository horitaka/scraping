import { createSelector } from 'reselect'


export const getResultListByScraping = state => state.page.resultListByScraping

export const getDataByScraping = createSelector(
  [getResultListByScraping],
  resultListByScraping => {
    const dataByScraping = resultListByScraping.map(item => item.data)
    return dataByScraping
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
