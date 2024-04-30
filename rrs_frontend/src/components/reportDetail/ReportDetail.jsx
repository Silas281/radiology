import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReportById,selectSelectedReport, deleteReportById, fetchReports} from '../../store/features/reportSlice'; // Import actions from reportSlice
import './ReportDetail.css';
import Navbar from '../navbar/Navbar';

const ReportDetail = () => {
  // Get report ID from URL params
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the selected report from Redux store
  const report = useSelector(selectSelectedReport);
  const status = useSelector(state => state.reports.status);
  const error = useSelector(state => state.reports.error);

  // Fetch report data on component mount
  useEffect(() => {
    dispatch(fetchReportById(id));

    // Clear selected report when component unmounts
   console.log(report);
  }, [dispatch, id]); 

  // Handle delete report
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      dispatch(deleteReportById(id));
      // Redirect to report list after deletion
      navigate('/');
    }
  };

  // Handle update report
  const handleUpdate = () => {
    navigate(`/report-update/${id}`);
  };

  return (
    <div className='main'>
      <Navbar/>
      <div className="report-detail-container">
        {/* Report detail heading */}
        <h2 className="report-detail-heading">Report Detail</h2>
        {/* Display report details or loading message */}
        {status === 'loading' ? (
          <p className="loading">Loading...</p>
        ) : status === 'failed' ? (
          <p className="error">{error}</p>
        ) : (
          report && (
            <div className="report-details">
              <p><strong>Title:</strong> {report.title}</p>
              <p><strong>Findings:</strong> {report.findings}</p>
              <p><strong>Impression:</strong> {report.impression}</p>
              <p><strong>Status:</strong> {report.report_status}</p>
              <p><strong>Patient Name:</strong> {report.patient_name}</p> 
              <p><strong>Date of Birth:</strong> {report.date_of_birth}</p> 
              <p><strong>Referring Physician:</strong> {report.referring_physician}</p> 
              <p><strong>Created At:</strong> {report.created_at}</p> 
              {/* Action buttons */}
              <div className='actions-container'>
                <button onClick={handleDelete} className="delete-button">Delete</button>
                <button onClick={handleUpdate} className="update-button">Update</button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ReportDetail;
