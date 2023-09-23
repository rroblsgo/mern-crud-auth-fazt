/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';
import { loginRequest, registerRequest, verifyTokenRequest } from '../api/auth';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
        setErrors([]);
      }
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.message);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      setErrors([]);
    } catch (error) {
      console.log(error);
      //setErrors(error.response.data.message);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      console.log('access_token: ', cookies.access_token);
      if (!cookies.access_token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const res = await verifyTokenRequest(cookies.access_token);
        console.log('res.data: ', res.data);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signup, signin, loading, user, isAuthenticated, errors }}
    >
      {children}
    </AuthContext.Provider>
  );
};
