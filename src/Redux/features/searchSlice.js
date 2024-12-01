// src/store/searchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '', // Store the search query
    user: {
      login: false,  
    },

  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload; // Update the search query
    },
    isUserLogin: (state, action) => {
      state.user.login = action.payload;  
    },

  },
});

export const { setSearchQuery, isUserLogin } = searchSlice.actions;
export default searchSlice.reducer;
