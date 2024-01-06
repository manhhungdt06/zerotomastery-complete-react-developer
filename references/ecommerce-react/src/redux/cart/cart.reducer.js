import {
  TOGGLE_CART_VISIBILITY,
  ADD_ITEM_TO_CART,
  CLEAR_ITEM_FROM_CART,
  REMOVE_ITEM_TO_CART,
  CLEAR_CART
} from './cart.types'

import { addItemToCart, removeItemFromCart } from './cart.utils'

const INITIAL_STATE = {
  isCartHidden: true,
  cartItems: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action
  switch (type) {
    case TOGGLE_CART_VISIBILITY:
      return {
        ...state,
        isCartHidden: !state.isCartHidden
      }
    case ADD_ITEM_TO_CART:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, payload)
      }
    case REMOVE_ITEM_TO_CART:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, payload)
      }
    case CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== payload.id)
      }
    case CLEAR_CART:
      return {
        ...state,
        cartItems: []
      }
    default:
      return state
  }
}

export default cartReducer
