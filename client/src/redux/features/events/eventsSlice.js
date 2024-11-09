import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchEvents = createAsyncThunk("user/fetchevents", async () => {
    try {
        const res1 = await axios.get("http://localhost:3000/api/events", { withCredentials: true });
        console.log("events: ", res1);
        return res1.data;
    } catch (error) {
        console.error("Fetch events error:", error);
        throw error; 
    }
});


const initialState = {
    events: [],
    status: "idle",
    error: null,
};


const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.status = "pending";
                console.log("Fetching events - status: pending");
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.status = "succeeded";
                console.log("Fetch events succeeded:", action.payload);
                state.events = action.payload;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
                console.log("Fetch events failed:", action.error.message);
            });
    },
});


export default eventsSlice.reducer;