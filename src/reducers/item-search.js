import * as Constants from '../constants/item-search';
import { merge } from '../utilities/component';

const initialState = {
  keyword: '',
  keywords: [''],
  keywordsSearchType: 'any',
  exclusions: [],
  material: undefined,
  pulsing: undefined,
  showAdvancedSearch: false,
  weight: '',
  weightType: '<'
};

const SETTERS = {
  [Constants.SET_KEYWORD]: 'keyword',
  [Constants.SET_KEYWORDS]: 'keywords',
  [Constants.SET_KEYWORDS_SEARCH_TYPE]: 'keywordsSearchType',
  [Constants.SET_EXCLUSIONS]: 'exclusions',
  [Constants.SET_MATERIAL]: 'material',
  [Constants.SET_PULSING]: 'pulsing',
  [Constants.SET_WEIGHT]: 'weight',
  [Constants.SET_WEIGHT_TYPE]: 'weightType'
};

export default function itemSearchReducer(state = initialState, action) {
  const { type, payload } = action;

  const key = SETTERS[type];
  if (key) {
    return merge(state, { [key]: payload });
  }

  switch (type) {
    case Constants.TOGGLE_ADVANCED_SEARCH:
      return { ...state, showAdvancedSearch: !state.showAdvancedSearch };
    default:
      return state;
  }
}
