import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigate from './Navigate';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { loginState, isVisibleState } from '../recoil/atoms';
import { getLoginInfo } from '../function/LoginState';
import axios from 'axios';

const NavigationContainer = styled.div`
    position: fixed;
    top: 0;
    left: ${({ $isVisible }) => ($isVisible ? '0' : '-199px')};
    width: 256px;
    height: 100%;
    background-color: #fff;
    z-index: 9999;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: left 0.3s ease-in-out;
`;

const TopContent = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
`;

const NavigationBarContent = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%; 
    height: 100%;
    padding-top: 20px;
`;

const NavigationContent = styled.div`
`;

const Logo = styled.img`
    width: 163px;
    margin-bottom: 35px;
    margin-right: 20px;
    margin-left: 22px;
`;

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 20px;
    margin-left: 8px;
    margin-bottom: 10px;
    position: absolute;
    bottom: 110px;
`;

const UserButton = styled.button`
    background-color: #29B8B5;
    color: #fff;
    border: none;
    border-radius: 180px;
    padding: 15px 10px;
    font-size: 10px;
    font-weight: 600;
    margin-right: 12px;
    position: relative;
    right: ${({ $isVisible }) => ($isVisible ? ' ' : '-180px')}; 
`;

const UserName = styled.p`
    font-size: 18px;
    font-weight: 500;
    position: relative;
`;

const StyledButton = styled.button`
    width: 100%;
    display: inline-block;
    background-color: #fff;
    color: #3E3F41;
    border: none;
    cursor: pointer;
    text-decoration-line: none;
    margin-bottom: 100px;
    margin-top: 10px;
`;

const LogImgContainer = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 80px;
`;

const LoginImg = styled.img`
    width: 30px;
    position: relative;
    left: ${({ $isVisible }) => ($isVisible ? '25px' : ' ')}; 
    right: ${({ $isVisible }) => ($isVisible ? ' ' : '-205px')}; 
    transition: left 0.3s ease-in-out;
`;

const LogoutImg = styled.img`
    width: 30px;
    position: relative;
    left: ${({ $isVisible }) => ($isVisible ? '25px' : ' ')}; 
    right: ${({ $isVisible }) => ($isVisible ? ' ' : '-205px')}; 
    transition: left 0.3s ease-in-out;
`;

const LoginText = styled.span`
    margin-left: 45px;
    font-size: 18px;
    font-weight: 500;
`;

const LogoutText = styled.span`
    margin-left: 45px;
    font-size: 18px;
    font-weight: 500;
`;

const CloseButtonContainer = styled.div`
    position: absolute;
    top: 40px;
    right: 12px;
    margin-left: 5px;
    transition: right 0.1s ease-in-out;
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
                password: 'lab111!',
                user_id: 'lab1@gmail.com',
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
            console.log('Logout successful');
            setLoginInfo({ userName: '', loginStatus: false });
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

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
        <NavigationContainer $isVisible={isVisible}>
            <NavigationBarContent>
                <TopContent>
                    <Link to='/'>
                        <Logo src='/img/시험지연구소.svg' alt='logo' />
                    </Link>
                    <CloseButtonContainer $isVisible={isVisible}>
                        <CloseButton onClick={toggleVisibility}>
                            <NavigationIcon src='/img/네비게이션바.png' alt='navigation' />
                        </CloseButton>
                    </CloseButtonContainer>
                </TopContent>

                <NavigationContent>
                    <Navigate />
                    {/* 배포 시 삭제될 개발용 로그인 버튼 */}
                    {/* <button onClick={handleAutoLogin}>자동 로그인</button>
                    <button onClick={handleLogout} primary="true">로그아웃</button>
                    <button onClick={handleLoginState}>로그인정보 받아오기</button> */}
                {userInfo.loginStatus === true ? (
                    <>
                        <UserContainer>
                            <UserButton $isVisible={isVisible}>{userInfo.userName}</UserButton>
                            <UserName>{userInfo.userName}님의 연구소</UserName>
                        </UserContainer>
                        <StyledButton onClick={handleLogout}>
                            <LogImgContainer>
                                <LogoutImg src='/img/로그아웃_icon.png' $isVisible={isVisible} />
                                <LogoutText>로그아웃</LogoutText>
                            </LogImgContainer>
                        </StyledButton>
                    </>
                ) : (
                    <a href='/users/login'>
                        <StyledButton>
                            <LogImgContainer>
                                <LoginImg src='/img/로그인_icon.png' $isVisible={isVisible} />
                                <LoginText>로그인 / 회원가입</LoginText>
                            </LogImgContainer>
                        </StyledButton>
                    </a>
                )}
            </NavigationBarContent>
            {!isVisible && (
                <CloseButtonContainer>
                    <CloseButton onClick={toggleVisibility}>
                        <NavigationIcon src='/img/네비게이션바.png' alt='navigation' />
                    </CloseButton>
                </CloseButtonContainer>
            )}
        </NavigationContainer>
    );
}