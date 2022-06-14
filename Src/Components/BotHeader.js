import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  BackHandler,
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
import IoIcons from "react-native-vector-icons/dist/Ionicons";

const BotHeader = (props) => {
  const { onPress = () => {} } = props;
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onPress}>
        <IoIcons
          name="ios-chevron-back-circle-outline"
          size={40}
          color={"#000"}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.HeaderTitle}>Auto Reply</Text>
      </View>
      <View style={styles.IconContainer}></View>
    </View>
  );
};

export default BotHeader;

const styles = StyleSheet.create({
  header: {
    height: getHp(80),
    backgroundColor: "#C4C4C4",
    alignItems: "flex-end",
    // paddingBottom: getHp(15),
    paddingVertical: getHp(15),
    paddingHorizontal: getHp(15),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  HeaderTitle: {
    fontSize: FONTSIZE.Text26,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#000",
    marginBottom: getHp(5),
  },
  IconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: getWp(200),
  },
});
