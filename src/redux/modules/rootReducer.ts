import { combineReducers } from '@reduxjs/toolkit';
import temp from './temp';

const reducer = combineReducers({
  temp,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
