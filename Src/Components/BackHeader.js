import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";
import { getHp, getWp } from "../Utils/utils/viewUtils";
import { FONTSIZE } from "../Utils/utils/fontSize";
import AntDesign from "react-native-vector-icons/dist/AntDesign";
import IoIcons from "react-native-vector-icons/dist/Ionicons";
import FAIcons from "react-native-vector-icons/dist/Feather";

const BackHeader = (props) => {
  const {
    Tittle,
    onPress = () => {},
    onPressAdd = () => {
      console.log("AD NEW FIELD");
    },
    onPressSave = () => {
      console.log("SAVE BTN");
    },
    saveBtn,
  } = props;

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
        <Text style={styles.HeaderTitle}>{Tittle}</Text>
      </View>
      {Tittle !== "Settings" ? (
        <TouchableOpacity onPress={onPressAdd}>
          <AntDesign name="pluscircleo" size={40} color={"#000"} />
        </TouchableOpacity>
      ) : saveBtn ? (
        <TouchableOpacity onPress={onPressSave}>
          <FAIcons name="check-circle" size={35} color={"#000"} />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  header: {
    height: getHp(80),
    backgroundColor: "#C4C4C4",
    alignItems: "flex-end",
    paddingHorizontal: getHp(15),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
