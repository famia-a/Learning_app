import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from 'axios';
import { llm } from "../fetchApi";

// // 1. Move your Axios call into an Async Thunk
// export const fetchTranscript = createAsyncThunk(
//   "search/fetchTranscript",
//   async (_, thunkAPI) => {
//     const res = await axios.get(llm());
//     return res.data; // This becomes the action.payload
//   }
// );

const SearchSlice = createSlice({
  name: "search",
  initialState: { // Fixed the spelling typo here
    value: 0,
    transcriptData: null, // Added to store your API response
    loading: false,
    error: null,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  // 2. Handle the async lifecycle states (loading, success, failure)
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTranscript.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchTranscript.fulfilled, (state, action) => {
//         state.loading = false;
//         state.transcriptData = action.payload; // Save Axios data to state
//       })
//       .addCase(fetchTranscript.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
});

export const { increment } = SearchSlice.actions;
export default SearchSlice.reducer;
