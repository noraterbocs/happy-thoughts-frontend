import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react'
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { thoughts } from 'reducers/thoughts';
import { ui } from 'reducers/ui';
import { Main } from 'Main';

export const App = () => {
  const reducer = combineReducers({
    thoughts: thoughts.reducer,
    ui: ui.reducer
  });
  const store = configureStore({ reducer });
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}