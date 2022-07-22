import React from 'react';
import ReactDOM from 'react-dom/client';
import { legacy_createStore } from 'redux'
import { Provider } from 'react-redux';

import App from './App';
import Reducers from './Reducers';

const store = legacy_createStore(Reducers);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  // <React.StrictMode>
  
    <Provider store = {store}>
      <App />
    </Provider>
  // </React.StrictMode>
);
