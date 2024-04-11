import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Navigate from '../components/Navigate';
import Bottom from '../components/Bottom';
import axios from 'axios';
import './MainPage.css'
import api from '../axiosInstance'; // axios 인스턴스를 불러옵니다.

const usersDomain = "https://exam-lab.store/api/v1/users";

export default function MainPage(){

    const [userData, setUserData] = useState(null);
    const [loginUser, setLoginUser] = useState(false);

    // useEffect(() => {
    //     axios.get(`${usersDomain}/status`)
    //         .then(response => {
    //             setUserData(response.data);
    //             console.log(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching user data:', error);
    //         });
    // }, []);

    // 클릭시 자동 로그인
    // 개발을 위한 목적, 추후 삭제

    const handleTakeLoginData= () => {
    axios.get('/')
    .then(response => {
        // 요청이 성공하고 200 OK 응답을 받았을 때
        if (response.status === 200) {
            console.log('로그인되었습니다.');
            // 여기서 로그인 상태를 업데이트하거나 적절한 작업을 수행할 수 있습니다.
        } else {
            console.log('요청은 성공했지만 로그인되지 않았습니다.');
        }
    })
    .catch(error => {
        // 요청이 실패했을 때
        console.error('요청 실패:', error);
    });
}


    const handleLogin = async () => {
        try {
            const response = await axios.post(`/api/v1/users/login`, {  
                "password": "lab111!",
                "user_id": "lab1@gmail.com"
            });
            
            console.log('Login successful', response);    
        } catch(error) {
            console.error('Login failed', error);
        }
    };
    
    const handleAutoLogin = async () => {
        try {
            const response = await axios.get(`${usersDomain}/status`);
            console.log('Login successful', response);
            const { user_name, login } = response.data; 
            console.log('User name:', user_name);
            console.log('Login status:', login);
        } catch(error){
            console.error('Login failed', error);
        }
    };
    
    
    
    

    const login = () => {
        setLoginUser(true);
        console.log(loginUser);
    }

    const logout = () => {
        setLoginUser(false);
        console.log(loginUser);
    }
    

    return(
        <div className="main-page">
            <NavigationBar />
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

                <button onClick={handleLogin}>자동 로그인</button>  
                 <button onClick={handleAutoLogin}>로그인정보 받아오기</button>
                {/* <button onClick={handleTakeLoginData}>도메인에서 로그인정보 받아오기</button> */}

                {/* useState로 상태 받아오기 */}
                {/* <button onClick={login}>로그인</button>
                <button onClick={logout}>로그인아웃</button> */}

                {userData && userData.login ? <p>Welcome, {userData.user_name}!</p> : null}
            </div>
            <footer>
                <Bottom />
            </footer>
        </div>
    );
}
