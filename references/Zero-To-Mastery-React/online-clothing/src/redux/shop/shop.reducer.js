import SHOP_DATA from "./shop.data";

const INITIAL_DATA = {
  collection: SHOP_DATA
};

const shopReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default shopReducer;
