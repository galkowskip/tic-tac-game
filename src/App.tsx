import React, { useEffect } from "react";

import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { AuthContext } from "./contexts";

import router from "./router";
import { RouterProvider } from "react-router-dom";

import ProfileFloatingActionButton from "./components/Login/ProfileFloatingActionButton.tsx";

function App() {
  const [user, setUser] = React.useState<null | User>(null);

  onAuthStateChanged(auth, (userObject) => {
    if (userObject) {
      console.log("User is signed in");
      setUser(userObject);
    } else {
      console.log("No user is signed in");
      setUser(null);
    }
  });

  useEffect(() => {}, [user]);

  return (
    <AuthContext.Provider value={user}>
      <RouterProvider router={router} />

      <ProfileFloatingActionButton />
    </AuthContext.Provider>
  );
}

export default App;
