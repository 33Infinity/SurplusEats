"use strict";
const authentication_functions = require("firebase-functions");
const authentication_admin = require("firebase-admin");
const authentication_cors = require("cors")({
  origin: true,
});
import ProfileDAO from "./datastore/DAO/Profile";
import Error from "./Error";
import Constants from "./Constants";

exports.register = authentication_functions.https.onRequest(
  async (request: any, response: any) => {
    return authentication_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const email = data.Email;
      const profile = await ProfileDAO.getByEmail(authentication_admin, email);
      if (profile !== null && profile.length > 0) {
        const error = Error.NewError(
          Constants.Error.PROFILE_ALREADY_EXISTS,
          "500"
        );
        response.status(500).send(error);
        return;
      }
      const resp = await ProfileDAO.add(authentication_admin, data);
      response.send(resp);
    });
  }
);
