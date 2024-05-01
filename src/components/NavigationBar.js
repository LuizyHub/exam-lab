import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigate from './Navigate';
import '../css/NavigationBar.css';
import { getLoginInfo } from '../function/LoginState';
import axios from 'axios';

export default function NavigationBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [userInfo, setUserInfo] = useState({ userName: '', loginStatus: false });

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

            console.log('Login successful', response);
        } catch(error) {
            console.error('Login failed', error);
        }
    };

    // 로그아웃 버튼
    const handleLogout = async () => {
        try{
            const response = await axios.post('/api/v1/users/logout');
            console.log("Logout successful", response);
            setLoginStatus(false);

        } catch(error) {
            console.error('Logout failed', error);
        }
    }

    // 로그인 정보 가져오기
    const handleLoginState = async () => {
        try {
        const { userName, loginStatus } = await getLoginInfo();
        setUserName(userName);
        setLoginStatus(loginStatus);
        } catch (error) {
        console.error('Failed to retrieve login information', error);
        // 에러 처리
        }
    };


  useEffect(() => {
    const handleLoginState = async () => {
      try {
        const { userName, loginStatus } = await getLoginInfo();
        setUserInfo({ userName, loginStatus });
      } catch (error) {
        console.error('Failed to retrieve login information', error);
        // 에러 처리
      }
    };

    handleLoginState();
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={`navigation-container ${isVisible ? 'open' : 'closed'}`}>
      <div className={`navigation-bar ${isVisible ? 'visible' : 'hidden'}`}>
        <button className="close-button" onClick={toggleVisibility}>
          {isVisible ? <img src="/img/네비게이션바.png" alt="navigation" className="navigation-icon-left" /> : null}
        </button>
        <Link to='/'> 
            <img src="/img/examLab_logo.png" alt="logo" className="logo" />
         </Link>
        <div className="navigation-content">
          <Navigate />

          <button onClick={handleAutoLogin}>자동 로그인</button>
                <button onClick={handleLogout}>로그아웃</button>
                <button onClick={handleLoginState}>로그인정보 받아오기</button>
            </div>

        {/* 로그인 상태에 따른 조건부 렌더링 */}
        {userInfo.loginStatus ? (
          <>
            <button className='user-lab'>
              <p>{userInfo.userName}님의 연구소</p>
            </button>
            <Link to='/users/logout' className="login-button">로그아웃</Link>
          </>
        ) : (
          <>
            <Link to='/users/login' className="login-button">로그인</Link>
            <Link to='/users/add' className="signup-button">회원가입</Link>
          </>
        )}

      </div>
      {/* 사이드바가 닫혔을 때 close 버튼 표시 */}
      {!isVisible && (
          <div className="close-button-container">
              <button className="close-button" onClick={toggleVisibility}>
              <img src="/img/네비게이션바.png" alt="navigation" className="navigation-icon-right" />
              </button>
          </div>
      )}
    </div>
  );
}
