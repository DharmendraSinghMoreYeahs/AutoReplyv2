class Server {
  userService = "https://6c49-103-15-67-130.ngrok.io";

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
}

export default Object.freeze(new Endpoints());
