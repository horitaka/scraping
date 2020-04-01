import * as types from './types'

/*
State shape

app: {
  pageType: 
}
*/

const initialState = {
  pageType: 'amazonbooks',
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case '':
      return state

    default:
      return state

  }
}

export default appReducer
