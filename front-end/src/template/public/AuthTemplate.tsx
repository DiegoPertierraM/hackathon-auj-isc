import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getIsAuthenticated } from '../../store/auth/authSlice';

export const AuthTemplate = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
