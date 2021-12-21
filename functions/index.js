const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.getAllEmployedScheaduled = functions.pubsub
  .schedule("0 0 1 */2 *")
  .timeZone(
    "Europe/London").onRun((context) => {
      const associatesRef = admin.firestore().collection("Associates");
      const totalAssociatesRef = admin
        .firestore()
        .collection("TotalAssociatesChart");
      let total = 0;

      associatesRef
        .where("EmplStatus", "==", "Employed")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            total += 1;
          });
        })
        .finally(() => {
          totalAssociatesRef.doc().set({
            Date: admin.firestore.Timestamp.now(),
            Total: Number(total),
          });
        });
      return null;
    });
  

exports.ChangeTitle = functions.database
  .ref("/Tasks/{user}/MyTasks/{task}/{approvers}/{approver}/status")
  .onUpdate((change, context) => {
    if (change.before.exists()) {
      return null;
    }
    // Exit when the data is deleted.
    if (!change.after.exists()) {
      return null;
    }

    const original = change.after.val()
    functions.logger.log("Uppercasing", context, original);
    functions.logger.log("Uppercasing", original);
// const db = admin.database()
//   const reff = db.ref("Tasks/3bOT8x1SBesW3l9jVQmV/MyTasks/-MrNOML489WlD3Mo7kuy")
//    return reff.once("value", function(snapshot) {
//     functions.logger.log(snapshot.val());
//   });
  


  
    // const uppercase = original.toUpperCase();
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    // return snapshot.ref.parent.child('uppercase').set(uppercase);
  });
// exports.getAllEmployedScheaduled = functions.https.onRequest((request, response) => {

//     const associatesRef = admin.firestore().collection("Associates")
//     const totalAssociatesRef = admin.firestore().collection("TotalAssociatesChart")
//     let total = 0

//     associatesRef.where("EmplStatus","==","Employed").get().then(querySnapshot => {
//         querySnapshot.forEach(doc => {
//             total +=1
//         })
//     }).finally(() => {
//         totalAssociatesRef.doc().set({
//         Date: admin.firestore.Timestamp.now(),
//         Total: Number(total)
//     })
//     })

//   });
// totalAssociatesRef.doc().set({
//     Date: admin.firestore.Timestamp.now(),
//     Total: Number("25")
// })
// associatesRef.doc().set({
//     FirstName:"Markkkk"
// })

// functions.logger.info("total",qq, {structuredData: true});
