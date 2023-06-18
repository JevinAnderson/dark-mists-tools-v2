import { SET_KEYWORDS, SET_KEYWORDS_SEARCH_TYPE } from '../constants/formula-search';

const initialState = {
  keywords: [''],
  keywordsSearchType: 'any'
};

const SETTERS = {
  [SET_KEYWORDS]: 'keywords',
  [SET_KEYWORDS_SEARCH_TYPE]: 'keywordsSearchType'
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
