import {
  SET_MSG_LIST,
  SET_SETTING_DATA,
  SET_PHONE_INFO,
  SENT_MSG_ON_OFF,
  SET_USER_INFO_TOKEN,
} from "./ActionType";

export const setMsgList = (data) => {
  if (data) {
    return { type: SET_MSG_LIST, payload: data };
  }
};

export const setSettingData = (data) => {
  if (data) {
    return { type: SET_SETTING_DATA, payload: data };
  }
};

export const setPhoneInfo = (data) => {
  if (data) {
    return { type: SET_PHONE_INFO, payload: data };
  }
};

export const setSendMsgOnOff = (data) => {
  if (data) {
    return { type: SENT_MSG_ON_OFF, payload: data };
  }
};

export const setUserInfoToken = (data) => {
  if (data) {
    return { type: SET_USER_INFO_TOKEN, payload: data };
  }
};
