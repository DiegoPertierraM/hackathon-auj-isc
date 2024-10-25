import { Provider } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  CollaboratorsPage,
  LoginPage,
  OpportunitiesPage,
  ParticipantsPage,
  RegisterPage,
  TasksPage
} from './pages';
import { store } from './store/store';
import { DashBoard } from './template/private/DashBoard';
import { AuthTemplate } from './template/public/AuthTemplate';

export const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/auth" element={<AuthTemplate />}>
          <Route index element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          <Route path="*" element={<Navigate to="/auth" />} />
        </Route>

        <Route path="/" element={<DashBoard />}>
          <Route index element={<ParticipantsPage />} />
          <Route path="collaborators" element={<CollaboratorsPage />} />
          <Route path="collaborators/:id" element={<CollaboratorsPage />} />

          <Route path="opportunities" element={<OpportunitiesPage />} />
          <Route path="tasks" element={<TasksPage />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Provider>
  );
};
