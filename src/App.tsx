import React from "react";

import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { AuthContext, PlayerContext } from "./contexts.ts";

import router from "./router";
import { RouterProvider } from "react-router-dom";

import ProfileFloatingActionButton from "./components/Login/ProfileFloatingActionButton.tsx";
import { PlayerState } from "./entities/Game";
import { getFunctions, httpsCallable } from "firebase/functions";

function App() {
  const [user, setUser] = React.useState<null | User>(null);
  const [player, setPlayer] = React.useState<null | PlayerState>(null);


  const functions = getFunctions();

  const getPlayerData = httpsCallable(functions, "getCurrentPlayerData");

  async function setCurrentPlayerData(uid) {

    const playerData = await getPlayerData({ uid: uid });
    setPlayer(playerData.data);


    console.log(player);
  }

  onAuthStateChanged(auth, (userObject) => {
    if (userObject && user === null) {
      setUser(userObject);

      setCurrentPlayerData(userObject.uid);
    } else if (userObject === null && user !== null) {
      setUser(null);
    } else {
      return;
    }
  });

  return (
    <AuthContext.Provider value={user}>
      <PlayerContext.Provider value={player}>
        <RouterProvider router={router} />
        <ProfileFloatingActionButton />
      </PlayerContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
