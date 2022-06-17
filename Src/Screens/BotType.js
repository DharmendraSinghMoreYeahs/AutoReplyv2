import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { getHp, getWp } from "../Utils/utils/viewUtils";
import { FONTSIZE } from "../Utils/utils/fontSize";
import { LocalStorage } from "../Utils/utils/localStorage";
import ApiClient from "../app/ApiClient";

const IsAddMsgModal = ({
  handleToggle,
  isAddModalVisible,
  setIsAddModalVisible,
  newMsgText,
  setNewMsgText,
  handleCreateBot,
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddModalVisible}
        onRequestClose={() => {
          setIsAddModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter Bot title</Text>

            <TextInput
              style={styles.modalInput}
              value={newMsgText}
              onChangeText={(e) => {
                setNewMsgText(e);
              }}
            />

            <View style={styles.BtnContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  handleCreateBot();
                }}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  handleToggle();
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const BotType = (props) => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newMsgText, setNewMsgText] = useState("");

  React.useEffect(() => {
    isAuth();

    return () => {
      setNewMsgText("");
    };
  }, []);

  const handleEdit = async (item) => {
    // const{index,item,title}=item;
    // setEditItem(item?.item);
  };

  //create Bot function
  const handleCreateBot = async () => {
    try {
      handleToggle();
      let body = {
        title: newMsgText,
      };

      let result = await ApiClient.instance.post(
        ApiClient.endPoints.createBt,
        body
      );

      if (result.status == 201) {
        let body = {
          isAuthenticate: true,
          botItem: result?.data?.user,
          newBot: true,
        };
        await LocalStorage.storeAsyncData("login", body);
        props.navigation.replace("Home");
      } else {
        console.log(result?.message);
      }
      setNewMsgText("");
    } catch (e) {
      console.log("API Create Boat Calling-->>", e);
    }
  };

  //text box pop up toggle
  const handleToggle = () => {
    setIsAddModalVisible(!isAddModalVisible);
  };

  const isAuth = async () => {
    try {
      let data = await LocalStorage.getAsynData("login");
      console.log("ASYNC DATA-->>", data);
      if (data !== null) {
        if (data.isAuthenticate == true) {
          props.navigation.replace("Home");
        }
      }
    } catch (e) {
      console.log("Local Storage get Erro", e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centerView}>
        <Text style={styles.headText}>Auto Reply</Text>

        <TouchableOpacity style={styles.boxView} onPress={() => handleToggle()}>
          <Text style={styles.botText}>New Bot</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.boxView}
          onPress={() => props.navigation.replace("CreateBot")}
        >
          <Text style={styles.botText}>Existing Bot</Text>
        </TouchableOpacity>
      </View>
      <IsAddMsgModal
        handleToggle={handleToggle}
        isAddModalVisible={isAddModalVisible}
        setIsAddModalVisible={setIsAddModalVisible}
        newMsgText={newMsgText}
        setNewMsgText={setNewMsgText}
        handleCreateBot={handleCreateBot}
      />
    </View>
  );
};

export default BotType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6e6e6",
  },
  boxView: {
    height: getHp(250),
    width: getWp(360),
    borderRadius: getHp(40),
    backgroundColor: "#b3b3b3",
    marginVertical: getHp(20),
    justifyContent: "center",
    alignItems: "center",
  },
  headText: {
    fontSize: FONTSIZE.Text26,
    color: "#666666",
    fontWeight: "800",
    letterSpacing: 1.0,
    textDecorationLine: "underline",
  },
  centerView: {
    marginVertical: getHp(100),
    justifyContent: "center",
    alignItems: "center",
  },
  botText: {
    fontSize: FONTSIZE.Text28,
    color: "#666666",
    fontWeight: "800",
    letterSpacing: 1.0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#000",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: getWp(20),
    elevation: 5,
  },
  modalInput: {
    backgroundColor: "#fff",
    width: getWp(200),
    height: getHp(50),
    borderRadius: 10,
    fontSize: FONTSIZE.Text18,
    paddingHorizontal: 10,
    marginVertical: getHp(10),
    color: "#000",
    alignSelf: "center",
  },
  BtnContainer: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-around",
    marginTop: 20,
    width: getWp(190),
  },
  buttonClose: {
    backgroundColor: "#fff",
  },
  textStyle: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: FONTSIZE.Text18,
    color: "#fff",
  },
});
