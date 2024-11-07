import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchuserProfile = createAsyncThunk("user/fetchUserProfile", async () => {
    const res1 = await axios.get("http://localhost:3000/profile", { withCredentials: true })
    console.log("user profile"); console.log(res1);
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
    isAdmin: false,
    profilePic: null,
    status: "idle",
    error: null,
};

const userProfileSlice = createSlice({
    name: "userProfile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchuserProfile.pending, (state) => {
                state.status = "pending";
            })
            .addCase(fetchuserProfile.fulfilled, (state,action) => {
                state.status = "succeeded",
                state.userId = action.payload.userid;
                state.name = action.payload.name;
                state.bio = action.payload.bio;
                state.year = action.payload.year;
                state.branch = action.payload.branch;
                state.email = action.payload.email;
                state.profilePic = action.payload.profilePic;
                state.isAdmin = action.payload.isAdmin;
            })
            .addCase(fetchuserProfile.rejected, (state,action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default userProfileSlice.reducer;