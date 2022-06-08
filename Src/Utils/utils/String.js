import RegexCollection from "./regexCollection";

class Strings {
  //validation Name regex function
  static validateName = (name) => {
    const regNoSpace = RegexCollection.SpaceString;
    return regNoSpace.test(String(name));
  };

  //validation Email regex function
  static validateEmail = (email) => {
    const regEmail = RegexCollection.Email;
    return regEmail.test(String(email).toLowerCase());
    // return true or false
  };

  //validation Password regex function
  static validatePassword = (pwd) => {
    const regPassword = RegexCollection.PasswordLowerUpper;
    return regPassword.test(String(pwd));
    // return true or false
  };

  //validation Designation regex function
  static validateNumber = (num) => {
    const regStrings = RegexCollection.Number;
    return regStrings.test(String(num));
    // return true or false
  };
}

export default Strings;
