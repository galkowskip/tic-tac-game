import React from "react";
import { signOut } from "firebase/auth";

import { AuthContext } from "../../contexts.ts";
import { auth } from "../../firebaseConfig";

function ProfileFloatingActionButton() {
  const authContext = React.useContext(AuthContext);

  async function logout() {
    try {
      signOut(auth);
    } catch (error) {
      console.log(error);
    }
  }

  if (authContext) {
    return (
      <div className="floating-action-button">
        <button onClick={logout}>Logout</button>
      </div>
    );
  } else {
    return (
      <div className="floating-action-button">
        <a href="/login">
          <button>Login</button>
        </a>
      </div>
    );
  }
}

export default ProfileFloatingActionButton;
