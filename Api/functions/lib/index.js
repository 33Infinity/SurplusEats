"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
exports.auth = require("./auth");
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    /* admin.firestore().collection('users').add({username: "test1"}).then(writeResult => {
        functions.logger.info(writeResult, {structuredData: true});
    }).catch(() => {console.log("Error writing")}); */
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase typescript!");
});
//# sourceMappingURL=index.js.map