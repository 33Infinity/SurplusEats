export default class StringUtils {
  static capitalizeFirstLetter(aValue) {
    return aValue.charAt(0).toUpperCase() + aValue.slice(1);
  }

  static nullOrEmpty(aValue) {
    if (typeof aValue != "undefined" && aValue) return false;
    return true;
  }

  static valueOrDefault(aValue, aDefaultValue) {
    if (aValue === null || aValue === "") return aDefaultValue;
    return aValue;
  }
}
