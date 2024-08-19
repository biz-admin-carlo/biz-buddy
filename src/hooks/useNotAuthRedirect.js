import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useNotAuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('bb_session_token'); 
    if (token) {
      navigate('/home'); 
    }
  }, [navigate]);
}

export default useNotAuthRedirect;
