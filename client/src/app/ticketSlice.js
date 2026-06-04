import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTicketsApi,
  getTicketByIdApi,
  createTicketApi,
  updateTicketApi,
  deleteTicketApi,
  updateTicketStatusApi,
  assignTicketApi,
  addCommentApi,
} from "../api/ticketApi";

export const fetchTickets = createAsyncThunk(
  "tickets/fetchAll",
  async (params, thunkAPI) => {
    try {
      const res = await getTicketsApi(params);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch tickets",
      );
    }
  },
);

export const fetchTicketById = createAsyncThunk(
  "tickets/fetchOne",
  async (id, thunkAPI) => {
    try {
      const res = await getTicketByIdApi(id);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch ticket",
      );
    }
  },
);

export const createTicket = createAsyncThunk(
  "tickets/create",
  async (data, thunkAPI) => {
    try {
      const res = await createTicketApi(data);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to create ticket",
      );
    }
  },
);

export const updateTicket = createAsyncThunk(
  "tickets/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await updateTicketApi(id, data);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update ticket",
      );
    }
  },
);

export const deleteTicket = createAsyncThunk(
  "tickets/delete",
  async (id, thunkAPI) => {
    try {
      await deleteTicketApi(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete ticket",
      );
    }
  },
);

export const updateTicketStatus = createAsyncThunk(
  "tickets/updateStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const res = await updateTicketStatusApi(id, status);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update status",
      );
    }
  },
);

export const assignTicket = createAsyncThunk(
  "tickets/assign",
  async ({ id, agentId }, thunkAPI) => {
    try {
      const res = await assignTicketApi(id, agentId);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to assign ticket",
      );
    }
  },
);

export const addComment = createAsyncThunk(
  "tickets/addComment",
  async ({ id, message }, thunkAPI) => {
    try {
      const res = await addCommentApi(id, message);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add comment",
      );
    }
  },
);

const ticketSlice = createSlice({
  name: "tickets",
  initialState: {
    tickets: [],
    currentTicket: null,
    total: 0,
    page: 1,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentTicket: (state) => {
      state.currentTicket = null;
    },
    clearTicketError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload.tickets;
        state.total = action.payload.total;
        state.page = action.payload.page;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch one
      .addCase(fetchTicketById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTicketById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTicket = action.payload;
      })
      .addCase(fetchTicketById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createTicket.fulfilled, (state, action) => {
        state.tickets.unshift(action.payload);
        state.total += 1;
      })
      // Update
      .addCase(updateTicket.fulfilled, (state, action) => {
        const index = state.tickets.findIndex(
          (t) => t._id === action.payload._id,
        );
        if (index !== -1) state.tickets[index] = action.payload;
        if (state.currentTicket?._id === action.payload._id) {
          state.currentTicket = action.payload;
        }
      })
      // Delete
      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.tickets = state.tickets.filter((t) => t._id !== action.payload);
        state.total -= 1;
      })
      // Status update
      .addCase(updateTicketStatus.fulfilled, (state, action) => {
        const index = state.tickets.findIndex(
          (t) => t._id === action.payload._id,
        );
        if (index !== -1) state.tickets[index] = action.payload;
        if (state.currentTicket?._id === action.payload._id) {
          state.currentTicket = action.payload;
        }
      })
      // Assign
      .addCase(assignTicket.fulfilled, (state, action) => {
        const index = state.tickets.findIndex(
          (t) => t._id === action.payload._id,
        );
        if (index !== -1) state.tickets[index] = action.payload;
        if (state.currentTicket?._id === action.payload._id) {
          state.currentTicket = action.payload;
        }
      })
      // Comment
      .addCase(addComment.fulfilled, (state, action) => {
        if (state.currentTicket?._id === action.payload._id) {
          state.currentTicket = action.payload;
        }
      });
  },
});

export const { clearCurrentTicket, clearTicketError } = ticketSlice.actions;
export default ticketSlice.reducer;
