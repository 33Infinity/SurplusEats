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

exports.add = notification_functions.https.onRequest(
  async (request: any, response: any) => {
    return notification_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const resp = await NotificationBO.add(
        notification_admin,
        data.NotificationId,
        data.Email,
        data.Subject,
        data.Message,
        data.MarkedAsRead
      );
      response.send(resp);
    });
  }
);

exports.update = notification_functions.https.onRequest(
  async (request: any, response: any) => {
    return notification_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const resp = await NotificationBO.update(
        notification_admin,
        data.NotificationId,
        data.Email,
        data.Subject,
        data.Message,
        data.MarkedAsRead,
        data.Id,
        data.CreatedDate
      );
      response.send(resp);
    });
  }
);

exports.delete = notification_functions.https.onRequest(
  async (request: any, response: any) => {
    return notification_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const resp = await NotificationBO.delete(
        notification_admin,
        data.NotificationId
      );
      response.send(resp);
    });
  }
);
