import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchUserEvents = createAsyncThunk("user/fetchUserEvents", async () => {
    const res1 = await axios.get("http://localhost:3000/user/event", { withCredentials: true })
    console.log("user events"); console.log(res1);
    return res1.data;
});

const initialState = {
    data:[],
    status: "idle",
    error: null,
};

const eventParticipationSlice = createSlice({
    name: "eventParticipation",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserEvents.pending, (state) => {
                state.status = "pending";
                console.log("fetching user data...");
            })
            .addCase(fetchUserEvents.fulfilled, (state,action) => {
                state.status = "succeeded",
                state.data = action.payload.data;
                console.log("user data fetched successfully.");
            })
            .addCase(fetchUserEvents.rejected, (state,action) => {
                state.status = "failed";
                state.error = action.error.message;
                console.log("error in fetching user data");
            });
    },
});

export default eventParticipationSlice.reducer;
