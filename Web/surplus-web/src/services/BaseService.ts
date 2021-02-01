export default class BaseService {
  isApiError(someJson) {
    return someJson != null && someJson.ErrorMessage != null;
  }
}
