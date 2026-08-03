import { useContext } from 'react';
import AuthContext from './mainuserContext';
import axios from 'axios';


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const api = axios.create({
  baseURL: "https://gmbtebac.onrender.com",
  withCredentials: true,
  // Without a timeout, a hung/cold-starting backend request never
  // resolves or rejects, so checkAuth()'s finally{} never runs and
  // isLoading stays true forever (the "Checking authentication..."
  // screen that never goes away).
  timeout: 20000,
});
