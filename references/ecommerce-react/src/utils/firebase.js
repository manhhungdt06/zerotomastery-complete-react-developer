import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAscvSIcndQoapGHl0CHvC-WdIJfvW_Rtw',
  authDomain: 'ecom-react-c526a.firebaseapp.com',
  projectId: 'ecom-react-c526a',
  storageBucket: 'ecom-react-c526a.appspot.com',
  messagingSenderId: '1075775416521',
  appId: '1:1075775416521:web:aae87c7c66efb35030c518'
}

// Create newly registered user's profile in database
const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`/users/${userAuth.uid}`)

  const snapShot = await userRef.get()
  // Create user in DB if it doesn't exist
  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = firebase.firestore.FieldValue.serverTimestamp()

    try {
      await userRef.set({
        email,
        displayName,
        createdAt,
        ...additionalData
      })
    } catch (err) {
      console.log('error creating user', err)
    }
  }

  return userRef
}

// Modify and convert collections' array to hash table (objects) for client
const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data()

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection
    return accumulator
  }, {})
}

// Add shop collection data in DB
const addCollectionAndDocumentsToDB = async (collectionKey, documentsArr) => {
  const collectionRef = firestore.collection(collectionKey)

  // make a firebase batch
  const batch = firestore.batch()

  documentsArr.forEach((doc) => {
    const newDocRef = collectionRef.doc()
    batch.set(newDocRef, doc)
  })

  return await batch.commit()
}

// Get current user (check the auth state of the user)
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe()
      resolve(userAuth)
    }, reject)
  })
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const firestore = firebase.firestore()

// google auth provider
const googleProvider = new firebase.auth.GoogleAuthProvider()
// provider.setCustomParameters({ prompt: 'select_account' })
const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export {
  auth,
  firestore,
  signInWithGoogle,
  createUserProfileDocument,
  addCollectionAndDocumentsToDB,
  convertCollectionsSnapshotToMap,
  googleProvider
}
export default firebase
