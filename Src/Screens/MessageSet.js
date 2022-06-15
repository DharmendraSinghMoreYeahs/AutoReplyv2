import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";

import BackHeader from "../Components/BackHeader";
import TextInputBox from "../Components/TextInputBox";
import { getHp, getWp } from "../Utils/utils/viewUtils";
import { FONTSIZE } from "../Utils/utils/fontSize";
import { useSelector, useDispatch } from "react-redux";
import { setMsgList } from "../reducer/actions/Actions";
import { LocalStorage } from "../Utils/utils/localStorage";
import AntDesign from "react-native-vector-icons/dist/AntDesign";
import ApiClient from "../app/ApiClient";

const MessageSet = (props) => {
  // const Navigation = props.navigation.navigate;
  const { item } = props.route.params;
  const dispatch = useDispatch();
  const msgList = useSelector((state) => state.msgList);

  const [inputList, setInputList] = useState([
    {
      msgReply: "Hi",
    },
    {
      msgReply: "Hello",
    },
    {
      msgReply: "How are you",
    },
    {
      msgReply: "How can i help you",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [isRefresh, setReferesh] = useState(false);

  const handleInputChage = (text, index, key) => {
    const value = text;
    const list = [...inputList];
    list[index][key] = value;
    setInputList(list);
  };

  const handleAddClick = () => {
    if (inputList.length < 15) {
      setInputList([
        ...inputList,
        {
          msgReply: "",
        },
      ]);
    } else {
      alert("Dont not allow more than 15 text box");
    }
  };

  const isAddAnotherValueInObject = async () => {
    try {
      setLoading(true);
      var list = [];
      inputList.map((item) => {
        if (item.msgReply !== "") {
          list.push(item);
        }
      });

      var newMsgList = [];
      list.map((itm) => {
        newMsgList.push({
          messageTitle: itm?.msgReply,
          botId: item?._id,
        });
      });

      let body = { msgList: newMsgList };

      let result = await ApiClient.authInstance.post(
        ApiClient.endPoints.createMessageSet,
        body
      );

      if (result.status == 200) {
        console.log("Created boat completed");
      } else {
        console.log(result?.message);
      }
      setLoading(false);
      props.navigation.goBack();
    } catch (e) {
      setLoading(false);
      console.log("Api Calling Error", e);
    }
  };

  useLayoutEffect(() => {
    setLoading(true);
    isGetData(props?.route?.params?.item?._id);
  }, [isRefresh]);

  const isGetData = async (id) => {
    try {
      let result = await ApiClient.authInstance.get(
        ApiClient.endPoints.getMsgSetByBotId(id)
      );
      console.log("---GET BOT DATA>>>", result?.status);

      if (result.status == 200) {
        console.log(result?.data?.message);
        autoFillInputList(result?.data?.message);
        setLoading(false);
      } else {
        console.log("result.messages");
        setLoading(false);
      }
    } catch (e) {
      console.log("API CALLING ERROR ", e);
      setLoading(false);
    }
  };

  const autoFillInputList = (data) => {
    var list = [];
    data.map((itm) => {
      if (itm.botId == props?.route?.params?.item?._id) {
        list.push({ _id: itm?._id, msgReply: itm?.messageTitle });
      }
    });
    setInputList([...list]);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      // console.log("DELETE BY ID -->>>>>>>", id);
      let result = await ApiClient.authInstance.delete(
        ApiClient.endPoints.getMsgSetDeleteById(id)
      );
      console.log("---GET BOT DATA>>>", result?.status);

      if (result.status == 201) {
        setReferesh(!isRefresh);
      } else {
        console.log("result.messages");
        setLoading(false);
      }
    } catch (e) {
      console.log("API CALLING ERROR ", e);
      setLoading(false);
    }
  };

  const handleDeleteMsgSet = (id) => {
    Alert.alert("Delete", "Are you sure want to delete", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },

      {
        text: "Delete",
        onPress: () => handleDelete(id),
        style: "cancel",
      },
    ]);
  };

  return (
    <>
      <BackHeader
        Tittle={
          item?.title !== "" ? item?.title : "Message SET " + `${item?.id}`
        }
        onPress={() => props.navigation.goBack()}
        onPressAdd={() => handleAddClick()}
      />
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#C4C4C4"
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        />
      ) : (
        <View style={styles.mainContent}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollContainer}
          >
            {inputList.length == 0 && (
              <View style={styles.imageView}>
                <Image
                  style={styles.tinyLogo}
                  source={require("../Utils/Assets/NoRecord1.png")}
                />
                <Text style={styles.msgText}>Add replies</Text>
              </View>
            )}
            {inputList.map((itm, idx) => {
              // console.log("item-->>>>>>>>>>>", itm);
              return (
                <View style={styles.textBox} key={idx}>
                  <View style={styles.rowView}>
                    <Text style={styles.headText}>Msg SetType {idx + 1}</Text>
                    <TouchableOpacity
                      onPress={() => handleDeleteMsgSet(itm?._id)}
                    >
                      <AntDesign name="delete" size={30} color={"#000"} />
                    </TouchableOpacity>
                  </View>
                  <TextInputBox
                    placeholder={
                      itm?.messageTitle == "" ? "Type here" : itm?.messageTitle
                    }
                    value={itm.msgReply}
                    onChange={(text, key) =>
                      handleInputChage(text, idx, (key = "msgReply"))
                    }
                  />
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.btnView}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => isAddAnotherValueInObject()}
            >
              <Text style={styles.btnText}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default MessageSet;

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    padding: getHp(15),
  },
  scrollContainer: {
    marginBottom: getHp(85),
  },
  headText: {
    fontSize: FONTSIZE.Text18,
    color: "#000",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: "#C4C4C4",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: getHp(20),
  },
  textBox: {
    marginTop: getHp(10),
  },
  btnView: {
    position: "absolute",
    height: getHp(80),
    width: getWp(415),
    bottom: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: getHp(10),
  },
  btn: {
    height: getHp(60),
    width: getWp(390),
    backgroundColor: "#C4C4C4",
    borderRadius: getHp(10),
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: FONTSIZE.Text20,
    color: "#000",
    fontWeight: "600",
    letterSpacing: 0.7,
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
