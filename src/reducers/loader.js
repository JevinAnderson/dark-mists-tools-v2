import { START_LOADING, STOP_LOADING } from '../constants/loader';

const initialState = {
  loading: false
};

export default function loaderReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case START_LOADING:
      return { loading: true };
    case STOP_LOADING:
      return { loading: false };
    default:
      return state;
  }
}
