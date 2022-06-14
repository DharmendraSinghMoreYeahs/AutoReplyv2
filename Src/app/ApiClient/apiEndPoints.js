class Server {
  userService = "https://aced-103-15-67-130.ngrok.io";

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
