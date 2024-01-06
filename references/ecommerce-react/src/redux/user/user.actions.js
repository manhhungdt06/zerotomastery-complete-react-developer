// Action types
import {
  SET_CURRENT_USER,
  // Sign in
  GOOGLE_SIGNIN_START,
  EMAIL_SIGNIN_START,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  // Sign Up
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  // check user session
  CHECK_USER_SESSION,
  // Sign out
  SIGNOUT_START,
  SIGNOUT_SUCCESS,
  SIGNOUT_FAILURE
} from './user.types'

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user
})

// ** Sign In **
export const googleSignInStart = () => ({
  type: GOOGLE_SIGNIN_START
})

export const emailSignInStart = (emailAndPassword) => ({
  type: EMAIL_SIGNIN_START,
  payload: emailAndPassword
})

export const signInSuccess = (user) => ({
  type: SIGNIN_SUCCESS,
  payload: user
})

export const signInFailure = (error) => ({
  type: SIGNIN_FAILURE,
  payload: error
})

// ** Sign UP **
export const signUpStart = (userCredentials) => {
  return {
    type: SIGNUP_START,
    payload: userCredentials
  }
}

export const signUpSuccess = ({ user, additionalData }) => ({
  type: SIGNUP_SUCCESS,
  payload: { user, additionalData }
})

export const signUpFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error
})

// ** User session **
export const checkUserSession = () => ({
  type: CHECK_USER_SESSION
})

// ** Sign Out **
export const signOutStart = () => ({
  type: SIGNOUT_START
})

export const signOutSuccess = () => ({
  type: SIGNOUT_SUCCESS
})

export const signOutFailure = (error) => ({
  type: SIGNOUT_FAILURE,
  payload: error
})
