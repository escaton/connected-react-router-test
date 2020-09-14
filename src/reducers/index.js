import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

const itemIDs = (state = [], action) => {
  switch (action.type) {
    case 'GET_ITEM_IDS':
      // mock injection here
      const mock = [{ id: '001' }, { id: '002' }, { id: '003' }];

      return mock.map(e => e.id);
    default:
      return state;
  }
};

export const createReducer = history => combineReducers({
  itemIDs,
  router: connectRouter(history),
});
