import { SET_CURRENT_CHANNEL } from "./types";

export const setCurrentChannel = (channel: any) => {
  return {
    type: SET_CURRENT_CHANNEL,
    payload: {
      currentChannel: channel,
    },
  };
};
