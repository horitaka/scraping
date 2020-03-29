import { connect } from 'react-redux'

import { pageOperations } from '../../../state/modules/page'
import ScrapingExecution from './ScrapingExecution'

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    runScraping: () => dispatch(pageOperations.runScraping()),
  }
}

const ScrapingExecutionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScrapingExecution)

export default ScrapingExecutionContainer;
