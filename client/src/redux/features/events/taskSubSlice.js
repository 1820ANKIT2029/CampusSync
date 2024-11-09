import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Async thunk for task submission
export const taskSub = createAsyncThunk("user/taskSub", async ({ taskId, formData }, { rejectWithValue }) => {
    try {
        if (!taskId) {
            throw new Error("Task ID is required");
        }

        const res1 = await axios.post(`http://localhost:3000/submit/upload`, formData, {
            params: { taskId },
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log("taskSub response:", res1);
        return res1.data;
    } catch (error) {
        console.error("Error in task submission:", error);
        return rejectWithValue(error.response?.data || "Failed to submit task");
    }
});

// Async thunk for task registration
export const taskReg = createAsyncThunk("user/taskReg", async (taskId, { rejectWithValue }) => {
    try {
        if (!taskId) {
            throw new Error("Task ID is required");
        }

        const res1 = await axios.post(`http://localhost:3000/user/event/task/register`, {}, {
            params: { taskId },
            withCredentials: true,
        });

        console.log("taskReg response:", res1);
        return res1.data;
    } catch (error) {
        console.error("Error in task registration:", error);
        return rejectWithValue(error.response?.data || "Failed to register task");
    }
});

const initialState = {
    result: [],
    statusReg: "idle",
    statusSub: "idle",
    error: null,
};

const taskSubSlice = createSlice({
    name: "taskSub",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(taskSub.pending, (state) => {
                state.statusSub = "pending";
                console.log("Submission in progress...");
            })
            .addCase(taskSub.fulfilled, (state, action) => {
                state.statusSub = "succeeded";
                console.log("Submission succeeded");
                state.result = action.payload;
            })
            .addCase(taskSub.rejected, (state, action) => {
                state.statusSub = "failed";
                state.error = action.payload || "Failed to submit the task";
                console.log("Submission failed:", state.error);
            })
            .addCase(taskReg.pending, (state) => {
                state.statusReg = "pending";
                console.log("Registration in progress...");
            })
            .addCase(taskReg.fulfilled, (state, action) => {
                state.statusReg = "succeeded";
                console.log("Registration succeeded");
                state.result = action.payload;
            })
            .addCase(taskReg.rejected, (state, action) => {
                state.statusReg = "failed";
                state.error = action.payload || "Failed to register the task";
                console.log("Registration failed:", state.error);
            });
    },
});

export default taskSubSlice.reducer;
