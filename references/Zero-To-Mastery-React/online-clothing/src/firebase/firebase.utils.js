import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDDtZgXaqw6C_tQTDP1v-FvkOpmRgMdpGs",
  authDomain: "crwn-db-d16fd.firebaseapp.com",
  databaseURL: "https://crwn-db-d16fd.firebaseio.com",
  projectId: "crwn-db-d16fd",
  storageBucket: "crwn-db-d16fd.appspot.com",
  messagingSenderId: "382809190901",
  appId: "1:382809190901:web:4bc3589bd35d52d454f0bc",
  measurementId: "G-YDK65GL800"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
