export default class Encryption {
  static encrypt(aValue) {
    var crypto = require("crypto");
    return crypto.createHash("md5").update(aValue).digest("hex");
  }
}
