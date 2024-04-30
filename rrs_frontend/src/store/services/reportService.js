import axios from '../actions/axiosConfig'; // Import Axios instance

/**
 * Interacting with the backend server APIs
 * @returns Response
 */


export const fetchReports = async () => {
  try {
    const response = await axios.get('/api/v1/reports/');
    return response.data;
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

export const addReport = async (reportData) => {
  try {
    const response = await axios.post('/api/v1/reports/', reportData);
    // dispatch(fetchReports);
    return response.data;
  } catch (error) {
    console.error('Error adding report:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

export const updateReport = async (reportId, reportData) => {
  try {
    const response = await axios.put(`/api/v1/reports/${reportId}/`, reportData);
    // dispatch(fetchReports);
    return response.data;
  } catch (error) {
    console.error('Error updating report:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

export const deleteReport = async (reportId) => {
  try {
    const response = await axios.delete(`/api/v1/reports/${reportId}/`);
    // dispatch(fetchReports);
    return response.data;
  } catch (error) {
    console.error('Error deleting report:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

export const getReport = async (reportId) => {
  try {
    const response = await axios.get(`/api/v1/reports/${reportId}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching report:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

