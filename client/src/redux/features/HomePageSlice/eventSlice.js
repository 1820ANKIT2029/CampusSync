import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    event: 0,
}

export const eventSlice = createSlice({
    name: 'eventAtHome',
    initialState,
    reducers: {
        setEventAtHome: (state, action) => {
            state.event = action.payload;
        },
    },
});

export const { setEventAtHome } = eventSlice.actions;

export default eventSlice.reducer;
