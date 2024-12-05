// src/store/searchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '', // Store the search query
    user: {
      login: false,
      logout:null,
    },
    userDetails:null

  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload; // Update the search query
    },
    isUserLogin: (state, action) => {
      state.user.login = action.payload;  
    },
    isUserLogout: (state, action) => {
      state.user.logout = action.payload;  
    },
    userDetils: (state, action) => {
      state.userDetails = action.payload; // Correctly update the userDetails state
  
    },

  },
});

export const { setSearchQuery, isUserLogin,isUserLogout,userDetils } = searchSlice.actions;
export default searchSlice.reducer;
