import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useLoginStatus = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3001/teacher/login', {
        withCredentials: true,
        baseURL: 'http://localhost:3001/',
      })
      .catch(() => navigate('/login'));
  }, [navigate]);
};

export default useLoginStatus;