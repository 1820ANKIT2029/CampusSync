import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchAdminData = createAsyncThunk("admin/fetchAdminData", async () => {
    const res1 = await axios.get("http://localhost:3000/admin/getStats", { withCredentials: true });
    const res2 = await axios.get("http://localhost:3000/admin/event", { withCredentials: true });
    const res3 = await axios.get("http://localhost:3000/admin/news", { withCredentials: true });

    return {
        stats: res1.data,
        events: res2.data,
        blogs: res3.data,
    };
});

export const fetchAdminEvent = createAsyncThunk("admin/fetchAdminEvent", async (eventId, { rejectWithValue }) => {
    if(!eventId){
        return ;
    }
    try {
        const res = await axios.get(`http://localhost:3000/admin/event/details/${eventId}`, {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching event details:", error);
        return rejectWithValue(error.response?.data || "Failed to fetch event details");
    }
});

export const verifySub = createAsyncThunk('admin/verifySub', async (submissionId, { rejectWithValue }) => {
    try {
        const res = await axios.put(
            `http://localhost:3000/admin/submission/valid/${submissionId}`,
            {},
            { withCredentials: true }
        );
        console.log("response", res);
        return res.data;
    } catch (error) {
        console.error("Error verifying submission.", error);
        return rejectWithValue(error.response?.data?.error || "Failed to verify the submission");
    }
});


export const rejectSub = createAsyncThunk('admin/rejectSub', async (submissionId,{rejectWithValue}) => {
    try{
        const res = await axios.put(`http://localhost:3000/admin/submission/invalid/${submissionId}`,{},{
            withCredentials: true,
        });
        return res.data;
    }catch(error){
        console.error("Error rejecting submission.", error);
        return rejectWithValue(error.response?.data || "Failed to reject the submission");
    }
})

const initialState = {
    stats: {
        totalBlogs: 0,
        totalEvents: 0,
        totalParticipants: 0,
    },
    events: [],
    blogs: [],
    eventData: [],
    eventDetailsStatus: "idle",
    varifyStatus: "idle",
    varifyMessage: "",
    rejectionStatus: "idle",
    status: "idle",
    error: null,
};

const adminDataSlice = createSlice({
    name: "adminData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminData.pending, (state) => {
                state.status = "pending";
            })
            .addCase(fetchAdminData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.stats = action.payload.stats;
                state.events = action.payload.events;
                state.blogs = action.payload.blogs;
            })
            .addCase(fetchAdminData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchAdminEvent.pending, (state) => {
                state.eventDetailsStatus = "pending";
            })
            .addCase(fetchAdminEvent.fulfilled, (state, action) => {
                state.eventDetailsStatus = "succeeded";
                state.eventData = action.payload;
            })
            .addCase(fetchAdminEvent.rejected, (state, action) => {
                state.eventDetailsStatus = "failed";
                state.error = action.error.message;
            })
            .addCase(verifySub.pending, (state) => {
                state.varifyStatus = "pending";
            })
            .addCase(verifySub.fulfilled, (state, action) => {
                state.varifyStatus = "succeeded";
                state.varifyMessage = action.payload.message;
            })
            .addCase(verifySub.rejected, (state, action) => {
                state.varifyStatus = "rejected";
                state.error = action.payload || "Failed to verify submission";
            })            
            .addCase(rejectSub.pending, (state) => {
                state.rejectionStatus = "pending";
            })
            .addCase(rejectSub.fulfilled, (state, action) => {
                state.rejectionStatus = "succeeded";
            })
            .addCase(rejectSub.rejected, (state, action) => {
                state.rejectionStatus = "failed";
                state.error = action.error.message;
            })
    },
});

export default adminDataSlice.reducer;
