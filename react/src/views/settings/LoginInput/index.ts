import { connect } from 'react-redux'

import { pageOperations } from '../../../state/modules/page'
import LoginInput from './LoginInput'

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

const LoginInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginInput)

export default LoginInputContainer;
