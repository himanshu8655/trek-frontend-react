import { combineReducers } from 'redux';
import { SET_SHARED_DATA } from './actions';

const initialState = {
  sharedData: 'Initial Data',
};

const sharedDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHARED_DATA:
      return {
        ...state,
        sharedData: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  sharedData: sharedDataReducer,
});

export default rootReducer;
