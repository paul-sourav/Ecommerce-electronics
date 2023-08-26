import{createSlice} from "@reduxjs/toolkit";

export const categorySlice = createSlice({
     name:"category-slice",
     initialState:{
        categoryName:""
     },
     reducers:{
        searchCategory(state,action){
         state.categoryName =  action.payload;
        }
     }
})
export const {searchCategory}  = categorySlice.actions;
export  default  categorySlice.reducer;