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

  function getPlayerDataFromCache() {
    const playerData = localStorage.getItem("playerData");

    if (playerData) {
      setPlayer(JSON.parse(playerData));
      return true;
    } else {
      return false;
    }
  }

  function setPlayerDataToCache(playerData: PlayerState) {
    localStorage.setItem("playerData", JSON.stringify(playerData));
  }

  async function setCurrentPlayerData(uid) {
    try {
      const result = await getPlayerData({ uid: uid });

      const playerData = result.data as PlayerState;

      setPlayer(playerData);

      setPlayerDataToCache(playerData as PlayerState);
    } catch (error) {
      console.log(error);
    }
  }

  onAuthStateChanged(auth, (userObject) => {
    if (userObject && user === null) {
      setUser(userObject);

      const playerCache = getPlayerDataFromCache();

      if (!playerCache) {
        setCurrentPlayerData(userObject.uid);
      }
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
