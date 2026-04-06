import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import {
  Companies, Countries, States, Cities, Locations, LocationTypes, BusinessGroups, BusinessTypes,
  LegalEntities, OperatingUnits, HrOrganizations,
  Grades, GradeSteps, GradeLadders, Jobs, Positions,
  Persons, Assignments, Supervisors,
  PayrollPeriods, AssignmentStatusTypes, ElementTypes, ElementEntries,
  Salaries, PayrollRuns, Payslips, TaxDeclarations,
  AbsenceTypes, Absences, Timecards, WorkSchedules, HolidayCalendars,
  Requisitions, JobPostings, Applicants, Applications, Interviews, OfferLetters,
  BenefitPlans, BenefitEnrollments, Loans,
  Competences, TrainingPrograms, TrainingEnrollments,
  Appraisals,
  Separations, ExitChecklists, FinalSettlements,
  SecurityRoles, Users, AuditLogs,
} from './pages/Modules';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
    </div>
  );
  return user ? <Layout>{children}</Layout> : <Navigate to="/login" replace />;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Organization */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/companies" element={<ProtectedRoute><Companies /></ProtectedRoute>} />
        <Route path="/countries" element={<ProtectedRoute><Countries /></ProtectedRoute>} />
        <Route path="/states" element={<ProtectedRoute><States /></ProtectedRoute>} />
        <Route path="/cities" element={<ProtectedRoute><Cities /></ProtectedRoute>} />
        <Route path="/locations" element={<ProtectedRoute><Locations /></ProtectedRoute>} />
        <Route path="/location-types" element={<ProtectedRoute><LocationTypes /></ProtectedRoute>} />
        <Route path="/business-groups" element={<ProtectedRoute><BusinessGroups /></ProtectedRoute>} />
        <Route path="/business-types" element={<ProtectedRoute><BusinessTypes /></ProtectedRoute>} />
        <Route path="/legal-entities" element={<ProtectedRoute><LegalEntities /></ProtectedRoute>} />
        <Route path="/operating-units" element={<ProtectedRoute><OperatingUnits /></ProtectedRoute>} />
        <Route path="/hr-organizations" element={<ProtectedRoute><HrOrganizations /></ProtectedRoute>} />

        {/* HR Core */}
        <Route path="/persons" element={<ProtectedRoute><Persons /></ProtectedRoute>} />
        <Route path="/grades" element={<ProtectedRoute><Grades /></ProtectedRoute>} />
        <Route path="/grade-steps" element={<ProtectedRoute><GradeSteps /></ProtectedRoute>} />
        <Route path="/grade-ladders" element={<ProtectedRoute><GradeLadders /></ProtectedRoute>} />
        <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
        <Route path="/positions" element={<ProtectedRoute><Positions /></ProtectedRoute>} />
        <Route path="/assignments" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
        <Route path="/supervisors" element={<ProtectedRoute><Supervisors /></ProtectedRoute>} />

        {/* Payroll */}
        <Route path="/payroll-periods" element={<ProtectedRoute><PayrollPeriods /></ProtectedRoute>} />
        <Route path="/assignment-status-types" element={<ProtectedRoute><AssignmentStatusTypes /></ProtectedRoute>} />
        <Route path="/element-types" element={<ProtectedRoute><ElementTypes /></ProtectedRoute>} />
        <Route path="/element-entries" element={<ProtectedRoute><ElementEntries /></ProtectedRoute>} />
        <Route path="/salaries" element={<ProtectedRoute><Salaries /></ProtectedRoute>} />
        <Route path="/payroll-runs" element={<ProtectedRoute><PayrollRuns /></ProtectedRoute>} />
        <Route path="/payslips" element={<ProtectedRoute><Payslips /></ProtectedRoute>} />
        <Route path="/tax-declarations" element={<ProtectedRoute><TaxDeclarations /></ProtectedRoute>} />

        {/* Leave & Time */}
        <Route path="/absence-types" element={<ProtectedRoute><AbsenceTypes /></ProtectedRoute>} />
        <Route path="/absences" element={<ProtectedRoute><Absences /></ProtectedRoute>} />
        <Route path="/timecards" element={<ProtectedRoute><Timecards /></ProtectedRoute>} />
        <Route path="/work-schedules" element={<ProtectedRoute><WorkSchedules /></ProtectedRoute>} />
        <Route path="/holiday-calendars" element={<ProtectedRoute><HolidayCalendars /></ProtectedRoute>} />

        {/* Recruitment */}
        <Route path="/requisitions" element={<ProtectedRoute><Requisitions /></ProtectedRoute>} />
        <Route path="/job-postings" element={<ProtectedRoute><JobPostings /></ProtectedRoute>} />
        <Route path="/applicants" element={<ProtectedRoute><Applicants /></ProtectedRoute>} />
        <Route path="/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />
        <Route path="/interviews" element={<ProtectedRoute><Interviews /></ProtectedRoute>} />
        <Route path="/offer-letters" element={<ProtectedRoute><OfferLetters /></ProtectedRoute>} />

        {/* Benefits & Loans */}
        <Route path="/benefit-plans" element={<ProtectedRoute><BenefitPlans /></ProtectedRoute>} />
        <Route path="/benefit-enrollments" element={<ProtectedRoute><BenefitEnrollments /></ProtectedRoute>} />
        <Route path="/loans" element={<ProtectedRoute><Loans /></ProtectedRoute>} />

        {/* Learning */}
        <Route path="/competences" element={<ProtectedRoute><Competences /></ProtectedRoute>} />
        <Route path="/training-programs" element={<ProtectedRoute><TrainingPrograms /></ProtectedRoute>} />
        <Route path="/training-enrollments" element={<ProtectedRoute><TrainingEnrollments /></ProtectedRoute>} />

        {/* Performance */}
        <Route path="/appraisals" element={<ProtectedRoute><Appraisals /></ProtectedRoute>} />

        {/* Separation */}
        <Route path="/separations" element={<ProtectedRoute><Separations /></ProtectedRoute>} />
        <Route path="/exit-checklists" element={<ProtectedRoute><ExitChecklists /></ProtectedRoute>} />
        <Route path="/final-settlements" element={<ProtectedRoute><FinalSettlements /></ProtectedRoute>} />

        {/* Admin */}
        <Route path="/security-roles" element={<ProtectedRoute><SecurityRoles /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path="/audit-logs" element={<ProtectedRoute><AuditLogs /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
