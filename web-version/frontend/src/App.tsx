import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getCurrentUser } from './services/slices/authSlice';
import { type AppDispatch, type RootState } from './services/store';

// Pages
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import EntryPage from './pages/EntryPage';
import HistoryPage from './pages/HistoryPage';
import ImportunityPage from './pages/ImportunityPage';
import GoalsPage from './pages/GoalsPage';

// Components
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté au chargement de l'application
    if (localStorage.getItem('token')) {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);

  if (loading && localStorage.getItem('token')) {
    return <div className="flex justify-center items-center h-screen">Chargement...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthPage isLogin={true} />
        } />
        <Route path="/register" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthPage isLogin={false} />
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/entry" element={
          <ProtectedRoute>
            <EntryPage />
          </ProtectedRoute>
        } />
        <Route path="/history" element={
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        } />
        <Route path="/importunity" element={
          <ProtectedRoute>
            <ImportunityPage />
          </ProtectedRoute>
        } />
        <Route path="/goals" element={
          <ProtectedRoute>
            <GoalsPage />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
