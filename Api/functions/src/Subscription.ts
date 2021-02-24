"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscription_functions = require("firebase-functions");
const subscription_admin = require("firebase-admin");
const subscription_cors = require("cors")({
  origin: true,
});

import SubscriptionBO from "./bo/Subscription";

exports.add = subscription_functions.https.onRequest(
  async (request: any, response: any) => {
    return subscription_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const resp = await SubscriptionBO.add(
        subscription_admin,
        data.Email,
        data.InventoryId
      );
      response.send(resp);
    });
  }
);

exports.delete = subscription_functions.https.onRequest(
  async (request: any, response: any) => {
    return subscription_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const resp = await SubscriptionBO.delete(subscription_admin, data.Id);
      response.send(resp);
    });
  }
);
