"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notification_functions = require("firebase-functions");
const notification_admin = require("firebase-admin");
const notification_cors = require("cors")({
  origin: true,
});

import HttpHelper from "./utils/HttpHelper";
import NotificationBO from "./bo/Notification";

exports.getByEmail = notification_functions.https.onRequest(
  async (request: any, response: any) => {
    return notification_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const email = data.Email;
      const notifications = await NotificationBO.getByEmail(
        notification_admin,
        email
      );
      response.send(HttpHelper.buildResponse(notifications));
    });
  }
);
