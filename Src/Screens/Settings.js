import {
  Alert,
  StyleSheet,
  Text,
  View,
  Switch,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";

import BackHeader from "../Components/BackHeader";
import TextInputBox from "../Components/TextInputBox";
import { getHp, getWp } from "../Utils/utils/viewUtils";
import { FONTSIZE } from "../Utils/utils/fontSize";
import TextInputBoxS from "../Components/TextInputBoxS";
import AntDesign from "react-native-vector-icons/dist/AntDesign";
import { LocalStorage } from "../Utils/utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { setSettingData } from "../reducer/actions/Actions";
import ApiClient from "../app/ApiClient";

const Settings = (props) => {
  // const Navigation = props.navigation.navigate;
  const dispatch = useDispatch();
  const defaultSetting = useSelector((state) => state.setting);
  const settings = useSelector((state) => state.userInfoToken);
  // console.log("--SETTINGS TOKEN>>>", settings?.userInfo?.mobile);
  const [getSaveBtn, setSaveBtn] = useState(false);
  const [isCallEnableReply, setIsCallEnableReply] = useState(false);
  const [isSMSEnableReply, setIsSMSEnableReply] = useState(false);
  const [isMMSEnableReply, setIsMMSEnableReply] = useState(false);

  const [delayResponse, setDelayResponse] = useState();
  const [inactiveTimer, setInactiveTimer] = useState();
  const [msgText, setMsgText] = useState("");
  const [disconnectTimer, setDisconnectTimer] = useState();
  const [reactiveUser, setReactiveUser] = useState();
  const [settingId, setSettingId] = useState();
  const [loading, setLoading] = useState(false);

  // const callEnable=()
  const callEnable = () => {
    setIsCallEnableReply((previousState) => !previousState);
    setSaveBtn(true);
    isCompare();
  };
  const smsEnable = () => {
    setIsSMSEnableReply((previousState) => !previousState);
    setSaveBtn(true);
    isCompare();
  };
  const mmsEnable = () => {
    setIsMMSEnableReply((previousState) => !previousState);
    setSaveBtn(true);
    isCompare();
  };

  useEffect(() => {
    setLoading(true);
    isGetSettings();
  }, []);

  const isGetSettings = async () => {
    try {
      let result = await ApiClient.authInstance.get(
        ApiClient.endPoints.getSettings(settings?.userInfo?.mobile)
      );
      console.log("---GET SETTINGS>>>", result?.status);

      if (result.status == 200) {
        console.log(result?.data?.message);
        isDefaultSetting(result?.data?.message);
      } else {
        console.log("result.messages");
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log("API CALLING ERROR-->>", e);
    }
  };

  const isDefaultSetting = async (data) => {
    // let data = await LocalStorage.getAsynData("setting");
    // if (data !== null) {
    setIsCallEnableReply(data.isCalledReply);
    setIsSMSEnableReply(data.isSmsReply);
    setIsMMSEnableReply(data.isMmsReply);
    setDelayResponse(JSON.stringify(data.delayResponse));
    setInactiveTimer(JSON.stringify(data.inActiveTimes));
    setMsgText(data.defaultText);
    setDisconnectTimer(JSON.stringify(data.disconnectTimes));
    setReactiveUser(JSON.stringify(data.reativeUser));
    setSettingId(data._id);
    // }
    setLoading(false);
  };

  const isCompare = () => {
    console.log("-->>>IS COMPARE FUNCTION-->>>");
    defaultSetting.isCallEnableReply !== isCallEnableReply && setSaveBtn(true);
    defaultSetting.isSMSEnableReply !== isSMSEnableReply && setSaveBtn(true);
    defaultSetting.isMMSEnableReply !== isMMSEnableReply && setSaveBtn(true);
    defaultSetting.delayResponse !== delayResponse && setSaveBtn(true);
    defaultSetting.inactiveTimer !== inactiveTimer && setSaveBtn(true);
    defaultSetting.disconnectTimer !== disconnectTimer && setSaveBtn(true);
    defaultSetting.reactiveUser !== reactiveUser && setSaveBtn(true);
    defaultSetting.msgText !== msgText && setSaveBtn(true);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const setting = {
        isCallEnableReply,
        isSMSEnableReply,
        isMMSEnableReply,
        delayResponse,
        inactiveTimer,
        msgText,
        disconnectTimer,
        reactiveUser,
        mobile: settings?.userInfo?.mobile,
      };
      // console.log("CHANGE SETTING & SAVE", setting);
      dispatch(setSettingData(setting));
      LocalStorage.storeAsyncData("setting", setting);
      setSaveBtn(false);

      let body = {
        isCalledReply: isCallEnableReply,
        isSmsReply: isSMSEnableReply,
        isMmsReply: isMMSEnableReply,
        delayResponse: delayResponse,
        inActiveTimes: inactiveTimer,
        defaultText: msgText,
        disconnectTimes: disconnectTimer,
        reativeUser: reactiveUser,
        mobile: settings?.userInfo?.mobile,
      };

      let result = await ApiClient.authInstance.put(
        ApiClient.endPoints.saveSettings(settingId),
        body
      );
      console.log("---SAVE SETTINGS>>>", result);

      if (result.status == 201) {
        setLoading(false);
        console.log("Update Sucessfully");
      } else {
        setLoading(false);
        console.log(result?.data?.message);
      }

      props.navigation.goBack();
    } catch (e) {
      setLoading(false);
      console.log("Setting Save AsyncData & redux", e);
    }
  };

  return (
    <>
      <BackHeader
        Tittle={"Settings"}
        onPress={() => props.navigation.goBack()}
        saveBtn={getSaveBtn}
        onPressSave={() => handleSave()}
      />
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#C4C4C4"
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainContent}>
            <>
              <View style={styles.headerView}>
                <Text style={styles.headText}>Auto Reply Triggers</Text>
              </View>
              <View style={styles.BoxView}>
                <View style={styles.rowView}>
                  <Text style={styles.LeftText}>Enable Call Reply</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#000" }}
                    thumbColor={isCallEnableReply ? "#f4f3f4" : "#f4f3f4"}
                    // ios_backgroundColor="#3e3e3e"
                    onValueChange={callEnable}
                    value={isCallEnableReply}
                  />
                </View>

                <View style={styles.rowView}>
                  <Text style={styles.LeftText}>Enable SMS Reply</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#000" }}
                    thumbColor={isSMSEnableReply ? "#f4f3f4" : "#f4f3f4"}
                    // ios_backgroundColor="#3e3e3e"
                    onValueChange={smsEnable}
                    value={isSMSEnableReply}
                  />
                </View>

                <View style={styles.rowView}>
                  <Text style={styles.LeftText}>Enable MMS Reply</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#000" }}
                    thumbColor={isMMSEnableReply ? "#f4f3f4" : "#f4f3f4"}
                    // ios_backgroundColor="#3e3e3e"
                    onValueChange={mmsEnable}
                    value={isMMSEnableReply}
                  />
                </View>
              </View>
            </>

            <>
              <View style={styles.headerView}>
                <Text style={styles.headText}>Delay Response</Text>
              </View>
              <View style={styles.BoxView}>
                <View style={styles.rowView}>
                  <Text style={styles.LeftText}>
                    Delay response time (sec.)
                  </Text>
                  <TextInputBoxS
                    value={delayResponse}
                    onChange={(e) => {
                      setDelayResponse(e);
                      isCompare();
                    }}
                    keyboardType="numeric"
                    placeholder={"sec"}
                  />
                </View>
              </View>
            </>

            <>
              <View style={styles.headerView}>
                <Text style={styles.headText}>Sleep Timer</Text>
              </View>
              <View style={styles.BoxView}>
                <View style={styles.rowView}>
                  <Text style={styles.LeftText}>1st inactive Timer (Min.)</Text>
                  <TextInputBoxS
                    value={inactiveTimer}
                    onChange={(e) => {
                      setInactiveTimer(e);
                      isCompare();
                    }}
                    placeholder={"7 Min"}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.BoxView}>
                <View style={styles.rowView}>
                  <Text style={styles.LeftText}>Text</Text>
                  <TextInputBoxS
                    value={msgText}
                    onChange={(e) => {
                      setMsgText(e);
                      isCompare();
                    }}
                    placeholder="Are you available?"
                    inputStyle={{ width: getWp(170) }}
                  />
                </View>
              </View>

              <View style={styles.BoxView}>
                <View style={styles.rowView}>
                  <Text style={styles.LeftText}>
                    Disconnection Timer (Min.)
                  </Text>
                  <TextInputBoxS
                    value={disconnectTimer}
                    onChange={(e) => {
                      setDisconnectTimer(e);
                      isCompare();
                    }}
                    placeholder="15 Min"
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </>

            <>
              <View style={styles.headerView}>
                <Text style={styles.headText}>Purge</Text>
              </View>
              <View style={styles.BoxView}>
                <View style={styles.rowView}>
                  <View style={styles.halfView}>
                    <Text style={styles.LeftText}>Reactive Users (Min.)</Text>
                  </View>
                  <View style={[styles.halfView, { width: "40%" }]}>
                    <TextInputBoxS
                      value={reactiveUser}
                      onChange={(e) => {
                        setReactiveUser(e);
                        isCompare();
                      }}
                      placeholder="15 Min"
                      keyboardType="numeric"
                    />
                    <AntDesign name="play" size={40} color={"#000"} />
                  </View>
                </View>
              </View>
            </>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    paddingVertical: getHp(15),
    // backgroundColor: "red",
  },
  headerView: {
    width: "100%",
    height: getHp(55),
    backgroundColor: "#C4C4C4",
  },
  halfView: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headText: {
    fontSize: FONTSIZE.Text23,
    color: "#000",
    fontWeight: "800",
    letterSpacing: 0.5,
    paddingVertical: getHp(10),
    paddingHorizontal: getWp(20),
    alignItems: "center",
  },
  LeftText: {
    fontSize: FONTSIZE.Text18,
    color: "#000",
    fontWeight: "600",
    letterSpacing: 0.5,
    // paddingVertical: getHp(20),
    // paddingHorizontal: getWp(20),
    alignItems: "center",
  },
  input: {
    backgroundColor: "#C4C4C4",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: getHp(20),
  },
  BoxView: {
    paddingHorizontal: getHp(10),
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: getHp(10),
  },
  textBox: {
    marginTop: getHp(10),
  },
});
