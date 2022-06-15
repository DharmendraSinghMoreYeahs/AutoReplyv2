import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getHp, getWp } from "../Utils/utils/viewUtils";
import { FONTSIZE } from "../Utils/utils/fontSize";
import BotHeader from "../Components/BotHeader";
import { FAB } from "react-native-paper";
import AntDesign from "react-native-vector-icons/dist/AntDesign";
import Feather from "react-native-vector-icons/dist/Feather";
import ApiClient from "../app/ApiClient";
import { LocalStorage } from "../Utils/utils/localStorage";

const RenderItem = ({ item, index, Navigation }) => {
  const handleDeleteMsgSet = (item) => {
    // alert(idx);
    Alert.alert("Delete", "Are you sure want to delete", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },

      {
        text: "Delete",
        onPress: () => handleDelete(item),
        style: "cancel",
      },
    ]);
  };

  const setAsyncData = async () => {
    let body = { isAuthenticate: true };
    await LocalStorage.storeAsyncData("login", body);
  };

  return (
    <View style={styles.flatlistContainer}>
      <TouchableOpacity onPress={() => {}}>
        {/* <Feather name="edit-3" size={30} color={"#000"} /> */}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.textBox}
        onPress={() => {
          Navigation.replace("Home");
          setAsyncData();
        }}
      >
        <Text style={styles.messageSet}>
          {item?.item?.title == "" ? "Bot" + item?.item?.id : item?.item?.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        {/* <AntDesign name="delete" size={30} color={"#000"} /> */}
      </TouchableOpacity>
    </View>
  );
};

const CreateBot = (props) => {
  const Navigation = props.navigation;
  const [loading, setLoading] = useState(false);
  const [isBotList, setBotList] = useState([]);

  useEffect(() => {
    setLoading(true);
    isGetExistingMessage();
  }, []);

  const isGetExistingMessage = async (type) => {
    try {
      let result = await ApiClient.instance.get(ApiClient.endPoints.getBt);
      console.log("---GET DATA BOAT>>>", result.status, result?.data?.message);
      if (result.status == 200) {
        setBotList(result?.data?.message);
      } else {
        console.log("result.messages");
      }
      setLoading(false);
    } catch (e) {
      console.log("IS GET MESSAGE LIST-->>", e);
      setLoading(false);
    }
  };

  return (
    <>
      <BotHeader onPress={() => Navigation.replace("BotType")} />

      <View style={styles.mainContent}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#C4C4C4"
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          />
        ) : (
          <>
            <View
              style={{
                height: "100%",
              }}
            >
              {isBotList.length == 0 && (
                <View style={styles.imageView}>
                  <Image
                    style={styles.tinyLogo}
                    source={require("../Utils/Assets/NoRecord1.png")}
                  />
                  <Text style={styles.msgText}>Add new bot</Text>
                </View>
              )}
              <FlatList
                showsVerticalScrollIndicator={false}
                data={isBotList}
                renderItem={(item, index) => (
                  <RenderItem
                    item={item}
                    index={index}
                    Navigation={Navigation}
                  />
                )}
              />
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default CreateBot;

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    padding: getHp(15),
  },
  messageSet: {
    fontSize: FONTSIZE.Text18,
    color: "#000",
    textTransform: "capitalize",
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  headText: {
    fontSize: FONTSIZE.Text26,
    color: "#666666",
    fontWeight: "800",
    letterSpacing: 1.0,
    textDecorationLine: "underline",
  },
  flatlistContainer: {
    backgroundColor: "#C4C4C4",
    alignItems: "center",
    marginBottom: 5,
    // paddingVertical: getHp(20),
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: getWp(20),
  },
  textBox: {
    width: getWp(230),
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
    height: getHp(60),
    marginVertical: getHp(10),
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 16,
    backgroundColor: "#707070",
  },
  imageView: {
    marginVertical: getHp(80),
    justifyContent: "center",
    alignItems: "center",
  },
  tinyLogo: {
    width: 350,
    height: 250,
  },
  msgText: {
    marginTop: getHp(30),
    textAlign: "center",
    fontSize: FONTSIZE.Text24,
    color: "#b3b3b3",
  },
});
