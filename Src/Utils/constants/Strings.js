export default class Strings {
  static permissionContact = {
    title: 'Contacts',
    message: 'The Bounce app would like to view your contacts.',
    buttonPositive: 'Please accept permission',
  };
  static requiredFieldError = (title = '') => {
    return `Required ${title}`;
  };
  static minimumFieldError = (title = '', len = 0) => {
    return `${title} length should be ${len}`;
  };
}
