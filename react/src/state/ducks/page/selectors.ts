import { createSelector } from 'reselect'


export const getScrapedData = state => state.page.data

export const getResultMessage = createSelector(
  [getScrapedData],
  (scrapedData) => {
    const resultMessage = scrapedData.map(data => {
      return data.url + '\n' + data.title + '\n' + data.author
    })
    // url: 'URL',
    // title: 'タイトル',
    // author: '著者',
    // description: '説明文',
    // category: 'カテゴリ',
    // page: 'ページ数',
    // imgLink: '商品画像',
    return resultMessage;
  }
)
