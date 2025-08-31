import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

export const ProtectedRoute = ({ children, requireAuth = true, requireOnboarding = false }) => {
  const { currentUser, userProfile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#F5F7FA]">
        <LoadingSpinner size="lg" color="blue" />
      </div>
    );
  }

  // If route requires authentication but user is not logged in
  if (requireAuth && !currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is logged in but trying to access login/signup pages
  if (!requireAuth && currentUser) {
    // Check if onboarding is completed
    if (userProfile?.onboardingCompleted) {
      return <Navigate to="/dashboard" replace />;
    } else {
      // Redirect to the appropriate onboarding step
      const onboardingStep = userProfile?.onboardingStep || 1;
      return <Navigate to={`/onboarding-step-${onboardingStep}`} replace />;
    }
  }

  // If route requires completed onboarding but user hasn't completed it
  if (requireOnboarding && currentUser && !userProfile?.onboardingCompleted) {
    const onboardingStep = userProfile?.onboardingStep || 1;
    return <Navigate to={`/onboarding-step-${onboardingStep}`} replace />;
  }

  return children;
};
