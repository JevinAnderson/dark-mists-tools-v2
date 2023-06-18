import { merge } from './component';

export const createSimpleReducer = (initialState, setters) => (state = initialState, action) => {
  const { type, payload } = action;

  const setter = setters[type];
  if (setter) {
    return merge(state, { [setter]: payload });
  }

  return state;
};
