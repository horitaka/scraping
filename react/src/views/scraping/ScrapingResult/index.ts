import { connect } from 'react-redux'

import { saveOperations } from '../../../state/modules/save'
import ScrapingResult from './ScrapingResult'

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveData: () => dispatch(saveOperations.saveToCsvFileRequest())
  }
}

const ScrapingResultContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScrapingResult)

export default ScrapingResultContainer;
