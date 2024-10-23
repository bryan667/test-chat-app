import { SET_USER, CLEAR_USER, MANUAL_AUTH_STATE_CHANGE } from "./types";

export const setUser = (user: any) => {
  return {
    type: SET_USER,
    payload: {
      currentUser: user,
    },
  };
};

export const clearUser = () => {
  return {
    type: CLEAR_USER,
  };
};

export const manualAuthStateChange  = (user: any) => {
  return {
    type: MANUAL_AUTH_STATE_CHANGE,
    payload: {
      currentUser: user,
    },
  };
};