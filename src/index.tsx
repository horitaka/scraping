import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import 'ress';
import './index.css';
import App from './views/App';
import configureStore from './state/store'

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
