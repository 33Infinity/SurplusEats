export default class HttpHelper {
  static buildResponse(anObject) {
    return JSON.stringify(
      anObject.docs.map((doc) => {
        let ret = doc.data();
        ret.Id = doc.id;
        return ret;
      })
    );
  }
}
