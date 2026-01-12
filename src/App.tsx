import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

// Page Imports
import Home from './pages/Home';
import LoanForm from './pages/LoanForm';
import Recommendations from './pages/Recommendations';
import LoanDetails from './pages/LoanDetails';
import ActiveLoan from './pages/ActiveLoan';
import Compare from './pages/Compare';
import Profile from './pages/Profile';
import EMICalculator from './pages/EMICalculator';
import Login from './pages/Login';
import Signup from './pages/Signup';

/**
 * ProtectedRoute Component
 * Redirects to /login if the user is not authenticated
 */
const ProtectedRoute = ({ isAuth, children }: { isAuth: boolean; children: React.ReactNode }) => {
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  // Global auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* --- Public Routes --- */}
          
          {/* Home is now Public so it can act as a Landing Page */}
          <Route path="/" element={<Home isAuth={isAuthenticated} />} />
          
          <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/emicalculator" element={<EMICalculator />} />

          {/* --- Protected Routes --- */}
          {/* These strictly require the user to be logged in */}
          
          <Route 
            path="/form" 
            element={
              <ProtectedRoute isAuth={isAuthenticated}>
                <LoanForm />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/recommendations" 
            element={
              <ProtectedRoute isAuth={isAuthenticated}>
                <Recommendations />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/info" 
            element={
              <ProtectedRoute isAuth={isAuthenticated}>
                <LoanDetails />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/active" 
            element={
              <ProtectedRoute isAuth={isAuthenticated}>
                <ActiveLoan />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/compare" 
            element={
              <ProtectedRoute isAuth={isAuthenticated}>
                <Compare />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/profile" 
            element={
              <ProtectedRoute isAuth={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            } 
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;