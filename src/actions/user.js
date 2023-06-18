import { set } from '../utilities/actions';
import { SET_USER } from '../constants/user';

export const setUser = user => set(SET_USER, user);
