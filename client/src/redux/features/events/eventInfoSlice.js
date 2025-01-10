import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchEventInfo = createAsyncThunk("user/fetchEventInfo", async (eventId, { rejectWithValue }) => {
    try {
        if (!eventId) {
            throw new Error("Event ID is required");
        }
        const res1 = await axios.get(`http://localhost:3000/api/event/info`, {
            params:  {eventId },
            withCredentials: true,
        });
        // console.log("event: ", res1);
        return res1.data;
    } catch (error) {
        console.error("Fetch event error:", error);
        return rejectWithValue(error.response?.data || "Failed to fetch event information");
    }
});



const initialState = {
    event: [],
    status: "idle",
    error: null,
};


const eventInfoSlice = createSlice({
    name: "eventInfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEventInfo.pending, (state) => {
                state.status = "pending";
                // console.log("Fetching events - status: pending");
            })
            .addCase(fetchEventInfo.fulfilled, (state, action) => {
                state.status = "succeeded";
                // console.log("Fetch events succeeded:", action.payload);
                state.event = action.payload;
            })
            .addCase(fetchEventInfo.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
                console.log("Fetch events failed:", action.error.message);
            });
    },
});


export default eventInfoSlice.reducer;