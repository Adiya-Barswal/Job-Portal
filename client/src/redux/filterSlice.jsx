import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    searchedQuery: "",
  },

  reducers: {
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
  },
});

export const { setSearchedQuery } = filterSlice.actions;
export default filterSlice.reducer;
