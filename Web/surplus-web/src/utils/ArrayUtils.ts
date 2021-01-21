export default class ArrayUtils {
  static firstOrDefault(anArray, aPropertyName, aDefaultValue) {
    return anArray && anArray.length > 0 && anArray[0]
      ? anArray[0][aPropertyName]
      : aDefaultValue;
  }

  static objectToArrary(anObject) {
    let arr: any[] = [];
    arr.push(anObject);
    return arr;
  }
}
