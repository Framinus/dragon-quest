import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';

import reducers from './reducers';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const createStoreWithMiddleware = createStore(
  reducers,
  compose(
    applyMiddleware(promise),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware}>
    <App store={createStoreWithMiddleware}/>
</Provider>, document.getElementById('root')
);
registerServiceWorker();
