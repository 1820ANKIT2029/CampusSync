import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchBlogs = createAsyncThunk("user/fetchBlogs", async () => {
    const res1 = await axios.get("http://localhost:3000/api/news/1", { withCredentials: true })
    // console.log("news: "); console.log(res1.data);
    return res1.data;
});

const initialState = {
    blogs: [{
        adminId:{
            _id:null,
            name:"",
            bio:"",
        },
        createdAt:"",
        description: "",
        headline: "",
    }],
    status: "idle",
    error: null,
};

const blogsSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.status = "pending";
            })
            .addCase(fetchBlogs.fulfilled, (state,action) => {
                state.status = "succeeded";
                state.blogs = action.payload;
            })
            .addCase(fetchBlogs.rejected, (state,action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default blogsSlice.reducer;