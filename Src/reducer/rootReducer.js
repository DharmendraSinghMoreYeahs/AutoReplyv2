import {
  SET_MSG_LIST,
  SET_PHONE_INFO,
  SET_SETTING_DATA,
  SENT_MSG_ON_OFF,
  SET_USER_INFO_TOKEN,
} from "./actions/ActionType";

const initialState = {
  msgList: [],
  setting: {},
  phoneInfo: [],
  sentMsgOnOff: { value: true },
  userInfoToken: {},
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_MSG_LIST:
      state.msgList = payload;
      return { ...state, msgList: state.msgList };

    case SET_SETTING_DATA:
      state.setting = payload;
      return { ...state, setting: state.setting };

    case SET_PHONE_INFO:
      state.phoneInfo = payload;
      return { ...state, phoneInfo: state.phoneInfo };

    case SENT_MSG_ON_OFF:
      state.sentMsgOnOff = payload;
      return { ...state, sentMsgOnOff: state.sentMsgOnOff };

    case SET_USER_INFO_TOKEN:
      state.userInfoToken = payload;
      return { ...state, userInfoToken: state.userInfoToken };

    default:
      return state;
  }
};

export default rootReducer;
