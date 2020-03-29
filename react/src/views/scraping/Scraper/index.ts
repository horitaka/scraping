import { connect } from 'react-redux'

import { pageOperations } from '../../../state/modules/page'
// import { pageSelectors } from '../../state/modules/page'
import { saveOperations } from '../../../state/modules/save'
import Scraper from './Scraper'

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state.page.isFetching,
    resultListByScraping: state.page.resultListByScraping,
    progress: state.page.progress,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setDetailPageUrls: (urls) => dispatch(pageOperations.setDetailPageUrls('test', urls)), // Todo 1つ目の引数直す
    setListPageUrls: (urls) => dispatch(pageOperations.setListPageUrls(urls)),
    onRunScrapingClick: () => dispatch(pageOperations.runScraping()),
    onSaveButtonClick: () => dispatch(saveOperations.saveToCsvFileRequest())
  }
}

const ScraperContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Scraper)

export default ScraperContainer;
