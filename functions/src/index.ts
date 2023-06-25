import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

import {PlayerState} from './entities';
import {AuthData} from 'firebase-functions/lib/common/providers/tasks';

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

      const db = admin.database();

      const playerDataRef = db.ref(`/playerData/${uid}`);

      try {
        await playerDataRef.set(playerData);
      } catch (error) {
        functions.logger.error(error);
      }

      return;
    });

export const removePlayerDataOnUserDelete = functions.auth
    .user()
    .onDelete(async (user) => {
      const {uid} = user;

      const db = admin.database();

      const playerDataRef = db.ref(`/playerData/${uid}`);

      try {
        await playerDataRef.remove();
      } catch (error) {
        functions.logger.error(error);
      }

      return;
    });

export const getCurrentPlayerData = functions.https.onCall(
    async (data, context) => {
      const {uid} = context.auth as AuthData;
      functions.logger.error(uid);

      const db = admin.database();

      const playerDataRef = db.ref(`/playerData/${uid}`);

      try {
        const snapshot = await playerDataRef.once('value');
        functions.logger.error(snapshot.val());
        return snapshot.val();
      } catch (error) {
        functions.logger.error(error);
      }
    }
);

// export const updatePlayerData = functions.https.onCall(
//     async (data, context) => {
//       const {uid} = context.auth as any;

//       const db = admin.database();

//       const playerDataRef = db.ref(`/playerData/${uid}`);

//       try {
//         await playerDataRef.update(data);
//       } catch (error) {
//         functions.logger.error(error);
//       }
//     }
// );
