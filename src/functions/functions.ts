import { createResource } from "solid-js";
import { doc, Firestore, getDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import admin from "firebase-admin";
import functions from "firebase-functions";
import axios from "axios";

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
// export const addMessage = functions.https.onRequest(async (req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text;
//   // Push the new message into Firestore using the Firebase Admin SDK.
//   const writeResult = await admin
//     .firestore()
//     .collection("messages")
//     .add({ original: original });
//   // Send back a message that we've successfully written the message
//   res.json({ result: `Message with ID: ${writeResult.id} added.` });
// });

// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
// export const makeUppercase = functions.firestore
//   .document("/messages/{documentId}")
//   .onCreate((snap, context) => {
//     // Grab the current value of what was written to Firestore.
//     const original = snap.data().original;

//     // Access the parameter `{documentId}` with `context.params`
//     functions.logger.log("Uppercasing", context.params.documentId, original);

//     const uppercase = original.toUpperCase();

//     // You must return a Promise when performing asynchronous tasks inside a Functions such as
//     // writing to Firestore.
//     // Setting an 'uppercase' field in Firestore document returns a Promise.
//     return snap.ref.set({ uppercase }, { merge: true });
//   });

export const authenticateWithWaniKani = (token: string) => {};

// TODO: Refactor
export const getAllReviewStatistics = async (
  db: Firestore,
  user: User | null,
  url?: string
) => {
  const docRef = doc(db, "users", `${user?.uid}`);
  const userData = (await getDoc(docRef)).data();
  if (userData) {
    const res = await axios({
      headers: { Authorization: `Bearer ${userData.wk_token}` },
      method: "get",
      url: url ?? "https://api.wanikani.com/v2/review_statistics",
    });
    const stats = res.data;
    let data = stats.data;
    if (stats?.pages?.next_url) {
      data = [
        ...data,
        ...(await getAllReviewStatistics(db, user, stats.pages.next_url)),
      ];
    }
    return data;
  }
};
