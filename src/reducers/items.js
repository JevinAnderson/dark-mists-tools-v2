import { SET_ITEMS } from '../constants/items';

export default function itemsReducer(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ITEMS:
      return payload;
    default:
      return state;
  }
}
