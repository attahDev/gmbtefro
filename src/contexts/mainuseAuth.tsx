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
  // Render's free tier spins the backend down after inactivity — the
  // first request after a sleep has to cold-start it, which regularly
  // takes 30-70s. A short timeout doesn't make that faster, it just
  // makes the client give up before the (still-successful) response
  // arrives — see register() below, where that showed up as a
  // phantom "signup failed" immediately followed by "user already
  // exists" on retry, because the first attempt had actually gone
  // through server-side.
  timeout: 60000,
});
