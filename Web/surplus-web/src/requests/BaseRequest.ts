import {ErrorModel} from "../../../../Models/ErrorModel";
import axios from 'axios';

export default class BaseRequest {
    async getJson(url) {
      try {
          axios.get(url).then(response=>{
            if (response.data.ErrorMessage != null) {
                return ErrorModel.NewError(response.statusText);
              }
              return response.data;
          })
      } catch (exception) {
        return ErrorModel.NewError(exception);
      }
    }
}