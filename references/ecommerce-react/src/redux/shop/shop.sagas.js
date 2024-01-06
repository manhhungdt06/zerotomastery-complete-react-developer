import { takeLatest, put, all, call } from 'redux-saga/effects'

// aciton types
import { FETCH_COLLECTIONS_START } from './shop.types'

// Shop actions creators
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from './shop.actions'

// firebase utility functions
import {
  firestore,
  convertCollectionsSnapshotToMap
} from '../../utils/firebase'

export function* fetchCollectionsAsync() {
  try {
    // get shop collections from firebase and snapshop
    const collectionRef = yield firestore.collection('collections')
    const snapshot = yield collectionRef.get()

    // convert collections array to map
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot)

    // dispatch fetched data
    yield put(fetchCollectionsSuccess(collectionsMap))
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message))
  }
}

// listen for FETCH_COLLECTIONS_START
export function* fetchCollectionsStart() {
  yield takeLatest(FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)])
}
