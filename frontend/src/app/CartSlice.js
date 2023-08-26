import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const STATUSES = Object.freeze({
  LOADING: "loading",
  IDLE: "idle",
  ERROR: "error",
});

// const auth = JSON.parse(localStorage.getItem("user_quickcart"));
export const fetchCartData = createAsyncThunk("cart/fetch", async (user) => { 
 if(!user){
  return  []
 }
 else{
  const { data } = await axios.get(
    `http://localhost:5000/api/user/find-cart/${user._id}`,
    {
      headers: { authorization: `Bearer ${user.token}` },
    }
  );
  if (data.cart) {
    return data.cart;
  } else {
    alert("no data found");
  }
 }

});

export const cartSlice = createSlice({
  name: "cartSlice",

  initialState: {
    data: [],
    totalAmount:0,
    status: STATUSES.IDLE,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartData.pending, (state, action) => {
      state.status = STATUSES.LOADING;
    });
    builder.addCase(fetchCartData.fulfilled, (state, action) => {
      state.status = STATUSES.IDLE;
      state.data = action.payload;
    });
    builder.addCase(fetchCartData.rejected, (state, action) => {
      state.status = STATUSES.ERROR;
    });
  },
});

export default cartSlice.reducer;


