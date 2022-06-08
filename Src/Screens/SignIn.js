import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";

import React, { useState, useEffect } from "react";
import { FONTSIZE } from "../Utils/utils/fontSize";
import TextInputPaper from "../Components/TextInputPaper";
import CustomButton from "../Components/CustomButton";
import { getHp } from "../Utils/utils/viewUtils";
import { useDispatch } from "react-redux";
import { LocalStorage } from "../Utils/utils/localStorage";
import ApiClient from "../app/ApiClient";
import { setUserInfoToken } from "../reducer/actions/Actions";
import { isStoreUserInfoToken } from "../app/HelperFunctions/function";
import Strings from "../Utils/utils/String";
import { appStore } from "../Mobx/AppStore";
import { observer } from "mobx-react";

const SignIn = (props) => {
  const dispatch = useDispatch();
  const { userData } = appStore;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    isemail: false,
    ispassword: false,
  });

  let ErrorCount = 0;

  const checkValidation = () => {
    let data = {
      isemail: false,
      ispassword: false,
    };
    if (email.length < 4 || Strings.validateEmail(email) !== true) {
      data.isemail = true;
      ErrorCount++;
    }
    if (password.length < 6) {
      data.ispassword = true;
      ErrorCount++;
    }

    setError(data);

    if (ErrorCount > 0) {
      ErrorCount = 0;
      return true;
    } else {
      return false;
    }
  };

  const errorClear = () => {
    console.log("Error Clear function Call");
    setError({
      ispassword: false,
    });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      // Error Clear function
      errorClear();

      // Validation check function
      const check = checkValidation();
      if (check && check == true) {
        setLoading(false);
        return false;
      }

      let body = {
        email,
        password,
      };

      let result = await ApiClient.instance.post(
        ApiClient.endPoints.SignIn,
        body
      );

      // console.log("Result Status--->>>>", result.status);
      if (result.status == 200) {
        let userInfo = {
          userInfo: result?.data?.user,
          token: result?.data?.token,
          isAuthenticate: true,
        };

        isStoreUserInfoToken(userInfo);
        dispatch(setUserInfoToken(userInfo));
        clearAll();
      } else {
        console.log("else part message");
      }
      setLoading(false);
    } catch (e) {
      console.log("Api calling error SignUp", e);
      setLoading(false);
    }
  };

  const clearAll = () => {
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    return () => {
      clearAll();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Image
          style={styles.tinyLogo}
          source={require("../Utils/Assets/login.png")}
        />
        <Text style={styles.headText}>Login</Text>
        <TextInputPaper
          label={"Username"}
          value={email}
          onChange={(e) => setEmail(e)}
          activeOutlineColor={error.isemail ? "#FF0000" : "#a9a9a9"}
          outlineColor={error.isemail ? "#FF0000" : "#C4C4C4"}
        />
        {error.isemail && (
          <Text style={[styles.SubHeadingText]}>
            Please provide a valid email address
          </Text>
        )}

        <TextInputPaper
          label={"Password"}
          secure
          // right={<TextInput.Icon name="eye" />}
          value={password}
          onChange={(e) => setPassword(e)}
          activeOutlineColor={error.ispassword ? "#FF0000" : "#a9a9a9"}
          outlineColor={error.ispassword ? "#FF0000" : "#C4C4C4"}
        />
        {error.ispassword && (
          <Text style={[styles.SubHeadingText]}>
            Please provide at least 6 characters
          </Text>
        )}

        <View style={styles.rowView}>
          <Text style={styles.alreadyText}>Dont't have account? </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate("SignUp")}>
            <Text style={styles.alreadyText}>Singup</Text>
          </TouchableOpacity>
        </View>
        <CustomButton btnText={"Submit"} onPress={() => handleLogin()} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },

  headText: {
    marginBottom: 5,
    textAlign: "center",
    fontSize: FONTSIZE.Text24,
    fontWeight: "800",
    color: "#696969",
  },
  tinyLogo: {
    width: 350,
    height: 250,
  },

  gifLoading: {
    width: 350,
    height: 250,
  },

  alreadyText: {
    textAlign: "center",
    marginVertical: getHp(10),
    fontSize: FONTSIZE.Text16,
    fontWeight: "400",
    color: "#696969",
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
  },

  SubHeadingText: {
    color: "#FF0000",
    fontSize: FONTSIZE.Text14,
    lineHeight: 20,
    alignSelf: "flex-start",
    marginHorizontal: getHp(25),
    // marginLeft: UiUtils.getWp(20),
  },
});
