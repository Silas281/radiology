import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {fetchReports ,selectReportsByStatus } from '../../store/features/reportSlice'; // Import loadReports action from reportSlice
import './ReportList.css';
import Navbar from '../navbar/Navbar';


/**
 * Component to display all reports with filtering functionality
 * @returns JSX
 */
const ReportList = () => {
  const dispatch = useDispatch();



  const [filteredReports, setFilteredReports] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');

    //const reports = useSelector(state => state.reports.reports);
    const reports = useSelector(state => selectReportsByStatus(state, filterStatus));

  // Load reports on component mount
  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  // Update filtered reports when reports or filter status change
  useEffect(() => {
    if (filterStatus === 'all') {
      setFilteredReports(reports);
    } else {
      const filtered = reports.filter(report => report.report_status === filterStatus);
      setFilteredReports(filtered);
    }
  }, [filterStatus, reports]);

  /**
   * Function to get CSS class name based on report status
   * @param {string} status - Report status
   * @returns {string} - CSS class name
   */
  const getStatusClassName = (status) => {
    switch (status) {
      case 'New':
        return 'status-new';
      case 'Unread':
        return 'status-unread';
      case 'Prelim':
        return 'status-prelim';
      case 'Final':
        return 'status-final';
      default:
        return '';
    }
  };

  /**
   * Handle change in filter status
   * @param {Event} e - Change event
   */
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  return (
    <div className='main'>
      <Navbar />
      <div className="report-list-container">
        {/* Header */}
        <h2 className="report-list-header">Reports</h2>
        {/* Filter dropdown */}
        <div className="filter-container">
          <label htmlFor="status-filter">Filter by Status:</label>
          <select id="status-filter" value={filterStatus} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="New">New</option>
            <option value="Unread">Unread</option>
            <option value="Prelim">Prelim</option>
            <option value="Final">Final</option>
          </select>
        </div>
        {/* Display filtered reports */}
        {filteredReports.length > 0 ? (
          <div>
<ul>      <div className='display-header'>
          <span>Title</span>
          <span className='status-header'>Status</span>
          <span>Actions</span>
            </div>
            {filteredReports.map(report => (
              <li className="report-item" key={report.id}>
                <span className="report-title">{report.title}</span>
                <div className='items-box'>
                  <span className={`report-status ${getStatusClassName(report.report_status)}`}>{report.report_status}</span>
                  <Link className="view-details-link" to={`/reports/${report.id}`}>View Details</Link>
                </div>
              </li>
            ))}
          </ul>
          </div>
          
        ) : (
          <h5>No {filterStatus=='all'?'':filterStatus} Reports 📪</h5>
        )}
        {/* Create new report link */}
        <div className="create-report-link-container">
          <Link className="create-report-link" to="/create">Create New Report</Link>
        </div>
      </div>
    </div>
  );
};

export default ReportList;
