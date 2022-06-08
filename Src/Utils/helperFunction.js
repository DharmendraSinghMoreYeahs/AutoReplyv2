import Toast from 'react-native-toast-message';

const showError = (message = 'Error', position = 'bottom') => {
  console.log(position);
  Toast.show({
    text1: message,
    type: 'error',
    position: position,
  });
};

const showSuccess = (message = 'Success', position = 'bottom') => {
  Toast.show({
    text1: message,
    type: 'success ',
    position: position,
  });
};

export {showError, showSuccess};
