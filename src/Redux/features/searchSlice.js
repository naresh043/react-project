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
    ActionisUserLogin: (state, action) => {
      state.user.login = action.payload;  
    },
    ActionisUserLogout: (state, action) => {
      state.user.logout = action.payload;  
    },
    ActionuserDetils: (state, action) => {
      state.userDetails = action.payload; // Correctly update the userDetails state
  
    },

  },
});

export const { setSearchQuery, ActionisUserLogin,ActionisUserLogout,ActionuserDetils } = searchSlice.actions;
export default searchSlice.reducer;