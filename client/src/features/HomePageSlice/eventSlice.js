import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    event: 0,
}

export const eventSlice = createSlice({
    name: 'eventAtHome',
    initialState,
    reducers: {
        setEventAtHome: (state, action) => {
            if (typeof action.payload === 'integer') {
                state.event = action.payload;
            } else {
                console.error("Payload for setEventAtHome should be a boolean");
            }
        },
    },
});

export const { setEventAtHome } = eventSlice.actions;

export default eventSlice.reducer;
