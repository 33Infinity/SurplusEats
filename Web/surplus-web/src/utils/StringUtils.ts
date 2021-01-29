export default class StringUtils {
  static valueOrDefault(aValue, aDefaultValue) {
    if (aValue === null || aValue === "") return aDefaultValue;
    return aValue;
  }

  static nullOrEmpty(aValue) {
    if (typeof aValue != "undefined" && aValue) return false;
    return true;
  }
}
