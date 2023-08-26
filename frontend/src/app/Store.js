import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import categorySlice from "./categorySlice";
import CartSlice from "./CartSlice";


const Store = configureStore({
  reducer: {
    Products: productSlice,
    SeachCategory: categorySlice,
    Cart: CartSlice,
  },
});

export default Store;