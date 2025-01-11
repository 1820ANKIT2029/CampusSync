import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchuserstats = createAsyncThunk("user/fetchUserStats", async () => {
    const res1 = await axios.get("http://localhost:3000/user/stats", { withCredentials: true });
    return res1.data;
});

const initialState = {
    events: {},
    totalEvents: 0,
    totalTasks: 0,
    status: "idle",
    error: null,
};

const userStatsSlice = createSlice({
    name: "userStats",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchuserstats.pending, (state) => {
                state.status = "pending";
                // console.log("fetching user stats...");
            })
            .addCase(fetchuserstats.fulfilled, (state,action) => {
                state.status = "succeeded";
                state.events = action.payload.events;
                state.totalEvents= action.payload.totalEvents;
                state.totalTasks= action.payload.totalTasks;
                // console.log("user stats fetched successfully");
            })
            .addCase(fetchuserstats.rejected, (state,action) => {
                state.status = "failed";
                state.error = action.error.message;
                console.log("Error while fetching user stats");
            });
    },
});

export default userStatsSlice.reducer;
