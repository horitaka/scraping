import { connect } from 'react-redux'

import { pageOperations } from '../../../state/modules/page'
import SearchBox from './SearchBox'

const mapStateToProps = (state, ownProps) => {
  return {
    searchKeyword: state.page.searchKeyword,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSearchKeyword: (searchKeyword) => dispatch(pageOperations.setSearchKeyword(searchKeyword)),
  }
}

const SearchBoxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox)

export default SearchBoxContainer;
