import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import CheckoutItem from '../../components/CheckoutItem/CheckoutItem'
import StripeCheckout from '../../components/StripeCheckout/StripeCheckout'

import {
  cartItemsSelector,
  cartTotalPriceSelector
} from '../../redux/cart/cart.selectors'

import './Checkout.scss'

const Checkout = ({ cartItems, totalPrice }) => (
  <div className='checkout-page'>
    <div className='checkout-header'>
      <div className='header-block'>
        <span>Product</span>
      </div>
      <div className='header-block'>
        <span>Description</span>
      </div>
      <div className='header-block'>
        <span>Quantity</span>
      </div>
      <div className='header-block'>
        <span>Price</span>
      </div>
      <div className='header-block'>
        <span>Remove</span>
      </div>
    </div>
    {cartItems.map((cartItem) => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <div className='total'>TOTAL: ${totalPrice}</div>
    <div className='test-warning'>
      *Please use the following test credit card for payments*
      <br />
      4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
    </div>
    <StripeCheckout price={totalPrice} />
  </div>
)

const mapStateToProps = createStructuredSelector({
  cartItems: cartItemsSelector,
  totalPrice: cartTotalPriceSelector
})

export default connect(mapStateToProps)(Checkout)
