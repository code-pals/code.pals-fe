import React from 'react';
import { ProcessReducer } from './Process';
import { combineReducers } from 'redux';

const rootReducers = combineReducers({
  ProcessReducer: ProcessReducer,
});

export default rootReducers;
