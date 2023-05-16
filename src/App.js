import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { SingleThought } from 'SingleThought';
import { Thoughts } from 'Thoughts';
import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { thoughts } from 'reducers/thoughts';
import { ui } from 'reducers/ui';

export const App = () => {
  const reducer = combineReducers({
    thoughts: thoughts.reducer,
    ui: ui.reducer
  });
  const store = configureStore({ reducer });
  return (
    <Provider store={store}>
      <main>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Thoughts />} />
            <Route path="/thoughts/:thoughtId" element={<SingleThought />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </BrowserRouter>
      </main>
    </Provider>
  )
}