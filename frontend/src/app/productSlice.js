import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios"

const STATUSES = Object.freeze({
    IDLE:"idle",
    LOADING:"loading",
    ERROR:"error"
});

const productSlice  = createSlice({
    name:"productSlice",
    initialState:{
        data:[],
        status:STATUSES.IDLE
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProduct.pending,(state,action)=>{
             state.status  = STATUSES.LOADING
        })
        builder.addCase(fetchProduct.fulfilled,(state,action)=>{
             state.status = STATUSES.IDLE
             state.data = action.payload
        });
        builder.addCase(fetchProduct.rejected,(state,action)=>{
            state.status = STATUSES.ERROR
        })
    }
})

export default productSlice.reducer;

export const fetchProduct = createAsyncThunk("product/fetch",async()=>{
    const {data} = await axios.get("http://localhost:5000/api/product/get-product");
    return data;
})

