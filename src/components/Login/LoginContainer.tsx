import React, { useContext } from "react";
import { auth } from "../../firebaseConfig";

import { Navigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { AuthContext } from "../../contexts";

function LoginContainer() {
  const [loginError, setLoginError] = React.useState(null);
  const authContext = useContext(AuthContext);

  const submitUserCredentials = async (event) => {
    event.preventDefault();
    console.log(authContext);

    const email = event.target[0].value;
    const password = event.target[1].value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setLoginError(error.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());

      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential === null) throw new Error("Credential is null");

      //   const token = credential.accessToken;

      // The signed-in user info.
      //   const user = result.user;

      //   console.log(token, user);
    } catch (error) {
      setLoginError(error.message);
    }
  };

  if (authContext) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <h3>Login</h3>

      <div>{loginError}</div>

      <form onSubmit={submitUserCredentials}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>

        <button>Login</button>
      </form>
      <div className="o-auth-providers-box">
        <button className="o-auth-provider" onClick={loginWithGoogle}>
          Google
        </button>
        <button disabled className="o-auth-provider">
          Facebook
        </button>
        <button disabled className="o-auth-provider">
          Twitter
        </button>
      </div>
    </div>
  );
}

export default LoginContainer;
