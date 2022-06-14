import {
  Home,
  Settings,
  Profile,
  MessageSet,
  Demo,
  SignIn,
  BotType,
  CreateBot,
} from "../../";
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

export default function AppStack() {
  const dispacth = useDispatch();

  const [msg_List, set_msg_List] = useState([
    {
      id: 1,
      title: "",
      msg: [
        {
          msgReply: "Msg set 1 Reply 1",
        },
        {
          msgReply: "Msg set 1 Reply 2",
        },
        {
          msgReply: "Msg set 1 Reply 3",
        },
        {
          msgReply: "Msg set 1 Reply 4",
        },
      ],
    },
    {
      id: 2,
      title: "",
      msg: [
        {
          msgReply: "Msg set 2 Reply 1",
        },
        {
          msgReply: "Msg set 2 Reply 2",
        },
        {
          msgReply: "Msg set 2 Reply 3",
        },
        {
          msgReply: "Msg set 2 Reply 4",
        },
      ],
    },
    {
      id: 3,
      title: "",

      msg: [
        {
          msgReply: "Msg set 3 Reply 1",
        },
        {
          msgReply: "Msg set 3 Reply 2",
        },
        {
          msgReply: "Msg set 3 Reply 3",
        },
        {
          msgReply: "Msg set 3 Reply 4",
        },
      ],
    },
    {
      id: 4,
      title: "",

      msg: [
        {
          msgReply: "Msg set 4 Reply 1",
        },
        {
          msgReply: "Msg set 4 Reply 2",
        },
        {
          msgReply: "Msg set 4 Reply 3",
        },
        {
          msgReply: "Msg set 4 Reply 4",
        },
      ],
    },
    {
      id: 5,
      title: "",

      msg: [
        {
          msgReply: "Msg set 5 Reply 1",
        },
        {
          msgReply: "Msg set 5 Reply 2",
        },
        {
          msgReply: "Msg set 5 Reply 3",
        },
        {
          msgReply: "Msg set 5 Reply 4",
        },
      ],
    },
    {
      id: 6,
      title: "",

      msg: [
        {
          msgReply: "Msg set 6 Reply 1",
        },
        {
          msgReply: "Msg set 6 Reply 2",
        },
        {
          msgReply: "Msg set 6 Reply 3",
        },
        {
          msgReply: "Msg set 6 Reply 4",
        },
      ],
    },
    {
      id: 7,
      title: "",

      msg: [
        {
          msgReply: "Msg set 7 Reply 1",
        },
        {
          msgReply: "Msg set 7 Reply 2",
        },
        {
          msgReply: "Msg set 7 Reply 3",
        },
        {
          msgReply: "Msg set 7 Reply 4",
        },
      ],
    },
    {
      id: 8,
      title: "",

      msg: [
        {
          msgReply: "Msg set 8 Reply 1",
        },
        {
          msgReply: "Msg set 8 Reply 2",
        },
        {
          msgReply: "Msg set 8 Reply 3",
        },
        {
          msgReply: "Msg set 8 Reply 4",
        },
      ],
    },
    {
      id: 9,
      title: "",

      msg: [
        {
          msgReply: "Msg set 9 Reply 1",
        },
        {
          msgReply: "Msg set 9 Reply 2",
        },
        {
          msgReply: "Msg set 9 Reply 3",
        },
        {
          msgReply: "Msg set 9 Reply 4",
        },
      ],
    },
    {
      id: 10,
      title: "",

      msg: [
        {
          msgReply: "Msg set 10 Reply 1",
        },
        {
          msgReply: "Msg set 10 Reply 2",
        },
        {
          msgReply: "Msg set 10 Reply 3",
        },
        {
          msgReply: "Msg set 10 Reply 4",
        },
      ],
    },
    {
      id: 11,
      title: "",

      msg: [
        {
          msgReply: "Msg set 11 Reply 1",
        },
        {
          msgReply: "Msg set 11 Reply 2",
        },
        {
          msgReply: "Msg set 11 Reply 3",
        },
        {
          msgReply: "Msg set 11 Reply 4",
        },
      ],
    },
    {
      id: 12,
      title: "",

      msg: [
        {
          msgReply: "Msg set 12 Reply 1",
        },
        {
          msgReply: "Msg set 12 Reply 2",
        },
        {
          msgReply: "Msg set 12 Reply 3",
        },
        {
          msgReply: "Msg set 12 Reply 4",
        },
      ],
    },
    {
      id: 13,
      title: "",

      msg: [
        {
          msgReply: "Msg set 13 Reply 1",
        },
        {
          msgReply: "Msg set 13 Reply 2",
        },
        {
          msgReply: "Msg set 13 Reply 3",
        },
        {
          msgReply: "Msg set 13 Reply 4",
        },
      ],
    },
    {
      id: 14,
      title: "",

      msg: [
        {
          msgReply: "Msg set 14 Reply 1",
        },
        {
          msgReply: "Msg set 14 Reply 2",
        },
        {
          msgReply: "Msg set 14 Reply 3",
        },
        {
          msgReply: "Msg set 14 Reply 4",
        },
      ],
    },
    {
      id: 15,
      title: "",

      msg: [
        {
          msgReply: "Msg set 15 Reply 1",
        },
        {
          msgReply: "Msg set 15 Reply 2",
        },
        {
          msgReply: "Msg set 15 Reply 3",
        },
        {
          msgReply: "Msg set 15 Reply 4",
        },
      ],
    },
  ]);

  const [setting, setSetting] = useState({
    isCallEnableReply: true,
    isSMSEnableReply: true,
    isMMSEnableReply: false,
    delayResponse: "1",
    inactiveTimer: "1",
    msgText: "Are You available",
    disconnectTimer: "15",
    reactiveUser: "10",
  });

  useEffect(() => {
    isStoreData(msg_List);
    isDefaultSetting();
  }, []);

  const isStoreData = async (list) => {
    try {
      let existingData = await LocalStorage.getAsynData("msgList");
      if (existingData == null) {
        dispacth(setMsgList(list));
        LocalStorage.storeAsyncData("msgList", list);
      } else {
        dispacth(setMsgList(existingData));
      }
    } catch (e) {
      console.log("AppStack Error", e);
    }
  };

  const isDefaultSetting = async () => {
    try {
      let existingData = await LocalStorage.getAsynData("setting");
      if (existingData) {
        dispacth(setSettingData(existingData));
        LocalStorage.storeAsyncData("setting", existingData);
      } else {
        dispacth(setSettingData(setting));
        LocalStorage.storeAsyncData("setting", setting);
      }
    } catch (e) {
      console.log("AppStack Error", e);
    }
  };

  return (
    <Stack.Navigator
      headerMode={false}
      animationEnabled={true}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
      initialRouteName={"BotType"}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="MessageSet" component={MessageSet} />
      <Stack.Screen name="BotType" component={BotType} />
      <Stack.Screen name="CreateBot" component={CreateBot} />
    </Stack.Navigator>
  );
}
