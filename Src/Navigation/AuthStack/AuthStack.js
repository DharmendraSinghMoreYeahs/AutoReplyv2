import { Home, Settings, Profile, MessageSet, Demo, SignIn } from "../../";
import React, { useState, useEffect } from "react";
import {
  createNativeStackNavigator,
  TransitionPresets,
  Card,
} from "@react-navigation/native-stack";

import { useDispatch } from "react-redux";
import { setMsgList, setSettingData } from "../../reducer/actions/Actions";
import { LocalStorage } from "../../Utils/utils/localStorage";
import SignUp from "../../Screens/SignUp";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      headerMode={false}
      animationEnabled={true}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
      initialRouteName={"SignIn"}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthStack;
