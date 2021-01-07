"use strict";
const auth_functions = require("firebase-functions");
const auth_admin = require("firebase-admin");
const auth_cors = require("cors")({
  origin: true,
});

exports.createUser = auth_functions.https.onRequest(
  async (request: any, response: any) => {
    return auth_cors(request, response, async () => {
      ///const data = JSON.parse(request.body);
      //const resp = AuthDAO.add(auth_admin, data);
      //response.send(resp);
    });
  }
);

exports.login = auth_functions.https.onRequest(
  (request: any, response: any) => {
    /* admin.firestore().collection('users').add({username: "test1"}).then(writeResult => {
            functions.logger.info(writeResult, {structuredData: true});
        }).catch(() => {console.log("Error writing")}); */
    //functions.logger.info("Hello logs!", {structuredData: true});
    response.send("login");
  }
);
exports.logout = auth_functions.https.onRequest(
  (request: any, response: any) => {
    /* admin.firestore().collection('users').add({username: "test1"}).then(writeResult => {
        functions.logger.info(writeResult, {structuredData: true});
    }).catch(() => {console.log("Error writing")}); */
    //functions.logger.info("Hello logs!", {structuredData: true});
    response.send("logout");
  }
);
exports.register = auth_functions.https.onRequest(
  (request: any, response: any) => {
    /* admin.firestore().collection('users').add({username: "test1"}).then(writeResult => {
        functions.logger.info(writeResult, {structuredData: true});
    }).catch(() => {console.log("Error writing")}); */
    //functions.logger.info("Hello logs!", {structuredData: true});
    response.send("register");
  }
);
