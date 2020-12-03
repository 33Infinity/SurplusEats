"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.auth = require("./auth");
exports.inventory = require("./inventory");
admin.initializeApp();
/* const auth = require("./auth");
const inventory = require("./inventory");
const triggers = {
  auth,
  inventory,
};
exports.trig = triggers; */
