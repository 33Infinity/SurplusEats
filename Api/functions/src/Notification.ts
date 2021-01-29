"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notification_functions = require("firebase-functions");
const notification_admin = require("firebase-admin");
const notification_cors = require("cors")({
  origin: true,
});

import NotificationDAO from "./datastore/dao/Notification";
import HttpHelper from "./utils/HttpHelper";

exports.getByEmail = notification_functions.https.onRequest(
  async (request: any, response: any) => {
    return notification_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const email = data.Email;
      const notifications = await NotificationDAO.getByEmail(
        notification_admin,
        email
      );
      response.send(HttpHelper.buildResponse(notifications));
    });
  }
);
