import { perform } from '../utilities/actions';
import { START_LOADING, STOP_LOADING } from '../constants/loader';

export const startLoading = () => perform(START_LOADING);
export const stopLoading = () => perform(STOP_LOADING);
