import { connect } from 'react-redux'

import { pageOperations } from '../../../state/modules/page'
import UrlInput from './UrlInput'

const mapStateToProps = (state, ownProps) => {
  return {
    listPageUrls: state.page.listPageUrls,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setListPageUrls: (urls) => dispatch(pageOperations.setListPageUrls(urls)),
  }
}

const UrlInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UrlInput)

export default UrlInputContainer;
