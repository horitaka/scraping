import { connect } from 'react-redux'

import { pageSelectors } from '../../../state/modules/page'
import ScrapingResultTable from './ScrapingResultTable'

const mapStateToProps = (state, ownProps) => {
  return {
    tableHeader: pageSelectors.getTableHeader(state),
    dataByScraping: pageSelectors.getDataByScraping(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

const ScrapingResultTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScrapingResultTable)

export default ScrapingResultTableContainer;
