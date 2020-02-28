import { connect } from 'react-redux'

import { pageOperations } from '../../state/ducks/page'
// import { pageSelectors } from '../../state/ducks/page'
import { saveOperations } from '../../state/ducks/save'
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
