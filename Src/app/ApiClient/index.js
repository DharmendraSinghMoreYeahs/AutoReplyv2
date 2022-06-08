// import AuthInstance from "./authInstance";
import Instance from "./instance";
import AuthInstance from "./authInstance";
import ApiEndPoints from "./apiEndPoints";

class ApiClientProvider {
  LOADING = "LOADING";
  endPoints = ApiEndPoints;
  instance = Instance();
  authInstance = AuthInstance();

  constructor() {
    this.initializeInstances();
  }

  initializeInstances = () => {
    this.instance = Instance();
    this.authInstance = AuthInstance();
  };

  formDataHeaders = (loading = true, customHeaders = {}) => {
    return {
      headers: {
        "Content-Type": "multipart/form-data",
        [this.LOADING]: loading,
        ...customHeaders,
      },
    };
  };

  applicationJSONHeader = (loading = true, customHeaders = {}) => {
    return {
      headers: {
        "Content-Type": "application/json",
        [this.LOADING]: loading,
        ...customHeaders,
      },
    };
  };
}

let ApiClient = new ApiClientProvider();

export default ApiClient;
