class Server {
  userService = "http://192.168.1.16:3000";

  ngrok = "";
  baseURL = this.userService;
}

class Endpoints extends Server {
  SignUp = "api/auth/signup";
  SignIn = "api/auth/signin";
  getBoat = "api/bot/getCreateBot";
  createBot = "api/bot/createbot";
  updateBot = (id) => `api/bot/updatebot?botId=${id}`;
  deleteBot = "api/bot/deletebot";
  getSettings = (mobile) => `api/setting/getCreateSetting?mobile=${mobile}`;
  saveSettings = (id) => `api/setting/updateSettingTable?_id=${id}`;
  getMsgSetByBotId = (id) => `api/message/getByBotId?botId=${id}`;
  getMsgSetDeleteById = (id) => `api/message/deleteById?_id=${id}`;
  createMessageSet = "api/message/createMessage";
  changePassword = "api/auth/changePassword";
  getBt = "api/bt/getBt";
  createBt = "api/bt/createBt";
}

export default Object.freeze(new Endpoints());
