import { action, computed, makeObservable, observable } from "mobx";

class AppStore {
  userData = {
    password: "",
  };

  constructor() {
    makeObservable(this, {
      userData: observable,
      setPassword: action,
    });
  }

  setPassword(value) {
    this.userData.password = value;
  }
}

export const appStore = new AppStore();
