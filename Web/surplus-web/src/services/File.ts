import FileRequest from "../requests/File";

export default class File {
  async saveFile(aFile): Promise<boolean | null> {
    const request = new FileRequest();
    const json = await request.saveFile(aFile);
    return true;
  }
}
