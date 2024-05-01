import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Bottom from '../components/Bottom';
import './MainPage.css'
import axios from 'axios';


export default function MainPage() {

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
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    // 로그아웃 버튼
    const handleLogout = async () => {
        try {
            const response = await axios.post('/api/v1/users/logout');
            console.log("Logout successful", response);
            setLoginStatus(false);

        } catch (error) {
            console.error('Logout failed', error);
        }
    }

    // 로그인 상태 받아오기
    const handleLoginState = async () => {
        try {
            const response = await axios.get('/api/v1/users/status');
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
                alert('로그인되지 않았습니다. 다시 로그인해주세요.');

            }
        }
    };



    return (
        <div className="main-page">
            <div className="page-content" style={{ position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', height: '400px', background: 'linear-gradient(102.06deg, #E0F9F8 12.5%, #E2E6FA 98.35%)', top: 0, left: 0 }}>
                    <div style={{ paddingLeft: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h3 style={{ position: 'relative' }}>쉽고 빠르게 나만의 시험지 만들기</h3>
                        <img src="/img/examLab_logo.png" alt="logo" style={{ width: '200px', position: 'relative' }} />
                    </div>
                    <div style={{ paddingRight: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src="/img/mainImage.png" alt="Main Image" style={{ width: '500px', position: 'relative' }} />
                    </div>
                </div>
            </div>



            <nav>
                <button className='sample-navigate-button'>
                    <Link to='/exams' style={{ textDecoration: 'none', color: 'inherit' }}>시험지 제작하기</Link>
                </button>
                <button className='myExam-navigate-button'>
                    <Link to='/editR' style={{ textDecoration: 'none', color: 'inherit' }}>나만의 시험지</Link>
                </button>
            </nav>

            <button onClick={handleAutoLogin}>자동 로그인</button>
            <button onClick={handleLogout}>로그아웃</button>
            <button onClick={handleLoginState}>로그인정보 받아오기</button>

            <footer>
                <Bottom />
            </footer>
            <NavigationBar userName={userName} login={loginStatus} />
        </div>
    );
}
