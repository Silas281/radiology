import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReportList from '../components/reportList/ReportList';
import CreateReport from '../components/createReport/CreateReport';
import ReportDetail from '../components/reportDetail/ReportDetail';
import EditReport from '../components/editReport/EditReport';

/**
 * App navigation and routing using react-router-dom
 * @returns 
 */
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<ReportList />} />
    <Route path="/create" element={<CreateReport />} />
    <Route path="/reports/:id" element={<ReportDetail />} />
    <Route path="/report-update/:id" element={<EditReport />} />
  </Routes>
);

const RoutesWrapper = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default RoutesWrapper;
