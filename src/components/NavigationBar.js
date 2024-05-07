import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigate from './Navigate';
import '../css/NavigationBar.css';
import { useRecoilState } from 'recoil'; // Recoil에서 상태를 가져오기 위해 추가
import { loginState } from '../recoil/atoms'; // Recoil에서 정의한 로그인 상태 가져오기
import { isVisibleState } from '../recoil/atoms';
import { getLoginInfo } from '../function/LoginState';
import axios from 'axios';

export default function NavigationBar() {
const [isVisible, setIsVisible] = useRecoilState(isVisibleState);
  const [userInfo, setUserInfo] = useState({ userName: '', loginStatus: false });

  // Recoil의 상태와 setter를 가져옴
  const [loginInfo, setLoginInfo] = useRecoilState(loginState);

  useEffect(() => {
    // Recoil의 상태가 변경되면 로그인 정보 업데이트
    setUserInfo(loginInfo);
  }, [loginInfo]);

  useEffect(() => {
    handleLoginState(); // 컴포넌트가 마운트될 때 로그인 상태를 가져옴
  }, []);

  // 클릭시 자동 로그인
  const handleAutoLogin = async () => {
    try {
      const response = await axios.post('/api/v1/users/login', {
        "password": "lab111!",
        "user_id": "lab1@gmail.com"
      });
      console.log('Login successful', response);
      setLoginInfo({ userName: response.data.user_name, loginStatus: true }); // Recoil 상태 업데이트
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  // 로그아웃 버튼
  const handleLogout = async () => {
    try {
      await axios.post('/api/v1/users/logout');
      console.log("Logout successful");
      setLoginInfo({ userName: '', loginStatus: false }); // Recoil 상태 업데이트
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  // 로그인 정보 가져오기
  const handleLoginState = async () => {
    try {
      const { userName, loginStatus } = await getLoginInfo();
      setUserInfo({ userName, loginStatus });
      setLoginInfo({ userName, loginStatus }); // Recoil 상태 업데이트
    } catch (error) {
      console.error('Failed to retrieve login information', error);
    }
  };

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
        {userInfo.loginStatus === true ? (
          <>
            <button className='user-lab'>
              <p>{userInfo.userName}님의 연구소</p>
            </button>
            <button className="login-button" onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <>
            <a href='/users/login'className="login-button">로그인</a>
            <a href='/users/add'className="signup-button">회원가입</a>
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
