import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchuserEvents = createAsyncThunk("user/fetchUserEvents", async () => {
    try{
        const res1 = await axios.get("http://localhost:3000/user/event", { withCredentials: true })
        // console.log("user events"); console.log(res1);
        return res1.data;
    }catch(error){
        console.log("error in events");
        console.log(error);
    }
    
});

const initialState = {
    events: [],
    status: "idle",
    error: null,
};

const userEventsSlice = createSlice({
    name: "userEvents",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchuserEvents.pending, (state) => {
                state.status = "pending";
                // console.log("fetching user stats...");
            })
            .addCase(fetchuserEvents.fulfilled, (state,action) => {
                state.status = "succeeded";
                state.events = action.payload;
                // console.log("user stats fetched successfully");
            })
            .addCase(fetchuserEvents.rejected, (state,action) => {
                state.status = "failed";
                state.error = action.error.message;
                console.log("Error while fetching user stats");
            });
    },
});

export default userEventsSlice.reducer;
