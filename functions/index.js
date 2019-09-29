const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const engines = require("consolidate");
const serviceAccount = require("./serviceAccountKey.json");

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fire-express-aec20.firebaseio.com"
});
const database = firebaseApp.database();
function getFacts() {
  return ref.once("value").then(snap => {
    console.log(snap.DataSnapshot);
    snap.val();
  });
}

const app = express();

app.get("/a", (req, res) => {
  res.set("Cache-Control", "public,max-age=300,s-maxage=600");
  //   console.log("hello");
  var usersRef = database.ref("users");
  // Create a new ref and log it’s push key
  var userRef = usersRef.push();

  // Create a new ref and save data to it in one step
  var userRef = usersRef.push({
    name: "Amine",
    description: "i love bjj"
  });
});

app.get("/get.json", (req, res) => {
  res.set("Cache-Control", "public,max-age=300,s-maxage=600");
  //   console.log("hello");
  // var usersRef = ref.child("users");
  // // Create a new ref and log it’s push key
  // usersRef.push();

  // // Create a new ref and save data to it in one step
  // usersRef.push({
  //   name: "Christopher",
  //   description: "I eat too much ice cream"
  // });

  let ref = database.ref("users");

  let gotData = data => {
    data = data.val();
    let keys = Object.keys(data);
    // keys.map(k => {
    //   console.log("hello", data[k]);
    //   res.json(data[k]);
    // });
    // data.keys.map(da => {
    //   console.log(da);
    // });
  };
  let errData = error => {
    console.log(error.message, error.code);
  };

  ref.on("value", gotData, errData);
});

exports.app = functions.https.onRequest(app);
