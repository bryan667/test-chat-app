import { SET_USER, CLEAR_USER } from "./types";
import { get } from "lodash";

const initialState = {
  currentUser: null,
  isLoading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        currentUser: get(action, "payload.currentUser", null),
        isLoading: false,
      };
    case CLEAR_USER:
      return {
        ...initialState,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
