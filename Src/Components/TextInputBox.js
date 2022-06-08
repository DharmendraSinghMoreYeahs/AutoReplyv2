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

const TextInputBox = (props) => {
  const { onChange, placeholder, inputStyle, value } = props;
  return (
    <>
      <TextInput
        style={[styles.input, inputStyle]}
        onChangeText={(text) => onChange(text)}
        value={value}
        placeholder={placeholder}
      />
    </>
  );
};

TextInputBox.defaultProps = {
  onChange: (text) => {
    console.log("ADD_ONCHANGE");
  },
  placeholder: "Placeholder",
  inputStyle: {},
};

export default TextInputBox;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#C4C4C4",
    alignItems: "center",
    marginTop: 10,
    paddingTop: getHp(20),
    fontSize: FONTSIZE.Text18,
    fontWeight: "600",
    paddingHorizontal: getWp(10),
  },
});
