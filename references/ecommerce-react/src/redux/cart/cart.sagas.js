import { takeLatest, put, call, all } from 'redux-saga/effects'

import { clearCart } from './cart.actions'
import { SIGNOUT_SUCCESS } from '../user/user.types'

export function* clearCartOnSignOut() {
  yield put(clearCart())
}

export function* onUserSignOut() {
  yield takeLatest(SIGNOUT_SUCCESS, clearCartOnSignOut)
}

export function* cartSagas() {
  yield all([call(onUserSignOut)])
}
