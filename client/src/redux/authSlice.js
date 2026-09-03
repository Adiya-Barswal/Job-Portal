import { createSlice } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    loading: false,
    user: null,
  },

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  // Fix: Rehydrate hote hi loading ko false kar do
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state) => {
      if (state) {
        state.loading = false;
      }
    });
  },
});

export const { setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
export const authSliceReducer = authSlice.reducer;
