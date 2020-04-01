import { createSelector } from 'reselect'

import AmazonPageHandler from '../../utils/AmazonPageHandler'
import AliExpressPageHandler from '../../utils/AliExpressPageHandler'
import PatentScopePageHandler from '../../utils/PatentScopePageHandler'
import RoomClipHandler from '../../utils/RoomClipHandler'
import TestPage from '../../utils/TestPage'

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
