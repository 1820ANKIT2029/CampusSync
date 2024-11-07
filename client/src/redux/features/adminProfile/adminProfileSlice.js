import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchAdminProfile = createAsyncThunk("admin/fetchAdminProfile", async () => {
    const res1 = await axios.get("http://localhost:3000/admin/profile", { withCredentials: true });

    return res1.data;
});

const initialState = {
    userId: null,
    name:"",
    bio: "",
    year: 0,
    branch: "",
    email: "",
    aura: 0,
    gender: "",
    isadmin: false,
    profilePic: null,
    status: "idle",
    error: null,
};

const adminProfileSlice = createSlice({
    name: "adminProfile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminProfile.pending, (state) => {
                state.status = "pending";
            })
            .addCase(fetchAdminProfile.fulfilled, (state,action) => {
                state.status = "succeeded",
                state.userId = action.payload.userid;
                state.name = action.payload.name;
                state.bio = action.payload.bio;
                state.year = action.payload.year;
                state.branch = action.payload.branch;
                state.email = action.payload.email;
                state.profilePic = action.payload.profilePic;
                state.isadmin = action.payload.isadmin;
            })
            .addCase(fetchAdminProfile.rejected, (state,action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default adminProfileSlice.reducer;