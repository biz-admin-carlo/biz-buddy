// src/hooks/useAuthRedirect.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('bb_session_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);
}

export default useAuthRedirect;