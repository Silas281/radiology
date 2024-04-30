import {createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as reportService from '../services/reportService';

/**
 * Setting up reports reducers using redux toolkit
 */
const initialState = {
  reports: [],
  selectedReport: null,
  loading: false,
  success: false,
  error: null,
};

/**
 * Async thunk action to fetch reports from the backend
 */
export const fetchReports = createAsyncThunk(
  'reports/fetchReports',
  async (_, { rejectWithValue }) => {
    try {
      const response = await reportService.fetchReports();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk action to add a report to the backend
 */
export const addReport = createAsyncThunk(
  'reports/addReport',
  async (reportData, { rejectWithValue }) => {
    try {
      const response = await reportService.addReport(reportData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch a single report by id from the API
export const fetchReportById = createAsyncThunk(
  'reports/fetchReportById',
  async (id, thunkAPI) => {
    try {
      const response = await reportService.getReport(id);
      console.log("Re->",response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/**
 * Async thunk action to update a report in the backend
 */
export const updateReportById = createAsyncThunk(
  'reports/updateReport',
  async ({ id, reportData }, { rejectWithValue }) => {
    try {
      const response = await reportService.updateReport(id, reportData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk action to delete a report by id from the backend
export const deleteReportById = createAsyncThunk(
  'reports/deleteReportById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await reportService.deleteReport(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Report Slice
 */
const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    updateReport(state, action) {
      const { id, updatedReport } = action.payload;
      const index = state.reports.findIndex((report) => report.id === id);
      if (index !== -1) {
        state.reports[index] = updatedReport;
      }
    },
    deleteReport(state, action) {
      const id = action.payload;
      state.reports = state.reports.filter((report) => report.id !== id);
    },
    getReport(state, action) {
      const report = action.payload;
      state.selectedReport = report;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.reports = action.payload;
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(addReport.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addReport.fulfilled, (state, action) => {
        state.reports.push(action.payload);
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(addReport.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(fetchReportById.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchReportById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedReport = action.payload;
      })
      .addCase(fetchReportById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateReportById.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateReportById.fulfilled, (state, action) => {
        const { id, updatedReport } = action.payload;
        const index = state.reports.findIndex(report => report.id === id);
        if (index !== -1) {
          state.reports[index] = updatedReport;
        }
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(updateReportById.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(deleteReportById.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteReportById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        // Optionally update state.reports if needed
      })
      .addCase(deleteReportById.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

// Define a selector to get the reports array from the state
export const selectReports = state => state.reports.reports;

// Define a selector to get the selectedReport object from the state
export const selectSelectedReport = state => state.reports.selectedReport;

// Optionally, create a selector to filter reports based on status
export const selectReportsByStatus = createSelector(
  [selectReports, (_, status) => status], // Use the selectReports selector and a function that returns the status
  (reports, status) => {
    if (status === 'all') {
      return reports; // Return all reports if status is 'all'
    } else {
      return reports.filter(report => report.report_status === status); // Filter reports by status
    }
  }
);

export const selectLoading=state=>state.reports.loading;
export const selectSuccess =state=>state.reports.success;
export const selectError = state=> state.reports.error;


export const { updateReport, deleteReport, getReport } = reportSlice.actions;

export default reportSlice.reducer;
