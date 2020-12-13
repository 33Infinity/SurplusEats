+"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inventory_functions = require("firebase-functions");
const inventory_admin = require("firebase-admin");
const inventory_cors = require("cors")({
  origin: true,
});

exports.getByLocation = inventory_functions.https.onRequest(
  async (request: any, response: any) => {
    return inventory_cors(request, response, async () => {
      const inventory = await inventory_admin
        .firestore()
        .collection("inventory")
        .get();
      response.send(JSON.stringify(inventory.docs.map((doc) => doc.data())));
    });
  }
);
