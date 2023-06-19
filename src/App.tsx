import React from "react";

import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { AuthContext } from "./contexts.ts";

import router from "./router";
import { RouterProvider } from "react-router-dom";

import ProfileFloatingActionButton from "./components/Login/ProfileFloatingActionButton.tsx";

function App() {
  const [user, setUser] = React.useState<null | User>(null);

  onAuthStateChanged(auth, (userObject) => {
    if (userObject && user === null) {
      console.log("User is signed in");
      setUser(userObject);
    } else if (userObject === null && user !== null) {
      console.log("No user is signed in");
      setUser(null);
    } else {
      return;
    }
  });

  return (
    <AuthContext.Provider value={user}>
      <RouterProvider router={router} />

      <ProfileFloatingActionButton />
    </AuthContext.Provider>
  );
}

export default App;
