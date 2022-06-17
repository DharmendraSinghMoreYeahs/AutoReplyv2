class Server {
  // userService = "http://192.168.1.16:3000";
  userService = "https://autoreplybackend.moreyeahs.in";
  baseURL = this.userService;

  // ngrok = "https://350f-103-15-67-130.ngrok.io";
  // baseURL = this.ngrok;
}

class Endpoints extends Server {
  SignUp = "api/auth/signup";
  SignIn = "api/auth/signin";
  getBoat = "api/bot/getCreateBot";
  createBot = "api/bot/createbot";
  updateBot = (id) => `api/bot/updatebot?botId=${id}`;
  // deleteBot = "api/bot/deletebot";
  deleteBot = (id) => `api/bot/deletebot?_id=${id}`;
  getSettings = (mobile) => `api/setting/getCreateSetting?mobile=${mobile}`;
  saveSettings = (id) => `api/setting/updateSettingTable?_id=${id}`;
  getMsgSetByBotId = (id) => `api/message/getByBotId?botId=${id}`;
  getMsgSetDeleteById = (id) => `api/message/deleteById?_id=${id}`;
  createMessageSet = "api/message/createMessage";
  changePassword = "api/auth/changePassword";
  getBt = "api/bt/getBt";
  createBt = "api/bt/createBt";
  getBotById = (id) => `api/bot/getBot?btId=${id}`;
  getBotByBtId = (id) => `api/bot/getBotByBtId?btId=${id}`;
  getCreateMsg = "api/message/getCreateMessage";
}

export default Object.freeze(new Endpoints());
