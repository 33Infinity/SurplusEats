import {ErrorModel} from "../../../../Models/ErrorModel";
//import BaseModel from "../../../../Models/BaseModel";
import axios from 'axios';

export default class BaseRequest {
    async getJson(aUrl, aModel) {
      //let body = JSON.stringify(aModel);
      try {
          axios.get(aUrl, aModel,
          ).then(response=>{
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