import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

const lastAction = (state = '', action) => {
  return action.type
}

export const createReducer = history => combineReducers({
  lastAction,
  router: connectRouter(history),
});
