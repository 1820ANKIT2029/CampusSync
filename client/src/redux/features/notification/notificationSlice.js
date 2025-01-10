import { createSlice } from "@reduxjs/toolkit";
const notificationSlice = createSlice({
  name: "notifications",
  initialState : [],
  reducers: {
    addNotification: (state, action) => {
        if(!(state.find((notification) => notification._id === action.payload._id))){
            state.push(action.payload);
        }
    },
    markAsRead: (state, action) => {
        const id = action.payload;
        print("state: ",state);
        const newState = [];
        for(let i = 0;i<state.length;i++){
            if(state[i]._id === id){
                state[i].read = true;
            }
            newState.push(state[i]);
        }
        state = newState;
    },
    deleteNotification: (state, action) => {
      state = state.filter(
        (notification) => notification[0]._id !== action.payload
      );
    },
  },
});

export const {
  addNotification,
  markAsRead,
  deleteNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;
