import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Navigate from '../components/Navigate';
import Bottom from '../components/Bottom';
import axios from 'axios';
import './MainPage.css'

const usersDomain = "https://exam-lab.store/api/v1/users";

export default function MainPage(){

    const [userData, setUserData] = useState(null);

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
    // const handleAutoLogin = () => {
    
    //     axios.get('https://exam-lab.store/api/v1/users/status')
    //     .then(response => {
    //         // 성공 시 처리할 내용 작성
    //         console.log('Login successful', response.data);
    //         // 받은 데이터에서 필요한 정보를 추출하여 처리
    //         const { user_name, login } = response.data;
    //         console.log('User name:', user_name);
    //         console.log('Login status:', login);
    //     })
    //     .catch(error => {
    //         // 실패 시 처리할 내용 작성
    //         console.error('Login failed', error);
    //     });
    // }
    

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

                {/* <button onClick={handleAutoLogin}>자동 로그인</button> */}

                {userData && userData.login ? <p>Welcome, {userData.user_name}!</p> : null}
            </div>
            <footer>
                <Bottom />
            </footer>
        </div>
    );
}
