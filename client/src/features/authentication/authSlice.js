import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            if (typeof action.payload === 'boolean') {
                state.isAuthenticated = action.payload;
            } else {
                console.error("Payload for setAuth should be a boolean");
            }
        },
    },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
