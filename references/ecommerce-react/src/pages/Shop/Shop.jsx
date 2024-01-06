import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchCollectionsStart } from '../../redux/shop/shop.actions'
import { isCollectionFetchingSelector } from '../../redux/shop/shop.selectors'

import WithSpinner from '../../components/WithSpinner/WithSpinner'
import Collection from '../Collection/Collection'
import CollectionOverview from '../../components/CollectionOverview/CollectionOverview'

// with spinner
const CollectionWithSpinner = WithSpinner(Collection)
const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview)

const Shop = ({ match }) => {
  const dispatch = useDispatch()
  const isCollectionFetching = useSelector(isCollectionFetchingSelector)

  useEffect(() => {
    dispatch(fetchCollectionsStart())
  }, [dispatch])

  return (
    <div className='shop-page'>
      <Route
        exact
        path={`${match.path}`}
        render={(props) => (
          <CollectionOverviewWithSpinner
            isLoading={isCollectionFetching}
            {...props}
          />
        )}
      />
      <Route
        path={`${match.path}/:collectionId`}
        render={(props) => (
          <CollectionWithSpinner isLoading={isCollectionFetching} {...props} />
        )}
      />
    </div>
  )
}

export default Shop
