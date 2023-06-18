import { set, perform } from '../utilities/actions';
import * as Constants from '../constants/item-search';

export const setKeyword = keyword => set(Constants.SET_KEYWORD, keyword);
export const setKeywords = keywords => set(Constants.SET_KEYWORDS, keywords);
export const setKeywordsSearchType = type => set(Constants.SET_KEYWORDS_SEARCH_TYPE, type);
export const setExclusions = exclusions => set(Constants.SET_EXCLUSIONS, exclusions);
export const setMaterial = material => set(Constants.SET_MATERIAL, material);
export const setPulsing = pulsing => set(Constants.SET_PULSING, pulsing);
export const setWeight = weight => set(Constants.SET_WEIGHT, weight);
export const setWeightType = weightType => set(Constants.SET_WEIGHT_TYPE, weightType);
export const toggleAdvancedSearch = () => perform(Constants.TOGGLE_ADVANCED_SEARCH);
