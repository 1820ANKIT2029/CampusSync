import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchAdminData = createAsyncThunk("admin/fetchAdminData", async () => {
    const res1 = await axios.get("http://localhost:3000/admin/getStats", { withCredentials: true });
    const res2 = await axios.get("http://localhost:3000/admin/event", { withCredentials: true });
    const res3 = await axios.get("http://localhost:3000/admin/news", { withCredentials: true }); 

    return {
        stats: res1.data,
        events: res2.data,
        blogs: res3.data,
    };
});

const initialState = {
    stats :{
        totalBlogs: 0,
        totalEvents: 0,
        totalParticipants: 0,
    },
    events: [],
    blogs: [],
    status: "idle",
    error: null,
};

const adminSlice = createSlice({
    name: "adminData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminData.pending, (state) => {
                state.status = "pending";
            })
            .addCase(fetchAdminData.fulfilled, (state,action) => {
                state.status = "succeeded",
                state.stats = action.payload.stats;
                state.events = action.payload.events;
                state.blogs = action.payload.blogs;
            })
            .addCase(fetchAdminData.rejected, (state,action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default adminSlice.reducer;