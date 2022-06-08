import AsyncStorage from "@react-native-async-storage/async-storage";

const LOCAL_STORAGE_TOKEN = {
  USER: "USER",
  ISAUTHENTICATED: "ISAUTHENTICATED",
  TOKEN: "TOKEN",
  USERDATA: "USERDATA",
  THEME: "THEME",
};

class LocalStorage {
  //AUTH TOKEN
  static storeToken = async (token) => {
    await AsyncStorage.setItem(LOCAL_STORAGE_TOKEN.USER, token);
  };
  static getToken = async () => {
    return await AsyncStorage.getItem(LOCAL_STORAGE_TOKEN.USER);
  };
  static clearToken = async () => {
    await AsyncStorage.clear();
  };

  static onSignUp = async (token, userDetails) => {
    const items = [
      [LOCAL_STORAGE_TOKEN.ISAUTHENTICATED, "true"],
      [LOCAL_STORAGE_TOKEN.TOKEN, token],
      [LOCAL_STORAGE_TOKEN.USERDATA, userDetails],
    ];
    return await AsyncStorage.multiSet(items, () => {});
  };
  static autoLogin = async () => {
    const isAuthenticated = await AsyncStorage.getItem(
      LOCAL_STORAGE_TOKEN.ISAUTHENTICATED
    );
    if (isAuthenticated && isAuthenticated == "true") {
      const token = await AsyncStorage.getItem(LOCAL_STORAGE_TOKEN.TOKEN);
      const userDetails = await AsyncStorage.getItem(
        LOCAL_STORAGE_TOKEN.USERDATA
      );
      return Promise.resolve({
        token,
        userDetails,
      });
    } else {
      return Promise.reject("Not Authenticated");
    }
  };
  static setTheme = async (themeValue = "") => {
    try {
      const setTheme = await AsyncStorage.setItem(
        LOCAL_STORAGE_TOKEN.THEME,
        themeValue
      );
      return Promise.resolve(true);
    } catch (error) {
      console.log("setTheme_Error - ", error);
      return Promise.reject(error);
    }
  };
  static getTheme = async () => {
    try {
      const themeType = await AsyncStorage.getItem(LOCAL_STORAGE_TOKEN.THEME);
      if (themeType == undefined || themeType == null) {
        return Promise.reject("NO_THEME_SELECTED");
      }
      return Promise.resolve(themeType);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  static onSelectUser = async (User_Data) => {
    const items = [
      [LOCAL_STORAGE_TOKEN.ISAUTHENTICATED, "true"],
      [LOCAL_STORAGE_TOKEN.TOKEN, User_Data.token],
      [LOCAL_STORAGE_TOKEN.USERDATA, JSON.stringify(User_Data.user)],
    ];
    return await AsyncStorage.multiSet(items, () => {});
  };

  //AsyncStorage setItem
  static storeAsyncData = async (key, data) => {
    try {
      await AsyncStorage.setItem(`@${key}`, JSON.stringify(data));
    } catch (e) {
      console.log("AsyncStorage SETITEM Error ==>>", e);
    }
  };

  //AsyncStorage getItem
  static getAsynData = async (key) => {
    try {
      let data = await AsyncStorage.getItem(`@${key}`);
      if (data !== null) {
        var result = JSON.parse(data);
        return result;
      }
    } catch (e) {
      console.log("AsyncStorage GETITEM Error==>>", e);
    }
  };

  //Clear AysncStorage
  static clearLocalStorage = async () => {
    try {
      console.log("---ASYNC DATA IS CLEAR-->>");
      await AsyncStorage.clear();
    } catch (e) {
      console.log("AsyncStorage Clear", e);
    }
  };
}

export { LocalStorage };
