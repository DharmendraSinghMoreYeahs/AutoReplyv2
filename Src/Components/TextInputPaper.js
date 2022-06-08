import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useCallback } from "react";
import { TextInput } from "react-native-paper";

const TextInputPaper = (props) => {
  const {
    onChange,
    inputStyle,
    value,
    label,

    secure,
    // right,
    activeOutlineColor,
    outlineColor,
  } = props;

  const [secureTextEntry, setSecureTextEntry] = useState(secure ? true : false);
  const toggleSecureEntry = useCallback(
    () => setSecureTextEntry((i) => !i),
    []
  );
  return (
    <>
      <TextInput
        mode="outlined"
        secureTextEntry={secureTextEntry}
        right={
          secure ? (
            <TextInput.Icon name="eye" onPress={() => toggleSecureEntry()} />
          ) : (
            <></>
          )
        }
        label={label}
        value={value}
        onChangeText={(e) => onChange(e)}
        style={[styles.textBox, inputStyle]}
        outlineColor={outlineColor}
        activeOutlineColor={activeOutlineColor}
        // theme={{ colors: { placeholder: "#C4C4C4", text: "#000" } }}
      />
    </>
  );
};

TextInputPaper.defaultProps = {
  onChange: (text) => {
    console.log("ADD_ONCHANGE", text);
  },
  label: "label",
  inputStyle: {},
  activeOutlineColor: "#a9a9a9",
  outlineColor: "#C4C4C4",
};

export default TextInputPaper;

const styles = StyleSheet.create({
  textBox: {
    width: "90%",
    marginTop: 10,
  },
});
