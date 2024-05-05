import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    joblist: [],
}

export const joblistSlice = createSlice({
    name: 'joblist',
    initialState,
    reducers: {
        addJobs: (state, action) => {
            state.joblist.push(action.payload);
        }
    }
});

export const {addJobs} = joblistSlice.actions;
export default joblistSlice.reducer;