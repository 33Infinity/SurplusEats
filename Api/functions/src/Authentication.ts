"use strict";
const authentication_functions = require("firebase-functions");
const authentication_admin = require("firebase-admin");
const authentication_cors = require("cors")({
  origin: true,
});
import ProfileDAO from "./datastore/dao/Profile";
import VendorDAO from "./datastore/dao/Vendor";
import Error from "./Error";
import Constants from "./Constants";
import Encryption from "./utils/Encryption";

exports.register = authentication_functions.https.onRequest(
  async (request: any, response: any) => {
    return authentication_cors(request, response, async () => {
      let resp;
      try {
        const data = JSON.parse(request.body);
        const email = data.Profile.Email;
        const vendorName = data.Vendor?.Name;
        const profile = await ProfileDAO.getByEmail(
          authentication_admin,
          email
        );
        if (profile !== null && profile.length > 0) {
          const error = Error.NewError(
            Constants.Error.PROFILE_ALREADY_EXISTS,
            "500"
          );
          response.status(500).send(error);
          return;
        }
        if (vendorName != null) {
          const vendor = await VendorDAO.getByName(
            authentication_admin,
            vendorName
          );
          if (vendor !== null && vendor.length > 0) {
            const error = Error.NewError(
              Constants.Error.VENDOR_ALREADY_EXISTS,
              "500"
            );
            response.status(500).send(error);
            return;
          }
          await VendorDAO.add(authentication_admin, data.Vendor, email);
        }
        resp = await ProfileDAO.add(authentication_admin, data.Profile);
      } catch (exception) {
        const error = Error.NewError(
          Constants.Error.UNKNOWN_SERVER_ERROR,
          "500"
        );
        response.status(500).send(error);
        return;
      }
      response.send(resp);
    });
  }
);

exports.signIn = authentication_functions.https.onRequest(
  async (request: any, response: any) => {
    return authentication_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const email = data.Email;
      const password = Encryption.encrypt(data.Password);
      const profile = await ProfileDAO.getByUserNamePassword(
        authentication_admin,
        email,
        password
      );
      if (profile === null && profile.length === 0) {
        const error = Error.NewError(
          Constants.Error.INVALID_CREDENTIALS,
          "500"
        );
        response.status(500).send(error);
        return;
      }
      profile.IsAuthenticated = true;
      response.send(profile);
    });
  }
);

exports.getProfile = authentication_functions.https.onRequest(
  async (request: any, response: any) => {
    return authentication_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const email = data.Email;
      const profile = await ProfileDAO.getByEmail(authentication_admin, email);
      if (profile === null && profile.length === 0) {
        const error = Error.NewError(
          Constants.Error.INVALID_CREDENTIALS,
          "500"
        );
        response.status(500).send(error);
        return;
      }
      response.send(profile);
    });
  }
);
