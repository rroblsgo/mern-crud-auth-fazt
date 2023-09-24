import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useAuth();
  // console.log('loading: ', loading);
  // console.log('isAuthenticated: ', isAuthenticated);
  if (loading) return <h1>Cargando...</h1>;
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;

  return <Outlet />;
};
