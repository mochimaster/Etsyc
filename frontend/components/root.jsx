import React from 'react';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';
import App from './app';


const Root = ({store}) => {

  return (

    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  )
};
// currentUserId={store.getState().session.id}
export default Root;
