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

import React, { useEffect, useState } from "react";
import { FONTSIZE } from "../Utils/utils/fontSize";
import TextInputPaper from "../Components/TextInputPaper";
import CustomButton from "../Components/CustomButton";
import { getHp } from "../Utils/utils/viewUtils";
import ApiClient from "../app/ApiClient";
import { LocalStorage } from "../Utils/utils/localStorage";
import { useDispatch } from "react-redux";
import { setUserInfoToken } from "../reducer/actions/Actions";
import { isStoreUserInfoToken } from "../app/HelperFunctions/function";
import Strings from "../Utils/utils/String";
import { appStore } from "../Mobx/AppStore";
import { observer } from "mobx-react";

const SignUp = (props) => {
  const dispatch = useDispatch();

  const { userData } = appStore;

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    isName: false,
    isMobile: false,
    isemail: false,
    ispassword: false,
  });

  let ErrorCount = 0;

  const handleSignUp = async () => {
    // Error Clear function
    errorClear();

    // Validation check function
    const check = checkValidation();
    if (check && check == true) {
      return false;
    }

    try {
      setLoading(true);
      let body = {
        name,
        email,
        password,
        mobile,
      };

      let result = await ApiClient.instance.post(
        ApiClient.endPoints.SignUp,
        body
      );
      if (result.status == 201) {
        let userInfo = {
          userInfo: result?.data?.user,
          token: result?.data?.token,
          isAuthenticate: true,
        };
        // isStoreUserInfoToken(userInfo);
        isStoreUserInfoToken(userInfo);
        dispatch(setUserInfoToken(userInfo));
        clearAll();
        setLoading(false);
      } else {
        console.log("--REEULST>>>", result?.data?.message);
        setLoading(false);
      }
    } catch (e) {
      console.log("Api calling error SignUp", e);
      setLoading(false);
    }
  };

  const clearAll = () => {
    setName("");
    setMobile("");
    setEmail("");
    setPassword("");
    setLoading(false);
  };

  const checkValidation = () => {
    let data = {
      isName: false,
      isMobile: false,
      isemail: false,
      ispassword: false,
    };

    if (name == "" || Strings.validateName(name) !== true) {
      data.isName = true;
      ErrorCount++;
    }
    if (
      mobile == "" ||
      mobile.length < 10 ||
      Strings.validateNumber(mobile) !== true
    ) {
      data.isMobile = true;
      ErrorCount++;
    }
    if (email.length < 4 || Strings.validateEmail(email) !== true) {
      data.isemail = true;
      ErrorCount++;
    }
    if (password.length < 6 || Strings.validatePassword(password) !== true) {
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
      isName: false,
      isMobile: false,
      isemail: false,
      ispassword: false,
    });
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
          source={require("../Utils/Assets/SingUp.png")}
        />
        <Text style={styles.headText}>Sign Up</Text>

        <TextInputPaper
          label={"Name"}
          value={name}
          onChange={(e) => setName(e)}
          activeOutlineColor={error.isName ? "#FF0000" : "#a9a9a9"}
          outlineColor={error.isName ? "#FF0000" : "#C4C4C4"}
        />
        {error.isName && (
          <Text style={[styles.SubHeadingText]}>
            Please provide a valid Name
          </Text>
        )}

        <TextInputPaper
          label={"Mobile"}
          value={mobile}
          onChange={(e) => setMobile(e)}
          activeOutlineColor={error.isMobile ? "#FF0000" : "#a9a9a9"}
          outlineColor={error.isMobile ? "#FF0000" : "#C4C4C4"}
        />
        {error.isMobile && (
          <Text style={[styles.SubHeadingText]}>
            Please provide a valid Password
          </Text>
        )}

        <TextInputPaper
          label={"Email id"}
          value={email}
          onChange={(e) => setEmail(e)}
          activeOutlineColor={error.isemail ? "#FF0000" : "#a9a9a9"}
          outlineColor={error.isemail ? "#FF0000" : "#C4C4C4"}
        />
        {error.isemail && (
          <Text style={[styles.SubHeadingText]}>
            Please provide a valid email id
          </Text>
        )}

        <TextInputPaper
          label={"Password"}
          secureText
          right={<TextInput.Icon name="eye" />}
          value={password}
          onChange={(e) => setPassword(e)}
          activeOutlineColor={error.ispassword ? "#FF0000" : "#a9a9a9"}
          outlineColor={error.ispassword ? "#FF0000" : "#C4C4C4"}
        />
        {error.ispassword && (
          <Text style={[styles.SubHeadingText]}>
            Password should lower,upper and special character
          </Text>
        )}

        <View style={styles.rowView}>
          <Text style={styles.alreadyText}>Already have account? </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate("SignIn")}>
            <Text style={styles.alreadyText}>SingIn</Text>
          </TouchableOpacity>
        </View>
        <CustomButton btnText={"Submit"} onPress={() => handleSignUp()} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;

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
    width: 250,
    height: 150,
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
