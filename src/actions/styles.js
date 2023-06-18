import { set } from '../utilities/actions';
import { SET_DARK_MODE } from '../constants/styles';

export const setDarkMode = darkMode => set(SET_DARK_MODE, darkMode);
