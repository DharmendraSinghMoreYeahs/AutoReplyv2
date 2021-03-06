import {
  Alert,
  StyleSheet,
  Text,
  FlatList,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  PermissionsAndroid,
  AppState,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import CallDetectorManager from "react-native-call-detection";
import { useFocusEffect } from "@react-navigation/native";
import CallLogs from "react-native-call-log";
import { FAB } from "react-native-paper";

import MainHeader from "../Components/MainHeader";
import { getHp, getWp } from "../Utils/utils/viewUtils";
import { FONTSIZE } from "../Utils/utils/fontSize";
import { appStore } from "../Mobx/AppStore";
import { observer } from "mobx-react";
import { LocalStorage } from "../Utils/utils/localStorage";
import { useSelector, useDispatch } from "react-redux";
import SmsListener from "react-native-android-sms-listener";
import SmsAndroid from "react-native-get-sms-android";
import moment from "moment";
import { setMsgList, setPhoneInfo } from "../reducer/actions/Actions";
import AntDesign from "react-native-vector-icons/dist/AntDesign";
import Feather from "react-native-vector-icons/dist/Feather";
import ApiClient from "../app/ApiClient";
import { isReaction } from "mobx/dist/internal";

const IsAddMsgModal = ({
  handleToggle,
  isAddModalVisible,
  setIsAddModalVisible,
  newMsgText,
  setNewMsgText,
  handleAddNewMsgSet,
  handleCreateBot,
  editItem,
  handleUpdateEdit,
  editStatus,
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
            <Text style={styles.modalText}>Enter Message set title</Text>

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
                  editStatus ? handleUpdateEdit(editItem) : handleCreateBot();
                }}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  handleToggle();
                  setNewMsgText("");
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

const RenderItem = ({ item, index, handleDelete, Navigation, handleEdit }) => {
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

  return (
    <View style={styles.flatlistContainer}>
      <TouchableOpacity onPress={() => handleEdit(item)}>
        <Feather name="edit-3" size={30} color={"#000"} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.textBox}
        onPress={() => {
          Navigation("MessageSet", { item: item?.item });
        }}
      >
        <Text style={styles.messageSet}>
          {item?.item?.title == ""
            ? "message Set " + item?.item?.id
            : item?.item?.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteMsgSet(item?.item)}>
        <AntDesign name="delete" size={30} color={"#000"} />
      </TouchableOpacity>
    </View>
  );
};

