import React from 'react'

import { useSelector } from 'react-redux'
import { collectionSelector } from '../../redux/shop/shop.selectors'

// components
import CollectionItem from '../../components/CollectionItem/CollectionItem'

import './Collection.scss'

const Category = ({ match }) => {
  // get collection from store
  const { title, items } = useSelector(
    collectionSelector(match.params.collectionId)
  )

  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Category
