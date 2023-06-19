import React from 'react';
import { auth } from '../../firebaseConfig';

import { createUserWithEmailAndPassword } from "firebase/auth";

function LoginContainer() {
    const [loginError, setLoginError] = React.useState(null);


    const submitUserCredentials = async (event) => {
        event.preventDefault();
        console.log(event);

        const email = event.target[0].value;
        const password = event.target[1].value;
     
        try {
            await createUserWithEmailAndPassword(auth, email, password)

        } catch (error) {
            setLoginError(error.message);
        }
    }


    return (
        <div>
            <h3>Login</h3>

            <div>
                {loginError}
            </div>
            
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
                <button className="o-auth-provider">Google</button>
                <button className="o-auth-provider">Facebook</button>
                <button className="o-auth-provider">Twitter</button>
            </div>
        </div>
    );
}

export default LoginContainer;