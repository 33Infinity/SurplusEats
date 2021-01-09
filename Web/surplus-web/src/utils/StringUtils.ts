export default class StringUtils {
  static valueOrDefault(aValue, aDefaultValue) {
    if (aValue === null || aValue === "") return aDefaultValue;
    return aValue;
  }
}
