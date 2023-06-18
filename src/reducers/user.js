import { SET_USER } from '../constants/user';

export default function userReducer(state = null, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      return payload;
    default:
      return state;
  }
}
