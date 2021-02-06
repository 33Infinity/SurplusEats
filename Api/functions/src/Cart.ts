"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cart_functions = require("firebase-functions");
const cart_admin = require("firebase-admin");
const cart_cors = require("cors")({
  origin: true,
});

import HttpHelper from "./utils/HttpHelper";
import CartBO from "./bo/Cart";

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