//Password popup modal
const ModalPopUp = ({
  handleChangePassword,
  setModalVisible,
  modalVisible,
  email,
  setEmail,
  newPassword,
  setNewPassword,
  oldPassword,
  setOldPassword,
  passwordStatus,
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {passwordStatus ? "Change Pasword" : "Enter Password"}
            </Text>

            <TextInput
              placeholder={"Email"}
              style={styles.modalInput}
              onChangeText={(e) => setEmail(e)}
              value={email}
            />

            <TextInput
              placeholder={"Old password"}
              style={styles.modalInput}
              secureTextEntry={true}
              onChangeText={(e) => setOldPassword(e)}
              value={oldPassword}
            />

            <TextInput
              placeholder={"New password"}
              style={styles.modalInput}
              secureTextEntry={true}
              onChangeText={(e) => setNewPassword(e)}
              value={newPassword}
            />
            <View style={styles.BtnContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  handleChangePassword();
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
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

const Home = (props) => {
  const Navigation = props.navigation.navigate;
  const dispatch = useDispatch();
  // const userInfoToken = useSelector((state) => state.userInfoToken);
  const sentMsgOnOff = useSelector((state) => state.sentMsgOnOff);
  const msgList = useSelector((state) => state.msgList);
  const phoneInfo = useSelector((state) => state.phoneInfo);
  const setting = useSelector((state) => state.setting);
  const userInfoToken = useSelector((state) => state.userInfoToken);
  // console.log("-->>UserINFO TOKEN>>>", userInfoToken?.userInfo?.mobile);
  const { userData } = appStore;
  const [modalVisible, setModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newMsgText, setNewMsgText] = useState("");
  const [btId, setBtId] = useState("");

  const [isEnabled, setIsEnabled] = useState(false);
  const [isPhNumExist, setIsPhNumExist] = useState(false);

  const [isBotList, setBotList] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [editItem, setEditItem] = useState({});

  const [message, setMessage] = useState({});
  const [sendMsgList, setSendMsgList] = useState([]);
  const [editStatus, setEditStatus] = useState(false);
  // const [editItem, setEditItem] = useState({});
  const [passwordStatus, setPasswordStaus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const isAlreadyLogin = async () => {
    let data = await LocalStorage.getAsynData("password");
    data == null && setModalVisible(false);

    // let userInfo = await LocalStorage.getAsynData("userInfoToken");
    // if (userInfo !== null) {
    //   console.log("---USER ASYN STORE INFO-->>", userInfo?.userInfo);
    // }
  };

  useFocusEffect(
    React.useCallback(() => {
      isGetMessage();
    }, [])
  );

  //get all permission read,write,send
  useEffect(() => {
    async function getAllPermission() {
      if (Platform.OS != "ios") {
        try {
          const userResponse = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
            PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
            PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
            PermissionsAndroid.PERMISSIONS.READ_SMS,
            PermissionsAndroid.PERMISSIONS.SEND_SMS,
          ]).then(() => {
            startStopListener();
          });
          // console.log({userResponse});
        } catch (err) {
          console.log("0->>>", err);
          // alert(JSON.stringify(err));
        }
      } else {
        alert(
          "Sorry! You can???t get call logs in iOS devices because of the security concern"
        );
      }
    }
    getAllPermission();
  }, []);

  // Get All Bot List
  useEffect(() => {
    isAlreadyLogin();
    isGetMessage();

    let subscription = SmsListener.addListener((message) => {
      setMessage(message);
      console.log("-->>>>Income message-->>", message);
    });

    return () => {
      subscription.remove();
    };
  }, [isRefresh]);

  const isGetMessage = async () => {
    try {
      setLoading(true);

      let data = await LocalStorage.getAsynData("login");
      if (data !== null) {
        if (data?.newBot == true) {
          console.log("--New Bot Id-->>> ", data?.botItem?._id);
          setBtId(data?.botItem?._id);
          getData(data?.botItem?._id);
        } else {
          console.log("--Existing Bot Id-->>> ", data?.botItem?.item?._id);
          setBtId(data?.botItem?.item?._id);
          getData(data?.botItem?.item?._id);
        }
      }
    } catch (e) {
      console.log("IS GET MESSAGE LIST-->>", e);
      setLoading(false);
    }
  };

  const getData = async (bt_id) => {
    try {
      setLoading(true);

      let result = await ApiClient.instance.get(
        ApiClient.endPoints.getBotByBtId(bt_id)
      );

      // console.log("---GET DATA BOAT>>>", result?.status, result?.data?.message);
      if (result.status == 201) {
        var messageSet = result?.data?.message;
        getReplyData(messageSet);
      } else {
        console.log("result.messages");
      }

      //   let result = await ApiClient.instance.get(
      //     ApiClient.endPoints.getBotById(bt_id)
      //   );

      //   console.log("---GET DATA BOAT>>>", result?.status, result?.data);

      //   if (result.status == 200) {
      //     setLoading(false);
      //     setBotList(result?.data?.message);
      //   } else {
      //     console.log("result.messages");
      //   }
      setLoading(false);
    } catch (e) {
      console.log("IS GET DATA LIST-->>", e);
      setLoading(false);
    }
  };

  const getReplyData = async (msgSetList) => {
    try {
      let result = await ApiClient.instance.get(
        ApiClient.endPoints.getCreateMsg
      );

      if (result.status == 201) {
        let replyData = result?.data?.message;
        setLoading(false);
        setAllDAta(msgSetList, replyData);
      } else {
        console.log("result.messages");
        setLoading(false);
      }
      setLoading(false);
    } catch (e) {
      console.log("API CALLING ERROR-->>", e);
    }
  };

  const setAllDAta = async (msgSet, rplyList) => {
    try {
      var msgSetList = [];
      msgSet.map((item) => {
        const { _id, btId, createdAt, mobile, role, title, updatedAt } = item;
        var reply = [];
        rplyList.map((itm) => {
          if (_id == itm?.botId) {
            reply.push({
              role: itm?.role,
              _id: itm?._id,
              messageTitle: itm?.messageTitle,
              botId: itm?.botId,
              createdAt: itm?.createdAt,
              updatedAt: itm?.updatedAt,
              __v: itm?.__v,
            });
          }
        });

        msgSetList.push({
          _id,
          btId,
          createdAt,
          mobile,
          role,
          title,
          updatedAt,
          messageSet: reply,
        });
      });
      setBotList(msgSetList);
    } catch (e) {
      console.log("Map Functionality", e);
    }
  };

  //create Bot function
  const handleCreateBot = async () => {
    try {
      handleToggle();
      let body = {
        title: newMsgText,
        mobile: "1234567890",
        btId: btId,
      };
      console.log("Body-->>", body);
      let result = await ApiClient.instance.post(
        ApiClient.endPoints.createBot,
        body
      );
      console.log("---CREATE BOAT>>>", result);

      if (result.status == 200) {
        // console.log("Created boat completed");
        // getData(btId);
        setIsRefresh(!isRefresh);
      } else if (result.status == 201) {
        console.log("--STAUS BOT Id>>", btId);
        // getData(btId);
        setIsRefresh(!isRefresh);
      } else {
        console.log(result?.message);
      }
      setNewMsgText("");
    } catch (e) {
      console.log("API Create Boat Calling-->>", e);
    }
  };

  //edit Bot function
  const handleEdit = async (item) => {
    // const{index,item,title}=item;

    handleToggle();
    setEditItem(item?.item);
    setEditStatus(true);
    setNewMsgText(item?.item?.title);

    // setEditItem(item?.item);
  };

  //Edit Boat text Api call
  const handleUpdateEdit = async (item) => {
    try {
      setEditStatus(false);
      handleToggle();

      let body = {
        title: newMsgText,
        mobile: item?.mobile,
      };
      let result = await ApiClient.instance.put(
        ApiClient.endPoints.updateBot(item?._id),
        body
      );
      if (result?.status == 201) {
        // console.log(result.data)
        setIsRefresh(!isRefresh);
      } else {
        console.log("MEssage Edit Error", result.status);
      }
      setEditItem({});
      setNewMsgText("");
    } catch (e) {
      console.log("Api Calling Error handleEdit", e);
    }
  };

  //Delete Bot by id call function
  const handleDelete = async (item) => {
    try {
      setLoading(true);
      console.log("item Delete-->>", item?._id);

      let result = await ApiClient.instance.delete(
        ApiClient.endPoints.deleteBot(item?._id)
      );

      if (result.status == 200) {
        setLoading(false);
        setIsRefresh(!isRefresh);
      } else if (result.status == 201) {
        setLoading(false);
        setIsRefresh(!isRefresh);
      } else {
        setLoading(false);
        console.log("---DELETE BOAT>>>", result.status);
      }
    } catch (e) {
      setLoading(false);

      console.log("Api calling error Delete Bot-->", e);
    }
  };

  //useEffect call when any missed call or message will come
  useEffect(() => {
    const setTimeoutVar = setTimeout(() => {
      if (sentMsgOnOff.value) {
        console.log("Setting-->>>", message?.timestamp);
        isStoreMsgInfo(message, phoneInfo, isBotList);
      } else {
        console.log("->>POWER OF AUTO SENT AUTO REPLY---->>>");
      }
    }, 1000);

    return () => {
      clearTimeout(setTimeoutVar);
    };
  }, [message]);

  const isStoreMsgInfo = async (msg, phoneInfo, messageList) => {
    try {
      if (msg.body !== undefined) {
        var phList = [...phoneInfo];
        var phNumExist = true;

        var Info = {
          body: msg.body,
          mobileNo: msg.originatingAddress,
          timestamp: msg.timestamp,
          passMessage: true,
          sendMsg: [],
          sendMsgCounter: 0,
        };

        phList.push(Info);

        phList.length !== 0 && dispatch(setPhoneInfo(phList));
        phList.length !== 0 &&
          (await LocalStorage.storeAsyncData("phNoList", phList));
        isAutoSendMessage(phList, Info, messageList);
      }
    } catch (e) {
      console.log("MESSAGE INFO STORE ERROR->>", e);
    }
  };

  const isAutoSendMessage = async (phList, Info, messageList) => {
    try {
      setTimeout(() => {
        var msgCounter = 0;
        for (let i = 0; i < phList.length; i++) {
          if (phList[i].mobileNo == Info.mobileNo) {
            msgCounter = msgCounter + 1;
          }
        }
        var msgNum = msgCounter == 1 ? 0 : msgCounter - 1;

        var randomMsgSet = messageList[msgNum].messageSet;
        console.log("--RANDOM MESSAGE SSET->", msgNum, messageList);
        const randomMessageFromSet =
          randomMsgSet[Math.floor(Math.random() * randomMsgSet.length)];

        const sendMessage = randomMessageFromSet?.messageTitle;
        var message =
          sendMessage !== undefined ? sendMessage : setting?.msgText;
        console.log("MESSAGE SSEND-->>>>>", message, setting?.delayResponse);
        SmsAndroid.autoSend(
          JSON.stringify(Info.mobileNo),
          JSON.stringify(message),
          (fail) => {
            console.log("Failed with this error: " + fail);
          },
          (success) => {
            console.log("SMS sent successfully");
          }
        );
        msgCounter = 0;

        setTimeout(() => {
          isInActiveTimeSend(phList, Info);
        }, Number(setting?.inactiveTimer) * 60 * 1000);
      }, Number(setting?.delayResponse) * 1000);
    } catch (e) {
      console.log("AUTO SEND MESSAGE", e);
    }
  };

  const isInActiveTimeSend = async (phList, Info) => {
    try {
      var timer =
        setting?.inactiveTimer == 1
          ? "a minute ago"
          : `${setting?.inactiveTimer} minutes ago`;

      for (let i = 0; i < phList.length; i++) {
        console.log(
          "ISEND MESSAGE-->> INACTIVE TIMER",
          moment(new Date(phList[i]?.timestamp)).fromNow(),
          timer
        );
        // if (phList[i].mobileNo == Info.mobileNo) {
        if (moment(new Date(phList[i]?.timestamp)).fromNow() == timer) {
          SmsAndroid.autoSend(
            JSON.stringify(phList[i].mobileNo),
            JSON.stringify(setting?.msgText),
            (fail) => {
              console.log("Failed with this error: " + fail);
            },
            (success) => {
              console.log("SMS sent successfully");
            }
          );
        }
        // }
      }
    } catch (e) {
      console.log("iS InActive Timer error", e);
    }
  };

  const startStopListener = () => {
    callDetector = new CallDetectorManager(
      (event, number) => {
        if (event === "Disconnected") {
          console.log("DISCONNECTED", number);
          // Do something call got disconnected
        } else if (event === "Connected") {
          console.log("CONNECTED", number);
          // Do something call got connected
          // This clause will only be executed for iOS
        } else if (event === "Incoming") {
          console.log("Incoming", number);
          // Do something call got incoming
        } else if (event === "Dialing") {
          console.log("DIALING", number);
          // Do something call got dialing
        } else if (event === "Offhook") {
          console.log("OFFHOOK", number);
          //Device call state: Off-hook.
        } else if (event === "Missed") {
          console.log("MISSED", number);

          CallLogs.load(1)
            .then((c) => {
              console.log("Missed Number-->>>>", number, c[0]);
              let message = {
                body: `You have a missed call by this number ${number}`,
                originatingAddress: number,
                timestamp: c[0]?.timestamp,
              };
              console.log("MIssed call informTION BODY MAKE IT--<<<", message);
              setMessage(message);
            })
            .catch((err) => console.log(err));
        }
      },
      true, // To detect incoming calls [ANDROID]
      () => {
        // If your permission got denied [ANDROID]
        // Only if you want to read incoming number
        // Default: console.error
        // console.log("Permission Denied by User");
      },
      {
        title: "Phone State Permission",
        message:
          "This app needs access to your phone state in order to react and/or to adapt to incoming calls.",
      }
    );
  };

  const handleAddNewMsgSet = async () => {
    try {
      if (newMsgText !== "") {
        if (editStatus) {
          isEditSetName();
        } else {
          var arr = [...msgList];
          var recordExist = false;
          arr.map((item) => {
            if (item.id == msgList.length + 1) {
              recordExist = true;
            }
          });

          var body = {};
          if (recordExist) {
            body = {
              id: new Date().valueOf(),
              title: newMsgText,
              msg: [
                {
                  msgReply: `Msg set ${msgList.length + 1} Reply 1`,
                },
              ],
            };
          } else {
            body = {
              id: msgList.length + 1,
              title: newMsgText,
              msg: [
                {
                  msgReply: `Msg set ${msgList.length + 1} Reply 1`,
                },
              ],
            };
          }

          arr.push(body);
          setSendMsgList([...arr]);
          dispatch(setMsgList(arr));
          LocalStorage.storeAsyncData("msgList", arr);
          setNewMsgText("");
          recordExist = false;
        }
      }
      setIsAddModalVisible(!isAddModalVisible);
    } catch (e) {
      console.log("Add new Message set", e);
    }
  };

  const isEditSetName = async () => {
    try {
      const list = [...msgList];
      var updateList = [];
      list.map((item) => {
        if (item?.id == editItem?.id) {
          let body = {
            id: item?.id,
            title: newMsgText,
            msg: item?.msg,
          };

          updateList.push(body);
        } else {
          updateList.push(item);
        }
      });

      setSendMsgList([...updateList]);
      dispatch(setMsgList(updateList));
      LocalStorage.storeAsyncData("msgList", updateList);
      setNewMsgText("");
      setEditStatus(false);
    } catch (e) {
      console.log("Is Edit SET NAME", e);
    }
  };

  const handleChangePassword = async () => {
    try {
      let body = {
        email,
        newPassword,
        oldPassword,
      };

      let result = await ApiClient.instance.post(
        ApiClient.endPoints.changePassword,
        body
      );
      console.log(
        "---PASSWORD CHANGE BOAT>>>",
        result.status,
        result?.data?.message
      );

      if (result.status == 200) {
        console.log("++++++++>>", result?.data?.message);

        setBotList(result?.data?.message);
      } else {
        console.log("result.messages");
      }
      setLoading(false);
    } catch (e) {
      console.log("Api Calling Error", e);
    }
  };

  //text box pop up toggle
  const handleToggle = () => {
    setIsAddModalVisible(!isAddModalVisible);
  };

  return (
    <>
      <MainHeader
        {...{ Navigation }}
        // onPressPassword={() => {
        //   setModalVisible(!modalVisible);
        //   setPasswordStaus(true);
        // }}
      />
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#C4C4C4"
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        />
      ) : (
        <View style={styles.mainContent}>
          <ModalPopUp
            handleChangePassword={handleChangePassword}
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            email={email}
            setEmail={setEmail}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            oldPassword={oldPassword}
            setOldPassword={setOldPassword}
            passwordStatus={passwordStatus}
          />
          <View
            style={{
              height: "100%",
              backgroundColor: "rde",
            }}
          >
            {isBotList.length == 0 && (
              <View style={styles.imageView}>
                <Image
                  style={styles.tinyLogo}
                  source={require("../Utils/Assets/NoRecord1.png")}
                />
                <Text style={styles.msgText}>Add new messages</Text>
              </View>
            )}
            <FlatList
              showsVerticalScrollIndicator={false}
              data={isBotList}
              renderItem={(item, index) => (
                <RenderItem
                  item={item}
                  index={index}
                  handleDelete={handleDelete}
                  Navigation={Navigation}
                  handleEdit={handleEdit}
                />
              )}
            />
          </View>

          <View>
            <FAB
              style={styles.fab}
              icon="plus"
              onPress={() => setIsAddModalVisible(!isAddModalVisible)}
            />
          </View>

          <IsAddMsgModal
            handleToggle={handleToggle}
            isAddModalVisible={isAddModalVisible}
            setIsAddModalVisible={setIsAddModalVisible}
            newMsgText={newMsgText}
            setNewMsgText={setNewMsgText}
            handleAddNewMsgSet={handleAddNewMsgSet}
            handleCreateBot={handleCreateBot}
            editItem={editItem}
            handleUpdateEdit={handleUpdateEdit}
            editStatus={editStatus}
          />
        </View>
      )}
    </>
  );
};

export default observer(Home);

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
  imageView: {
    marginVertical: getHp(80),
    justifyContent: "center",
    alignItems: "center",
  },
  tinyLogo: {
    width: 350,
    height: 250,
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
  deleteBox: {
    height: getHp(10),
    width: getWp(50),
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
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
  buttonOpen: {
    backgroundColor: "#F194FF",
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
  msgText: {
    marginTop: getHp(30),
    textAlign: "center",
    fontSize: FONTSIZE.Text24,
    color: "#b3b3b3",
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 16,
    backgroundColor: "#707070",
  },
  seperatorLine: {
    height: getHp(5),
    backgroundColor: "black",
  },
});
