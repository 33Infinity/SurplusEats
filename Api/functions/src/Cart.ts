"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cart_functions = require("firebase-functions");
const cart_admin = require("firebase-admin");
const cart_cors = require("cors")({
  origin: true,
});

import HttpHelper from "./utils/HttpHelper";
import CartBO from "./bo/Cart";

exports.add = cart_functions.https.onRequest(
  async (request: any, response: any) => {
    return cart_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const resp = await CartBO.add(
        cart_admin,
        data.InventoryId,
        data.Email,
        data.Price,
        data.ImageUrl,
        data.MarkedAsRead,
        data.InventoryDescription
      );
      response.send(resp);
    });
  }
);

exports.getByEmail = cart_functions.https.onRequest(
  async (request: any, response: any) => {
    return cart_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const email = data.Email;
      const cartItems = await CartBO.getByEmail(cart_admin, email);
      response.send(HttpHelper.buildResponse(cartItems));
    });
  }
);
