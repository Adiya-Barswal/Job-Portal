import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
loading:false,
  },

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setUser,setLoading } = authSlice.actions;
export default authSlice.reducer;

export const authSliceReducer = authSlice.reducer;