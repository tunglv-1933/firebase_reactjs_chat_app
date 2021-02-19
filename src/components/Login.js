import React from "react";
import '../css/Login.css';
import Button from '@material-ui/core/Button';
import { auth, provider } from "../firebase";
import db from '../firebase';
import { actionTypes } from '../reducer';
import { useStateValue } from '../StateProvider';

function Login() {
  const [state , dispatch] = useStateValue();

  const signIn = () => {
    auth.signInWithPopup(provider)
    .then((result) => {
      dispatch({
        type: actionTypes.SET_USER,
        user: result.user
      });

      const current_user = {
        user_id: result.user.uid,
        email: result.user.email,
        username: result.user.displayName,
        avatar_url: result.user.photoURL
      }

      db.collection('users').where('email', '==', result.user.email).get().then(r => {
        if (r.empty) {
          db.collection('users').add(current_user);
        } else {
          db.collection('users').doc(r.docs[0].id).update(current_user);
        }
      });
    })
    .catch((error) => console.log(error.message));
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png" alt="" />
        <img src= "https://www.logo.wine/a/logo/Facebook/Facebook-Logo.wine.svg" alt="" />
      </div>
      <Button type="submit" onClick={signIn}>Sign In</Button>
    </div>
  )
}

export default Login;
