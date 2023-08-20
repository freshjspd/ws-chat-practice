import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from '../../api';

const MESSAGES_SLICE_NAME = 'messages';

export const getMessagesThunk = createAsyncThunk(
  `${MESSAGES_SLICE_NAME}/get`,
  async (payload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await API.getMessages(payload);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ message: err.message });
    }
  }
);

export const createMessageThunk = createAsyncThunk(
  `${MESSAGES_SLICE_NAME}/create`,
  async (payload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await API.createMessage(payload);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ message: err.message });
    }
  }
);

const initialState = {
  messages: [],
  isFetching: false,
  error: null,
  limit: 10,
};

const messagesSlice = createSlice({
  name: MESSAGES_SLICE_NAME,
  initialState,
  extraReducers: builder => {
    // GET
    builder.addCase(getMessagesThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getMessagesThunk.fulfilled, (state, { payload }) => {
      state.messages = [];
      state.isFetching = false;
      state.messages.push(...payload.reverse());
    });
    builder.addCase(getMessagesThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
    // CREATE
    builder.addCase(createMessageThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(createMessageThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      if (state.messages.length >= state.limit) {
        state.messages.splice(0, 1);
      }
      state.messages.push(payload);
    });
    builder.addCase(createMessageThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
  },
});

const { reducer } = messagesSlice;

export default reducer;
