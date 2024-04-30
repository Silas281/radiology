import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchReportById, updateReportById, selectSelectedReport, selectLoading, selectSuccess, selectError } from "../../store/features/reportSlice"; // Import actions from reportSlice
import "./EditReport.css";
import Navbar from "../navbar/Navbar";

const EditReport = () => {
  // Get report ID from URL params
  const { id } = useParams();

  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get report data from Redux store
  const report = useSelector(selectSelectedReport);
  const loading = useSelector(selectLoading);
  const success = useSelector(selectSuccess);
  
  const error = useSelector(selectError);

  // State to store form data
  const [formData, setFormData] = useState({
    title: "",
    findings: "",
    impression: "",
    report_status: "New", // Default status
    patient_name: "",
    date_of_birth: "",
    referring_physician: ""
  });

  const [on_click_submit, setOnClickSubmit] = useState(false);

  // Fetch report data on component mount
  useEffect(() => {
    dispatch(fetchReportById(id));
  }, [dispatch, id]);

  // Update form data when report data is fetched
  useEffect(() => {
    if (report) {
      setFormData({
        title: report.title,
        findings: report.findings,
        impression: report.impression,
        report_status: report.report_status,
        patient_name: report.patient_name,
        date_of_birth: report.date_of_birth,
        referring_physician: report.referring_physician
      });
    }
  }, [report]);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setOnClickSubmit(true);
    dispatch(updateReportById({ id, reportData: formData }));
    // Wait for success or error before navigating

    
  };

 useEffect(()=>{
  if(on_click_submit && success){
    navigate(`/reports/${id}`);
  }
 },[success, navigate, id])

  return (
    <div className="main">
      <Navbar />
      <div className="form-container">
        <h2 className="form-header">Edit Report</h2>
        <form onSubmit={handleSubmit}>
          {/* Title input field */}
          {/* Add loading state check */}
          <div className="input-field-container">
            <label>Title</label>
            <input
              type="text"
              name="title"
              className="input-field"
              value={formData.title}
              onChange={handleChange}
              disabled={loading} // Disable input field when loading
            />
          </div>
          {/* Findings textarea */}
          <div className="input-field-container">
            <label>Findings</label>
            <textarea
              name="findings"
              className="input-field"
              value={formData.findings}
              onChange={handleChange}
              disabled={loading} // Disable input field when loading
            />
          </div>
          {/* Impression textarea */}
          <div className="input-field-container">
            <label>Impression</label>
            <textarea
              name="impression"
              className="input-field"
              value={formData.impression}
              onChange={handleChange}
              disabled={loading} // Disable input field when loading
            />
          </div>
          {/* Report status select field */}
          <div className="input-field-container">
            <label>Status</label>
            <select
              name="report_status"
              className="select-field"
              value={formData.report_status}
              onChange={handleChange}
              disabled={loading} // Disable select field when loading
            >
              <option value="New">New</option>
              <option value="Unread">Unread</option>
              <option value="Prelim">Prelim</option>
              <option value="Final">Final</option>
            </select>
          </div>
          {/* Additional fields */}
          <div className="input-field-container">
            <label>Patient Name</label>
            <input
              type="text"
              name="patient_name"
              className="input-field"
              value={formData.patient_name}
              onChange={handleChange}
              disabled={loading} // Disable input field when loading
            />
          </div>
          <div className="input-field-container">
            <label>Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              className="input-field"
              value={formData.date_of_birth}
              onChange={handleChange}
              disabled={loading} // Disable input field when loading
            />
          </div>
          <div className="input-field-container">
            <label>Referring Physician</label>
            <input
              type="text"
              name="referring_physician"
              className="input-field"
              value={formData.referring_physician}
              onChange={handleChange}
              disabled={loading} // Disable input field when loading
            />
          </div>
          {/* Submit button */}
          <div className="submit-container">
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Saving..." : "Save"} {/* Show "Saving..." when loading */}
            </button>
          </div>
        </form>
        {/* Show error message if error */}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default EditReport;
