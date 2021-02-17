import StringUtils from "./StringUtils";

export default class AddressUtils {
  static format(aCity, aState, anAddress, aPostalCode) {
    if (
      StringUtils.nullOrEmpty(aCity) ||
      StringUtils.nullOrEmpty(aState) ||
      StringUtils.nullOrEmpty(anAddress) ||
      StringUtils.nullOrEmpty(aPostalCode)
    )
      return "";
    return `${anAddress} ${aCity}, ${aState} ${aPostalCode}`;
  }
}
