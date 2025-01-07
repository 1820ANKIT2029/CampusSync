import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    notificationData: [{}],
    status: "idle",
    error: null,
};

const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        setNotifications: (state,action) => {
            state = action.payload;
        },
    },
});

export default notificationSlice.reducer;

export const { setNotifications } = notificationSlice.actions;