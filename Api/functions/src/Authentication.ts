"use strict";
const authentication_functions = require("firebase-functions");
const authentication_admin = require("firebase-admin");
const authentication_cors = require("cors")({
  origin: true,
});

import Encryption from "./utils/Encryption";
import AuthenticationBO from "./bo/Authentication";

exports.register = authentication_functions.https.onRequest(
  async (request: any, response: any) => {
    return authentication_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const resp = await AuthenticationBO.Register(
        authentication_admin,
        data.Profile.Email,
        data.Vendor,
        data.Profile,
        data.Vendor?.Name
      );
      response.send(resp);
    });
  }
);

exports.signIn = authentication_functions.https.onRequest(
  async (request: any, response: any) => {
    return authentication_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const profile = await AuthenticationBO.signIn(
        authentication_admin,
        data.Email,
        Encryption.encrypt(data.Password)
      );
      response.send(profile);
    });
  }
);

exports.getProfile = authentication_functions.https.onRequest(
  async (request: any, response: any) => {
    return authentication_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const profile = await AuthenticationBO.getProfile(
        authentication_admin,
        data.Email
      );
      response.send(profile);
    });
  }
);
