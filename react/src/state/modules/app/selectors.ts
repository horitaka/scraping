import { createSelector } from 'reselect'

import AmazonPageHandler from '../../utils/AmazonPageHandler'

export const getPageType = state => state.app.pageType

export const getPageHandler = createSelector(
  [getPageType],
  pageType => {
    switch (pageType) {
      case 'amazonbooks':
        return new AmazonPageHandler()
      default:
        return null;
    }
  }
)
