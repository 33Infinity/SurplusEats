"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vendor_functions = require("firebase-functions");
const vendor_admin = require("firebase-admin");
const vendor_cors = require("cors")({
  origin: true,
});

import VendorDAO from "./datastore/dao/Vendor";
import VendorTO from "./datastore/to/Vendor";
import Error from "./Error";
import Constants from "./Constants";
import HttpHelper from "./utils/HttpHelper";

exports.getByEmail = vendor_functions.https.onRequest(
  async (request: any, response: any) => {
    return vendor_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const email = data.Email;
      const vendor = await VendorDAO.getByEmail(vendor_admin, email);
      if (vendor == null || vendor.length == 0) {
        const error = Error.NewError(
          Constants.Error.VENDOR_DOES_NOT_EXIST,
          "500"
        );
        response.status(500).send(error);
        return;
      }
      response.send(HttpHelper.buildResponse(vendor));
    });
  }
);

exports.update = vendor_functions.https.onRequest(
  async (request: any, response: any) => {
    return vendor_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const vendorTO = VendorTO.NewVendor(
        data.Name,
        data.Name,
        data.ImageUrl,
        data.Description,
        data.Id,
        data.CreatedDate
      );
      const resp = await VendorDAO.update(
        vendor_admin,
        data.Id,
        vendorTO.getTuple()
      );
      response.send(resp);
    });
  }
);
