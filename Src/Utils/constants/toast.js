import { Toast as NToast } from 'native-base';
import { StyleSheet } from 'react-native';
import { getWp } from '../utils';

const ToastUtil = (text = '', prop = {}) => {
  return NToast.show({
    text: text,
    duration: 1000,
    style: style.toastStyle,
    position: "bottom",
    ...prop,
  });
};

const style = StyleSheet.create({
  toastStyle: {
    width: '90%',
    justifyContent:'center',
    alignSelf: 'center',
    bottom: 80,
    borderRadius: 25, 
  },
});
export default ToastUtil;
