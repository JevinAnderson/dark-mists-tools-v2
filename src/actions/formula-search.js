import { SET_KEYWORDS, SET_KEYWORDS_SEARCH_TYPE } from '../constants/formula-search';
import { set } from '../utilities/actions';

export const setKeywords = keywords => set(SET_KEYWORDS, keywords);
export const setKeywordsSearchType = type => set(SET_KEYWORDS_SEARCH_TYPE, type);
