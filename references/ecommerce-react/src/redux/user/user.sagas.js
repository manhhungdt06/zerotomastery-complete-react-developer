import { takeLatest, put, all, call } from 'redux-saga/effects'
import {
  GOOGLE_SIGNIN_START,
  EMAIL_SIGNIN_START,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  CHECK_USER_SESSION,
  SIGNOUT_START
} from './user.types'

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure
} from './user.actions'

// Firebase utility functions
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser
} from '../../utils/firebase'

export function* getSnapshopFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    )
    const userSnapshot = yield userRef.get()
    const userObj = { id: userSnapshot.id, ...userSnapshot.data() }

    yield put(signInSuccess(userObj))
  } catch (error) {
    yield put(signInFailure(error.message))
  }
}

//  Sign In With Google
export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider)
    yield getSnapshopFromUserAuth(user)
  } catch (error) {
    yield put(signInFailure(error.message))
  }
}

//  Sign In With Email And Password
export function* signInWithEmail({
  payload: { displayName, email, password }
}) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password)
    yield createUserProfileDocument(user, { displayName })

    yield getSnapshopFromUserAuth(user)
  } catch (error) {
    yield put(signInFailure(error.message))
  }
}

//  Sign Up user with email and password
export function* signUpUser({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password)
    yield put(signUpSuccess({ user, additionalData: { displayName } }))
  } catch (error) {
    yield put(signUpFailure(error.message))
  }
}

//  Sign Up user with email and password
export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshopFromUserAuth(user, additionalData)
}

//  Check the user session (check if it's authenticated)
export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser()

    if (!userAuth) return yield put(signInFailure('User is not authenticated!'))

    yield getSnapshopFromUserAuth(userAuth)
  } catch (error) {
    yield put(signInFailure(error.message))
  }
}

//  Sign out user
export function* signOut() {
  try {
    yield auth.signOut()
    yield put(signOutSuccess())
  } catch (error) {
    yield put(signOutFailure(error.message))
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(GOOGLE_SIGNIN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
  yield takeLatest(EMAIL_SIGNIN_START, signInWithEmail)
}

export function* onUserSignUp() {
  yield takeLatest(SIGNUP_START, signUpUser)
}

export function* onSignUpSuccess() {
  yield takeLatest(SIGNUP_SUCCESS, signInAfterSignUp)
}

export function* onCheckUserSession() {
  yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onUserSignOut() {
  yield takeLatest(SIGNOUT_START, signOut)
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onUserSignOut),
    call(onUserSignUp),
    call(onSignUpSuccess)
  ])
}
