import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Bottom from '../components/Bottom';
import './MainPage.css'
import axios from 'axios';


export default function MainPage(){

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
    
    const handleLoginState = async () => {
        try {
            const response = await axios.get('/api/v1/users/status');
            console.log('Login successful', response);
            const { user_name, login } = response.data; 
            console.log('User name:', user_name);
            console.log('Login status:', login);
            setUserName(user_name);
            setLoginStatus(login);
        } catch(error){
            console.error('Login failed', error);
        }
    };
    
  

    return(
        <div className="main-page">
            <NavigationBar userName={userName} login={loginStatus} />
            <div className="page-content" style={{paddingLeft:"30px"}}>
                <h3 style={{paddingTop:"50px"}}> 쉽고 빠르게 나만의 시험지 만들기</h3>
                <img src="/img/examLab_logo.png" alt="logo" style={{width:"25%"}}/>
                <br />
                <img src="/img/mainImage.png" alt="Main Image" style={{width:"50%"}} />
                <nav>
                    <button className='sample-navigate-button'>
                        <Link to='/select' style={{ textDecoration: 'none', color: 'inherit' }}>기출문제</Link>
                    </button>
                    <button className='myExam-navigate-button'>
                        <Link to='/add' style={{ textDecoration: 'none', color: 'inherit' }}>나만의 시험지</Link>
                    </button>
                </nav>

                <button onClick={handleAutoLogin}>자동 로그인</button>  
                <button onClick={handleLoginState}>로그인정보 받아오기</button>
               
            </div>
            <footer>
                <Bottom />
            </footer>
        </div>
    );
}
