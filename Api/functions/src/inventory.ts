"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inventory_functions = require("firebase-functions");
const inventory_admin = require("firebase-admin");
import InventoryModel from "../../../Models/Inventory";

exports.getByLocation = inventory_functions.https.onRequest(
  async (request: any, response: any) => {
    const inventory = await inventory_admin
      .firestore()
      .collection("inventory")
      .get();
    const inventoryModels: InventoryModel[] = [];
    inventory.forEach(function (doc) {
      const data = doc.data();
      const currentInventory = InventoryModel.NewInventory(
        data.Description,
        data.Price,
        data.Quantity
      );
      inventoryModels.push(currentInventory);
      console.log(doc.id, "=>", doc.data());
    });
    response.send(JSON.stringify(inventoryModels));
  }
);
