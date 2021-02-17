import StringUtils from "./StringUtils";

export default class PhoneUtils {
  static format(aPhoneArea, aPhoneNumber) {
    if (
      StringUtils.nullOrEmpty(aPhoneArea) ||
      StringUtils.nullOrEmpty(aPhoneNumber)
    )
      return "";
    return `(${aPhoneArea}) ${aPhoneArea.substr(0, 3)}-${aPhoneNumber.substr(
      3,
      7
    )}`;
  }
}
