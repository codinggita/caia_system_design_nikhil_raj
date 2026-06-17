import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  concepts: [],
  currentConcept: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  loading: false,
  error: null,
};

const conceptSlice = createSlice({
  name: 'concepts',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.concepts = action.payload.concepts;
      state.pagination = action.payload.pagination;
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentConcept: (state, action) => {
      state.currentConcept = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, setCurrentConcept } = conceptSlice.actions;
export default conceptSlice.reducer;
