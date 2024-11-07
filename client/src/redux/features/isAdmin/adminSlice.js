import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAdmin: false,
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdmin: (state, action) => {
            if (typeof action.payload === 'boolean') {
                state.isAdmin = action.payload;
            } else {
                console.error("Payload for setAuth should be a boolean");
            }
        },
    },
});

export const { setAdmin } = adminSlice.actions;

export default adminSlice.reducer;
