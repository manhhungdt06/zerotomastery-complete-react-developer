import React from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { collectionsInArraySelector } from '../../redux/shop/shop.selectors'

import CollectionPreview from '../CollectionPreview/CollectionPreview'

import './CollectionOverview.scss'

const CollectionsOverview = ({ collections }) => (
  <div className='collections-overview'>
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </div>
)

const mapStateToProps = createStructuredSelector({
  collections: collectionsInArraySelector
})

export default connect(mapStateToProps)(CollectionsOverview)
