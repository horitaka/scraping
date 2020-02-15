import * as types from './types'

/*
State shape

page: {
  url: string, // ←　不要?
  isFetching: boolean,
  data: []
}
*/

const initialState = {
  url: '',
  isFetching : false,
  data: []
}

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PAGE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.FETCH_PAGE_RECEIVED:
      return {
        ...state,
        isFetching: false,
      };
    case types.SET_SCRAPED_DATA:
      return {
        ...state,
        data: action.payload.data,
      }
    default:
      return state

  }
}

export default pageReducer
