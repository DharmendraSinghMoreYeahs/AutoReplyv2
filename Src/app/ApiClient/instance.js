import axios from "axios";
import ApiClient from ".";
import Endpoints from "./apiEndPoints";

const Instance = () => {
  const instance = axios.create({
    baseURL: Endpoints.baseURL,
  });

  instance.interceptors.request.use(
    (config) => {
      if (
        config.headers[ApiClient.LOADING] &&
        config.headers[ApiClient.LOADING] == true
      ) {
        // MobxStore.appStore.toogleLoader(true);
      }
      //delete config.headers[ApiClient.LOADING];
      // console.log("-Request->>", config);
      return config;
    },
    (error) => {
      //MobxStore.appStore.toogleLoader(false);
      console.log("REQUEST ERROR >>> ", error);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      //MobxStore.appStore.toogleLoader(false);
      return Promise.resolve(response);
    },
    (error) => {
      // MobxStore.appStore.toogleLoader(false);
      const { config, request, response, isAxiosError } = error;
      let text;
      // console.log("Response", response);
      let responseTreeError = {
        url: `${request?.responseURL}`,
        data: JSON.stringify(response?.data),
        error: JSON.stringify(error),
      };
      console.log(`RESPONSE ERROR <<< - ${JSON.stringify(responseTreeError)}`);
      return Promise.reject(responseTreeError);
    }
  );

  return instance;
};

export default Instance;
