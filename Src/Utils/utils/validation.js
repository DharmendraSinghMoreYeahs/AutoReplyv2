const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const PASS_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/

export const validateEmail = (email) => {
    console.log("email--->", email);
    return EMAIL_REGEX.test(email);
}

export const validatePass = (password) => {
    console.log("password--->", password);
    return PASS_REGEX.test(password);
}


