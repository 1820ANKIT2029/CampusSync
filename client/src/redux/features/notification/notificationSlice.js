import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState : [],
  reducers: {
    addNotification: (state, action) => {
      state.push(...action.payload);
    },
    markAsRead: (state, action) => {
      const id = action.payload;
      for (let notification of state) {
        if (notification._id === id) {
          notification.read = true; // Modify the specific notification
        }
      }
    },
    deleteNotification: (state, action) => {
      const id = action.payload;
      return state.filter((notification) => notification._id !== id);
    },
  },
});

export const {
  addNotification,
  markAsRead,
  deleteNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;
