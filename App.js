import { StyleSheet, Text, View, NativeModules } from "react-native";
import React, { useEffect, useState } from "react";
import SmsListener from "react-native-android-sms-listener";
import { DeviceEventEmitter } from "react-native";
// import SmsAndroid from "react-native-get-sms-android";
import moment from "moment";

import Routes from "./Src/Navigation/Routes";
import { Provider, useDispatch } from "react-redux";
import store from "./Src/reducer/store";

import Example from "./Example";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Routes />
      </Provider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
