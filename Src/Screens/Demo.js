import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FONTSIZE } from "../Utils/utils/fontSize";
import { getHp, getWp } from "../Utils/utils/viewUtils";

const ChildComponent = ({ handleChange }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <TouchableOpacity
        onPress={() => handleChange()}
        style={{
          height: getHp(50),
          width: getWp(200),
          backgroundColor: "#C4C4C4",
        }}
      >
        <Text> CHANGE COLOR</Text>
      </TouchableOpacity>
    </View>
  );
};

const Demo = (props) => {
  const [getText, setText] = useState(0);
  const [color, setColor] = useState("red");

  console.log("-->>", color);

  const handleChange = () => {
    setColor("#C4C4C4");
  };

  return (
    <View style={[Styles.conatiner]}>
      <Text style={Styles.stateText}>Demo Text</Text>
      <Text style={Styles.stateText}>{getText}</Text>
      {/* <ChildComponent handleChange={handleChange} /> */}
    </View>
  );
};

export default Demo;

const Styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    justifyContent: "center", //vertical allignment
    alignItems: "center", // horizontal aligment
  },
  stateText: {
    marginBottom: 15,
    // textAlign: "center",
    fontSize: FONTSIZE.Text30,
    fontWeight: "800",
    color: "#000",
  },
  btnView: {
    // height: getHp(70),
    // width: getWp(150),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C4C4C4",
    borderRadius: getHp(50),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: getHp(50),
    paddingVertical: getHp(5),
  },
  btnText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: FONTSIZE.Text18,
    fontWeight: "800",
    color: "#000",
  },
});
