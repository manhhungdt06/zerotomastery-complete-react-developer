import React from 'react'

// Redux
import { connect } from 'react-redux'
import { toggleCartVisibility } from '../../redux/cart/cart.actions'
import { cartItemsCountSelector } from '../../redux/cart/cart.selectors'

// Components
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import './CartIcon.scss'

const CartIcon = ({ toggleCartVisibility, cartItemsCount }) => (
  <div className='cart-icon' onClick={toggleCartVisibility}>
    <ShoppingIcon className='shopping-icon' />
    <span className='item-count'>{cartItemsCount}</span>
  </div>
)

const mapStateToProps = (state) => ({
  cartItemsCount: cartItemsCountSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
  toggleCartVisibility: () => dispatch(toggleCartVisibility())
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)
