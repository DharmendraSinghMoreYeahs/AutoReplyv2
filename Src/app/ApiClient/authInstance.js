import Instance from "./instance";
import { appStore } from "../../Mobx/AppStore";

import store from "../../reducer/store";

const AuthInstance = () => {
  const authInstance = Instance();

  authInstance.interceptors.request.use(
    (config) => {
      const userInfo = store?.getState()?.userInfoToken;
      const token = userInfo?.token;

      config.baseURL = `${authInstance.defaults.baseURL}`;
      config.headers.Authorization = `Bearer ${token}`;
      let requestData = {
        params: config.params,
        url: `${config.baseURL}${config.url}`,
        token: `Bearer ${token}`,
        // body: JSON.stringify(config.headers),
      };
      console.log(`

      REQUEST_INIT -> 
      REQUEST_AT - > ${new Date()}
      ${JSON.stringify(requestData)}
      
      `);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authInstance.interceptors.response.use(
    (response) => {
      let responseTree = {
        url: `${response?.responseURL}`,
        data: JSON.stringify(response?.data),
      };

      return Promise.resolve(response);
    },
    (error) => {
      const { config, request, response, isAxiosError } = error;
      let responseTreeError = {
        url: `${request?.responseURL}`,
        data: JSON.stringify(response?.data),
      };
      console.log(` RESPONSE_ERROR <-
      RESPONSE_ERROR_AT - > ${new Date()}
      ${JSON.stringify(responseTreeError)}
      `);
      return Promise.reject(error);
    }
  );

  return authInstance;
};

export default AuthInstance;
