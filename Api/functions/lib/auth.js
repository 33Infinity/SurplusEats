"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = void 0;
const functions = require("firebase-functions");
//import * as admin from 'firebase-admin';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.login = functions.https.onRequest((request, response) => {
    /* admin.firestore().collection('users').add({username: "test1"}).then(writeResult => {
        functions.logger.info(writeResult, {structuredData: true});
    }).catch(() => {console.log("Error writing")}); */
    //functions.logger.info("Hello logs!", {structuredData: true});
    response.send("login");
});
exports.logout = functions.https.onRequest((request, response) => {
    /* admin.firestore().collection('users').add({username: "test1"}).then(writeResult => {
        functions.logger.info(writeResult, {structuredData: true});
    }).catch(() => {console.log("Error writing")}); */
    //functions.logger.info("Hello logs!", {structuredData: true});
    response.send("logout");
});
//# sourceMappingURL=auth.js.map