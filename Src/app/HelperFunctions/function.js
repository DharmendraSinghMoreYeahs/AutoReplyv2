import { LocalStorage } from "../../Utils/utils/localStorage";

export const isStoreUserInfoToken = async (data) => {
  try {
    if (data) {
      await LocalStorage.storeAsyncData("userInfoToken", data);
    }
  } catch (e) {
    console.log("Store asynData Token", e);
  }
};
