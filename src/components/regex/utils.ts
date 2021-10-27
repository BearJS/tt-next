// https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
export const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const oneUpperCaseRegex = /^(?=.*?[A-Z])/;
export const oneLowerCaseRegex = /^(?=.*?[a-z])/;
export const oneDigitRegex = /^(?=.*?[0-9])/;
export const oneSpecialCharacterRegex = /^(?=.*?[#?!@$%^&*-])/;
export const minimumLength8Regex = /^.{8,}/;
