import {
  Alert,
  StyleSheet,
  Text,
  FlatList,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";
import React, { useState } from "react";

import { getHp, getWp } from "../Utils/utils/viewUtils";
import { FONTSIZE } from "../Utils/utils/fontSize";

const TextInputBoxS = (props) => {
  const {
    onChange,
    placeholder,
    inputStyle,
    value,
    keyboardType = "default",
  } = props;
  return (
    <TextInput
      style={[styles.input, inputStyle]}
      onChangeText={(text) => onChange(text)}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={"#fff"}
      keyboardType={keyboardType}
    />
  );
};

TextInputBoxS.defaultProps = {
  onChange: (text) => {
    console.log(text);
  },
  placeholder: "Placeholder",
  inputStyle: {},
};

export default TextInputBoxS;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#000",
    // backgroundColor: "#C4C4C4",
    alignItems: "center",
    // marginVertical: 10,
    paddingVertical: getHp(10),
    fontSize: FONTSIZE.Text18,
    width: getHp(110),
    fontWeight: "600",
    color: "#FFF",
    paddingHorizontal: getWp(10),
  },
});
