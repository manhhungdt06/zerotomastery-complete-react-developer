import {
  FETCH_COLLECTIONS_START,
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_COLLECTIONS_FAILURE
} from './shop.types'

import {
  firestore,
  convertCollectionsSnapshotToMap
} from '../../utils/firebase'

//
export const fetchCollectionsStart = () => ({
  type: FETCH_COLLECTIONS_START
})

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
})

export const fetchCollectionsFailure = (errorMessage) => ({
  type: FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
})

export const fetchCollections = () => (dispatch) => {
  const collectionRef = firestore.collection('collections')

  collectionRef
    .get()
    .then((snapshot) => {
      dispatch(fetchCollectionsStart())

      // Convert fetched array to map
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)

      // update store
      dispatch(fetchCollectionsSuccess(collectionsMap))
    })
    .catch((error) => dispatch(fetchCollectionsFailure(error.message)))
}
