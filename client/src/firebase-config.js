import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider,signInWithPopup} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9y66q2fQ7DKlS7rT3RgcTV7YBgAMC7ZY",
  authDomain: "codeshare-fc772.firebaseapp.com",
  projectId: "codeshare-fc772",
  storageBucket: "codeshare-fc772.appspot.com",
  messagingSenderId: "1073326202425",
  appId: "1:1073326202425:web:af4f7815d7246298f7b7e8"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export let auth = getAuth(app);
export const provider=new GoogleAuthProvider();

export const signinwithgoogle=()=>{


signInWithPopup(auth,provider).then((result)=>{
  const email=result.user.email;
  const profilepic=result.user.photoURL;
  const token=result.user.uid;
  
  localStorage.setItem('token1',token);
  localStorage.setItem('dp',profilepic);
  localStorage.setItem('email',email);
 
  window.location.reload();
}).catch((error)=>{
  alert(error)
})



}
