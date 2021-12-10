const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp()
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


exports.getAllEmployedScheaduled = functions.pubsub.schedule('0 0 1 */2 *')
  .timeZone('Europe/London'
  .onRun((context) => {
    const associatesRef = admin.firestore().collection("Associates")
    const totalAssociatesRef = admin.firestore().collection("TotalAssociatesChart")
    let total = 0

    associatesRef.where("EmplStatus","==","Employed").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            total +=1
        })
    }).finally(() => {
        totalAssociatesRef.doc().set({
        Date: admin.firestore.Timestamp.now(),
        Total: Number(total)
    })
    })
  return null;
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