import { createSlice } from "@reduxjs/toolkit";
import { discount } from "../../utils/discount";

const cartData = localStorage.getItem("cart");
const cartArray = cartData ? JSON.parse(cartData) : [];

// ******* all items func  ******
const allItems = (data) => {
  let items = 0;
  for (let i = 0; i < data.length; i++) {
    items += data[i].quantity;
  }
  return items;
};

// ***** Total price func  *****
const calculateTotal = (data) => {
  let totalPrice = 0;
  for (let i = 0; i < data.length; i++) {
    totalPrice += discount(data[i].price, data[i].discount) * data[i].quantity;
  }
  return totalPrice;
};

const cartReducer = createSlice({
  name: "cart",
  initialState: {
    cart: cartArray.length > 0 ? cartArray : [],
    items: cartArray.length > 0 ? allItems(cartArray) : 0,
    total: cartArray.length > 0 ? calculateTotal(cartArray) : 0,
  },
  reducers: {
    // ****** add to cart reducer  ******
    addCart: (state, action) => {
      state.cart.push(action.payload);
      state.items += action.payload.quantity;
      state.total +=
        discount(action.payload.price, action.payload.discount) *
        action.payload.quantity;
    },

    // ******* Increment Quantity reducer *******
    incQuantity: (state, action) => {
      const find = state.cart.find((item) => item._id === action.payload);
      if (find) {
        find.quantity += 1;
        state.items += 1;
        state.total += discount(find.price, find.discount);
        const index = state.cart.indexOf(find);
        state.cart[index] = find;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },

    // ******* Decrement Quantity reducer  *******
    decQuantity: (state, action) => {
      const find = state.cart.find((item) => item._id === action.payload);
      if (find && find.quantity > 1) {
        find.quantity -= 1;
        state.items -= 1;
        state.total -= discount(find.price, find.discount);
        const index = state.cart.indexOf(find);
        state.cart[index] = find;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    // ******* Remove  reducer *******
    removeItem: (state, action) => {
      const find = state.cart.find((item) => item._id === action.payload);
      state.items -= find.quantity;
      state.total -= discount(find.price, find.discount) * find.quantity;
      const index = state.cart.indexOf(find);
      state.cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    // ******* empty cart reducer  *******
    emptyCart: (state) => {
      state.cart = [];
      state.items = 0;
      state.total = 0;
    },
  },
});

export const { addCart, incQuantity, decQuantity, removeItem, emptyCart } =
  cartReducer.actions;
export default cartReducer.reducer;
