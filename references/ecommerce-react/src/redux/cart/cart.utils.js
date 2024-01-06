export const addItemToCart = (cartItems, newItem) => {
  // Check to see if there is going to be any duplicates
  const existingCartItem = cartItems.find((item) => item.id === newItem.id)

  // create new items list and increase the quantity of duplicates
  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
    )
  }

  return [...cartItems, { ...newItem, quantity: 1 }]
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  // find the item to remove in store
  const existingCartItem = cartItems.find(
    (item) => item.id === cartItemToRemove.id
  )

  // Remove item from cart if there is only one
  if (existingCartItem.quantity === 1)
    return cartItems.filter((item) => item.id !== cartItemToRemove.id)

  // decrease the quantity of there is more than one
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}
