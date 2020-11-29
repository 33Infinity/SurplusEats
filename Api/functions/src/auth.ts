"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_functions = require("firebase-functions");
//import * as admin from 'firebase-admin';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
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
