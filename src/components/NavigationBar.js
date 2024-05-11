import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigate from './Navigate';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { loginState } from '../recoil/atoms';
import { isVisibleState } from '../recoil/atoms';
import { getLoginInfo } from '../function/LoginState';
import axios from 'axios';

const NavigationContainer = styled.div`
    position: fixed;
    top: 0;
    left: ${props => props.isVisible ? '0' : '-250px'};
    width: 240px;
    height: 100%;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: left 0.3s ease-in-out;
`;

const NavigationBarContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding-top: 20px;
`;

const NavigationContent = styled.div`
    flex: 1;
`;

const Logo = styled.img`
    width: 140px;
    margin-bottom: 35px;
    margin-top: 20px
`;

const UserLabButton = styled.button`
    background-color: #fff;
    border: 1px solid black;
    width: 160px;
    padding: 10px 20px;
    border-radius: 5px;
    margin-bottom: 10px;
    cursor: pointer;
`;

const StyledButton = styled.button`
    width: 160px;
    text-align: center;
    background-color: ${props => props.primary ? '#29B8B5' : '#EBF0F6'};
    display: inline-block;
    color: ${props => props.primary ? '#fff' : '#A2ACB9'};
    border: none;
    padding: 10px 20px;
    margin: 10px;
    cursor: pointer;
    border-radius: 20px;
    font-size: 16px;
    text-decoration-line: none;
    margin-bottom: ${props => props.primary ? '0' : '50px'};
`;

const CloseButtonContainer = styled.div`
    position: absolute;
    top: 20px;
    right: ${({ isVisible }) => (isVisible ? '10px' : '-25%')}; /* Adjusted right position */
    overflow: hidden;
    transition: right 0.3s ease-in-out;
`;

const CloseButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    transition: margin-left 0.2s ease-in-out;
`;


const NavigationIcon = styled.img`
    width: 20px;
    outline: none;
`;


export default function NavigationBar() {
    const [isVisible, setIsVisible] = useRecoilState(isVisibleState);
    const [userInfo, setUserInfo] = useState({ userName: '', loginStatus: false });
    const [loginInfo, setLoginInfo] = useRecoilState(loginState);

    useEffect(() => {
        setUserInfo(loginInfo);
    }, [loginInfo]);

    useEffect(() => {
        handleLoginState();
    }, []);

    const handleAutoLogin = async () => {
        try {
            const response = await axios.post('/api/v1/users/login', {
                "password": "lab111!",
                "user_id": "lab1@gmail.com"
            });
            console.log('Login successful', response);
            setLoginInfo({ userName: response.data.user_name, loginStatus: true });
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('/api/v1/users/logout');
            console.log("Logout successful");
            setLoginInfo({ userName: '', loginStatus: false });
        } catch (error) {
            console.error('Logout failed', error);
        }
    }

    const handleLoginState = async () => {
        try {
            const { userName, loginStatus } = await getLoginInfo();
            setUserInfo({ userName, loginStatus });
            setLoginInfo({ userName, loginStatus });
        } catch (error) {
            console.error('Failed to retrieve login information', error);
        }
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <NavigationContainer isVisible={isVisible}>
            <NavigationBarContent>
                        <Link to='/'> 
                    <Logo src="/img/examLab_logo.png" alt="logo" />
                </Link>
                <CloseButtonContainer isVisible={isVisible}>
                    <CloseButton onClick={toggleVisibility} isVisible={isVisible}>
                        {isVisible ? <NavigationIcon src="/img/네비게이션바.png" alt="navigation" left /> : null}
                    </CloseButton>
                </CloseButtonContainer>

                <NavigationContent>
                    <Navigate />
                    {/* 배포 시 삭제될 개발용 로그인 버튼 */}
                    <button onClick={handleAutoLogin}>자동 로그인</button>
                    <button onClick={handleLogout} primary>로그아웃</button>
                    <button onClick={handleLoginState}>로그인정보 받아오기</button>
                </NavigationContent>
                {userInfo.loginStatus === true ? (
                    <>
                        <UserLabButton>
                            <p>{userInfo.userName}님의 연구소</p>
                        </UserLabButton>
                        <StyledButton onClick={handleLogout}>로그아웃</StyledButton>
                    </>
                ) : (
                    <>
                        <a href='/users/login'>
                            <StyledButton primary>로그인</StyledButton>
                        </a>
                        <a href='/users/add'>
                            <StyledButton>회원가입</StyledButton>
                        </a>
                    </>
                )}
            </NavigationBarContent>
            {!isVisible && (
                <CloseButtonContainer>
                    <CloseButton onClick={toggleVisibility}>
                        <NavigationIcon src="/img/네비게이션바.png" alt="navigation" />
                    </CloseButton>
                </CloseButtonContainer>
            )}
        </NavigationContainer>
    );
}
