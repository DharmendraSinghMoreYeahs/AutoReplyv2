import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FONTSIZE } from "../Utils/utils/fontSize";
import { getHp, getWp } from "../Utils/utils/viewUtils";

const CustomButton = (props) => {
  const { onPress, btnStyle, btnTextStyle, btnText } = props;
  return (
    <>
      <TouchableOpacity style={[styles.btnView, btnStyle]} onPress={onPress}>
        <Text style={[styles.btnText, btnTextStyle]}>{btnText}</Text>
      </TouchableOpacity>
    </>
  );
};

export default CustomButton;

CustomButton.defaultProps = {
  onPress: () => {
    console.log("ADD_ONCHANGE");
  },
  btnStyle: {},
  btnTextStyle: {},
};

const styles = StyleSheet.create({
  btnView: {
    height: getHp(60),
    width: getWp(150),
    borderRadius: getHp(50),
    backgroundColor: "#C4C4C4",
    marginVertical: getHp(20),
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    textAlign: "center",
    fontSize: FONTSIZE.Text20,
    fontWeight: "600",
    color: "#696969",
  },
});
