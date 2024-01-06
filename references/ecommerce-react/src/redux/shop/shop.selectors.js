import { createSelector } from 'reselect'
import memoize from 'lodash.memoize'

const shopSelector = (state) => state.shop

export const collectionsSelectors = createSelector(
  [shopSelector],
  (shop) => shop.collections
)

// Convert Shop Object to Array. e.g. { first: 'hello', second: 'world'} => ['hello', 'world']
export const collectionsInArraySelector = createSelector(
  [collectionsSelectors],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
)

export const collectionSelector = memoize((collectionUrlParam) =>
  createSelector([collectionsSelectors], (collections) =>
    collections ? collections[collectionUrlParam] : null
  )
)

export const isCollectionFetchingSelector = createSelector(
  [shopSelector],
  (shop) => shop.isFetching
)

export const isCollectionsLoadedSelector = createSelector(
  [shopSelector],
  (shop) => !!shop.collections
)
