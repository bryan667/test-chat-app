import { SET_CURRENT_CHANNEL } from "./types";
import { get } from "lodash";

const initialState = {
  currentChannel: null,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: get(action, "payload.currentChannel", null),
      };
    default:
      return state;
  }
};

export default reducer;
