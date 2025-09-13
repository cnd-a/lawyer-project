// Routes only for users who are logged in
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');

  return token ? element : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
