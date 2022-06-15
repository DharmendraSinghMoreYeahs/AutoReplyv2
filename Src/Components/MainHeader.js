import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  BackHandler,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { getHp, getWp } from "../Utils/utils/viewUtils";
import { FONTSIZE } from "../Utils/utils/fontSize";
import AntDesign from "react-native-vector-icons/dist/AntDesign";
import Feather from "react-native-vector-icons/dist/Feather";
import { LocalStorage } from "../Utils/utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import {
  setMsgList,
  setSendMsgOnOff,
  setSettingData,
} from "../reducer/actions/Actions";
import { useNavigation } from "@react-navigation/core";

const MainHeader = (props) => {
  const navigation = useNavigation();
  const { onPressPassword = () => {} } = props;
  const dispatch = useDispatch();

  const sentMsgOnOff = useSelector((state) => state.sentMsgOnOff);

  const handleClearStorage = async () => {
    try {
      await LocalStorage.clearLocalStorage();
      dispatch(setMsgList([]));
      dispatch(setSettingData({}));
      BackHandler.exitApp();
    } catch (e) {
      console.log("MainHeader Clear AsyncStorage", e);
    }
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to close app?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  const handleSwitchOnOff = (data) => {
    let body = {
      value: data,
    };
    dispatch(setSendMsgOnOff(body));
  };

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.HeaderTitle}>AutoReply</Text>
      </View>
      <View style={styles.IconContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Settings");
          }}
        >
          <Feather name="settings" size={30} color={"#000"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressPassword}>
          <Feather name="lock" size={30} color={"#000"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSwitchOnOff(!sentMsgOnOff.value)}
        >
          <Feather
            name="power"
            size={30}
            color={sentMsgOnOff.value ? "green" : "red"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  header: {
    height: getHp(80),
    backgroundColor: "#C4C4C4",
    alignItems: "flex-end",
    // paddingBottom: getHp(15),
    paddingVertical: getHp(20),
    paddingHorizontal: getHp(15),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  HeaderTitle: {
    fontSize: FONTSIZE.Text26,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#000",
  },
  IconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: getWp(200),
  },
});
