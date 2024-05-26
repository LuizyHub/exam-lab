import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigate from './Navigate';
import styled, {css} from 'styled-components';
import { useRecoilState } from 'recoil';
import { loginState } from '../recoil/atoms';
import { isVisibleState } from '../recoil/atoms';
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
    align-items: center;
    justify-content: space-between;
    margin-top:16px;
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
    width: 163px;
    margin-bottom: 35px;
    margin-right: 20px;
`;

const UserLabButton = styled.button`
    background-color: #fff;
    border: 1px solid black;
    width: 130px;
    padding: 10px 20px;
    border-radius: 5px;
    margin-bottom: 10px;
`;

const StyledButton = styled.button`
    width: 100%;
    display: inline-block;
    background-color: #fff;
    color: #3E3F41;
    border: none;
    cursor: pointer;
    text-decoration-line: none;
    margin-bottom: 80px;
    margin-top: 10px;
`;

const LogImgContainer = styled.div`
    display: flex;
    align-items: center;
`;

const LogImg = styled.img`
    width: 30px;
    position: absolute; 
    left: ${({ $isVisible }) => $isVisible ? '32px' : ' '}; 
    right: ${({ $isVisible }) => $isVisible ? ' ' : '10px'}; 
    transition: right 0.1s ease-in-out;
`;

const LoginText = styled.span`
    margin-left: 6px;
    font-size: 18px;
`;

const LogoutText = styled.span`
    margin-left: 65px;
    font-size: 18px;
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
    outline: none;s
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
        <NavigationContainer $isVisible={isVisible}>
            <NavigationBarContent>
                <TopContent>
                    <Link to='/'> 
                        <Logo src="/img/examLab_logo.png" alt="logo" />
                    </Link>
                    <CloseButtonContainer $isVisible={isVisible}>
                        <CloseButton onClick={toggleVisibility}>
                            <NavigationIcon src="/img/네비게이션바.png" alt="navigation" /> 
                        </CloseButton>
                    </CloseButtonContainer>
                </TopContent>

                <NavigationContent>
                    <Navigate />
                    {/* 배포 시 삭제될 개발용 로그인 버튼 */}
                    <button onClick={handleAutoLogin}>자동 로그인</button>
                    <button onClick={handleLogout} primary="true">로그아웃</button>
                    <button onClick={handleLoginState}>로그인정보 받아오기</button>
                </NavigationContent>
                {userInfo.loginStatus === true ? (
                    <>
                        <UserLabButton>
                            <p>{userInfo.userName}님의 연구소</p>
                        </UserLabButton>
                        <StyledButton onClick={handleLogout}>
                            <LogImgContainer>
                                <LogImg src='/img/로그아웃_icon.png' $isVisible={isVisible} />
                                <LogoutText>로그아웃</LogoutText>
                            </LogImgContainer>
                        </StyledButton>
                    </>
                ) : (
                        
                    <a href='/users/login'>
                        <StyledButton>
                            <LogImgContainer>
                                <LogImg src='/img/로그인_icon.png' $isVisible={isVisible} />
                                <LoginText>로그인 / 회원가입</LoginText>
                            </LogImgContainer>
                        </StyledButton>
                    </a>
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