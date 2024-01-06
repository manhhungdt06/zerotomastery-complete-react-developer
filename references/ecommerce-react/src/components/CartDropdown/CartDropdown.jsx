import React from 'react'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { cartItemsSelector } from '../../redux/cart/cart.selectors'
import { toggleCartVisibility } from '../../redux/cart/cart.actions'

import CustomButton from '../CustomButton/CustomButton'
import CartItem from '../CartItem/CartItem'

import './CartDropdown.scss'

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className='empty-message'>Your cart is empty!</span>
      )}
    </div>
    <CustomButton
      onClick={(e) => {
        history.push('/checkout')
        dispatch(toggleCartVisibility())
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
)

const mapStateToProps = (state) => ({
  cartItems: cartItemsSelector(state)
})

export default withRouter(connect(mapStateToProps)(CartDropdown))
