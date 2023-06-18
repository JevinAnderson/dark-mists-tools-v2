import { SET_DARK_MODE } from '../constants/styles';

const initialState = {
  darkMode: true
};

const SETTERS = {
  [SET_DARK_MODE]: 'darkMode'
};

export default function formulaSearchReducer(state = initialState, action) {
  const { type, payload } = action;

  const key = SETTERS[type];
  if (key) {
    return {
      ...state,
      [key]: payload
    };
  }

  switch (type) {
    default:
      return state;
  }
}
