import { connect } from 'react-redux'

import { pageOperations } from '../../state/ducks/page'
import { saveOperations } from '../../state/ducks/save'
import Scraper from './Scraper'

const mapStateToProps = (state, ownProps) => {
  return {
    isFetching: state.page.isFetching,
    data: state.page.data,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onRunScrapingClick: (url) => dispatch(pageOperations.runScraping(url)),
    onSaveButtonClick: () => dispatch(saveOperations.saveToCsvFileRequest())
  }
}

const ScraperContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Scraper)

export default ScraperContainer;
