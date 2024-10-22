import { SET_USER, CLEAR_USER } from "./types";

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
