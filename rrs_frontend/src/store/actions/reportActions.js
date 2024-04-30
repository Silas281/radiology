// import {
//   setReports,
//   addReport as addReportAction,
//   updateReport as updateReportAction,
//   deleteReport as deleteReportAction,
//   getReport as getReportAction,
// } from "../features/reportSlice";
// import {
//   fetchReports,
//   addReport as addReportService,
//   updateReport as updateReportService,
//   deleteReport as deleteReportService,
//   getReport as getReportService,
// } from "../services/reportService";



// export const loadReports = () => async (dispatch) => {
//   try {
//     const reports = await fetchReports();
//     dispatch(setReports(reports));
//   } catch (error) {
//     console.error("Error loading reports:", error);
//   }
// };

// export const addReport = (reportData) => async (dispatch) => {
//   try {
//     const newReport = await addReportService(reportData);
   
//     dispatch(addReportAction(newReport));
    
//   } catch (error) {
//     console.error("Error adding report:", error);
//   }
// };

// export const updateReport = (reportId, reportData) => async (dispatch) => {
//   try {
//     const updatedReport = await updateReportService(reportId, reportData);
//     dispatch(updateReportAction({ id: reportId, updatedReport }));
//   } catch (error) {
//     console.error("Error updating report:", error);
//   }
// };

// export const deleteReport = (reportId) => async (dispatch) => {
//   try {
//     await deleteReportService(reportId);
//     dispatch(deleteReportAction(reportId));
//   } catch (error) {
//     console.error("Error deleting report:", error);
//   }
// };

// export const getReport = (reportId) => async (dispatch) => {
//   try {
//     const report = await getReportService(reportId);
//     // console.log(report,"<--report")
//     dispatch(getReportAction(report));
//   } catch (error) {
//     console.error("Error getting report:", error);
//   }
// };
