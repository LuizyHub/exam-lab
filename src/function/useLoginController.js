import { useState } from 'react';
import axios from 'axios';

export const useLoginController = () => {

  const [userName, setUserName] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);

  // 클릭시 자동 로그인
  // 개발을 위한 목적, 추후 삭제
  const handleAutoLogin = async () => {
    try {
      const response = await axios.post('/api/v1/users/login', {
        "password": "lab111!",
        "user_id": "lab1@gmail.com"
      });
      alert(response.statusText)
      return console.log('Login successful', response.statusText);
    } catch (error) {
      alert(error)
      return console.error('Login failed', error);
    }
  };

  // 로그아웃 버튼
  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/v1/users/logout');
      console.log("Logout successful", response);
      alert('Logout');
      setLoginStatus(false);

    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  // 로그인 상태 받아오기
  const handleLoginState = async () => {
    try {
      const response = await axios.get('/api/v1/users/status');
      alert('Login successful');
      console.log('Login successful', response);
      const { user_name, login } = response.data;
      console.log('User name:', user_name);
      console.log('Login status:', login);
      setUserName(user_name);
      setLoginStatus(login);
    } catch (error) {
      console.error('Login failed', error);
      // 401 에러가 발생하면 로그인되지 않았음을 알리는 알림창을 띄운다.
      if (error.response && error.response.status === 401) {
        alert('Fail to Login, Try to Login');

      }
    }
  };

  return { handleAutoLogin, handleLogout, handleLoginState }

}