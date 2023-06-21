import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

import {PlayerState} from './entities';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const createPlayerDataOnUserSignUp = functions.auth
    .user()
    .onCreate(async (user) => {
      const {uid, email, displayName} = user;

      const playerData: PlayerState = {
        id: uid,
        name: displayName || email || 'Unknown',
        color: 'red',
        score: 0,
      };

      const db = admin.database(); // inside function

      const playerDataRef = db.ref(`/playerData/${uid}`);

      try {
        await playerDataRef.set(playerData);
      } catch (error) {
        functions.logger.error(error);
      }

      return;
    });
