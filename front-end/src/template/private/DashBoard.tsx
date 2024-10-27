import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header, SideBar } from '../../components';
import { getIsAuthenticated } from '../../store/auth/authSlice';
import './dashboard.scss';

export const DashBoard = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate('/auth/login');
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="template">
      <SideBar />

      <div>
        <Header />

        <Outlet />
      </div>
    </div>
  );
};
