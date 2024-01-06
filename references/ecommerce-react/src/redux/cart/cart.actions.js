import {
  TOGGLE_CART_VISIBILITY,
  ADD_ITEM_TO_CART,
  CLEAR_ITEM_FROM_CART,
  REMOVE_ITEM_TO_CART,
  CLEAR_CART
} from './cart.types'

export const toggleCartVisibility = () => ({
  type: TOGGLE_CART_VISIBILITY
})

export const addItem = (item) => ({
  type: ADD_ITEM_TO_CART,
  payload: item
})

export const removeItem = (item) => ({
  type: REMOVE_ITEM_TO_CART,
  payload: item
})

export const clearItem = (item) => ({
  type: CLEAR_ITEM_FROM_CART,
  payload: item
})

export const clearCart = () => ({
  type: CLEAR_CART
})
