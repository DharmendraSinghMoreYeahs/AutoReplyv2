import { DarkTheme, NavigationContainer } from "@react-navigation/native";
// import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React, { useEffect } from "react";

import AuthStack from "./AuthStack/AuthStack";

import { LogBox } from "react-native";
import AppStack from "./AppStack/AppStack";
import { LocalStorage } from "../Utils/utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfoToken } from "../reducer/actions/Actions";
//LogBox.ignoreAllLogs();

const Routes = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfoToken);
  // console.log("User info token-->>>", userInfo?.token);
  const { isAuthenticate } = userInfo;

  const isAlreadyLogin = async () => {
    try {
      let data = await LocalStorage.getAsynData("userInfoToken");
      if (data !== null) {
        dispatch(setUserInfoToken(data));
      }
    } catch (e) {
      console.log("check Asyn Data error Routes", e);
    }
  };

  useEffect(() => {
    isAlreadyLogin();
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticate ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
