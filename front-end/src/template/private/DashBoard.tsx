import { Outlet } from 'react-router-dom';
import { Header, SideBar } from '../../components';
import './dashboard.scss';

export const DashBoard = () => {
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
