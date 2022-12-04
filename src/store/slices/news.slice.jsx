import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";

export const newsSlice = createSlice({
    name: 'news',
    initialState: [],
    reducers:{
        setNews: (state, action) => {
            return action.payload
        }

    }
})

export const getNewsThunk = () => dispatch =>{
    dispatch(setIsLoading(true));
    axios.get("https://e-commerce-api.academlo.tech/api/v1/products")
        .then(res => dispatch(setNews(res.data)))
        .finally(()=>dispatch(setIsLoading(false)));
}

export const { setNews }= newsSlice.actions;

export default newsSlice.reducer;