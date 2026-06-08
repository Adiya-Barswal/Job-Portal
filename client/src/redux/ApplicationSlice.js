import { createSlice } from "@reduxjs/toolkit";

const ApplicationSlice = createSlice({
  name: "application",
  initialState: {
    applicants: null,
    allAppliedJobs: [],
  },
  reducers: {
    setAllApplicants: (state, action) => {
      state.applicants = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
  },
});

export const { setAllApplicants, setAllAppliedJobs } = ApplicationSlice.actions;
export default ApplicationSlice.reducer;
