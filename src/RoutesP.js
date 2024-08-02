import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage';
import { AdminEntry } from './pages/AdminEntry';
import ImageUpload from './pages/ImageUpload';
import ImageList from './pages/ImageList';
import LoginPage from './pages/LoginPage';
import { TumFiyatlar } from './pages/TumFiyatlar';
import UserManagementPage from './pages/UserManagementPage';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const token = localStorage.getItem('token');
  return token ? <Element {...rest} /> : <Navigate to="/login" replace />;
};

export const RoutesP = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin" element={<PrivateRoute element={AdminEntry} />} />
        <Route path="/upload" element={<PrivateRoute element={ImageUpload} />} />
        <Route path="/images" element={<PrivateRoute element={ImageList} />} />
        <Route path="/tumfiyatlar" element={<PrivateRoute element={TumFiyatlar} />} />
        <Route path="/user-management" element={<PrivateRoute element={UserManagementPage} />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};
