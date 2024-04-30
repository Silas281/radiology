import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
import { addReport, selectLoading, selectSuccess, selectError } from '../../store/features/reportSlice'; // Import selectors from reportSlice
import './CreateReport.css';
import Navbar from '../navbar/Navbar';

const CreateReport = () => {
  // Initialize dispatch and navigate hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Define state variables for form fields and error message
  const [title, setTitle] = useState('');
  const [findings, setFindings] = useState('');
  const [impression, setImpression] = useState('');
  const [report_status, setStatus] = useState('New');
  const [patient_name, setPatientName] = useState('');
  const [date_of_birth, setDateOfBirth] = useState('');
  const [referring_physician, setReferringPhysician] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [on_click_submit, setOnClickSubmit] = useState(false);

  // Select loading, success, and error states from Redux store
  const loading = useSelector(selectLoading);
  const success = useSelector(selectSuccess);
  const error = useSelector(selectError);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setOnClickSubmit(true);
    // Validate form fields
    if (!title.trim() || !findings.trim() || !impression.trim() || !patient_name.trim() || !date_of_birth.trim() || !referring_physician.trim()) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      // Dispatch addReport action from reportSlice
      await dispatch(addReport({ title, findings, impression, report_status, patient_name, date_of_birth, referring_physician }));
      if(on_click_submit && success){
         // Clear form fields and error message upon successful submission
      setTitle('');
      setFindings('');
      setImpression('');
      setStatus('New');
      setPatientName('');
      setDateOfBirth('');
      setReferringPhysician('');
      setErrorMessage('');


      }
     

    } catch (error) {
      console.error('Error submitting report:', error.message);
      setErrorMessage('Failed to submit report. Please try again later.');
    }
  };

  return (
    <div className='main'>
      <Navbar />
      <div className='form-container'>
        <h2 className='form-header'>Create New Report</h2>
        <form className='form' onSubmit={handleSubmit}>
          {/* Title input field */}
          <div className='input-field-container'>
            <label>Title</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='input-field'
              placeholder='Title'
            />
          </div>
          {/* Findings textarea */}
          <div className='input-field-container'>
            <label>Findings</label>
            <textarea
              value={findings}
              onChange={(e) => setFindings(e.target.value)}
              className='input-field'
              placeholder='Findings'
            />
          </div>
          {/* Impression textarea */}
          <div className='input-field-container'>
            <label>Impression</label>
            <textarea
              value={impression}
              onChange={(e) => setImpression(e.target.value)}
              className='input-field'
              placeholder='Impression'
            />
          </div>
          {/* Report status select field */}
          <div className='input-field-container'>
            <label>Status</label>
            <select
              value={report_status}
              onChange={(e) => setStatus(e.target.value)}
              className='select-field'
            >
              <option value='New'>New</option>
              <option value='Unread'>Unread</option>
              <option value='Prelim'>Prelim</option>
              <option value='Final'>Final</option>
            </select>
          </div>
          {/* Patient Name input field */}
          <div className='input-field-container'>
            <label>Patient Name</label>
            <input
              type='text'
              value={patient_name}
              onChange={(e) => setPatientName(e.target.value)}
              className='input-field'
              placeholder='Patient Name'
            />
          </div>
          {/* Date of Birth input field */}
          <div className='input-field-container'>
            <label>Date of Birth</label>
            <input
              type='date'
              value={date_of_birth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className='input-field'
            />
          </div>
          {/* Referring Physician input field */}
          <div className='input-field-container'>
            <label>Referring Physician</label>
            <input
              type='text'
              value={referring_physician}
              onChange={(e) => setReferringPhysician(e.target.value)}
              className='input-field'
              placeholder='Referring Physician'
            />
          </div>
          {/* Error message display */}
          <div className='input-field-container'>
            {(on_click_submit && error) && <div className='error-message'>{error}</div>}
          </div>
          <div className='input-field-container'>
            {(on_click_submit && errorMessage) && <div className='error-message'>{errorMessage}</div>}
          </div>
          {/* Loading indicator */}
          <div className='input-field-container'>
            {(on_click_submit && loading) && <div className='loading-message'>Submitting...</div>}
          </div>
          {/* Success message */}
          <div className='input-field-container'>
            {(on_click_submit && success) && <div className='success-message'>Report submitted successfully!
            
            <p> <Link to='/'>View Reports</Link></p></div>}
           
          </div>
          {/* Submit button */}
          <div className='submit-container'>
            <button type='submit' className='submit-button'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReport;
