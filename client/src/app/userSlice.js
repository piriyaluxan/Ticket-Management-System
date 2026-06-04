import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersApi, getAgentsApi, toggleUserStatusApi } from "../api/userApi";

export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await getUsersApi();
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch users",
      );
    }
  },
);

export const fetchAgents = createAsyncThunk(
  "users/fetchAgents",
  async (_, thunkAPI) => {
    try {
      const res = await getAgentsApi();
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch agents",
      );
    }
  },
);

export const toggleUserStatus = createAsyncThunk(
  "users/toggleStatus",
  async ({ id, isActive }, thunkAPI) => {
    try {
      const res = await toggleUserStatusApi(id, isActive);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update status",
      );
    }
  },
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    agents: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAgents.fulfilled, (state, action) => {
        state.agents = action.payload;
      })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (u) => u._id === action.payload._id,
        );
        if (index !== -1) state.users[index] = action.payload;
      });
  },
});

export default userSlice.reducer;
