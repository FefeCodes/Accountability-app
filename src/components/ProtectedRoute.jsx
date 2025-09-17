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

  if (requireAuth && !currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!requireAuth && currentUser) {
    if (userProfile?.onboardingCompleted) {
      return <Navigate to="/dashboard" replace />;
    } else {
      const onboardingStep = userProfile?.onboardingStep || 1;
      return <Navigate to={`/onboarding-step-${onboardingStep}`} replace />;
    }
  }

  if (requireOnboarding && currentUser && !userProfile?.onboardingCompleted) {
    const onboardingStep = userProfile?.onboardingStep || 1;
    return <Navigate to={`/onboarding-step-${onboardingStep}`} replace />;
  }

  return children;
};
