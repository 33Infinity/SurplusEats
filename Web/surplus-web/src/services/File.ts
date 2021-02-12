import firebase from "../firebase/firebase.utils";

export default class File {
  static async add(aFile, aStringToAppend): Promise<string> {
    if (aFile == null || aFile === "") return "";
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(aStringToAppend + "_" + aFile.name);
    await fileRef.put(aFile);
    const fileUrl = await fileRef.getDownloadURL();
    return fileUrl;
  }

  static async delete(aUrl) {
    if (aUrl == null || aUrl === "") return;
    const storageRef = firebase.storage().refFromURL(aUrl);
    await storageRef.delete();
  }
}
