import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
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
    var list = [];
    inputList.map((item) => {
      if (item.msgReply !== "") {
        list.push(item);
      }
    });

    var newMsgList = [];
    msgList.map((itm) => {
      if (itm.id == item?.id) {
        newMsgList.push({ id: itm.id, title: itm?.title, msg: list });
      } else {
        newMsgList.push(itm);
      }
    });
    isStoreData(newMsgList);
  };

  const isStoreData = async (list) => {
    // console.log("New msg lsit", JSON.stringify(list));

    dispatch(setMsgList(list));
    await LocalStorage.storeAsyncData("msgList", list);
    props.navigation.goBack();
  };

  useLayoutEffect(() => {
    setLoading(true);
    isAlreadyExistData();
  }, []);

  const isAlreadyExistData = async () => {
    try {
      let data = await LocalStorage.getAsynData("msgList");
      dispatch(setMsgList(data));
      autoFillInputList(data);
    } catch (e) {
      console.log("GET MSG LIST", e);
    }
  };

  const autoFillInputList = (data) => {
    data.map((itm) => {
      if (itm.id == item?.id) {
        // if (itm.msg.length > 3) {
        setInputList([...itm.msg]);
        // }
      }
    });
    setLoading(false);
  };

  const handleDelete = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    var updateList = [];
    list.map((item) => {
      updateList.push(item);
    });
    setInputList(updateList);
  };

  const handleDeleteMsgSet = (idx) => {
    // alert(idx);
    Alert.alert("Delete", "Are you sure want to delete", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },

      {
        text: "Delete",
        onPress: () => handleDelete(idx),
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
            {inputList.map((itm, idx) => {
              return (
                <View style={styles.textBox} key={idx}>
                  <View style={styles.rowView}>
                    <Text style={styles.headText}>Msg SetType {idx + 1}</Text>
                    <TouchableOpacity onPress={() => handleDeleteMsgSet(idx)}>
                      <AntDesign name="delete" size={30} color={"#000"} />
                    </TouchableOpacity>
                  </View>
                  <TextInputBox
                    value={itm.msgReply}
                    onChange={(text, key) =>
                      handleInputChage(text, idx, (key = "msgReply"))
                    }
                    placeholder="Type here"
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
});
